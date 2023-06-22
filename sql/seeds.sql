INSERT INTO Departments (dep_name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");
       
INSERT INTO Roles (title, salary, dep_id)
VALUES ("Sales Lead", 100000, 1),
       ("Salesperson", 80000, 1),
       ("Lead Engineer", 150000, 2),
       ("Software Engineer", 120000, 2),
       ("Account Manager", 160000, 3),
       ("Accountant", 125000, 3),
       ("Legal Team Lead", 250000, 4),
       ("Lawyer", 190000, 4);

INSERT INTO Employees (first_name, last_name, role_id, manager_id)
VALUES ("Mike", "Lithgen", 1, null),
       ("Fteven", "Cane", 2, 1),
       ("Dr. Kenneth", "Noisewater", 3, null),
       ("Sir Allen", "McNab", 4, 3),
       ("Leroy", "Jenkins", 5, null),
       ("Crentist", "The Dentist", 6, 5),
       ("Keyser", "Soze", 7, null),
       ("Rose", "Bud", 8, 7);    