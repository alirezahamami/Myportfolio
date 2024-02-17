const express = require('express');
const app = express();

const PORT = process.env.PORT || 5001; // Set the port, default to 3000

app.use(express.static(__dirname)); 


app.listen('5001', () => console.log('we started listening 5001'))