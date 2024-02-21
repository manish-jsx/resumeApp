// app.js

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

const path = require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));


// Load the index.html file for resume template
const resumeTemplate = fs.readFileSync(path.join(__dirname, 'templates', 'index.html'), 'utf8');

// Load the admin.html file for admin panel
const adminTemplate = fs.readFileSync(path.join(__dirname, 'templates', 'admin.html'), 'utf8');

// Load the dynamic.html for testing

const dynamicTemplate = fs.readFileSync(path.join(__dirname,'templates','dynamic.html'),'utf8');

// Route to render the resume editor
app.get('/edit', (req, res) => {
    // Render the admin panel for editing resume
    res.send(adminTemplate);
});

// Route to render the resume template
app.get('/', (req, res) => {
    // Render the resume template
    res.send(resumeTemplate);
});

// Route to render the dynamic resume editor
app.get('/dynamic', (req, res) => {
    // Render the admin panel for editing resume
    res.send(dynamicTemplate);
});




// Route to handle form submission and update personal info
app.post('/edit/personal-info', (req, res) => {
    const newData = req.body;
    let updatedTemplate = resumeTemplate;

    // Update personal info fields
    updatedTemplate = updatedTemplate.replace('Manish Kumar', newData.name);
    updatedTemplate = updatedTemplate.replace('+917004456733', newData.phone);
    updatedTemplate = updatedTemplate.replace('manish.jsx@gmail.com', newData.email);
    updatedTemplate = updatedTemplate.replace('linkedin.com/manish-code', newData.linkedin);
    updatedTemplate = updatedTemplate.replace('github.com/manish-jsx', newData.github);

    // Write the updated template to a new HTML file
    fs.writeFileSync('updated_resume.html', updatedTemplate);

    res.send('Personal info updated successfully!');
});


// Similarly, add routes for updating other sections of the resume (Objective, Experience, Skills, Projects, Education)
// Route to handle form submission and update objective section
app.post('/edit/objective', (req, res) => {
    const newData = req.body;
    let updatedTemplate = resumeTemplate;

    // Update objective section
    updatedTemplate = updatedTemplate.replace(/<p class="text-justify">[\s\S]*?<\/p>/, `<p class="text-justify">${newData.objective}</p>`);

    // Write the updated template to a new HTML file
    fs.writeFileSync('updated_resume.html', updatedTemplate);

    res.send('Objective section updated successfully!');
});

// Route to handle form submission and update experience section
app.post('/edit/experience', (req, res) => {
    const newData = req.body;
    let updatedTemplate = resumeTemplate;

    // Update experience section
    const experienceStartIndex = updatedTemplate.indexOf('<!-- Experience -->');
    const experienceEndIndex = updatedTemplate.indexOf('<!-- Skills -->');
    const experienceSection = updatedTemplate.substring(experienceStartIndex, experienceEndIndex);

    const updatedExperienceSection = experienceSection.replace(/<h3 class="text-lg font-semibold">[\s\S]*?<\/ul>/, `<h3 class="text-lg font-semibold">${newData.jobTitle}</h3><p class="text-sm italic">${newData.company} (${newData.startDate} – ${newData.endDate})</p><ul class="list-disc list-inside ml-4"><li>${newData.responsibility1}</li><li>${newData.responsibility2}</li><li>${newData.responsibility3}</li><li>${newData.responsibility4}</li></ul>`);

    updatedTemplate = updatedTemplate.replace(experienceSection, updatedExperienceSection);

    // Write the updated template to a new HTML file
    fs.writeFileSync('updated_resume.html', updatedTemplate);

    res.send('Experience section updated successfully!');
});

// Route to handle form submission and update skills section
app.post('/edit/skills', (req, res) => {
    const newData = req.body;
    let updatedTemplate = resumeTemplate;

    // Update skills section
    const skillsStartIndex = updatedTemplate.indexOf('<!-- Skills -->');
    const skillsEndIndex = updatedTemplate.indexOf('<!-- Projects -->');
    const skillsSection = updatedTemplate.substring(skillsStartIndex, skillsEndIndex);

    const updatedSkillsSection = skillsSection.replace(/<div class="flex flex-wrap">[\s\S]*?<\/div>/, `<div class="flex flex-wrap"><div class="w-full sm:w-1/2 md:w-1/3"><p class="mb-2"><strong>Languages:</strong> ${newData.languages}</p><p class="mb-2"><strong>Frameworks:</strong> ${newData.frameworks}</p></div><div class="w-full sm:w-1/2 md:w-1/3"><p class="mb-2"><strong>Databases:</strong> ${newData.databases}</p><p class="mb-2"><strong>Tools & Technologies:</strong> ${newData.tools}</p></div><div class="w-full sm:w-1/2 md:w-1/3"><p class="mb-2"><strong>Concepts:</strong> ${newData.concepts}</p></div></div>`);

    updatedTemplate = updatedTemplate.replace(skillsSection, updatedSkillsSection);

    // Write the updated template to a new HTML file
    fs.writeFileSync('updated_resume.html', updatedTemplate);

    res.send('Skills section updated successfully!');
});

// Similarly, add routes for updating other sections: Projects and Education

// Route to handle form submission and update projects section
app.post('/edit/projects', (req, res) => {
    const newData = req.body;
    let updatedTemplate = resumeTemplate;

    // Update projects section
    updatedTemplate = updatedTemplate.replace(/<h3 class="text-lg font-semibold">[\s\S]*?<\/ul>\s*<\/div>/, `<h3 class="text-lg font-semibold">${newData.projectTitle}</h3>\n<p class="text-sm italic">${newData.projectTech}</p>\n<ul class="list-disc list-inside ml-4">\n<li>${newData.projectDescription}</li>\n</ul>\n`);

    // Write the updated template to a new HTML file
    fs.writeFileSync('updated_resume.html', updatedTemplate);

    res.send('Projects section updated successfully!');
});

// Route to handle form submission and update education section
app.post('/edit/education', (req, res) => {
    const newData = req.body;
    let updatedTemplate = resumeTemplate;

    // Update education section
    updatedTemplate = updatedTemplate.replace(/<p class="text-sm italic">Bachelor’s degree in Computer Science and Engineering, Siksha ’O’ Anusandhan University \(May 2022\)<\/p>[\s\S]*?<\/ul>/, `<p class="text-sm italic">${newData.degree}</p>\n<ul class="list-disc list-inside ml-4">\n<li>GPA: ${newData.gpa}</li>\n<li>Relevant Coursework: ${newData.coursework}</li>\n</ul>\n`);

    // Write the updated template to a new HTML file
    fs.writeFileSync('updated_resume.html', updatedTemplate);

    res.send('Education section updated successfully!');
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
