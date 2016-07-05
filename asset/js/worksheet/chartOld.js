/**
 * Created by Andarias Silvanus on 16/07/01.
 */

!function (exports){
    'use strict';

    // Create chart 'class'
    function chart () {
        // highchart components
        this.type = "";     // chart type
        this.title = "";
        this.subtitle = "";
        this.titleY = "";
        this.titleX = "";
        this.tooltip = function() {};
        this.color = [];
        this.legend = false;
        this.export = false;
        //this.plotOptions = --> used for drill down functionality

        // attribute for drawing chart
        this.dimensionQuantity = 0;
        this.measureQuantity = 0;
        this.data = [];
    }

    chart.prototype = {
        constructor: chart,
        type: function(type_) {
            this.type = type_;
            return this;
        },
        title: function(title_) {
            this.title = title_;
            return this;
        },
        subtitle: function(subtitle_) {
            this.subtitle = subtitle_;
            return this;
        },
        titleY: function(y) {
            this.titleY = y;
            return this;
        },
        titleX: function(x) {
            this.titleX = x;
            return this;
        },
        tooltip: function (func) {
            this.tooltip = func;
            return this;
        },
        color: function (color_) {
            this.color = color_;
            return this;
        },
        legend: function (legend_) {
            this.legend = legend_;
            return this;
        },
        export: function (export_) {
            this.export = export_;
            return this;
        },
        dimensionQuantity: function (q) {
            this.dimensionQuantity = q;
            return this;
        },
        measureQuantity: function (q) {
            this.measureQuantity = q;
            return this;
        },
        data: function (data_) {
            this.data = data_;
            return this;
        },
        draw : function (container) {
            var chart  = new Highcharts.Chart({
                chart: {
                    renderTo: container,
                    type: this.type
                },
                title: {
                    text: this.title
                },
                subtitle: {
                    text: this.subtitle
                }

            });
        }
    };

}(typeof exports !== 'undefined' && exports || this);