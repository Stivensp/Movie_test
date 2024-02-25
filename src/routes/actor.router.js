const express = require("express");
const { createActor, deleteActor, getAllActors, getOneActor, updateActor } = require("../controllers/actor.controllers.js");

const routerActor = express.Router();

routerActor.route("/")
    .get(getAllActors)
    .post(createActor)
routerActor.route("/:id")
    .get(getOneActor)
    .delete(deleteActor)
    .put(updateActor)


module.exports = routerActor;