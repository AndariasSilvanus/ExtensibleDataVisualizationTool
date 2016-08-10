/**
 * Created by Andarias Silvanus on 16/08/10.
 */

var chart = {
    type: 'area'
};

var xAxis = {
    allowDecimals: false,
    labels: {
        formatter: function () {
            return this.value; // clean, unformatted number for year
        }
    }
};
var yAxis = {
    title: {
        text: 'Nuclear weapon states'
    },
    labels: {
        formatter: function () {
            return this.value / 1000 + 'k';
        }
    }
};
var tooltip = {
    pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
};
var plotOptions = {
    area: {
        pointStart: 1940,
        marker: {
            enabled: false,
            symbol: 'circle',
            radius: 2,
            states: {
                hover: {
                    enabled: true
                }
            }
        }
    }
};

var dQ = 1;
var mQ = 1;

var optikos_chart = {};

optikos_chart.chart = chart;
optikos_chart.tooltip = tooltip;
optikos_chart.xAxis = xAxis;
optikos_chart.yAxis = yAxis;
optikos_chart.plotOptions = plotOptions;
optikos_chart.dimensionQuantity = dQ;
optikos_chart.measureQuantity = mQ;