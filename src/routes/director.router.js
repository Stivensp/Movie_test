const express = require("express");
const { createDirector, deleteDirector, getAllDirectors, getOneDirector, updateDirector } = require("../controllers/director.controllers.js");

const routerDirector = express.Router();

routerDirector.route("/")
    .get(getAllDirectors)
    .post(createDirector)
routerDirector.route("/:id")
    .get(getOneDirector)
    .delete(deleteDirector)
    .put(updateDirector)

module.exports = routerDirector;