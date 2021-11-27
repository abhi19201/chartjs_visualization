const app = require("./Server/app");
const dotenv = require("dotenv");

//Config
dotenv.config();

//database
const mongoDbConnection = require("./Server/db/database");
mongoDbConnection();

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Server Shutting Down because of Unhandled Promise Rejection`);

    server.close(() => {
        process.exit(1);
    });
});

server = app.listen(process.env.PORT, () => {
    console.log(`Server Running at http://localhost:${process.env.PORT}`);
});
