const { validationResult } = require("express-validator");
const Event = require("../models/event");


const addEvent = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const {
        title,
        description,
        category,
        date,
        isVirtual,
        address,
    } = req.body;

    var event = new Event({
        title,
        description,
        category,
        date,
        isVirtual,
        address,
    });

    event.save().then(event => {
        res.json({
            success: true,
            msg: 'Event added successfully',
            data: event,
        });
    }).catch(err => {
        res.status(400).send(err); //400 bad request
    });
};

module.exports = {
    addEvent,
};