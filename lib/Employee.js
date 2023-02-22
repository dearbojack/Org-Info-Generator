// TODO: Write code to define and export the Employee class
class Employee {
  // constructor func
  constructor(name, id, email) {
    this.name = name;
    this.id = id;
    this.email = email;
  }
  // get name
  getName() {
    return this.name;
  }
  // get id
  getId() {
    return this.id;
  }
  // get email
  getEmail() {
    return this.email;
  }
  // get role
  getRole() {
    return "Employee";
  }
}