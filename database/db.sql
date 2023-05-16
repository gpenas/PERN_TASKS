CREATE DATABASE tasksdb;

CREATE TABLE task(
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion VARCHAR(300)
);