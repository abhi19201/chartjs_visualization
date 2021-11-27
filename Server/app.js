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

//Routes
const Metrics = require("./routes/metricRouter");
app.use("/api", Metrics);

//Error
app.use(errorMiddleware);


//Production
if (process.env.NODE_ENV === "production") {
    app.use(express.static("../client/build"));
}



module.exports = app;