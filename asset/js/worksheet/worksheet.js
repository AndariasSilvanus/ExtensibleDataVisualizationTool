/**
 * Created by Andarias Silvanus on 16/06/07.
 */

!function (exports){
    'use strict';

    // Create worksheet 'class'
    function worksheet () {
        this.column = [];
        this.row = [];
        this.drillDownArr = [];
        this.stateDrillDown = "";
        // chart belum jadi atribut
    }

    worksheet.prototype = {
        constructor: worksheet,
        pushColumn: function (dimensionOrMeasure) {
            this.column.push(dimensionOrMeasure);
        },
        pushRow: function (dimensionOrMeasure) {
            this.row.push(dimensionOrMeasure);
        },
        popColumn: function (dimensionOrMeasure) {
            var index = this.column.indexOf(dimensionOrMeasure);
            if (index > -1) {
                this.column.splice(index, 1);
            }
        },
        popRow: function (dimensionOrMeasure) {
            var index = this.row.indexOf(dimensionOrMeasure);
            if (index > -1) {
                this.row.splice(index, 1);
            }
        },
        createDrillDownDimension: function (dimension) {
            this.drillDownArr.push(dimension);
        }
    };

    exports.worksheet = worksheet;

}(typeof exports !== 'undefined' && exports || this);