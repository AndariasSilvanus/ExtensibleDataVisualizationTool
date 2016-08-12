/**
 * Created by Andarias Silvanus on 16/08/12.
 */

var chart = {
    type: 'heatmap',
    marginTop: 40,
    marginBottom: 80
};

var yAxis = {
    title: null
};

var colorAxis = {
    min: 0,
    minColor: '#FFFFFF',
    maxColor: Highcharts.getOptions().colors[0]
};

var legend = {
    align: 'right',
    layout: 'vertical',
    margin: 0,
    verticalAlign: 'top',
    y: 25,
    symbolHeight: 280
};

var tooltip = {
    formatter: function () {
        return '<b>' + this.series.xAxis.categories[this.point.x] + '</b> sold <br><b>' +
            this.point.value + '</b> items on <br><b>' + this.series.yAxis.categories[this.point.y] + '</b>';
    }
};

var dQ = 1;
var mQ = 1;

var optikos_chart = {};

optikos_chart.chart = chart;
optikos_chart.tooltip = tooltip;
optikos_chart.yAxis = yAxis;
optikos_chart.legend = legend;
optikos_chart.colorAxis = colorAxis;
optikos_chart.dimensionQuantity = dQ;
optikos_chart.measureQuantity = mQ;