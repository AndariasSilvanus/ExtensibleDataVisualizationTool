/**
 * Created by Andarias Silvanus on 16/06/07.
 */

!function (exports){
    'use strict';

    // tar yg generate 'series' ma 'drilldown' siapa ya? worksheet / controller? --> worksheet
    // worksheet yang akan tampung (generate) data, generate series, generate drilldown
    // tar setiap kali ada perubahan di row / column, bakal coba generate series / drilldown ya?

    // Create worksheet 'class'
    function worksheet () {
        this.dimensionContainer = [];
        this.measureContainer = [];
        this.drillDownArr = [];
        this.stateDrillDown = "";
        this.chart = new myChart();
        this.data = [];
    }

    function httpGet(theUrl) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
        xmlHttp.send( null );
        return xmlHttp.responseText;
    }

    worksheet.prototype = {
        constructor: worksheet,
        getMeasure: function() {
            return this.measureContainer;
        },
        getDimension: function() {
            return this.dimensionContainer;
        },
        pushColumn: function (dimensionOrMeasure) {
            this.measureContainer.push(dimensionOrMeasure);
        },
        pushRow: function (dimensionOrMeasure) {
            this.dimensionContainer.push(dimensionOrMeasure);
        },
        popMeasure: function (index) {
            this.measureContainer.splice(index, 1);
        },
        popDimension: function (index) {
            this.dimensionContainer.splice(index, 1);
        },
        createDrillDownDimension: function (dimension) {
            this.drillDownArr.push(dimension);
        },
        constructChart: function (objChart) {
            this.chart.setHighchart(objChart);
        },
        isContainType: function (type) {
            var found = false;
            var i = 0;
            while ((i < this.measureContainer.length) && !found) {
                if (this.measureContainer[i].type == type)
                    found = true;
                else
                    i++;
            }
            if (found) return true;
            else {
                i = 0;
                while ((i < this.dimensionContainer.length) && !found) {
                    if (this.dimensionContainer[i].type == type)
                        found = true;
                    else
                        i++;
                }
                if (found) return true;
                else return false;
            }
        },
        getData: function () {
            // generate series to be used in highchart

            var self = this;
            return $.ajax({
                url: "api/getDataSeries",
                async: false,
                type: "get", //send it through get method
                data: {
                    dimensionContainer: self.dimensionContainer,
                    measureContainer: self.measureContainer
                },
                success: function(response) {
                    if ((self.chart.dimensionQuantity == self.dimensionContainer.length) && (self.chart.measureQuantity== self.measureContainer.length)) {
                        // generateSeries executed when quantity of measure & dimension specified in chart match to dimension & measure total in container
                        self.data = response;
                    }
                },
                error: function(xhr) {
                    alert ("Error occured when generate data series, error message: " + xhr.responseText);
                    //console.log (xhr.responseText);
                }
            });
        },
        generate4Bar: function() {
            // valid for chart type: bar, line, column
            // 1 dimension 1 column, characteristic: consist of two column: [0]=>dimension, [1]=>measure
            // each row record is dimension unique
            var series = [];
            var obj_series = {
                name: "",
                data: []
            };
            var categories = [];

            console.log("generate4Bar");
            console.log(this.data);

            var dimension_key = this.dimensionContainer[0].data;
            var measure_key = this.measureContainer[0].data;

            for (var i=0; i<this.data.length; i++) {
                categories.push(this.data[i][dimension_key]);
                obj_series.data.push({
                    y: parseInt(this.data[i][measure_key], 10)
                });
            }
            obj_series.name = dimension_key;
            series.push(obj_series);

            var res = {
                series: series,
                categories: categories
            };
            return res;
        },
        drawChart: function(chart_type) {
            var self = this;
            this.getData().done(function(){
                console.log("drawchart getdata");
                console.log(self.data);

                var res = {};
                chart_type = chart_type.toLowerCase();

                if ((chart_type == 'bar') || (chart_type == 'line') || (chart_type == 'column')) {
                    res = self.generate4Bar();
                    self.chart.highchart.series = res.series;
                    self.chart.highchart.xAxis.categories = res.categories;
                }
                else if (chart_type == 'pie') {}
                else if (chart_type == 'area') {}
                else if (chart_type == 'scatter') {}
                else if (chart_type == 'treemap') {}
                else if ((chart_type == 'bubble') || (chart_type == 'heatmap')) {}

                self.chart.highchart.title.text = "";
                self.chart.highchart.subtitle.text = "";
                console.log("hasil chart");
                console.log(self.chart.highchart);
                $('#chartContainer').highcharts(self.chart.highchart);
            });
        },
        generateDrilldown: function () {
            // generate drilldown to be used in highchart
        }
    };

    exports.worksheet = worksheet;

}(typeof exports !== 'undefined' && exports || this);