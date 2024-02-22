const express = require('express');
const app = express();

const PORT = process.env.PORT || 5001; // Set the port, default to 3000

app.use(express.static(__dirname)); 
app.use(express.static(__dirname+'/github')); 
app.use(express.static(__dirname+'/colorfull')); 
app.use(express.static(__dirname +'/_FrontendStarterFiles')); 

const albumsRouter = require('./routes/albums') // if you dont specify the file name , it will look for index.js
const artistsRouter = require('./routes/artists') 
const tracksRouter = require('./routes/tracks') 
const themeRouter = require('./routes/themes') 
const mediatype = require('./routes/Media')
app.use('/api/albums',albumsRouter) //when incoming begining path starts with /api/employees use the employee routers
app.use('/api/artists',artistsRouter) 
app.use('/api/tracks',tracksRouter) //when incoming begining path starts with /api/employees use the employee routers
app.use('/api/themes',themeRouter)
app.use('/api/mediatypes',mediatype)


app.listen('5001', () => console.log('we started listening 5001'))
