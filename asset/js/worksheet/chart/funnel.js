/**
 * Created by Andarias Silvanus on 16/08/05.
 */

var chart = {
    type: 'funnel',
    marginRight: 100
};

var plotOptions = {
    series: {
        dataLabels: {
            enabled: true,
                format: '<b>{point.name}</b> ({point.y:,.0f})',
                color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black',
                softConnector: true
        },
        neckWidth: '30%',
            neckHeight: '25%'

        //-- Other available options
        // height: pixels or percent
        // width: pixels or percent
    }
};

var legend = {
    enabled: false
};

var dQ = 1;
var mQ = 1;

var optikos_chart = {};

optikos_chart.chart = chart;
optikos_chart.plotOptions = plotOptions;
optikos_chart.legend = legend;
optikos_chart.dimensionQuantity = dQ;
optikos_chart.measureQuantity = mQ;