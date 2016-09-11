/**
 * Created by Andarias Silvanus on 16/09/11.
 */

var chart = {
    type: 'areaspline'
};

var legend = {
    layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        x: 150,
        y: 100,
        floating: true,
        borderWidth: 1,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
};

var tooltip = {
    shared: true,
        valueSuffix: ' units'
};

var credits = {
    enabled: false
};

var plotOptions = {
    areaspline: {
        fillOpacity: 0.5
    }
};

var optikos_chart = {};

optikos_chart.chart = chart;
optikos_chart.legend = legend;
optikos_chart.credits = credits;
optikos_chart.tooltip = tooltip;
optikos_chart.plotOptions = plotOptions;