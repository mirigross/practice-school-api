const pg = require('pg')
const fs = require('fs')
require('dotenv').config()

const pool = new pg.Pool({
    user: process.env.PG_USERNAME,
    host: 'localhost',
    database: 'practiceschool',
    password: process.env.PG_PASSWORD,
    port: 5432
})

const sql = fs.readFileSync('seed.sql').toString();
async function seed (){
    try{
        await pool.connect()
        await pool.query(sql)
        console.log('seeding completed successfully')
    } catch(err){
        console.error(err)
    }finally{

    }
}

seed();
module.exports = {pool};