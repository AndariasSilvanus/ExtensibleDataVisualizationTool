/**
 * Created by Andarias Silvanus on 16/06/26.
 */

!function (exports){
    'use strict';

    // Create chart 'class'
    function myChart () {
        this.dimensionQuantity = 0;
        this.measureQuantity = 0;
        //this.data = [];
        this.series = [];
        this.highchart = {};
        this.drilldown = {};
    }

    myChart.prototype = {
        constructor: myChart,
        setHighchart: function (highchart_) {
            this.highchart = highchart_;
            return this;
        },
        setSeries: function (series_) {
            this.series = series_;
            this.highchart.series = series_;
            return this;
        },
        setDrilldown: function (drilldown_) {
            this.drilldown = drilldown_;
            this.highchart.drilldown = drilldown_;
            return this;
        },
        setMeasureQuantity: function (q) {
            this.measureQuantity = q;
            return this;
        },
        setDimensionQuantity: function (q) {
            this.dimensionQuantity = q;
            return this;
        }
    };

    exports.myChart = myChart;

}(typeof exports !== 'undefined' && exports || this);