const expect = require('expect');
const request = require('supertest');
const {
    ObjectId
} = require("mongodb");

const {
    app
} = require('./../server');
const Event = require('./../models/event');

const {
    events,
    populateEvents,
} = require('./seed/seed');

beforeEach(populateEvents);

describe('POST /api/v1/events', () => {
    it("should create a new event", (done) => {
        const newEvent = {
            title: "New Event",
            description: "New Event Description",
            category: "New Category",
            address: "New Address",
            isVirtual: false,
            date: "2021-07-17T10:00:00.000+00:00",
        };

        request(app).post("/api/v1/events").send(newEvent).expect(200).expect(res => {
            expect(res.body.success).toBe(true);
        }).end((err, res) => {
            if (err) {
                return done(err);
            }

            Event.find({
                title: newEvent.title
            }).then(events => {
                expect(events.length).toBe(1);
                expect(events[0].title).toBe(newEvent.title);
                done();
            }).catch(e => {
                done(e);
            });
        });
    });

    it("should not create event with invalid body data", done => {
        request(app).post('/api/v1/events').send({}).expect(400).end((err, res) => {
            if (err) {
                return done(err);
            }

            Event.find().then((events) => {
                expect(events.length).toBe(2);
                done();
            }).catch(e => {
                done(e);
            });
        })
    });
});

describe("GET /api/v1/events", () => {
    it("should get all events", done => {
        request(app).get('/api/v1/events').expect(200).expect(res => {
            expect(res.body.data.length).toBe(2);
        }).end(done);
    });
});

describe("DELETE /api/v1/events/:id", () => {
    it("should remove a event", done => {
        var hexId = events[1]._id.toHexString();

        request(app).delete(`/api/v1/events/${hexId}`).expect(200).expect(res => {
            expect(res.body.success).toBe(true);
        }).end((err) => {
            if (err) {
                return done(err);
            } else {
                Event.findById(hexId).then((event) => {
                    expect(event).toBeFalsy();
                    done();
                }).catch(e => done(e));
            }
        });

    });

    it("should return 404 if event not found", done => {
        var hexId = new ObjectId().toHexString();
        request(app).delete(`/api/v1/events/${hexId}`).expect(404).end(done);
    });

    it("should return 400 if object id is invalid", done => {
        request(app).delete("/api/v1/events/123abc").expect(400).end(done);
    });
});

describe("PUT /api/v1/events/:id", () => {
    it("should update the event", done => {
        var hexId = events[0]._id.toHexString();
        const newEvent = {
            title: "This should be the new title",
            description: "New Event Description",
            category: "New Category",
            address: "New Address",
            isVirtual: false,
            date: "2021-07-17T10:00:00.000+00:00",
        };

        request(app).put(`/api/v1/events/${hexId}`).send(newEvent).expect(200).expect(res => {
            expect(res.body.data.title).toBe(newEvent.title);
            expect(res.body.success).toBe(true);
        }).end(done);
    });
});