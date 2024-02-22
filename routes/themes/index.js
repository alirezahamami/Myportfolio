const express = require('express') ;
const Database = require('better-sqlite3');
const router = express.Router() ; 
const db = Database(process.cwd() + '/database/chinook.sqlite');

router.get('/', (req,res) =>{
    const statement = db.prepare('select * from themes') //get all data from employees table
    const data = statement.all(); //get me all the data in an array
    res.json(data)
})

module.exports = router;