const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('./config/db');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

 db.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.error('DB connection error:', err));

 app.use('/api/auth', require('./routes/authRoutes.js'));
app.use('/api/engagements', require('./routes/engagementRoutes.js'));
app.use('/api/users', require('./routes/userRoutes.js'));
app.use('/api/departments', require('./routes/departmentRoutes.js'));
app.use('/api/job-titles', require('./routes/jobTitleRoutes'));
app.use('/api/supervisors', require('./routes/supervisorRoutes.js'));
app.use('/api/employees', require('./routes/employeeRoutes.js'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
