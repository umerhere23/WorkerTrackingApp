const nodemailer = require('nodemailer');
const { Engagement, Employee, Department, JobTitle, Supervisor } = require('../models');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT),
    secure: false, // TLS over port 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  

function getDaysBetweenDates(startDate, endDate) {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((new Date(endDate) - new Date(startDate)) / oneDay));
}

async function sendEngagementAlert(engagement, daysRemaining) {
  try {
    const employee = await Employee.findByPk(engagement.EmployeeID);
    const department = await Department.findByPk(engagement.DepartmentID);
    const jobTitle = await JobTitle.findByPk(engagement.JobTitleID);
    const supervisor = await Supervisor.findByPk(engagement.SupervisorID);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: [engagement.HRContactEmail, engagement.DeptManagerEmail, supervisor.Email].join(','),
      subject: `Engagement Alert: ${employee.FullName}'s engagement is ${daysRemaining} days from ending`,
      html: `
        <h2>Engagement Ending Soon</h2>
        <p>This is a notification that an employee engagement is approaching its end date.</p>
        
        <h3>Engagement Details:</h3>
        <ul>
          <li><strong>Employee:</strong> ${employee.FullName} (ID: ${employee.EmployeeID})</li>
          <li><strong>Department:</strong> ${department.DepartmentName}</li>
          <li><strong>Job Title:</strong> ${jobTitle.Title}</li>
          <li><strong>Start Date:</strong> ${engagement.StartDate}</li>
          <li><strong>End Date:</strong> ${engagement.EndDate}</li>
          <li><strong>Current Duration:</strong> ${getDaysBetweenDates(engagement.StartDate, new Date())} days</li>
          <li><strong>Days Remaining:</strong> ${daysRemaining}</li>
        </ul>
        
        <p>Please review this engagement and take appropriate action.</p>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Notification sent for engagement ${engagement.EngagementID} at ${daysRemaining} days remaining`);
  } catch (error) {
    console.error('Error sending notification email:', error);
  }
}

async function checkEngagements() {
  try {
    const activeEngagements = await Engagement.findAll({
      where: { Status: 'Active' },
      include: [
        { model: Employee },
        { model: Department },
        { model: JobTitle },
        { model: Supervisor }
      ]
    });

    const today = new Date();
    
    for (const engagement of activeEngagements) {
      const endDate = new Date(engagement.EndDate);
      const daysRemaining = Math.ceil((endDate - today) / (1000 * 60 * 60 * 24));
      
      if ([90, 85, 80, 75].includes(daysRemaining)) {
        await sendEngagementAlert(engagement, daysRemaining);
      }
    }
  } catch (error) {
    console.error('Error checking engagements:', error);
  }
}

module.exports = { checkEngagements ,  sendEngagementAlert
};
