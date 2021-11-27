const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const errorMiddleware = require("./Server/middleware/error");
const dotenv = require("dotenv");
const path = require("path");

const app = express();
app.use(cors());
app.use(morgan("tiny"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));


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


//Routes
const Metrics = require("./Server/routes/metricRouter");
app.use("/api", Metrics);

//Error
app.use(errorMiddleware);


//Config
dotenv.config();



app.use(express.static(path.join(__dirname, "client", "build")));



app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});


//Production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("./client/build"));
}



server = app.listen(process.env.PORT, () => {
    console.log(`Server Running at http://localhost:${process.env.PORT}`);
});
