/**
 * Created by Andarias Silvanus on 16/08/14.
 */

var chart = {
    type: 'boxplot'
};

var legend = {
    enabled: false
};

var xAxis = {
        title: {
        text: 'Experiment No.'
    }
};

var yAxis = {
    title: {
        text: 'Observations'
    }
};

var dQ = 1;
var mQ = 1;

var optikos_chart = {};

optikos_chart.chart = chart;
optikos_chart.xAxis = xAxis;
optikos_chart.yAxis = yAxis;
optikos_chart.legend = legend;
optikos_chart.dimensionQuantity = dQ;
optikos_chart.measureQuantity = mQ;