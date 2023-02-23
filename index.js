const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

// questions to get manager data
const managerQuestions = [
  {
    type: 'input',
    name: 'name',
    message: "What is the manager's name?"
  },
  {
    type: 'input',
    name: 'id',
    message: "What is the manager's id?"
  },
  {
    type: 'input',
    name: 'email',
    message: "What is the manager's email?"
  },
  {
    type: 'input',
    name: 'officeNumber',
    message: "What is the manager's office number?"
  }
];
// questions to get team member data
const memberQuestions = [
  {
    type: 'list',
    name: 'role',
    message: 'Which type of team member would you like to add?',
    choices: ['Engineer', 'Intern', 'Finish building the team'],
  },
  {
    type: 'input',
    name: 'name',
    message: "What's the team member's name?",
    when: (answers) => answers.role !== 'Finish building the team'
  },
  {
    type: 'input',
    name: 'id',
    message: "What's the team member's id?",
    when: (answers) => answers.role !== 'Finish building the team'
  },
  {
    type: 'input',
    name: 'email',
    message: "What's the team member's name?",
    when: (answers) => answers.role !== 'Finish building the team'
  },
  {
    type: 'input',
    name: 'github',
    message: "What's the engineer's GitHub username?",
    when: (answers) => answers.role === 'Engineer'
  },
  {
    type: 'input',
    name: 'school',
    message: "What's the intern's school?",
    when: (answers) => answers.role === 'Intern'
  }
];

// function init
function init() {
  // array to store objects
  const team = [];
  // nested inquirer call
  // inquirer to get manager data
  inquirer.prompt(managerQuestions).then(managerAnswers => {
    // create manager object
    const manager = new Manager(
      managerAnswers.name,
      managerAnswers.id,
      managerAnswers.email,
      managerAnswers.officeNumber
    );
    // push object to array
    team.push(manager);

    // call inquirer again to get member data
    inquirer.prompt(memberQuestions).then(memberAnswers => {
      // create member objects
      // Engineer case
      if(memberAnswers.role === "Engineer") {
        // create engineer object
        const engineer = new Engineer(
          memberAnswers.name,
          memberAnswers.id,
          memberAnswers.email,
          memberAnswers.github
        );
        // push to team
        team.push(engineer);
      } else if (memberAnswers.role === "Intern") {
        // create intern object
        const intern = new Intern(
          memberAnswers.name,
          memberAnswers.id,
          memberAnswers.email,
          memberAnswers.school
        );
        // push to team
        team.push(intern);
      } else {
        return;
      }
      // generate html
      const generatedHtml = render(team);

      // write html to path
      writeToPath(outputPath, generatedHtml);
    })
  });
}


// write file to path
function writeToPath(path, file) {
  fs.writeFile(path, file, (error) => {
    if(error) throw error;
    console.log(`File successfully written to ${path}!`)
  })
}

// call init to start
init();