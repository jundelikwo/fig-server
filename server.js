const express = require('express');
const cors = require('cors');
require('dotenv').config();

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const Event = require('./models/event.js');

(async function() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to Database');
    } catch (error) {
        console.error(error);
    }

    const port = process.env.PORT;

    const app = new express();
    const router = require('./router.js');

    app.use(cors());
    app.use(express.json());
    app.use("/api/v1", router);

    app.use((err, req, res, next) => {
        res.status(500).send({
            success: false,
            msg: 'Something went wrong',
        });
    });

    console.log(`Server running on ${port}`);

    app.listen(port);
}());

