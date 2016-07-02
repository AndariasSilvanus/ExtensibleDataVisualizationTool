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
        this.columnList = [];
        this.rowList = [];
        this.drillDownArr = [];
        this.stateDrillDown = "";
        this.chart = new myChart();
        this.data = [];
    }

    worksheet.prototype = {
        constructor: worksheet,
        getColumn: function() {
            return this.columnList;
        },
        getRow: function() {
            return this.rowList;
        },
        pushColumn: function (dimensionOrMeasure) {
            this.columnList.push(dimensionOrMeasure);
        },
        pushRow: function (dimensionOrMeasure) {
            this.rowList.push(dimensionOrMeasure);
        },
        popColumn: function (index) {
            //var index = this.column.indexOf(dimensionOrMeasure);
            //if (index > -1) {
            //    this.column.splice(index, 1);
            //}
            this.columnList.splice(index, 1);
        },
        popRow: function (index) {
            //var index = this.row.indexOf(dimensionOrMeasure);
            //if (index > -1) {
            //    this.row.splice(index, 1);
            //}
            this.rowList.splice(index, 1);
        },
        createDrillDownDimension: function (dimension) {
            this.drillDownArr.push(dimension);
        },
        constructChart: function (objChart) {
            this.chart.setHighchart(objChart);
        },
        generateData: function () {
            if (this.column.length > 0) {

            }
        }
    };

    exports.worksheet = worksheet;

}(typeof exports !== 'undefined' && exports || this);