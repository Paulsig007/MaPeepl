DROP DATABASE IF EXISTS mapeepl_db;
CREATE DATABASE mapeepl_db;
USE mapeepl_db; 

CREATE TABLE Departments ( 
id int AUTO_INCREMENT PRIMARY KEY,
dep_name VARCHAR(30)
);

CREATE TABLE Roles (
id  int AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(30),
salary INT,
dep_id INT,
FOREIGN KEY (dep_id)
REFERENCES Departments(id)
);

CREATE TABLE Employees (
id int AUTO_INCREMENT PRIMARY KEY,
first_name VARCHAR(20),
last_name VARCHAR(20),
role_id INT,
manager_id INT,
FOREIGN KEY (role_id)
REFERENCES Roles(id),
FOREIGN KEY (manager_id)
REFERENCES Employees(id)
);