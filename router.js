const express = require('express');
const { check } = require('express-validator');
const { addEvent, fetchEvents, deleteEvent } = require('./controllers/event');

const router = express.Router();

router.post("/events", [
    check('title').isString().isLength({ min: 1 }),
    check('description').isString().isLength({ min: 1 }),
    check('category').isString().isLength({ min: 1 }),
    check('address').isString().isLength({ min: 1 }),
    check('isVirtual').isBoolean(),
    check('date').isString().isLength({ min: 1 }),
], addEvent)
    .get("/events", fetchEvents)
    .delete("/events/:id", deleteEvent);

router.use((_req, res) => {
    res.status(500).send({
        success: false,
        msg: 'Route not found',
    });
});


module.exports = router;
