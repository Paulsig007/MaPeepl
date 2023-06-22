const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "mapeepl_db",
  },
  console.log(`Connected to the classlist_db database.`)
);

const initQuestion = [
  {
    type: "list",
    name: "mapeeplChoices",
    message: "What would you like to do?:",
    choices: [
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
      "Quit",
    ],
  },
];

const addEmployee = [
  {
    type: "input",
    name: "firstName",
    message: "What is the employee's first name? ",
  },
  {
    type: "input",
    name: "lastName",
    message: "What is the employee's last name? ",
  },
  {
    type: "list",
    name: "employeeRole",
    message: "What is the employee's role? ",
    choices: [
      "Sales Lead",
      "Salesperson",
      "Lead Engineer",
      "Software Engineer",
      "Account Manager",
      "Accountant",
      "Legal Team Lead",
      "Lawyer",
    ],
  },
  {
    type: "list",
    name: "employeeManager",
    message: "Who is the employee's manager? ",
    choices: [
      "Mike Lithgen",
      "Fteven Cane",
      "Dr. Kenneth Noisewater",
      "Sir Allen McNab",
      "Leroy Jenkins",
      "Crentist The Dentist",
      "Keyser Soze",
      "Rose Bud",
    ],
  },
];

const addRole = [
  {
    type: "input",
    name: "roleName",
    message: "What is the name of the role? ",
  },
  {
    type: "list",
    name: "roleSalary",
    message: "What is the salary of the role? ",
  },
  {
    type: "input",
    name: "roleDepartment",
    message: "What department does the role belong to? ",
    choices: ["Sales", "Engineering", "Finance", "Legal"],
  },
];

const addDepartment = [
  {
    type: "input",
    name: "departmentName",
    message: "What is the name of the department? ",
  },
];

async function init() {
  const answers = await inquirer.prompt(initQuestion);
  if (answers.choice === "View All Employees") {
    await viewEmpFunc();
  } else if (answers.choice === "Add Employee") {
    await addEmpFunc();
  } else if (answers.choice === "Update Employee Role") {
    await updateRoleFunc();
  } else if (answers.choice === "View All Roles") {
    await viewRoleFunc();
  } else if (answers.choice === "Add Role") {
    await addRoleFunc();
  } else if (answers.choice === "View All Departments") {
    await viewDeptFunc();
  } else if (answers.choice === "Add Department") {
    await addDeptFunc();
  } else {
    quit();
  }
}

async function viewEmpFunc() {}

async function addEmpFunc() {
  const answers = await inquirer.prompt(addEmployee);
  await init();
}

async function addRoleFunc() {
  const answers = await inquirer.prompt(addRole);
  await init();
}

async function addDeptFunc() {
  const answers = await inquirer.prompt(addDepartment);
  await init();
}
function quit() {
  console.log("Please Come Again!");
  return false;
}
init();
