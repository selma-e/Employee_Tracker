var mysql = require("mysql");
var inquirer = require("inquirer");
require("dotenv").config();

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: process.env.DB_PASSWORD,
  database: "employee_db",
});

connection.connect(function (err) {
  if (err) throw err;
  runSearch();
});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "View all roles",
        "View all departments",
        "Add employee",
        "Remove employee",
        "Update employee role",
        "Add department",
        "Remove department",
        "Add role",
        "Remove role",
        "Quit",
      ],
    })
    .then(function (answer) {
      console.log(answer);
      switch (answer.action) {
        case "View all employees":
          allEmployees();
          break;
        case "View all roles":
          allRoles();
          break;
        case "View all departments":
          allDepartments();
          break;
        case "Add employee":
          addEmployee();
          break;
        case "Remove employee":
          removeEmployee();
          break;
        case "Update employee role":
          updateEmployee();
          break;
        case "Add department":
          addDepartment();
          break;
        case "Remove department":
          removeDepartment();
          break;
        case "Add role":
          addRole();
          break;
        case "Remove role":
          removeRole();
          break;
        case "exit":
          connection.end();
          break;
      }
    });
}

// VIEW ALL FUNCTIONS
function allEmployees() {
  var query = `SELECT * FROM employee`;
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}

function allRoles() {
  var query = `SELECT * FROM role`;
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}

function allDepartments() {
  var query = `SELECT * FROM department`;
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runSearch();
  });
}

// ADD FUNCTIONS
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is their first name?",
        name: "employee_first_name",
      },
      {
        type: "input",
        message: "What is their last name?",
        name: "employee_last_name",
      },
      {
        type: "integer",
        message: "What is their role id?",
        name: "employee_id",
      },
      {
        type: "integer",
        message: "What is the manager's employee id?",
        name: "employee_manager_id",
      },
    ])
    .then(function (response) {
      console.log(response);
      var query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
      var values = [
        response.employee_first_name,
        response.employee_last_name,
        response.employee_id,
        response.employee_manager_id,
      ];
      connection.query(query, values, function (err, res) {
        if (err) throw err;
        runSearch();
      });
    });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department?",
        name: "department_name",
      },
    ])
    .then(function (response) {
      console.log(response);
      var query = `INSERT INTO department (name) VALUES (?)`;
      var values = response.department_name;
      connection.query(query, values, function (err, res) {
        if (err) throw err;
        runSearch();
      });
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the role title?",
        name: "role_title",
      },
      {
        type: "integer",
        message: "What is the role salary?",
        name: "role_salary",
      },
      {
        type: "integer",
        message: "What is the role's department id?",
        name: "role_department_id",
      },
    ])
    .then(function (response) {
      console.log(response);
      var query = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
      var values = [
        response.role_title,
        response.role_salary,
        response.role_department_id,
      ];
      connection.query(query, values, function (err, res) {
        if (err) throw err;
        runSearch();
      });
    });
}
