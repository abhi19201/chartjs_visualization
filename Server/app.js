const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const errorMiddleware = require("./middleware/error");



const app = express();
app.use(cors());
app.use(morgan("tiny"));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));



//database
const mongoDbConnection = require("./db/database");
mongoDbConnection();


//Routes
const Metrics = require("./routes/metricRouter");
app.use("/api", Metrics);

//Error
app.use(errorMiddleware);



module.exports = app;