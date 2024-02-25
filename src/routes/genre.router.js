const express = require("express");
const { createGenre, deleteGenre, getAllGenres, getOneGenre, updateGenre } = require("../controllers/genre.controllers.js");

const routerGenre = express.Router();
routerGenre.route("/")
    .get(getAllGenres)
    .post(createGenre)
routerGenre.route("/:id")
    .get(getOneGenre)
    .delete(deleteGenre)
    .put(updateGenre)



module.exports = routerGenre;