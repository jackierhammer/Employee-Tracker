const inquirer = require('inquirer');
// const mysql = require('mysql2');
// const cTable = require('console.table');

const commandArray = [
    {
        type: 'list',
        name: 'command',
        message: 'What do you want to do?',
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
    },
];

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
        };
    });
};

getCommand();