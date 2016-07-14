/**
 * Created by Andarias Silvanus on 16/07/05.
 */

//(function () {
//alert ("pieee");



var chart = {
    type: 'pie',
    plotBackgroundColor: null,
    plotBorderWidth: null,
    plotShadow: false
};
var title = {
    text: 'Browser market shares at a specific website, 2014'
};
var tooltip = {
    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
};
var plotOptions = {
    pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
            enabled: true,
            format: '<b>{point.name}%</b>: {point.percentage:.1f} %',
            style: {
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
            }
        }
    }
};
var series= [{
    type: 'pie',
    name: 'Browser share',
    data: [
        {
            name: 'IE',
            y: 26.8
        },
        {
            name: 'firefox',
            y: 45
        },
        {
            name: 'chrome',
            y: 12.8
        }
        //['Firefox',   45.0],
        //['IE',       26.8],
        //{
        //name: 'Chrome',
        //y: 12.8,
        //sliced: true,
        //selected: true
        //},
        //['Safari',    8.5],
        //['Opera',     6.2],
        //['Others',   0.7]
    ]
}];

var dQ = 1;
var mQ = 1;

var optikos_chart = {};

optikos_chart.chart = chart;
optikos_chart.title = title;
optikos_chart.tooltip = tooltip;
//optikos_chart.series = series;
optikos_chart.plotOptions = plotOptions;
optikos_chart.dimensionQuantity = dQ;
optikos_chart.measureQuantity = mQ;
//})();

function cobaindong(){
    alert("hahha");
}