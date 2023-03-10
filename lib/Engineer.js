// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee');

class Engineer extends Employee {
  constructor(name, id, email, github) {
    // call parent
    super(name, id, email);
    // additional property
    this.github = github;
  }
  // get github
  getGithub() {
    return this.github;
  }
  // override parent
  getRole() {
    return "Engineer";
  }
}

module.exports = Engineer;