INSERT INTO departments (name)
VALUES  ("Accounting"),
        ("Sales");

INSERT INTO roles (title, salary, department_id)
VALUES  ("Accountant", 60000, 1),
        ("Salesperson", 45000, 2);
    
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ("Spongebob", "Squarepants", 1, 1),
        ("Patrick", "Star", 2, 1);

