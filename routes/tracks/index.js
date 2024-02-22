const express = require('express');
const Database = require('better-sqlite3');
const router = express.Router();
const Joi = require('joi');
const db = Database(process.cwd() + '/database/chinook.sqlite');
router.use(express.json());

const trackSchema = Joi.object({  //validate the track data that receive from Front 
    Name: Joi.string().max(25).required(), 
    AlbumId: Joi.number().integer().positive().required(),
    MediaTypeId : Joi.number().integer().max(5).min(1).required(),
    Milliseconds: Joi.number().integer().positive().required()
})

router.get('/:trackid', (req,res)=>{ //send Name , miliseconds for editing 
    const statement = db.prepare("SELECT Name, Milliseconds from tracks where TrackId = ? ");
    const result = statement.get(req.params.trackid) 
    res.send(result)
})


router.post('/', (req,res)=>{  //creating new track
    const { error } = trackSchema.validate(req.body, {
        abortEarly: false //its used to send back all errors in validating data back to front
    });
    if (error) {
        return res.status(422).send(error.details) //we have one res.status , return and exit the function
    }
    const Name = req.body.Name; 
    const mil = req.body.Milliseconds; 
    const Albumid = req.body.AlbumId; 
    const MediaType = req.body.MediaTypeId;
    const statement = db.prepare("INSERT INTO tracks (Name,AlbumId,MediaTypeId,Milliseconds) values (?,?,?,?);");
    const result = statement.run(Name,Albumid,MediaType,mil);
    if(result.changes > 0){
        res.json({"lastInsertRowid":result.lastInsertRowid});
    }
})

router.patch ('/:trackId', (req,res)=>{ //update track detail in edit.html
    const { error } = trackSchema.validate(req.body, {
        abortEarly: false //its used to send back all errors in validating data back to front
    });
    if (error) {
        return res.status(422).send(error.details) //we have one res.status , return and exit the function
    }

    const Name = req.body.Name; 
    const mil = req.body.Milliseconds; 
    const Albumid = req.body.AlbumId; 
    const MediaType = req.body.MediaTypeId; 
    const statement = db.prepare(`UPDATE tracks set Name = '${Name}', Milliseconds = ${mil}, MediaTypeId =${MediaType} where TrackId=?`)
    const result = statement.run(req.params.trackId); //get me all the data in an array
    if (result.changes) {
        res.sendStatus(200)
    } else {
        res.sendStatus(404)
    }
})

router.delete('/:trackId', (req,res)=>{ //delete track from tracklist
    const statement = db.prepare(`DELETE FROM tracks where TrackId=?`)
    const result = statement.run(req.params.trackId); 
    if (result.changes) {
        res.sendStatus(200)
    } else {
        res.sendStatus(404)
    }
})

module.exports = router;