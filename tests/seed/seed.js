const {
    ObjectId
} = require("mongodb");

const Event = require("./../../models/event");

const events = [{
    _id: new ObjectId(),
    title: "First Event",
    description: "Welcome to New",
    category: "All",
    address: "London",
    isVirtual: false,
    date: "2021-07-17T10:00:00.000+00:00",
}, {
    _id: new ObjectId(),
    title: "Second Event",
    description: "Welcome to New",
    category: "All",
    address: "London",
    isVirtual: false,
    date: "2021-07-17T10:00:00.000+00:00",
}];

const populateEvents = (done) => {
    Event.remove({}).then(() => {
        return Event.insertMany(events);
    }).then(() => {
        done();
    });
};

module.exports = {
    events,
    populateEvents,
};
