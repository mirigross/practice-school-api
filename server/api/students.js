const router = require("express").Router();
const { pool } = require("../db/index");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT * FROM students");
    console.log("Query results:", rows);
    res.json(rows);
  } catch (err) {
    console.error('error grabbing all classes',err);
    res.status(500).send("server error");
  }
});

router.get("/:student_id", async (req, res, next) => {
  try {
    const { student_id } = req.params;
    const singleStudent = await pool.query(
      `SELECT * FROM students WHERE student_id = ${student_id}`
    );
    res.json(singleStudent.rows);
  } catch (err) {
    console.error('error grabbing single student',err);
    res.status(500).send("server error");
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { fname, lname, email, birthdate } = req.body;
    const newStudent = await pool.query(
      `INSERT INTO students (fname, lname, email, birthdate) VALUES ($1, $2, $3, $4)
     RETURNING *`(fname, lname, email, birthdate)
    );
    console.log(newStudent);
    res.status(201).json(newStudent.rows[0]);
  } catch (err) {
    console.error("error creating a new student: ", err);
    res.status(500).send("server error");
  }
});

router.put("/:student_id", async (req, res, next) => {
  try {
    const { student_id } = req.params;
    const { fname, lname, email, birthdate } = req.body;
    const updatedStudent = await pool.query(
      "UPDATE students  SET fname=$2, lname=$3, email=$4, birthdate=$5,WHERE student id = $1"[
        (student_id, fname, lname, email, birthdate)
      ]
    );
    res.json(201, `student ${student_id} successfully updated`, updatedStudent.rows[0]
    );
  } catch (err) {
    console.error("error updating student data:", err);
    res.status(500).send("server error");
  }
});

router.delete("/:student_id", async (req, res, next) => {
  try {
    const { student_id } = req.params;
    await pool.query(`DELETE FROM students WHERE student_id = ${student_id}`);
    res.json(`student${student_id} successfully deleted`);
  } catch (err) {
    console.error("error deleting student: ", err);
    res.status(500).send("server error");
  }
});
