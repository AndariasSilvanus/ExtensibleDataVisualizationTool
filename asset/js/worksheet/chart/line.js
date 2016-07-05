/**
 * Created by Andarias Silvanus on 16/07/05.
 */

//(function () {
//    alert("linee");
var title = {
    text: 'Average Temperatures of Cities'
};
var subtitle = {
    text: 'Source: worldClimate.com'
};
var xAxis = {
    //categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
};
var yAxis = {
    title: {
        text: 'Temperature (\xB0C)'
    },
    plotLines: [{
        value: 0,
        width: 1,
        color: '#808080'
    }]
};

var tooltip = {
    valueSuffix: '\xB0C'
}

var legend = {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
    borderWidth: 0
};

var series =  [
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
     name: 'Tokyo',
     data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2,
     26.5, 23.3, 18.3, 13.9, 9.6]
     },
     {
     name: 'New York',
     data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8,
     24.1, 20.1, 14.1, 8.6, 2.5]
     },
     {
     name: 'London',
     data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0,
     16.6, 14.2, 10.3, 6.6, 4.8]
     }*/
];

var dQ = 1;
var mQ = 1;

var optikos_chart = {};

optikos_chart.title = title;
optikos_chart.subtitle = subtitle;
optikos_chart.xAxis = xAxis;
optikos_chart.yAxis = yAxis;
optikos_chart.tooltip = tooltip;
optikos_chart.legend = legend;
//optikos_chart.series = series;
//})();