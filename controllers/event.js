const { validationResult } = require("express-validator");
const { ObjectId } = require("mongodb");
const Event = require("../models/event");

const addEvent = (req, res) => {
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

const fetchEvents = (_req, res) => {
    Event.find().then(events => {
        res.json({
            success: true,
            msg: 'Events fetched successfully',
            data: events,
        });
    }).catch(err => {
        res.status(400).send(err); //400 bad request
    });
};

const deleteEvent = (req, res) => {
    var eventId = req.params.id;

    if (!ObjectId.isValid(eventId)) {
        return res.status(400).json({
            success: false,
            msg: "Invalid event id",
        });
    }

    Event.findOneAndRemove({
        _id: eventId,
    }).then(event => {
        if (!event) {
            return res.status(404).json({
                success: false,
                msg: "Event not found",
            });
        }

        res.json({
            success: true,
            msg: 'Events deleted successfully',
        });
    });
};

const updateEvent = (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    var eventId = req.params.id;

    const {
        title,
        description,
        category,
        date,
        isVirtual,
        address,
    } = req.body;

    var body = {
        title,
        description,
        category,
        date,
        isVirtual,
        address,
    };

    Event.findOneAndUpdate({
        _id: eventId,
    }, body, {
        new: true
    }).then(event => {
        if (!event) {
            return res.status(404).json({
                success: false,
                msg: "Event not found",
            });
        }

        res.json({
            success: true,
            msg: 'Event updated successfully',
            data: event,
        });
    }).catch(err => {
        res.status(400).send(err); //400 bad request
    });
};

module.exports = {
    addEvent,
    fetchEvents,
    deleteEvent,
    updateEvent,
};