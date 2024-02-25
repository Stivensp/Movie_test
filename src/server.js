const sequelize = require("./utils/connection.js");
const app = require("./app.js");
require('./models/index.js');

const PORT = process.env.PORT || 8080;
const DB = process.env.DATABASE_URL

const main = async () => {
    try {
        sequelize.sync({ force: true })
        console.log(`\n🗄 DB connected to: ${DB}\n`);
        app.listen(PORT)
        console.log(`    Server running on port ${PORT}`)
        console.log(`    http://localhost:${PORT}\n`)
    }
    catch (error) {
        console.error(error)
    }
}

main()