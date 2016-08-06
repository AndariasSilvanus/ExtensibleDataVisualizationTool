/**
 * Created by Andarias Silvanus on 16/06/07.
 */

!function (exports){
    'use strict';

    // tar yg generate 'series' ma 'drilldown' siapa ya? worksheet / controller? --> worksheet
    // worksheet yang akan tampung (generate) data, generate series, generate drilldown
    // tar setiap kali ada perubahan di row / column, bakal coba generate series / drilldown ya?

    // Polyfill
    if (!Array.prototype.includes) {
        Array.prototype.includes = function(searchElement /*, fromIndex*/ ) {
            'use strict';
            var O = Object(this);
            var len = parseInt(O.length, 10) || 0;
            if (len === 0) {
                return false;
            }
            var n = parseInt(arguments[1], 10) || 0;
            var k;
            if (n >= 0) {
                k = n;
            } else {
                k = len + n;
                if (k < 0) {k = 0;}
            }
            var currentElement;
            while (k < len) {
                currentElement = O[k];
                if (searchElement === currentElement ||
                    (searchElement !== searchElement && currentElement !== currentElement)) { // NaN !== NaN
                    return true;
                }
                k++;
            }
            return false;
        };
    }

    // Create worksheet 'class'
    function worksheet () {
        this.dimensionContainer = [];
        this.measureContainer = [];
        this.drillDownArr = [];
        this.stateDrillDown = "";
        this.chart = new myChart();
        this.data = [];
        this.arrayResDD = [];
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
        getDrillDown: function() {
            return this.drillDownArr;
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
        popDrillDown: function (index) {
            this.drillDownArr.splice(index, 1);
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
        getData: function (idxDrillDown, chart_type) {
            // generate series to be used in highchart

            var self = this;
            var newDimensionContainer = [];

            for (var i=0; i<this.dimensionContainer.length; i++) {
                if (i != idxDrillDown)
                    newDimensionContainer.push(this.dimensionContainer[i]);
                else
                    newDimensionContainer.push(this.drillDownArr[0]);
            }

            if ((chart_type != 'scatter') && (chart_type != 'bubble'))
                var url = "api/getDataSeries";
            else
                var url = "api/getDataRaw";

            return $.ajax({
                url: url,
                async: false,
                type: "get", //send it through get method
                data: {
                    dimensionContainer: newDimensionContainer,
                    measureContainer: self.measureContainer
                },
                success: function (response) {
                    if ((self.chart.dimensionQuantity == self.dimensionContainer.length) && (self.chart.measureQuantity == self.measureContainer.length)) {
                        // generateSeries executed when quantity of measure & dimension specified in chart match to dimension & measure total in container
                        self.data = response;
                        console.log("getData response");
                        console.log(response);
                        console.log(self.data);
                    }
                },
                error: function (xhr) {
                    alert("Error occured when generate data series, error message: " + xhr.responseText);
                    //console.log (xhr.responseText);
                }
            });
        },
        generateBarSeries: function (dimContainer, dimension_key, measure_key, data, drilldown, upperlevel, valListValue) {
            var series = [];
            function obj_series_class () {
                this.name = "";
                this.data = [];
            }
            var obj_series = new obj_series_class();
            var listValueDim = [];

            if (upperlevel == "rootLevelInDimension")
                obj_series.id = "root";
            else
                obj_series.id = valListValue + upperlevel;

            var dimKey;
            if (drilldown == -1) {
                // not drilldown
                for (var j = 0; j < dimContainer.length; j++) {
                    for (var i = 0; i < data.length; i++) {
                        obj_series.data.push({
                            name: data[i][dimension_key],
                            y: parseInt(data[i][measure_key], 10)
                        });
                    }
                    obj_series.name = dimContainer[j].data;
                    series.push(obj_series);
                    //obj_series.data = [];
                    obj_series = new obj_series_class();
                }
                //dimKey = dimContainer[0].data;
            }
            else {
                // drilldown mode
                for (var j = 0; j < dimContainer.length; j++) {
                    for (var i = 0; i < data.length; i++) {
                        listValueDim.push(data[i][dimension_key]);
                        obj_series.data.push({
                            name: data[i][dimension_key],
                            y: parseInt(data[i][measure_key], 10),
                            drilldown: data[i][dimension_key] + valListValue
                        });
                    }
                    obj_series.name = dimContainer[j].data;
                    series.push(obj_series);
                    //obj_series.data = [];
                    obj_series = new obj_series_class();
                }

                //dimKey = this.drillDownArr[0].data;
            }
            var categories = [];

            for (var i=0; i<data.length; i++) {
                // this.data contains array of object {dimension, measure}
                categories.push(data[i][dimension_key]);
            }
            var res = {
                series: series,
                //categories: categories,
                listValue: listValueDim  // contains id name for drilldown
            };
            return res;
            //return series;
        },
        generate4Bar: function(idxDrillDown) {
            // valid for chart type: bar, line, column
            // 1 dimension 1 column
            // each row record is dimension unique

            //var series = [];
            //var obj_series = {
            //    name: "",
            //    data: []
            //};
            //var categories = [];
            //
            //var dimension_key = this.dimensionContainer[0].data;
            //var measure_key = this.measureContainer[0].data;
            //
            //for (var i=0; i<this.data.length; i++) {
            //    // this.data contains array of object {dimension, measure}
            //
            //    categories.push(this.data[i][dimension_key]);   // Category harusnya ga smuanya di-push, tp yg unique value aja ---- kayanya semua recordnya udah unique deh gara2 udah di-groupby
            //    obj_series.data.push({
            //        y: parseInt(this.data[i][measure_key], 10)
            //    });
            //}
            //obj_series.name = dimension_key;
            //series.push(obj_series);
            //
            //var res = {
            //    series: series,
            //    categories: categories
            //};
            //return res;

            var categories = [];

            if (idxDrillDown == -1)
                var dimension_key = this.dimensionContainer[0].data;
            else
                var dimension_key = this.drillDownArr[0].data;
            //var dimension_key = this.dimensionContainer[0].data;

            var measure_key = this.measureContainer[0].data;
            var upperLevel = "rootLevelInDimension";
            var valListValue = "root";
            var res = this.generateBarSeries(this.dimensionContainer, dimension_key, measure_key, this.data, idxDrillDown, upperLevel, valListValue);

            //for (var i=0; i<this.data.length; i++) {
            //    // this.data contains array of object {dimension, measure}
            //    categories.push(this.data[i][dimension_key]);
            //}
            //var res = {
            //    series: series,
            //    categories: categories
            //};
            return res;
        },
        generatePieSeries: function(dimension_key, measure_key, data, drilldown, upperlevel, valListValue) {
            // drilldown = index drilldown in dimension container

            var series = [];
            function obj_series_class () {
                this.id = "";
                this.name = "";
                this.data = [];
            }

            var obj_series = new obj_series_class();
            var listValueDim = [];

            if (upperlevel == "rootLevelInDimension")
                obj_series.id = "root";
            else
                obj_series.id = valListValue + upperlevel;

            if (drilldown == -1) {
                for (var i=0; i<data.length; i++) {
                    obj_series.data.push({
                        name: data[i][dimension_key],
                        y: parseInt(data[i][measure_key], 10)
                    });
                }
                obj_series.name = dimension_key;
                series.push(obj_series);
                var res = {
                    series: series
                };
                return res;
            }
            else {
                // start debugging
                console.log("data from generate4pieSeries");
                console.log(data);
                console.log("dimension_key: " + dimension_key);
                console.log("measure_key: " + measure_key);
                // end debugging

                for (var i=0; i<data.length; i++) {
                    listValueDim.push(data[i][dimension_key]);
                    obj_series.data.push({
                        name: data[i][dimension_key],
                        y: parseInt(data[i][measure_key], 10),
                        drilldown: data[i][dimension_key] + valListValue
                    });
                }
                obj_series.name = dimension_key;
                series.push(obj_series);
                var res = {
                    series: series,
                    listValue: listValueDim  // contains id name for drilldown
                };
                return res;
            }
        },
        generate4Pie: function(idxDrillDown) {
            // valid for chart type: pie
            // 1 dimension 1 column
            // each row record is dimension unique
            //var series = [];
            //var obj_series = {
            //    name: "",
            //    data: []
            //};
            //
            //var dimension_key = this.dimensionContainer[0].data;
            //var measure_key = this.measureContainer[0].data;
            //
            //for (var i=0; i<this.data.length; i++) {
            //    obj_series.data.push({
            //        name: this.data[i][dimension_key],
            //        y: parseInt(this.data[i][measure_key], 10)
            //    });
            //}
            //obj_series.name = dimension_key;
            //series.push(obj_series);
            //var res = {
            //    series: series
            //};
            //return res;

            if (idxDrillDown == -1)
                var dimension_key = this.dimensionContainer[0].data;
            else
                var dimension_key = this.drillDownArr[0].data;
            var measure_key = this.measureContainer[0].data;
            var upperLevel = "rootLevelInDimension";
            var valListValue = "root";
            var res = this.generatePieSeries(dimension_key, measure_key, this.data, idxDrillDown, upperLevel, valListValue);
            return res;
        },
        generateScatterSeries: function(dimension_key, measure_key, data, drilldown, upperlevel, valListValue) {
            // 1 dimension 2 measure
            // used raw data

            var series = [];
            function obj_series_class () {
                this.id = "";
                this.name = "";
                this.data = [];
            }

            var obj_series = new obj_series_class();
            var listValueDim = [];

            if (upperlevel == "rootLevelInDimension")
                obj_series.id = "root";
            else
                obj_series.id = valListValue + upperlevel;

            var listValue = this.generateListValue11(data, dimension_key);

            if (drilldown == -1) {
            // not drilldown mode
                for (var i=0; i<listValue.length; i++) {
                    for (var j=0; j<data.length; j++) {
                        if (data[j][dimension_key] == listValue[i]) {
                            obj_series.data.push({
                                name: data[j][dimension_key],
                                x: parseInt(data[j][measure_key[0]], 10),
                                y: parseInt(data[j][measure_key[1]], 10)
                            });
                        }
                    }
                    obj_series.name = listValue[i];
                    series.push(obj_series);
                    obj_series = new obj_series_class();
                }
            }
            else {
            // drilldown mode
                for (var i=0; i<listValue.length; i++) {
                    listValueDim.push(data[i][dimension_key]);
                    for (var j=0; j<data.length; j++) {
                        if (data[j][dimension_key] == listValue[i]) {
                            obj_series.data.push({
                                name: data[j][dimension_key],
                                x: parseInt(data[j][measure_key[0]], 10),
                                y: parseInt(data[j][measure_key[1]], 10),
                                drilldown: data[i][dimension_key] + valListValue
                            });
                        }
                    }
                    obj_series.name = listValue[i];
                    series.push(obj_series);
                    obj_series = new obj_series_class();
                }
            }
            var res = {
                series: series,
                listValue: listValueDim  // contains id name for drilldown
            };
            return res;
        },
        generate4Scatter: function(idxDrillDown) {
            if (idxDrillDown == -1)
                var dimension_key = this.dimensionContainer[0].data;
            else
                var dimension_key = this.drillDownArr[0].data;

            var measure_key = [this.measureContainer[0].data, this.measureContainer[1].data];
            var upperLevel = "rootLevelInDimension";
            var valListValue = "root";

            var res = this.generateScatterSeries(dimension_key, measure_key, this.data, idxDrillDown, upperLevel, valListValue);
            return res;
        },
        generateColumnRangeSeries: function(dimension_key, measure_key, data, drilldown, upperlevel, valListValue) {
            // 1 dimension 2 measure
            // used raw data

            var series = [];
            function obj_series_class () {
                this.id = "";
                this.name = "";
                this.data = [];
            }

            var obj_series = new obj_series_class();
            var listValueDim = [];

            if (upperlevel == "rootLevelInDimension")
                obj_series.id = "root";
            else
                obj_series.id = valListValue + upperlevel;

            var listValue = this.generateListValue11(data, dimension_key);

            if (drilldown == -1) {
                // not drilldown mode
                for (var j=0; j<data.length; j++) {
                    var tmpArr = [parseInt(data[j][measure_key[0]], 10), parseInt(data[j][measure_key[1]], 10)];
                    obj_series.data.push(tmpArr);
                    obj_series.name = dimension_key;
                }
                series.push(obj_series);
            }
            else {
                // drilldown mode
                alert ("This chart type is not supported for drilldown mode");
            }
            var res = {
                series: series,
                listValue: listValueDim  // contains id name for drilldown
            };
            return res;
        },
        generate4ColumnRange: function(idxDrillDown) {
            if (idxDrillDown == -1)
                var dimension_key = this.dimensionContainer[0].data;
            else
                var dimension_key = this.drillDownArr[0].data;

            var measure_key = [this.measureContainer[0].data, this.measureContainer[1].data];
            var upperLevel = "rootLevelInDimension";
            var valListValue = "root";

            var res = this.generateColumnRangeSeries(dimension_key, measure_key, this.data, idxDrillDown, upperLevel, valListValue);
            return res;
        },
        generateBubbleSeries: function(dimension_key, measure_key, data, drilldown, upperlevel, valListValue) {
            // 1 dimension 2 measure
            // used raw data

            var series = [];
            function obj_series_class () {
                this.id = "";
                this.name = "";
                this.data = [];
            }

            var obj_series = new obj_series_class();
            var listValueDim = [];

            if (upperlevel == "rootLevelInDimension")
                obj_series.id = "root";
            else
                obj_series.id = valListValue + upperlevel;

            var listValue = this.generateListValue11(data, dimension_key);
            console.log("listValue");
            console.log(listValue);
            console.log("data");
            console.log(data);

            if (drilldown == -1) {
                // not drilldown mode
                for (var i=0; i<listValue.length; i++) {
                    for (var j=0; j<data.length; j++) {
                        if (data[j][dimension_key] == listValue[i]) {
                            obj_series.data.push({
                                name: data[j][dimension_key],
                                x: parseInt(data[j][measure_key[0]], 10),
                                y: parseInt(data[j][measure_key[1]], 10),
                                z: parseInt(data[j][measure_key[2]], 10)
                            });
                        }
                    }
                    obj_series.name = listValue[i];
                    series.push(obj_series);
                    obj_series = new obj_series_class();
                }
            }
            else {
                // drilldown mode
                for (var i=0; i<listValue.length; i++) {
                    listValueDim.push(data[i][dimension_key]);
                    for (var j=0; j<data.length; j++) {
                        if (data[j][dimension_key] == listValue[i]) {
                            obj_series.data.push({
                                name: data[j][dimension_key],
                                x: parseInt(data[j][measure_key[0]], 10),
                                y: parseInt(data[j][measure_key[1]], 10),
                                z: parseInt(data[j][measure_key[2]], 10),
                                drilldown: data[i][dimension_key] + valListValue
                            });
                        }
                    }
                    obj_series.name = listValue[i];
                    series.push(obj_series);
                    obj_series = new obj_series_class();
                }
            }
            var res = {
                series: series,
                listValue: listValueDim  // contains id name for drilldown
            };
            return res;
        },
        generate4Bubble: function(idxDrillDown) {
            if (idxDrillDown == -1)
                var dimension_key = this.dimensionContainer[0].data;
            else
                var dimension_key = this.drillDownArr[0].data;

            var measure_key = [this.measureContainer[0].data, this.measureContainer[1].data, this.measureContainer[2].data];
            var upperLevel = "rootLevelInDimension";
            var valListValue = "root";

            var res = this.generateBubbleSeries(dimension_key, measure_key, this.data, idxDrillDown, upperLevel, valListValue);
            return res;
        },
        generateListValue11: function (data, drillDownName) {
            // get distinct column value on data

            var listValue = [];
            var DM = this.diferentiateDimMea(data);
            //var dimension = DM.dimension[0];
            // untuk buat jadi bisa generate ga ke hanya 1 dimension aja, mungkin perlu diiterasi?
            // mis:
            var dimension;
            for (var i=0; i<DM.dimension.length; i++) {
                if (DM.dimension[i] == drillDownName)
                    dimension = DM.dimension[i];
            }


            //var temp = {};
            //for (var i = 0; i < data.length; i++)
            //    temp[data[i][dimension]] = true;
            //for (var k in temp)
            //    listValue.push(k);

            for (var i = 0; i<data.length; i++) {
                if (!listValue.includes(data[i][dimension]))
                    listValue.push(data[i][dimension]);
            }
            //console.log("from generate list value");
            //console.log(listValue);
            //console.log(data);
            //console.log("dimension: " + dimension);
            //console.log("diferentiateDimMea");
            //console.log(DM);

            return listValue;
        },
        drillDown11: function(data, listVal, chart_type) {
            // drilldown for 1 dimension & 1 measure

            //var listVal = this.generateListValue11(data);   // listVal contains list of 'category' on upper level of drilldown dimension
            var drillDownLevel = 1; // is drillDown level (index) on this.drillDownArr array
            this.arrayResDD = [];
            var upperLevel = "root";
            var drillDownValArr = [];
            this.drillDownRecursive11(listVal, drillDownLevel, upperLevel, drillDownValArr, chart_type);
        },
        drillDownRecursive11: function (listValue, drillDownLevel, upperLevel, drillDownValArr, chart_type) {

            var drillDownName   = this.drillDownArr[drillDownLevel].data;
            var dimensionCol = [];
            for (var i=0; i<drillDownLevel; i++) {
                dimensionCol.push(this.drillDownArr[i].data);
            }
            //var measureCol      = this.measureContainer[0].data;
            var measureCol      = [];
            for (var i=0; i<this.measureContainer.length; i++) {
                measureCol.push(this.measureContainer[i].data);
            }
            var arrayTmpSeries  = [];
            var dataDD          = [];
            var newListValue    = [];

            var self = this;
            function getDataDrillDown(drillDownName, dimensionCol, dimensionVal, measureCol, chart_type) {
                console.log("dimensionCol Arrayy");
                console.log(dimensionCol);
                console.log("dimensionVal Arrayy");
                console.log(dimensionVal);

                if ((chart_type != 'scatter') && (chart_type != 'bubble'))
                    var url = "api/getDrillDown";
                else
                    var url = "api/getDrillDownRaw";

                return $.ajax({
                    url: url,
                    async: false,
                    type: "get", //send it through get method
                    data: {
                        drilldownName: drillDownName,
                        dimensionName: dimensionCol,
                        dimensionVal: dimensionVal,
                        measure: measureCol
                    },
                    success: function (response) {
                        dataDD = response;
                        newListValue = self.generateListValue11(dataDD, drillDownName);
                    },
                    error: function (xhr) {
                        alert("Error occured when generate data series for drilldown, error message: " + xhr.responseText);
                        //console.log (xhr.responseText);
                    }
                });
            }

            var objDD = {};
            var upperLevel_ = upperLevel;

            for (var i=0; i<listValue.length; i++) {
                var dimensionValue = listValue[i];
                var drillDownValArr2 = drillDownValArr.slice();
                drillDownValArr2.push(dimensionValue);

                getDataDrillDown(drillDownName, dimensionCol, drillDownValArr2, measureCol, chart_type).done(function () {

                    var dimensionVal = drillDownValArr2[drillDownValArr2.length-1];
                    var resDiff = self.diferentiateDimMea(dataDD);
                    var dimension_key = resDiff.dimension[0];
                    var measure_key = resDiff.measure[0];
                    //var idxDrillDown = 1;   // dummy data for mark as drilldown mode
                    var idxDrillDown = drillDownLevel;   // dummy data for mark as drilldown mode
                    objDD = self.generatePieSeries(dimension_key, measure_key, dataDD, idxDrillDown, upperLevel_, dimensionVal);

                    var newUpperLevel = dimensionVal;
                    console.log(newListValue);
                    if (drillDownLevel < (self.drillDownArr.length-1)) {
                        self.drillDownRecursive11(newListValue, drillDownLevel + 1, newUpperLevel, drillDownValArr2);
                    }
                    console.log("result generatePieSeries from inside drilldown");
                    console.log(objDD);
                    arrayTmpSeries.push(objDD);
                });
            }

            this.arrayResDD.push(arrayTmpSeries);
        },
        diferentiateDimMea: function(data) {
            var res = {
                measure: [],
                dimension: []
            };

            var getKeys = function(obj){
                var keys = [];
                for (var key in obj) {keys.push(key);}
                return keys;
            };
            var arr = getKeys(data[0]);

            //var forEfficient = {
            //    smallestLen: 0,
            //    container: [],
            //    type: ""
            //};
            //if (this.dimensionContainer.length > this.measureContainer.length) {
            //    forEfficient.smallestLen = this.measureContainer.length;
            //    forEfficient.container = this.measureContainer;
            //    forEfficient.type = "measure";
            //}
            //else {
            //    forEfficient.smallestLen = this.dimensionContainer.length;
            //    forEfficient.container = this.dimensionContainer;
            //    forEfficient.type = "dimension";
            //}
            //
            //console.log("forEfficient from diferentiate");
            //console.log(forEfficient);
            //
            //var j = 0;
            //for (var i=0; i<arr.length; i++) {
            //    var found = false;
            //    while (j<forEfficient.smallestLen && !found) {
            //        if (arr[i] == forEfficient.container[j].data) {
            //            found = true;
            //            if (forEfficient.type == "measure") res.measure.push(arr[i]);
            //            else res.dimension.push(arr[i]);
            //        }
            //        else
            //            j++;
            //    }
            //    if (!found) {
            //        if (forEfficient.type=="measure") res.dimension.push(arr[i]);
            //        else res.measure.push(arr[i]);
            //    }
            //}

            for (var i=0; i<arr.length; i++) {
                var found = false;
                var j = 0;
                while (j<this.measureContainer.length && !found) {
                    if (arr[i] == this.measureContainer[j].data) {
                        found = true;
                        res.measure.push(arr[i]);
                    }
                    else
                        j++;
                }
                if (!found) {
                    res.dimension.push(arr[i]);
                }
            }

            return res;
        },
        drawChart: function(chart_type, idxDrillDown) {
            // idxDrillDown == -1 => not drilldown mode, else => drilldown mode
            // idxDrillDown is drilldown index on dimension container

            var self = this;
            this.getData(idxDrillDown, chart_type).done(function () {

                var res = {};
                chart_type = chart_type.toLowerCase();

                function addDrilldown(listValue, chart_type) {
                    self.drillDown11(self.data, listValue, chart_type);
                    var drillDown = self.arrayResDD;
                    var drillDownHighchart = {
                        series: []
                    };

                    for (var i=0; i<drillDown.length; i++) {
                        for (var j=0; j<drillDown[i].length; j++) {

                            var obj = drillDown[i][j].series;

                            drillDownHighchart.series.push({
                                id: obj[0].id,
                                name: obj[0].name,
                                data: obj[0].data
                            });
                        }
                    }
                    self.chart.highchart.drilldown = drillDownHighchart;
                }

                if ((chart_type == 'bar') ||
                    (chart_type == 'line') ||
                    (chart_type == 'column') ||
                    (chart_type == 'funnel') ||
                    (chart_type == 'waterfall') ||
                    (chart_type == 'pyramid') ||
                    (chart_type == 'spline')) {

                    res = self.generate4Bar(idxDrillDown);
                    self.chart.highchart.series = res.series;
                    if (chart_type != 'funnel') {
                        if (self.chart.highchart.xAxis != null)
                            self.chart.highchart.xAxis.type = 'category';
                        else
                            self.chart.highchart.xAxis = {type: 'category'};
                    }
                    //self.chart.highchart.xAxis.categories = res.categories;

                    if (idxDrillDown != -1) {
                        // add drilldown attribute to self.chart.highchart
                        addDrilldown(res.listValue, chart_type);
                    }
                }
                else if (chart_type == 'pie') {
                    res = self.generate4Pie(idxDrillDown);
                    console.log("result from generate4pie");
                    console.log(res);
                    self.chart.highchart.series = res.series;
                    if (idxDrillDown != -1) {
                        // add drilldown attribute to self.chart.highchart
                        addDrilldown(res.listValue, chart_type);
                    }
                }
                else if (chart_type == 'area') {
                }
                else if (chart_type == 'scatter') {
                    res = self.generate4Scatter(idxDrillDown);
                    self.chart.highchart.series = res.series;

                    if (idxDrillDown != -1) {
                        // add drilldown attribute to self.chart.highchart
                        addDrilldown(res.listValue, chart_type);
                    }
                }
                else if (chart_type == 'columnrange') {
                    res = self.generate4ColumnRange(idxDrillDown);
                    self.chart.highchart.series = res.series;
                }
                else if (chart_type == 'treemap') {
                }
                else if ((chart_type == 'bubble') || (chart_type == 'heatmap')) {
                    res = self.generate4Bubble(idxDrillDown);
                    self.chart.highchart.series = res.series;

                    if (idxDrillDown != -1) {
                    // add drilldown attribute to self.chart.highchart
                        addDrilldown(res.listValue, chart_type);
                    }
                }

                self.chart.highchart.title = {};
                self.chart.highchart.subtitle = {};
                console.log("hasil chart");
                console.log(self.chart.highchart);
                self.drawChartContainer(self.chart.highchart);
            });
        },
        drawChartContainer: function (highchart) {
            $('#chartContainer').highcharts(highchart);
        },
        generateDrilldown: function () {
            // generate drilldown to be used in highchart
        }
    };

    exports.worksheet = worksheet;

}(typeof exports !== 'undefined' && exports || this);