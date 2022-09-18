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
            console.log(data.command);
                // do that for real tho
        };
        if (data.command == 'Add Employee') {
            console.log(data.command);
                // do that for real tho
        };
        if (data.command == 'Update Employee Role') {
            console.log(data.command);
                // do that for real tho
        };
        if (data.command == 'View All Roles') {
            console.log(data.command);
                // do that for real tho
        };
        if (data.command == 'Add Role') {
            console.log(data.command);
                // do that for real tho
        };
        if (data.command =='View All Departments') {
            console.log(data.command);
                // do that for real tho
        };
        if (data.command == 'Add Department') {
            console.log(data.command);
                // do that for real tho
        };
        if (data.command =='Quit') {
            console.log(data.command);
            // do that for real tho
            connection.end();
        };
    });
};

// Helper Functions
