CREATE DATABASE TelcoDB_vehicles;

USE TelcoDB_vehicles;

CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(100) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE users;

-- Vehicle table
CREATE TABLE vehicles(
    id INT(11) NOT NULL,
    plates VARCHAR(8) NOT NULL,
    brand VARCHAR(20) NOT NULL,
    color VARCHAR(11) NOT NULL,
    model_year INT(4) NOT NULL, 
    lat VARCHAR(7) NOT NULL,
    lon VARCHAR(7) NOT NULL,
    user_id INT(11),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)
);

ALTER TABLE vehicles
    ADD PRIMARY KEY (id);

ALTER TABLE vehicles
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 1;

DESCRIBE vehicles;