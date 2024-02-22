const express = require('express') ;
const router = express.Router() ;  
const Database = require('better-sqlite3');
const db = Database(process.cwd() + '/database/chinook.sqlite');
router.use(express.json());
const multer = require('multer');
const Joi = require('joi');
const path = require('path');


const albumSchema = Joi.object({  //validate the album data that receive from Front 
    Title: Joi.string().max(50).required(), 
    ReleaseYear : Joi.number().max(new Date().getFullYear()).min(1900).required(), 
    ArtistId: Joi.number().integer().positive()
})

router.get('/:albumId/tracks',(req,res)=>{ //load the track data in first load after selection album
    const statement = db.prepare("SELECT  tracks.Name,tracks.Milliseconds,tracks.TrackId from tracks Join albums on albums.AlbumId = tracks.AlbumId where tracks.AlbumId =?");
    const data = statement.all(req.params.albumId) 
    res.json(data)
})

router.get('/:albumId/',(req,res)=>{  //edit.html in albums to get the data first
    const statement = db.prepare("SELECT Title, ReleaseYear from albums where albumId = ? ");
    const result = statement.get(req.params.albumId) 
    res.send(result)
}) 

router.post('/',(req,res)=> {   //creatig new album
    const { error } = albumSchema.validate(req.body, {
        abortEarly: false //its used to send back all errors in validating data back to front
    });
    if (error) {
        return res.status(422).send(error.details) //we have one res.status , return and exit the function
    }
    const UpdatedTitle = req.body.Title; 
    const UpdatedReleaseYear = req.body.ReleaseYear; 
    const ArtistId = req.body.ArtistId; 
    const statement = db.prepare("INSERT INTO albums (Title,ReleaseYear,ArtistId) values (?,?,?);");
    const result = statement.run(UpdatedTitle, UpdatedReleaseYear,ArtistId);
    if(result.changes > 0){
        res.status(201).json({"lastInsertRowid":result.lastInsertRowid});
    }
})

router.patch('/:albumId', (req,res)=>{ //update existing album name and release year
    const { error } = albumSchema.validate(req.body, {
        abortEarly: false //its used to send back all errors in validating data back to front
    });
    if (error) {
        return res.status(422).send(error.details) //we have one res.status , return and exit the function
    }
    const UpdatedTitle = req.body.Title; 
    const UpdatedReleaseYear = req.body.ReleaseYear;  

    const statement = db.prepare(`UPDATE albums set Title = '${UpdatedTitle}', ReleaseYear = ${UpdatedReleaseYear} where AlbumId=?`)
    const result = statement.run(req.params.albumId); //get me all the data in an array
    if (result.changes) {
        res.sendStatus(200)
    } else {
        res.sendStatus(404)
    }
}) 

router.delete('/:albumId', (req,res)=>{ //delete existing albums
    const statement = db.prepare(`DELETE FROM albums where AlbumId=?`)
    const result = statement.run(req.params.albumId); 
    if (result.changes) {
        res.sendStatus(200)
    } else {
        res.sendStatus(404)
    }
})

const storage = multer.diskStorage( { //handling the file post with multer/ configuration of multer
    destination:'./_FrontendStarterFiles/albumart',
    filename : function (req,file, callback){
        const modifiedFilename = Date.now().toString() + path.extname(file.originalname);
        callback(null,modifiedFilename) //you can use only file.originalname to transfer original file name to server
    }
})

const upload = multer({storage}) 

router.post('/:albumId/albumart',upload.single('albumart'), (req,res) =>{ //uploading picture file for album art
    const statement = db.prepare("UPDATE albums SET AlbumArt = ? WHERE AlbumId = ?;");
    const result = statement.run([req.file.filename,req.params.albumId]) //req.file.filename is equivalent to modifiedFilename in multer
    res.send(result)
} )

module.exports = router;