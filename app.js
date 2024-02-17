const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000; // Set the port, default to 3000

app.use(express.static(__dirname)); 


app.listen('3000', () => console.log('we started listening 3000'))