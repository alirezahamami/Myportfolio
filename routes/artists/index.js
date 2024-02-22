const express = require('express');
const Joi = require('joi');
const Database = require('better-sqlite3');
const router = express.Router();
const db = Database(process.cwd() + '/database/chinook.sqlite');
router.use(express.json());

const artistSchema = Joi.object({  //validate the artist data that receive from Front 
    Name: Joi.string().max(25).required(), 
    ArtistId: Joi.number().integer().positive()
})
//-------------------------APIs------------------------------//

router.get('/', (req, res) => { //load artists by page load
    const statement = db.prepare('select * from artists') //get all data from employees table
    const data = statement.all(); //get me all the data in an array
    res.json(data)
})

router.get('/:artistId', (req, res) => {
    const statement = db.prepare('select Name from artists where ArtistId=?') 
    const data = statement.get(req.params.artistId); 
    res.json(data)
})

router.get('/:artistId/albums', (req, res) => {
    const statement = db.prepare("SELECT albums.Title,albums.AlbumId,albums.AlbumArt FROM albums JOIN artists ON albums.ArtistID = artists.ArtistID where albums.ArtistID= ?");
    const data = statement.all(req.params.artistId)
    res.json(data)
})

router.post('/', (req, res) => {
    const { error } = artistSchema.validate(req.body, {
        abortEarly: false //its used to send back all errors in validating data back to front
    });
    if (error) {
        return res.status(422).send(error.details) //we have one res.status , return and exit the function
    }
    const AddedArtistName = req.body.Name;
    const statement = db.prepare("INSERT INTO artists (Name) SELECT ? WHERE NOT EXISTS (SELECT 1 FROM artists WHERE Name = ?);");
    const result = statement.run(AddedArtistName, AddedArtistName);
    const lastRow = result.lastInsertRowid
    if(result.changes > 0){
        res.json({"lastInsertRowid": lastRow});
    } else {
        res.json({"lastInsertRowid": 0});
    }
})

router.patch('/:artistId', (req, res) => {
    const { error } = artistSchema.validate(req.body, {
        abortEarly: false //its used to send back all errors in validating data back to front
    });
    if (error) {
        return res.status(422).send(error.details) //we have one res.status , return and exit the function
    }
    const UpdatedName = req.body.Name
    //validation data here 
    const statement = db.prepare(`UPDATE artists set Name = '${UpdatedName}' where ArtistId=?`)
    const result = statement.run(req.params.artistId); //get me all the data in an array
    if (result.changes) {
        res.sendStatus(200)
    } else {
        res.sendStatus(404)
    }
})

router.delete('/:artistId', (req, res) => {
    const statement = db.prepare(`DELETE FROM artists where ArtistId=?`)
    const result = statement.run(req.params.artistId); //
    if (result.changes) {
        res.sendStatus(200)
    } else {
        res.sendStatus(404)
    }
})

module.exports = router;