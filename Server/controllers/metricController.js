const { ErrorHandler, AsyncError } = require("../middleware/errorHandler");
const ApiFeatures = require("../utils/apiFeature");
const Metric = require("../models/metricModel");

createMetrics = AsyncError(async (req, res) => {
    const metrics = await Metric.create(req.body);

    res.status(201).json({
        success: true,
        metrics,
    });
});

getMetrics = AsyncError(async (req, res, next) => {
    const numOfPages = 4;
    const numOfMetrics = await Metric.countDocuments();

    let numOfFilteredMetrics = numOfMetrics;
    if(req.query.measure !== "")
    numOfFilteredMetrics = await Metric.countDocuments(req.query);

    const features = new ApiFeatures(Metric.find(), req.query)
        .search()
        .pagination(numOfPages);

    let metrics = await features.action;

    if (!metrics || metrics.length === 0) {
        return next(new ErrorHandler("No Metrics Found!", 404));
    }

    res.status(200).json({
        success: true,
        metrics,
        numOfPages,
        numOfMetrics,
        numOfFilteredMetrics,
    });
});

getMeasures = AsyncError(async (req, res, next) => {
    const Measures = await Metric.find({}, { _id: 0, dimensions: 0 });

    if (!Measures || Measures.length === 0) {
        return next(new ErrorHandler("No Measures Found!", 404));
    }

    const filteredMeasures = Measures.reduce((key, current) => {
        const index = key.find((item) => item.measure === current.measure);
        if (!index) {
            return key.concat([current]);
        } else {
            return key;
        }
    }, []);

    const finalArray = filteredMeasures.map((obj) => {
        return obj.measure;
    });

    res.status(200).json({
        success: true,
        Measures: finalArray,
    });
});

module.exports = {
    createMetrics,
    getMeasures,
    getMetrics,
};
