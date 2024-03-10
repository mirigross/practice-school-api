const router = require("express").Router();
const { pool } = require("../db/index");
module.exports = router;

router.get("/", async (req, res, next) => {
    try {
      const { rows } = await pool.query("SELECT * FROM class_students");
      console.log("Query results:", rows);
      res.json(rows);
    } catch (err) {
      console.error("trouble with class_student",err);
      res.status(500).send("server error");
    }
  });

  router.get("/:class_id", async (req, res, next) => {
    try {
      const { class_id } = req.params;
      const classStudent = await pool.query(
        `SELECT * FROM class_students WHERE class_id = ${class_id}`
      );
      res.json(classStudent.rows);
    } catch (err) {
      console.error('error with student',err);
      res.status(500).send("server error");
    }
  });

router.post("/", async (req, res, next) => {
  try {
    const { class_id, student_id } = req.body;
    const studentClass = await pool.query(
      `INSERT INTO class_students (class_id, student_id) VALUES ($1, $2)`,
      [class_id, student_id]
    );
    console.log(studentClass);
    res.status(201).json(studentClass.rows[0]);
  } catch (err) {
    console.error("Error placing student in class: ", err);
    res.status(500).send("Server Error");
  }
});

router.delete("/:student_id", async (req, res, next) => {
  try {
    const { student_id } = req.params;
    await pool.query(
      `DELETE FROM class_students WHERE student_id = ${student_id}`
    );
    res.json(`Student ${student_id} removed from class`);
  } catch (err) {
    console.error("Error removing student from class: ", err);
    res.status(500).send("Server Error");
  }
});