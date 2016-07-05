/**
 * Created by Andarias Silvanus on 16/07/05.
 */

//(function () {
//alert("barrr");

var chart = {
    type: 'bar'
};
var title = {
    text: 'Historic World Population by Region'
};
var subtitle = {
    text: 'Source: Wikipedia.org'
};
var xAxis = {
    //categories: ['Africa', 'America', 'Asia', 'Europe', 'Oceania'],
    title: {
        text: null
    }
};
var yAxis = {
    min: 0,
    title: {
        text: 'Population (millions)',
        align: 'high'
    },
    labels: {
        overflow: 'justify'
    }
};
var tooltip = {
    valueSuffix: ' millions'
};
var plotOptions = {
    bar: {
        dataLabels: {
            enabled: true
        }
    }
};
var legend = {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'top',
    x: -40,
    y: 100,
    floating: true,
    borderWidth: 1,
    backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
    shadow: true
};
var credits = {
    enabled: false
};

var series= [
    {
        name: 'Tokyo',
        data: [
            {y: 7.0},
            {y: 8.0},
            {y: 9.5},
            {y: 14},
            {y: 18.2},
            {y: 21}
        ]
    },
    {
        name: 'New York',
        data: [
            {y: 0.2},
            {y: 3.9},
            {y: 4.2},
            {y: 5.7},
            {y: 15.2},
            {y: 17}
        ]
    },
    {
        name: 'London',
        data: [
            {y: 14.1},
            {y: 8.6},
            {y: 2.5},
            {y: 11.2},
            {y: 10.2},
            {y: 8}
        ]
    }

    /*{
     name: 'Year 1800',
     data: [107, 31, 635, 203, 2]
     }, {
     name: 'Year 1900',
     data: [133, 156, 947, 408, 6]
     }, {
     name: 'Year 2008',
     data: [973, 914, 4054, 732, 34]
     }*/
];

var dQ = 1;
var mQ = 1;

var optikos_chart = {};

optikos_chart.chart = chart;
optikos_chart.title = title;
optikos_chart.subtitle = subtitle;
optikos_chart.tooltip = tooltip;
optikos_chart.xAxis = xAxis;
optikos_chart.yAxis = yAxis;
optikos_chart.plotOptions = plotOptions;
optikos_chart.legend = legend;
optikos_chart.credits = credits;
optikos_chart.dimensionQuantity = dQ;
optikos_chart.measureQuantity = mQ;
//optikos_chart.series = series;
//})();