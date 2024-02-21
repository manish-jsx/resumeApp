const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Mock resume data
let resumeData = {
  name: 'Manish Kumar',
  phoneNumber: '+917004456733',
  email: 'manish.jsx@gmail.com',
  linkedin: 'linkedin.com/manish-code',
  github: 'https://github.com/manish-jsx',
  objective: 'Detail-oriented and motivated professional seeking a challenging role as a React Developer...',
  // Other resume fields...
};

// Route to serve admin panel
app.get('/admin', (req, res) => {
  res.sendFile(__dirname + '/admin.html');
});

// Route to handle form submission and update resume
app.post('/admin/update-resume', (req, res) => {
  // Update resume data with form inputs
  resumeData.name = req.body.name;
  resumeData.phoneNumber = req.body.phoneNumber;
  resumeData.email = req.body.email;
  resumeData.linkedin = req.body.linkedin;
  resumeData.github = req.body.github;
  resumeData.objective = req.body.objective;
  // Update other resume fields...

  res.redirect('/admin'); // Redirect back to admin panel
});

// Route to serve updated resume
app.get('/resume', (req, res) => {
  res.json(resumeData);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
