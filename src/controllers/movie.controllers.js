const Actor = require("../models/Actor.js");
const Director = require("../models/Director.js");
const Genre = require("../models/Genre.js");
const Movie = require("../models/Movie.js");
const catchError = require("../utils/catchError.js");

const getAllMovies = catchError(async (req, res) => {
    const result = await Movie.findAll({include: [Genre, Director, Actor]});
    return res.json(result);
})
const getOneMovie = catchError(async (req, res) => {
    const { id } = req.params
    const result = await Movie.findByPk(id, {include: [Genre, Director, Actor]})
    if (!result) return res.send("Movie not found").status(404);
    return res.json(result);
})
const createMovie = catchError(async (req, res) => {
    const result = await Movie.create(req.body);
    return res.status(201).json(result);
})
const deleteMovie = catchError( async(req, res) => {
    const { id } = req.params;
    const result = await Movie.destroy({where: {id}});
    if(!result) return res.send("Movie not Found").status(404);
    return res.status(204).send("Movie deleted");
})
const updateMovie = catchError(async (req, res) => {
    const { id } = req.params;
    const newBody = req.body
    const idMovie = await Movie.findByPk(id);
    if(!idMovie) return res.send("Movie not Found").status(404);
    const result = await Movie.update(
        newBody,
        {
            where: { id },
            returning: true
        }
    )
    return res.json(result[1][0])
})

const setGenre = catchError(async (req, res) => {
 
    const { id } = req.params;
    const movie = await Movie.findByPk(id);

    if(!movie) return res.send("Movie not found").status(404);
    await movie.setGenres(req.body)
    const allGenres = await movie.getGenres()
    return res.json(allGenres)
})

const setDirector = catchError(async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);
    if(!movie) return res.send("Movie not found").status(404);
    await movie.setDirectors(req.body)
    const allDirectors = await movie.getDirectors()
    return res.json(allDirectors)
})

const setActor = catchError(async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);
    if(!movie) return res.send("Movie not found").status(404);
    await movie.setActors(req.body);
    const allActors = await movie.getActors();
    return res.json(allActors)
})
module.exports = {
    getAllMovies,
    getOneMovie,
    createMovie,
    deleteMovie,
    updateMovie,
    setGenre,
    setDirector,
    setActor
}