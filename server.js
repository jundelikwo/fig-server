const express = require('express');
const cors = require('cors');
require('dotenv').config();

const {
    client
} = require("./db/client.js");

const port = process.env.PORT;

const app = new express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    res.status(500).send({
        success: false,
        msg: 'Route not found',
    });
});

app.use((err, req, res, next) => {
    res.status(500).send({
        success: false,
        msg: 'Something went wrong',
    });
});

console.log(`Server running on ${port}`);

app.listen(port);

