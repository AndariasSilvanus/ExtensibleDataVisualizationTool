/**
 * Created by Andarias Silvanus on 16/08/16.
 */

var chart = {
    polar: true,
        type: 'line'
};

var pane = {
    size: '80%'
};

var xAxis = {
    tickmarkPlacement: 'on',
    lineWidth: 0
};

var yAxis = {
    gridLineInterpolation: 'polygon',
        lineWidth: 0,
        min: 0
};

var tooltip = {
    shared: true,
        pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>'
};

var legend = {
    align: 'right',
        verticalAlign: 'top',
        y: 70,
        layout: 'vertical'
};

var dQ = 0;
var mQ = 8;

var optikos_chart = {};

optikos_chart.chart = chart;
optikos_chart.pane = pane;
optikos_chart.tooltip = tooltip;
optikos_chart.xAxis = xAxis;
optikos_chart.yAxis = yAxis;
optikos_chart.legend = legend;
optikos_chart.dimensionQuantity = dQ;
optikos_chart.measureQuantity = mQ;