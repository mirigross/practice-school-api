const router = require('express').Router();
const {pool} = require ('../db/index')
module.exports = router;

router.get('/', async(req, res, next) => {
    try{
        const {rows} = await pool.query('SELECT * FROM students');
        console.log('Query results:', rows);
        res.json(rows);
     } catch (err){
        console.error(err);
        res.status(500).send('server error');
    }
});

router.get('/:id', async (req, res, next) => {
    try{
        const {id} = req.params;
        const singleStudent = await pool.query(`SELECT * FROM students WHERE id = ${id}`);
        res.json(singleStudent.rows);
    }catch (err) {
        console.error(err);
        res.status(500).send('server error with single student')
    }
});

router.post('/', async (req, res, next) => {
    try {
       const { name, age, grade } = req.params;
 const result = await pool.query(`INSERT INTO students WHERE id = ${id}`)

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error creating a new student');
    }
});


router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        

        const result = await pool.query(`UPDATE FROM students WHERE id = ${id}`);
         res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error updating student');
    }
});


router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;

         await pool.query(`DELETE FROM students WHERE id = ${id}`, [id]);

        res.json({ message: 'Student deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error deleting student');
    }
});
