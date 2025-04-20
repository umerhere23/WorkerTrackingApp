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
app.use('/api/engagements', require('./routes/engagementRoutes.js/index.js'));
app.use('/api/users', require('./routes/userRoutes.js/index.js'));
app.use('/api/departments', require('./routes/departmentRoutes.js/index.js'));
app.use('/api/job-titles', require('./routes/jobTitleRoutes.js/index.js'));
app.use('/api/supervisors', require('./routes/supervisorRoutes.js/index.js'));
app.use('/api/employees', require('./routes/employeeRoutes.js/index.js'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
