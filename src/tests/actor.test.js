const supertest = require("supertest");
const app = require("../app.js");

const BASE_URL = "/actors"
const request = supertest(app);

const actor = {
    firstName: "test",
    lastName: "test",
    nationality: "test"
}

let actorId

test("POST '/actors' should return status 201, res.body should be defined and 'res.body.name' should equal to 'actor.firstName'", async () => {
    const res = await request
        .post(BASE_URL)
        .send(actor)

    actorId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
})


test("GET '/actors' should return status 200, res.body should be defined and 'res.body' length should equal to '1'", async () => {
    const res = await request
        .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("GET '/actors/:id' should return status 200, res.body should be defined and 'res.body.firstName' should equal to 'actor.firstName'", async () => {
    const res = await request
        .get(`${BASE_URL}/${actorId}`)


    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(actor.firstName)
})

test("PUT '/actors/:id' should return status 200, res.body should be defined and 'res.body.firstName' should equal to 'newActor.firstName'", async () => {
    const newActor = {
        firstName: "testtres"
    }

    const res = await request
        .put(`${BASE_URL}/${actorId}`)
        .send(newActor)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(newActor.firstName)
})

test("DELETE '/actors/:id' should return status 204", async () => {
    const res = await request
        .delete(`${BASE_URL}/${actorId}`)

    expect(res.status).toBe(204)
})