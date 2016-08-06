/**
 * Created by Andarias Silvanus on 16/08/06.
 */

var chart = {
    type: 'columnrange',
        inverted: true
};

var yAxis = {
    title: {
        text: 'Temperature ( °C )'
    }
};

var tooltip = {
    valueSuffix: '°C'
};

var plotOptions = {
    columnrange: {
        dataLabels: {
            enabled: true,
                formatter: function () {
                return this.y + '°C';
            }
        }
    }
};

var legend = {
    enabled: false
};

