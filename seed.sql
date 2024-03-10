
DROP TABLE IF EXISTS students, subjects, classes, class_students, class_subjects;
CREATE TABLE students (
  student_id SERIAL PRIMARY KEY,
  fname VARCHAR(255) NOT NULL,
  lname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  birthdate date
);
 CREATE TABLE classes (
     class_id SERIAL PRIMARY KEY,
     class_name VARCHAR(100) NOT NULL,
     professor VARCHAR(100) NOT NULL,
     room VARCHAR(5)
 );
CREATE TABLE subjects (
  subject_id SERIAL PRIMARY KEY,
  subject_name VARCHAR(100) NOT NULL
);
CREATE TABLE class_subjects (
    class_id INT,
    subject_id INT,
    PRIMARY KEY (class_id, subject_id),
    FOREIGN KEY (class_id) REFERENCES classes(class_id)
    -- FOREIGN KEY (subject_id) REFERENCES subjects(subject_id)
ON DELETE CASCADE
);
CREATE TABLE class_students (
    class_id INT,
    student_id INT,
    PRIMARY KEY (class_id, student_id),
    FOREIGN KEY (class_id) REFERENCES classes(class_id),
   
    FOREIGN KEY (student_id) REFERENCES students(student_id)
ON DELETE CASCADE 
 );

INSERT INTO students (fname, lname, email, birthdate) VALUES ('Marsha', 'Storm', 'storm@yahoo.com', '2004-06-28');
INSERT INTO students (fname, lname, email, birthdate) VALUES ('David', 'Levi', 'levi@yahoo.com', '2005-01-17');
INSERT INTO students (fname, lname, email, birthdate) VALUES ('Henry', 'Markanson', 'hmark@gmail.com', '2002-05-29');
INSERT INTO students (fname, lname, email, birthdate) VALUES ('Yves', 'Clinton', 'yve1@aol.com', '2003-08-03');
INSERT INTO students (fname, lname, email, birthdate) VALUES ('Laura', 'Twenston', 'lt0458@gmail.com', '2001-07-19');
INSERT INTO students (fname, lname, email, birthdate) VALUES ('Michelle', 'Lichenstein', 'michl@yahoo.com', '2002-11-04');
INSERT INTO students (fname, lname, email, birthdate) VALUES ('Alan', 'Mulaney', 'mulaneya@gmail.com', '2005-10-10');
INSERT INTO students (fname, lname, email, birthdate) VALUES ('Matthew', 'Diop', 'diopm@gmail.com', '2004-10-15');
INSERT INTO students (fname, lname, email, birthdate) VALUES ('Luke', 'Rain', 'lukey@yahoo.com', '2003-12-23');
INSERT INTO students (fname, lname, email, birthdate) VALUES ('John', 'Stamis', 'jstamis2@gmail.com', '2002-03-14');
INSERT INTO students (fname, lname, email, birthdate) VALUES ('Linda', 'Law', 'doublel@gmail.com', '2003-04-28');
INSERT INTO students (fname, lname, email, birthdate) VALUES ('Stephanie', 'Suares', 'stephie3@yahoo.com', '2003-02-14');
INSERT INTO students (fname, lname, email, birthdate) VALUES ('Andrea', 'Mentis', 'mentisa@aol.com', '2004-03-14');
INSERT INTO students (fname, lname, email, birthdate) VALUES ('Steven', 'Hulgrove', 'shsh4@aol.com', '2004-08-15');
INSERT INTO students (fname, lname, email, birthdate) VALUES ('Joe', 'Schum', 'joes@gmail.com', '2004-08-15');
INSERT INTO classes (class_name, professor, room) VALUES ('Algebra 1', 'Joe Schum', '402b');
INSERT INTO classes (class_name, professor, room) VALUES ('College Algebra', 'Joe Schum', '306');
INSERT INTO classes (class_name, professor, room) VALUES ('Calculus 1', 'Roger Smith', '402b');
INSERT INTO classes (class_name, professor, room) VALUES ('Calculus II', 'Bobbert Tillman', '210');
INSERT INTO classes (class_name, professor, room) VALUES ('Psychology of the Mind', 'Dana Smith', '104');
INSERT INTO classes (class_name, professor, room) VALUES ('Truth and Peace', 'Dana Smith', '105a');
INSERT INTO classes (class_name, professor, room) VALUES ('Psychology of the Heart', 'Dana Smith', '104');
INSERT INTO classes (class_name, professor, room) VALUES ('Literature Level 1', 'Alana Moonberry', '304');
INSERT INTO classes (class_name, professor, room) VALUES ('Literature 2', 'Alethia Rinas', '302');
INSERT INTO classes (class_name, professor, room) VALUES ('Literature 3', 'Alana Moonberry', '302');
INSERT INTO classes (class_name, professor, room) VALUES ('English Language: The Specifics', 'Youlin Mu', '302');
INSERT INTO classes (class_name, professor, room) VALUES ('Biology', 'Edward Yang', '206');
INSERT INTO subjects (subject_name) VALUES ('Mathematics'), ('Science'), ('Technology'), ('History'), ('Psychology'), ('Literature'), ('Electives');
INSERT INTO class_subjects (class_id, subject_id) VALUES (1, 1), (1,2), (1, 3), (1, 4), (2, 12), (5, 5), (5, 6), (5, 7), (6, 8), (6, 9), (6, 10), (6, 11);
INSERT INTO class_students (class_id, student_id) VALUES
   (1, 1), (2, 2), (2, 4), (2, 9), (4, 6), (5, 3), (5, 10), (6, 11);


