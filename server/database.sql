CREATE TABLE specialist(
    id SERIAL PRIMARY KEY,
    fio VARCHAR(255),
    abilities VARCHAR(255),
    time_start VARCHAR(255),
    time_finish VARCHAR(255)
)

CREATE TABLE sobes(
    id SERIAL PRIMARY KEY,
    fio VARCHAR(255),
    time_visit VARCHAR(255),
    abilities VARCHAR(255),
    specialist_id INTEGER,
    FOREIGN KEY (specialist_id) REFERENCES specialist(id)
)