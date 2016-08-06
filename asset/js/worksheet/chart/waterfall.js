/**
 * Created by Andarias Silvanus on 16/08/06.
 */

var chart = {
    type: 'waterfall'
};



var yAxis = {
    title: {
        text: 'USD'
    }
};

var legend = {
    enabled: false
};

var tooltip = {
    pointFormat: '<b>${point.y:,.2f}</b> USD'
};

var dQ = 1;
var mQ = 1;

var optikos_chart = {};

optikos_chart.chart = chart;
//optikos_chart.xAxis = xAxis;
optikos_chart.yAxis = yAxis;
optikos_chart.tooltip = tooltip;
optikos_chart.legend = legend;
optikos_chart.dimensionQuantity = dQ;
optikos_chart.measureQuantity = mQ;