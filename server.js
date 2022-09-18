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
    connection.query('SELECT * FROM employees', (err, results) => {
        if (err) {
            console.log(err);
        };
        console.log('Viewing All Employees: ');
        console.table(results);
        getCommand();
    });
};

function addEmployee() {

    getCommand();
};

function updateEmployeeRole() {

    getCommand();
};

function viewAllRoles() {
    connection.query('SELECT * FROM roles', (err, results) => {
        if (err) {
            console.log(err);
        };
        console.log('Viewing All Roles: ');
        console.table(results);
        getCommand();
    });
};

function addRole() {

    getCommand();
};

function viewAllDepartments() {
    connection.query('SELECT * FROM departments', (err, results) => {
        if (err) {
            console.log(err);
        };
        console.log('Viewing All Departments: ');
        console.table(results);
        getCommand();
    });
};

function addDepartment() {

    getCommand();
};

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

