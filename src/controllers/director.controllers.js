const Director = require("../models/Director.js");
const catchError = require("../utils/catchError.js");

const getAllDirectors = catchError(async (req, res) => {
    const result = await Director.findAll();
    return res.json(result);
})
const getOneDirector = catchError(async (req, res) => {
    const { id } = req.params
    const result = await Director.findByPk(id)
    if (!result) return res.send("Director not found").status(404);
    return res.json(result);
})
const createDirector = catchError(async (req, res) => {
    const result = await Director.create(req.body);
    return res.status(201).json(result);
})
const deleteDirector = catchError( async(req, res) => {
    const { id } = req.params;
    const result = await Director.destroy({where: {id}});
    if(!result) return res.send("Director not Found").status(404);
    return res.status(204).send("Director deleted");
})

const updateDirector = catchError(async (req, res) => {
    const { id } = req.params;
    const newBody = req.body
    const idDirector = await Director.findByPk(id);
    if(!idDirector) return res.send("Director not Found").status(404);
    const result = await Director.update(
        newBody,
        {
            where: { id },
            returning: true
        }
    )
    return res.json(result[1][0])
})


//only to create a lot of directors
const bulkCreatedDirectors = catchError(async (req, res) => {
    const result = await Director.bulkCreate(req.body)
    return res.status(201).json(result)
})
module.exports = {
    getAllDirectors,
    getOneDirector,
    createDirector,
    deleteDirector,
    updateDirector,
    bulkCreatedDirectors
}

