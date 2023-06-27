const inquirer = require("inquirer");
const mysql = require("mysql2");
const util = require("util");

const db = mysql.createConnection(
  {
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "mapeepl_db",
  },
  console.log(`Connected to the classlist_db database.`)
);

const query = util.promisify(db.query).bind(db);

const initQuestion = [
  {
    type: "list",
    name: "choice",
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

const addEmployee = (roles, managers) => [
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
    choices: roles,
    // will need to be dynamic
  },
  {
    type: "list",
    name: "employeeManager",
    message: "Who is the employee's manager? ",
    choices: managers,
  },
];

const addRole = (depts) => [
  {
    type: "input",
    name: "roleName",
    message: "What is the name of the role? ",
  },
  {
    type: "input",
    name: "roleSalary",
    message: "What is the salary of the role? ",
  },
  {
    type: "list",
    name: "roleDepartment",
    message: "What department does the role belong to? ",
    choices: depts,
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

async function viewEmpFunc() {
  const response = await query("SELECT * FROM Employees");
  // select id
  console.table(response);
  await init();
}

async function addEmpFunc() {
  const roles = await query("SELECT id AS value, title AS name FROM Roles");
  const managers = await query(
    "SELECT id AS value, CONCAT(first_name, last_name) AS name FROM Employees"
  );
  const answers = await inquirer.prompt(addEmployee(roles, managers));
  console.log(answers.firstName);
  await query(
    "INSERT INTO Employees (first_name, last_name, role_id, manager_id) VALUES(?, ?, ?, ?)",
    [
      answers.firstName,
      answers.lastName,
      answers.employeeRole,
      answers.employeeManager,
    ]
  );
  await init();
}

async function updateRoleFunc() {
  const roles = await query("SELECT id AS value, title AS name FROM Roles");
  const managers = await query(
    "SELECT id AS value, CONCAT(first_name, last_name) AS name FROM Employees"
  );
  const answers = await inquirer.prompt(addEmployee(roles, managers));
  // await query(
  //   `INSERT INTO Employees (first_name, last_name, role_id, manager_id) VALUES(${answers.values})`
  // );
  console.log(answers.values);
  await init();
}

async function viewRoleFunc() {
  const response = await query("SELECT * FROM Roles");
  console.table(response);
  await init();
}

async function addRoleFunc() {
  const depts = await query(
    "SELECT id AS value, dep_name AS name FROM Departments"
  );
  const answers = await inquirer.prompt(addRole(depts));
  console.log(answers);
  await init();
}

async function viewDeptFunc() {
  const response = await query("SELECT * FROM Departments");
  console.table(response);
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
