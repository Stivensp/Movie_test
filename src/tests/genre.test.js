const supertest = require("supertest")
const app = require("../app")

const request = supertest(app)
const BASE_URL = "/genres"

const genre = {
    name: "Action"
}

let genreId


test("POST '/genres' should return status 201, 'res.body' should be defined and 'res.body.name' should equal to 'genre.name'", async () => {
    const res = await request
        .post(BASE_URL)
        .send(genre)

    genreId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
})

test("GET '/genres' should return status 200, 'res.body' should be defined and 'res.body' length should equal to '1'", async () => {
    const res = await request
        .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})


test("GET '/genres/:id' should return status 200, 'res.body' should be defined and 'res.body.name' should equal to '1'", async () => {
    const res = await request
        .get(`${BASE_URL}/${genreId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
})


test("PUT '/genres/:id' should return 200, 'res.body' should be defined and 'res.body.name' should equal to 'newGenre.name'", async () => {
    const newGenre = {
        name: "Comedy"
    }
    const res = await request
        .put(`${BASE_URL}/ ${genreId}`)
        .send(newGenre)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(newGenre.name)
})

test("DELETE '/genres/:id' should return status 204", async () => {
    const res = await request
        .delete(`${BASE_URL}/${genreId}`)

    expect(res.status).toBe(204)
})