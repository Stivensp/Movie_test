const supertest = require("supertest")
const app = require("../app")

const request = supertest(app)
const BASE_URL = "/directors"

const director = {
    firstName: "test",
    lastName: "test",
    nationality: "test"
}

let directorId

test("POST '/directors' should return status 201, 'res.body' should be defined and 'res.body.firstName' should equal to 'director.firstName'", async () => {
    const res = await request
        .post(BASE_URL)
        .send(director)

    directorId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
})

test("GET '/directors' should return status 200, 'res.body' should be defined and 'res.body' length should equal to '1'", async () => {
    const res = await request
        .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})


test("GET '/directors/:id' should return status 200, 'res.body' should be defined and 'res.body.firstName' should equal to 'director.firstName'", async () => {
    const res = await request
        .get(`${BASE_URL}/${directorId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(director.firstName)
})

test("PUT '/directors/:id' should return status 200, 'res.body' should be defined and 'res.body.firstName' should equal to 'newDirector.firstName'", async () => {
    const newDirector = {
        firstName: "TestdOS"
    }

    const res = await request
        .put(`${BASE_URL}/${directorId}`)
        .send(newDirector)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.firstName).toBe(newDirector.firstName)
})

test("DELETE '/directors/:id' should return status 204", async () => {
    const res = await request
        .delete(`${BASE_URL}/${directorId}`)

    expect(res.status).toBe(204)
})