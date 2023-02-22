// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
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
}