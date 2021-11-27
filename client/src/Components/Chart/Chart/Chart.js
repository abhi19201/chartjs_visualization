import React, { useRef, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import ChartOptions from "./ChartOptions";
import Card from "../DimentionCard";
import "./Chart.css";


//Registering Everything from chart.js
Chart.register(...registerables);

function formattedData(data) {
    let object = {
        originalValue: [],
        forecastedValue: [],
        minBand: [],
        maxBand: [],
        lineStatus: [],
        timestamp: [],
    };

//Converting data to Chart Acceptable data
    data.forEach((input) => {
        object.originalValue.push(input.original_value);
        object.forecastedValue.push(input.forecasted_value);
        object.minBand.push(input.min_band);
        object.maxBand.push(input.max_band);
        object.lineStatus.push(
            input.line_status === 2 || input.line_status === 3 ? "red" : "black"
        );
        object.timestamp.push(input.timestamp);
    });

    return object;
}

//Chart for time-series
export default function TSChart(props) {
    var chartRef = useRef();

    useEffect(() => {
        var ctx = chartRef.current.getContext("2d");

        let formatData;
        if (props.data !== undefined) {
            formatData = formattedData(props.data.timeSeries);

            const finalChart = new Chart(ctx, ChartOptions(ctx, formatData));

            return () => {
                finalChart.destroy();
            };
        }
    }, [chartRef, props.data]);

    return (
        <div className='chart'>
            <h1>
                {props.data
                    ? `${props.data.measure
                          .toUpperCase()
                          .split("_")
                          .join(" ")} :`
                    : null}
            </h1>
            <canvas id='mycanvas' ref={chartRef} />

            <div className='dimension'>
                {props.data
                    ? props.data.dimensions.map((dimension) => {
                          return <Card dimension={dimension} key={Math.random()} />;
                      })
                    : null}
            </div>
        </div>
    );
}
