const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    description: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    category: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    date: {
        type: Date,
        required: true,
    },
    isVirtual: {
        type: Boolean,
        default: false
    },
    address: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
});

const Event = mongoose.model('event', EventSchema);

module.exports = Event;
