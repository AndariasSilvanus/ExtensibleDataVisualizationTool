/**
 * Created by Andarias Silvanus on 16/08/12.
 */

var chart = {
    type: 'treemap'
};

var colorAxis = {
    minColor: '#FFFFFF',
    maxColor: Highcharts.getOptions().colors[0]
};

var dQ = 1;
var mQ = 1;

var optikos_chart = {};

optikos_chart.chart = chart;
optikos_chart.colorAxis = colorAxis;
optikos_chart.dimensionQuantity = dQ;
optikos_chart.measureQuantity = mQ;