/**
 * Created by Andarias Silvanus on 16/08/06.
 */

var chart = {
    type: 'columnrange',
        inverted: true
};

var yAxis = {
    title: {
        text: 'Temperature ( °C )'
    }
};

var tooltip = {
    valueSuffix: '°C'
};

var plotOptions = {
    columnrange: {
        dataLabels: {
            enabled: true,
                formatter: function () {
                return this.y + '°C';
            }
        }
    }
};

var legend = {
    enabled: false
};

var dQ = 1;
var mQ = 2;

var optikos_chart = {};

optikos_chart.chart = chart;
optikos_chart.yAxis = yAxis;
optikos_chart.plotOptions = plotOptions;
optikos_chart.tooltip = tooltip;
optikos_chart.legend = legend;
optikos_chart.dimensionQuantity = dQ;
optikos_chart.measureQuantity = mQ;