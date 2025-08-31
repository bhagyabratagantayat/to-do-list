const express = require("express");
const app = express();
require('dotenv').config()
const port = process.env.YOUR_PORT;


app.listen(port, (req, res) => {
    console.log(`listen port: ${port}`);
});