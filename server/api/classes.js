const router = require("express").Router();
const { pool } = require("../db/index");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const { rows } = await pool.query("SELECT * FROM classes");
    console.log("Query results:", rows);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error");
  }
});

router.get("/:class_id", async (req, res, next) => {
  try {
    const { class_id } = req.params;
    const singleClass = await pool.query(
      `SELECT * FROM classes WHERE class_id = ${class_id}`
    );
    res.json(singleClass.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("server error with single class");
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { class_name, professor, room } = req.body;
    const newClass = await pool.query(
      "INSERT INTO classes (class_name, professor, room) VALUES($1, $2, $3) RETURNING *",
      [class_name, professor, room]
    );
    console.log(newClass);
    res.status(201).json(newClass.rows[0]);
  } catch (err) {
    console.error("error creating a new class: ", err);
    res.status(500).send("server error");
  }
});


router.put("/:class_id", async (req, res, next) => {
  try {
    const { class_id } = req.params;
    const { class_name, professor, room } = req.body;
    const updatedClass = await pool.query(
      `UPDATE classes SET class_name = $2, professor = $3, room = $4 WHERE class_id = $1`,
      [class_id, class_name, professor, room]
    );
    res.status(201).json({
      mesage: `Class ${class_id} successfully updated`,
      data: updatedClass.rows[0],
    });
  } catch (err) {
    console.error("Error updating class: ", err);
    res.status(500).send("Server Error");
  }
});


router.delete("/:class_id", async (req, res, next) => {
  try {
    const { class_id } = req.params;
    await pool.query(`DELETE FROM classes WHERE class_id = ${class_id}`);
    res.json(`class${class_id} successfully deleted`);
  } catch (err) {
    console.error("error deleting class: ", err);
    res.status(500).send("server error");
  }
});
