const ChartOptions = (ctx, object) => {
    return {
        type: "line",
        plugins: [
            {
                afterLayout: function (finalChart) {
                    var gradientStroke = ctx.createLinearGradient(
                        finalChart.chartArea.left,
                        0,
                        finalChart.chartArea.right,
                        0
                    );

                    var dataset = finalChart.data.datasets[2];
                    dataset.colors.forEach((color, i) => {
                        var stop = (1 / (dataset.colors.length - 1)) * i;

                        gradientStroke.addColorStop(stop, color);
                    });

                    dataset.backgroundColor = gradientStroke;
                    dataset.borderColor = gradientStroke;
                    dataset.pointBorderColor = gradientStroke;
                    dataset.pointBackgroundColor = gradientStroke;
                    dataset.pointHoverBorderColor = gradientStroke;
                    dataset.pointHoverBackgroundColor = gradientStroke;
                },
            },
        ],
        data: {
            labels: object.timestamp,
            datasets: [
                {
                    label: "Min Band",
                    data: object.minBand,
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    borderColor: "rgba(0, 0, 0, 1)",
                    tension: 0.4,
                    borderWidth: 0.5,
                    fill: 1,
                },
                {
                    label: "Max Band",
                    data: object.maxBand,
                    backgroundColor: "rgba(0, 0, 0, 0.2)",
                    borderColor: "rgba(0, 0, 0, 1)",
                    tension: 0.4,
                    borderWidth: 0.5,
                    fill: 1,
                },
                {
                    label: "Original Value",
                    data: object.originalValue,
                    colors: object.lineStatus,
                    borderWidth: 2,
                    tension: 1,
                },
                {
                    label: "Forecasted Value",
                    data: object.forecastedValue,
                    borderDash: [10, 10],
                    borderColor: "black",
                    borderWidth: 2,
                    tension: 1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
            elements: {
                point: {
                    radius: 0,
                },
            },
        },
    };
};

module.exports = ChartOptions;
