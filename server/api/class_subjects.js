const router = require("express").Router();
const { pool } = require("../db/index");
module.exports = router;


router.get("/", async (req, res, next) => {
    try {
      const { rows } = await pool.query("SELECT * FROM class_subjects");
      console.log("Query results:", rows);
      res.json(rows);
    } catch (err) {
      console.error(err);
      res.status(500).send("server error");
    }
  });
  
  router.get("/:class_subjects_id", async (req, res, next) => {
    try {
      const { class_id, subject_id} = req.params;
      const singleClass_subjects = await pool.query(
        `SELECT * FROM class_subjects WHERE class_id, subject_id   = ${class_id, subject_id }`
      );
      res.json(classSubjects.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send("server error with single class");
    }
  });
  

  
router.post("/", async (req, res, next) => {
    try {
      const { class_id, subject_id } = req.body;
      const classSubject = await pool.query(
        `INSERT INTO class_subjects (class_id, subject_id) VALUES ($1,
  $2) RETURNING *`,
        [class_id, subject_id]
      );
      console.log(classSubject);
      res.status(201).json(classSubject.rows[0]);
    } catch (err) {
      console.error("Error associating class with subject", err);
      res.status(500).send("Server Error");
    }
  });