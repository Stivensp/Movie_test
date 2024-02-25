const Actor = require("../models/Actor.js");
const catchError = require("../utils/catchError.js");

const getAllActors = catchError(async (req, res) => {
    const result = await Actor.findAll();

    return res.json(result);
})
const getOneActor = catchError(async (req, res) => {
    const { id } = req.params
    const result = await Actor.findByPk(id)
    if (!result) return res.send("Actor not found").status(404);
    return res.json(result);
})
const createActor = catchError(async (req, res) => {
    const result = await Actor.create(req.body);
    return res.status(201).json(result);
})
const deleteActor = catchError( async(req, res) => {
    const { id } = req.params;
    const result = await Actor.destroy({where: {id}});
    if(!result) return res.send("Actor not Found").status(404);
    return res.status(204).send("Actor deleted");
})
const updateActor = catchError(async (req, res) => {
    const { id } = req.params;
    const newBody = req.body
    const idActor = await Actor.findByPk(id);
    if(!idActor) return res.send("Actor not Found").status(404);
    const result = await Actor.update(
        newBody,
        {
            where: { id },
            returning: true
        }
    )
    return res.json(result[1][0])
})
const bulkCreatedActors = catchError(async (req, res) => {
    const result = await Actor.bulkCreate(req.body)

    return res.status(201).json(result)
})
module.exports = {
    getAllActors,
    getOneActor,
    createActor,
    deleteActor,
    updateActor,
    bulkCreatedActors
}