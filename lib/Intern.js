// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require('./Employee');

class Intern extends Employee {
  constructor(name, id, email, school) {
    // call parent
    super(name, id, email);
    // additional property
    this.school = school;
  }
  // get school
  getSchool() {
    return this.school;
  }
  // override parent
  getRole() {
    return "Intern";
  }
}

module.exports = Intern;