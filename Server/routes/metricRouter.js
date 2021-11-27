const express = require("express");

const MetricCtrl = require("../controllers/metricController.js");

const router = express.Router();


router.post("/metrics", MetricCtrl.createMetrics);

router.get("/metrics", MetricCtrl.getMetrics);

router.get("/metrics/measures", MetricCtrl.getMeasures);

module.exports = router;
