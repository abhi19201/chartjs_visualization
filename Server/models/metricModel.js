const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MetricSchema = new Schema({
    _id: { type: String, required: [true, "You didn't specify an id"] },
    timeSeries: [
        {
            original_value: Number,
            forecasted_value: Number,
            min_band: Number,
            max_band: Number,
            line_status: Number,
            timestamp: Date,
        },
    ],
    measure: { type: String, required: [true, "You didn't specify a Measure"] },
    dimensions: [
        {
            name: String,
            value: String,
        },
    ],
});

module.exports = mongoose.model("metric", MetricSchema);
