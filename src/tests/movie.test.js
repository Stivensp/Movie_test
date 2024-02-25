const supertest = require("supertest")
const app = require("../app")
const Actor = require("../models/Actor")
const Director = require("../models/Director")
const Genre = require("../models/Genre")
require("../models")

const request = supertest(app)
const BASE_URL = "/movies"

const movie = {
    name: "Spiderman",
    image: "image.png",
    synopsis: "A superhero movie",
    releaseYear: 2021
}

let movieId
test("POST '/movies' should return status 201, 'res.body' should be defined and 'res.body.name' should equal to 'movie.name'", async () => {
    const res = await request
        .post(BASE_URL)
        .send(movie)

    movieId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})

test("GET '/movies' should return status 200, 'res.body' should be defined and 'res.body' length should equal to '1'", async () => {
    const res = await request
        .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
})

test("GET '/movies/:id' should return status 200, 'res.body' should be defined and 'res.body.name' should equal to 'movie.name'", async () => {
    const res = await request
        .get(`${BASE_URL}/${movieId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(movie.name)
})

test("PUT '/movies/:id' should return status 200, 'res.body' should be defined and 'res.body.name' should equal to 'newMovie.name'", async () => {
    const newMovie = {
        name: "Spiderman: No Way Home",
    }

    const res = await request
        .put(`${BASE_URL}/${movieId}`)
        .send(newMovie)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(newMovie.name)
})
test("POST '/movies/:id/actors' should return status 200, 'res.body' should be defined and 'res.body' length should equal to '1'", async () => {
    const actorCreated = await Actor.create({
        firstName: "Jhon",
        lastName: "Doe",
        nationality: "Colombia"
    })

    const res = await request
        .post(`${BASE_URL}/${movieId}/actors`)
        .send([actorCreated.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    actorCreated.destroy()
})

test("POST '/movies/:id/directors' should return status 200, 'res.body' should be defined and 'res.body' length should equal to '1'", async () => {
    const directorCreated = await Director.create({
        firstName: "Gian",
        lastName: "Martins",
        nationality: "Mexico"
    })

    const res = await request
        .post(`${BASE_URL}/${movieId}/directors`)
        .send([directorCreated.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    directorCreated.destroy()
})

test("POST '/movies/:id/genres' should return status 200, 'res.body' should be defined and 'res.body' length should equal to '1'", async () => {
    const genreCreated = await Genre.create({
        name: "Anime"
    })

    const res = await request
        .post(`${BASE_URL}/${movieId}/genres`)
        .send([genreCreated.id])

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    genreCreated.destroy()
})

test("DELETE '/movies/:id' should return status 204", async () => {
    const res = await request
        .delete(`${BASE_URL}/${movieId}`)

    expect(res.status).toBe(204)
})