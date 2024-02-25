const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connection.js");

const Genre = sequelize.define("genre", {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
})
module.exports = Genre;