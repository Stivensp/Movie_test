const Actor = require("./Actor.js");
const Director = require("./Director.js");
const Genre = require("./Genre.js");
const Movie = require("./Movie.js");

Movie.belongsToMany(Genre, { through: "movieGenre"})
Genre.belongsToMany(Movie, { through: "movieGenre"})

Movie.belongsToMany(Director, { through: "movieDirector"})
Director.belongsToMany(Movie, { through: "movieDirector"})

Movie.belongsToMany(Actor, { through: "movieActor"})
Actor.belongsToMany(Movie, { through: "movieActor"})