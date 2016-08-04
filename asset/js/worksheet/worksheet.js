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
        getData: function (idxDrillDown) {
            // generate series to be used in highchart

            var self = this;
            var newDimensionContainer = [];

            for (var i=0; i<this.dimensionContainer.length; i++) {
                if (i != idxDrillDown)
                    newDimensionContainer.push(this.dimensionContainer[i]);
                else
                    newDimensionContainer.push(this.drillDownArr[0]);
            }

            return $.ajax({
                url: "api/getDataSeries",
                async: false,
                type: "get", //send it through get method
                data: {
                    dimensionContainer: newDimensionContainer,
                    measureContainer: self.measureContainer
                },
                success: function(response) {
                    if ((self.chart.dimensionQuantity == self.dimensionContainer.length) && (self.chart.measureQuantity== self.measureContainer.length)) {
                        // generateSeries executed when quantity of measure & dimension specified in chart match to dimension & measure total in container
                        self.data = response;
                        console.log("getData response");
                        console.log(response);
                        console.log(self.data);
                    }
                },
                error: function(xhr) {
                    alert ("Error occured when generate data series, error message: " + xhr.responseText);
                    //console.log (xhr.responseText);
                }
            });
        },
        generateBarSeries: function (dimension_key, measure_key, data, drilldown) {
            var series = [];
            function obj_series_class () {
                this.name = "";
                this.data = [];
            }
            var obj_series = new obj_series_class();
            if (drilldown == -1) {
                // not drilldown
                for (var j = 0; j < dimension_key.length; j++) {
                    for (var i = 0; i < data.length; i++) {
                        obj_series.data.push({
                            y: parseInt(data[i][measure_key], 10)
                        });
                    }
                    obj_series.name = dimension_key[j].data;
                    series.push(obj_series);
                    //obj_series.data = [];
                    obj_series = new obj_series_class();
                }
            }
            else {
                // drilldown mode
                for (var j = 0; j < dimension_key.length; j++) {
                    for (var i = 0; i < data.length; i++) {
                        obj_series.data.push({
                            y: parseInt(data[i][measure_key], 10),
                            drilldown: data[i][dimension_key]
                        });
                    }
                    obj_series.name = dimension_key[j].data;
                    series.push(obj_series);
                    //obj_series.data = [];
                    obj_series = new obj_series_class();
                }
            }
            return series;
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
            var dimension_key = this.dimensionContainer[0].data;
            var measure_key = this.measureContainer[0].data;
            var series = this.generateBarSeries(this.dimensionContainer, measure_key, this.data, idxDrillDown);
            for (var i=0; i<this.data.length; i++) {
                // this.data contains array of object {dimension, measure}
                categories.push(this.data[i][dimension_key]);
            }
            var res = {
                series: series,
                categories: categories
            };
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
                        //drilldown: data[i][dimension_key]
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
        generateListValue11: function (data) {
            // get distinct column value on data

            var listValue = [];
            var DM = this.diferentiateDimMea(data);
            var dimension = DM.dimension[0];
            // untuk buat jadi bisa generate ga ke hanya 1 dimension aja, mungkin perlu diiterasi?
            // mis:
            //for (var i=0; i<DM.dimension.length; i++) {
            //    if (DM.dimension[i] == this.drillDownArr[idxDrilldown])
            //        dimension = DM.dimension[i];
            //}


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
        drillDown11: function(data, listVal) {
            // drilldown for 1 dimension & 1 measure

            // start debugging
            console.log("isi drilldown array");
            console.log(this.drillDownArr);
            // end debugging

            //var listVal = this.generateListValue11(data);   // listVal contains list of 'category' on upper level of drilldown dimension
            var drillDownLevel = 1; // is drillDown level (index) on this.drillDownArr array
            this.arrayResDD = [];
            var upperLevel = "root";
            //this.arrayResDD.push(this.drillDownRecursive11(listVal, drillDownLevel, upperLevel));
            var drillDownValArr = [];
            this.drillDownRecursive11(listVal, drillDownLevel, upperLevel, drillDownValArr);
            //return arrayResDD;
        },
        drillDownRecursive11: function (listValue, drillDownLevel, upperLevel, drillDownValArr) {

            var drillDownName   = this.drillDownArr[drillDownLevel].data;
            //var drillDownName = [];
            //for (var i=1; i<=drillDownLevel; i++) {
            //    drillDownName.push(this.drillDownArr[i].data);
            //}

            //var dimensionCol    = this.drillDownArr[drillDownLevel - 1].data;
            var dimensionCol = [];
            for (var i=0; i<drillDownLevel; i++) {
                dimensionCol.push(this.drillDownArr[i].data);
            }
            var measureCol      = this.measureContainer[0].data;
            var arrayTmpSeries  = [];
            var dataDD          = [];
            var newListValue    = [];

            var self = this;
            function getDataDrillDown(drillDownName, dimensionCol, dimensionVal, measureCol) {
                console.log("dimensionCol Arrayy");
                console.log(dimensionCol);
                console.log("dimensionVal Arrayy");
                console.log(dimensionVal);

                return $.ajax({
                    url: "api/getDrillDown",
                    async: false,
                    type: "get", //send it through get method
                    data: {
                        drilldownName: drillDownName,
                        dimensionName: dimensionCol,
                        dimensionVal : dimensionVal,
                        measure      : measureCol
                    },
                    success: function(response) {
                        dataDD = response;
                        newListValue = self.generateListValue11(dataDD);
                    },
                    error: function(xhr) {
                        alert ("Error occured when generate data series for drilldown, error message: " + xhr.responseText);
                        //console.log (xhr.responseText);
                    }
                });
            }

            var objDD = {};
            var upperLevel_ = upperLevel;

            for (var i=0; i<listValue.length; i++) {
                var dimensionValue = listValue[i];
                var drillDownValArr2 = drillDownValArr.slice();
                drillDownValArr2.push(dimensionValue); // ya iya atuh ini kan looping jd elemnya di push2 di 1 array, butuh buat tree?

                console.log("============================");
                //console.log(drillDownValArr);
                console.log(dimensionCol);
                console.log(drillDownValArr2);
                console.log("============================");

                getDataDrillDown(drillDownName, dimensionCol, drillDownValArr2, measureCol, drillDownLevel).done(function () {
                    //console.log("from inside drilldown, loop getDataDrillDown with index " + i);
                    //console.log("drillDownName: " + drillDownName);
                    //console.log("dimensionCol: " + dimensionCol);
                    //console.log("dimensionVal: " + dimensionVal);
                    //console.log("measureCol: " + measureCol);
                    //console.log("idxDrillDown: " + drillDownLevel);

                    var dimensionVal = drillDownValArr2[drillDownValArr2.length-1];
                    var resDiff = self.diferentiateDimMea(dataDD);
                    var dimension_key = resDiff.dimension[0];
                    var measure_key = resDiff.measure[0];
                    //var idxDrillDown = 1;   // dummy data for mark as drilldown mode
                    var idxDrillDown = drillDownLevel;   // dummy data for mark as drilldown mode
                    objDD = self.generatePieSeries(dimension_key, measure_key, dataDD, idxDrillDown, upperLevel_, dimensionVal);
                    //var newUpperLevel = newListValue[i];
                    var newUpperLevel = dimensionVal;
                    console.log(newListValue);
                    if (drillDownLevel < (self.drillDownArr.length-1)) {
                        //console.log("newListValue:");
                        //console.log(newListValue);
                        //console.log("newUpperLevel: " + newUpperLevel);
                        //console.log("current drillDown level: " + drillDownLevel);
                        self.drillDownRecursive11(newListValue, drillDownLevel + 1, newUpperLevel, drillDownValArr2);
                    }
                    console.log("result generatePieSeries from inside drilldown");
                    console.log(objDD);
                    arrayTmpSeries.push(objDD);
                });
            }

            // rekursif masih salah, karena tidak buat tree dari listValue, masih ada yg missing juga: upperLevel_ blom di assign lagi di rekursif
            //if (drillDownLevel < (this.drillDownArr.length-1))
            //    this.drillDownRecursive11(newListValue, drillDownLevel+1, upperLevel_);
            //else
            //    return arrayTmpSeries;
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
            this.getData(idxDrillDown).done(function () {

                var res = {};
                chart_type = chart_type.toLowerCase();

                if ((chart_type == 'bar') || (chart_type == 'line') || (chart_type == 'column')) {
                    res = self.generate4Bar(idxDrillDown);
                    self.chart.highchart.series = res.series;
                    self.chart.highchart.xAxis.categories = res.categories;
                }
                else if (chart_type == 'pie') {
                    res = self.generate4Pie(idxDrillDown);
                    console.log("result from generate4pie");
                    console.log(res);
                    self.chart.highchart.series = res.series;
                    if (idxDrillDown != -1) {
                        // add drilldown attribute to self.chart.highchart

                        //var drillDown = self.drillDown11(self.data, res.listValue);
                        self.drillDown11(self.data, res.listValue);
                        var drillDown = self.arrayResDD;
                        console.log("drilldown result");
                        console.log(drillDown);
                        var drillDownHighchart = {
                            series: []
                        };

                        //function seriesClass () {
                        //    this.id = "";
                        //    this.name = "";
                        //    this.data = [];
                        //}
                        //var obj_tmp = seriesClass();

                        for (var i=0; i<drillDown.length; i++) {
                            for (var j=0; j<drillDown[i].length; j++) {

                                var obj = drillDown[i][j].series;
                                //console.log("series drilldown");
                                //console.log(obj);
                                //console.log(obj[0].name);

                                drillDownHighchart.series.push({
                                    id: obj[0].id,
                                    name: obj[0].name,
                                    data: obj[0].data
                                });
                                //obj_tmp.id = obj.id;
                                //obj_tmp.name = obj.name;
                                //obj_tmp.data = obj.data;
                                //drillDownHighchart.series.push(obj_tmp);
                                //obj_tmp = seriesClass();
                            }
                        }
                        self.chart.highchart.drilldown = drillDownHighchart;
                    }
                }
                else if (chart_type == 'area') {
                }
                else if (chart_type == 'scatter') {
                }
                else if (chart_type == 'treemap') {
                }
                else if ((chart_type == 'bubble') || (chart_type == 'heatmap')) {
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