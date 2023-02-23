// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require('./Employee');

class Manager extends Employee {
  constructor(name, id, email, officeNumber) {
    // call parent
    super(name, id, email);
    // additional property
    this.officeNumber = officeNumber;
  }

  // override parent
  getRole() {
    return "Manager";
  }
  // get office 
  getOfficeNumber() {
    return this.officeNumber;
  }
}

module.exports = Manager;