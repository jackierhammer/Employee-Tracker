// Import Statements
const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

// Imports enviromental variables
require('dotenv').config();

// Creates connection using environmental variables
const connection = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) {
        console.log("Something didn't work, bro");
    } else {
        getCommand();
    }
});

// Helper Functions

function viewAllEmployees() {
    connection.query('SELECT * FROM employees', (err, res) => {
        if (err) {
            console.log(err);
        };
        console.log('Viewing All Employees: ');
        console.table(res);
        getCommand();
    });
};

function addEmployee() {
    connection.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err;

        const roleChoices = [];
        for (let i = 0; i < res.length; i++) {
            roleChoices.push(res[i].title);;
        };

        const managerChoices = [];
        connection.query('SELECT * FROM employees', (err, res) => {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                managerChoices.push(res[i].last_name);;
            };
        });

        inquirer.prompt([
            {
            type: 'input', 
            name: 'first',
            message: "What is the first name of the employee you want to add?",
            },
            {
            type: 'input', 
            name: 'last',
            message: "What is the last name of the employee you want to add?",
            },
            {
            type: 'list', 
            name: 'role',
            message: "What is this employee's role?",
            choices: roleChoices 
            },
            {
              type: 'list', 
              name: 'manager',
              message: "Who is this employee's manager?",
              choices: managerChoices 
            }
        ])
        .then((data) => {
            let findRole;
            for (let i = 0; i < res.length; i++) {
                if (res[i].title == data.role) {
                    findRole = res[i].id;
                };
            };
            connection.query(`INSERT INTO employees (first_name, last_name, role_id, manager_name)
            VALUES (?, ?, ?, ?)`, [data.first, data.last, findRole, data.manager], (err, res) => {
                if (err) throw err;
                getCommand();
            });
        });
    });
};

function updateEmployeeRole() {
    connection.query('SELECT * FROM roles', (err, res) => {
        if (err) throw err;

        const roleOptions = [];
        for (let i = 0; i < res.length; i++) {
            roleOptions.push(res[i].title);;
        };

        const employeeOptions = [];
        connection.query('SELECT * FROM employees', (err, res) => {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                employeeOptions.push(res[i].last_name);;
            };
        });

        inquirer.prompt([
            {
            type: 'list', 
            name: 'role',
            message: "What is the employee's new role?",
            choices: roleOptions 
            },
            {
              type: 'list', 
              name: 'employee',
              message: "What is the last name of the employee whose role you want to update?",
              choices: employeeOptions
            }
        ])
        .then((data) => {
            let findRole;
            for (let i = 0; i < res.length; i++) {
                if (res[i].title == data.role) {
                    findRole = res[i].id;
                };
            };
            connection.query(`UPDATE employees SET role_id = ? WHERE last_name = ?`, [findRole, data.employee], (err, res) => {
                if (err) throw err;
                getCommand();
            });
        });
    });
};

function viewAllRoles() {
    connection.query('SELECT * FROM roles', (err, res) => {
        if (err) {
            console.log(err);
        };
        console.log('Viewing All Roles: ');
        console.table(res);
        getCommand();
    });
};

function addRole() {
    connection.query('SELECT * FROM departments', (err, res) => {
        if (err) throw err;

        const deptChoices = [];
        for (let i = 0; i < res.length; i++) {
            deptChoices.push(res[i].name);;
        };

        inquirer.prompt([
            {
            type: 'input', 
            name: 'role',
            message: "What is the name of the role you want to add?",
            },
            {
            type: 'input', 
            name: 'salary',
            message: "What is the salary of this role?",
            },
            {
            type: 'list', 
            name: 'department',
            message: "Which department does this role belong to?",
            choices: deptChoices 
            }
        ])
        .then((data) => {
            let findDepartment;
            for (let i = 0; i < res.length; i++) {
                if (res[i].name == data.department) {
                    findDepartment = res[i].id;
                };
            };
            connection.query(`INSERT INTO roles (title, salary, department_id)
            VALUES (?, ?, ?)`, [data.role, data.salary, findDepartment], (err, res) => {
            if (err) throw err;
            getCommand();
            });
        });
    });
};

function viewAllDepartments() {
    connection.query('SELECT * FROM departments', (err, res) => {
        if (err) {
            console.log(err);
        };
        console.log('Viewing All Departments: ');
        console.table(res);
        getCommand();
    });
};

function addDepartment() {
    inquirer.prompt([
        {
          type: 'input', 
          name: 'department',
          message: "What is the name of the department you want to add?",
        }
      ])
    .then((data) => {
        connection.query(`INSERT INTO departments (name)
        VALUES (?)`, data.department, (err, res) => {
        if (err) throw err;
        getCommand();
        });
    });
};

// End Helper Functions

// This variable holds the command prompt for use in getCommand function
const commandArray = [
    {
        type: 'list',
        name: 'command',
        message: 'What do you want to do?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
    },
];

// Asks the user what they want to do now and calls the helper function that will do it
function getCommand() {
    inquirer.prompt(commandArray)
    .then((data) => {
        if (data.command == 'View All Employees') {
            viewAllEmployees();
        };
        if (data.command == 'Add Employee') {
            addEmployee();
        };
        if (data.command == 'Update Employee Role') {
            updateEmployeeRole();
        };
        if (data.command == 'View All Roles') {
            viewAllRoles();
        };
        if (data.command == 'Add Role') {
            addRole();
        };
        if (data.command =='View All Departments') {
            viewAllDepartments();
        };
        if (data.command == 'Add Department') {
            addDepartment();
        };
        if (data.command =='Quit') {
            console.log("Goodbye");
            connection.end();
        };
    });
};