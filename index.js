const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");
// array to store objects
const team = [];

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
    message: "What's the team member's email?",
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
    // call promptMember() for member data
    promptMember();
  });
}
// function to get team member data
function promptMember() {
    // call inquirer again to get member data
  inquirer.prompt(memberQuestions).then(memberAnswers => {
    // if & only when user selects Finish then break & render
    if(memberAnswers.role === "Finish building the team") {
      const generatedHtml = render(team);
      writeToPath(outputPath, generatedHtml);
      return;
    }
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
    }
    // run adding member until user select Finish
    promptMember();
  });
}

// write file to path
async function writeToPath(path, file) {
  try {
    await fs.promises.writeFile(path, file);
    console.log(`File successfully written to ${path}!`);
  } catch (error) {
    // Handle error
    console.error(`Error writing file to ${path}: ${error}`);
  }
}

// call init to start
init();