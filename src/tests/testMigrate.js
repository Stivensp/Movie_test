const sequelize = require("../utils/connection.js");

const testMigrate = async () => {
    try {
        await sequelize.sync({force: true});
        console.log("DB reset");
        process.exit;
    } catch (error) {
        console.error(error)
    }
}

testMigrate();