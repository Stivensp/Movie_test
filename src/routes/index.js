const express = require("express");
const routerMovie = require("./movie.router.js");
const routerActor = require("./actor.router.js");
const routerGenre = require("./genre.router.js");
const routerDirector = require("./director.router.js");

const router = express.Router();
router.use("/movies", routerMovie)
router.use("/actors", routerActor)
router.use("/genres", routerGenre)
router.use("/directors", routerDirector)

module.exports = router;