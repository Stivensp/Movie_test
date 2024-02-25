const Genre = require("../models/Genre.js");
const catchError = require("../utils/catchError.js");

const getAllGenres = catchError(async (req, res) => {
    const result = await Genre.findAll();
    return res.json(result)
})
const getOneGenre = catchError(async (req, res) => {
    const { id } = req.params
    const result = await Genre.findByPk(id)
    if (!result) return res.send("Genre not found").status(404);
    return res.json(result)
})
const createGenre = catchError(async (req, res) => {
    const result = await Genre.create(req.body)
    return res.status(201).json(result)
})
const deleteGenre = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Genre.destroy({ where: { id } })
    if (!result) return res.send("Genre not found").status(404);
    return res.status(204).send("Genre deleted")
})
const updateGenre = catchError(async (req, res) => {
    const { id } = req.params;
    const newBody = req.body;
    if (!id || !newBody) return res.send("Id or newBody not found").status(404);

    const result = await Genre.update(
        newBody,
        {
            where: { id },
            returning: true
        }
    )
    return res.json(result[1][0])
})
const bulkCreatedGenres = catchError(async (req, res) => {
    const result = await Genre.bulkCreate(req.body)
    return res.status(201).json(result)
})

module.exports = {
    getAllGenres,
    getOneGenre,
    createGenre,
    deleteGenre,
    updateGenre,
    bulkCreatedGenres
}