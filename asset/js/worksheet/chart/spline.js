/**
 * Created by Andarias Silvanus on 16/08/06.
 */

var chart = {
    type: 'spline',
    inverted: true
};

var xAxis = {
    reversed: false,
        title: {
        enabled: true,
            text: 'Altitude'
    },
    labels: {
        formatter: function () {
            return this.value + 'km';
        }
    },
    maxPadding: 0.05,
        showLastLabel: true
};

var yAxis = {
    title: {
        text: 'Temperature'
    },
    labels: {
        formatter: function () {
            return this.value + '°';
        }
    },
    lineWidth: 2
};

var legend = {
    enabled: false
};

var tooltip = {
    headerFormat: '<b>{series.name}</b><br/>',
        pointFormat: '{point.x} km: {point.y}°C'
};

var plotOptions = {
    spline: {
        marker: {
            enable: false
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
optikos_chart.legend = legend;
optikos_chart.dimensionQuantity = dQ;
optikos_chart.measureQuantity = mQ;