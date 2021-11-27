require("dotenv").config();
const mongoose = require("mongoose");

const connectDb = () => {
    mongoose
        .connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((data) => {
            console.log(
                `Mongo Connected Successfully with : ${data.connection.host}`
            );
        });
};

module.exports = connectDb;
