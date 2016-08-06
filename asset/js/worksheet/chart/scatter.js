/**
 * Created by Andarias Silvanus on 16/08/06.
 */

var chart = {
    type: 'scatter',
    zoomType: 'xy'
};

var xAxis = {
    title: {
        enabled: true,
            text: 'Height (cm)'
    },
    startOnTick: true,
        endOnTick: true,
        showLastLabel: true
};

var yAxis = {
    title: {
        text: 'Weight (kg)'
    }
};

var legend = {
    layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 100,
        y: 70,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
        borderWidth: 1
};

var plotOptions = {
    scatter: {
        marker: {
            radius: 5,
                states: {
                hover: {
                    enabled: true,
                        lineColor: 'rgb(100,100,100)'
                }
            }
        },
        states: {
            hover: {
                marker: {
                    enabled: false
                }
            }
        },
        tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x} cm, {point.y} kg'
        }
    }
};

var dQ = 1;
var mQ = 2;

var optikos_chart = {};

optikos_chart.chart = chart;
optikos_chart.xAxis = xAxis;
optikos_chart.yAxis = yAxis;
optikos_chart.plotOptions = plotOptions;
optikos_chart.legend = legend;
optikos_chart.dimensionQuantity = dQ;
optikos_chart.measureQuantity = mQ;