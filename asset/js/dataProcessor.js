/**
 * Created by Andarias Silvanus on 16/05/26.
 */
!function (exports){
    'use strict';

    var dataProcessor = {
        measure : [],
        measure_type : [],
        dimension: []
    };

    dataProcessor.parser = function (delimiter) {

        // Parser from RAW densitydesignlab (https://github.com/densitydesign/raw)
        // Insiperd by Ben Nadel's algorithm
        // http://www.bennadel.com/blog/1504-ask-ben-parsing-csv-strings-with-javascript-exec-regular-expression-command.htm

        function parser(string) {
            if (!string || string.length === 0) return [];
            var delimiter = parser.delimiter || detectDelimiter(string),
                rows = [[]],
                match, matches,
                data = [],
                re = new RegExp((
                        "(\\" + delimiter + "|\\r?\\n|\\r|^)" +
                        "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                        "([^\"\\" + delimiter + "\\r\\n]*))"
                    ),"gi"
                );

            while (matches = re.exec(string)){
                match = matches[2] ? matches[2].replace(new RegExp( "\"\"", "g" ), "\"" ) : matches[3];
                //console.log(match,matches[2]);  // Print data cell per cell
                if (matches[1].length && matches[1] != delimiter ) rows.push([]);
                rows[rows.length - 1].push( match );
            }

            var header = rows[0];

            for (var i=1; i<rows.length; i++) {
                if (rows[i].length == 1 && rows[i][0].length == 0 && rows[i].length != header.length) continue;
                if(rows[i].length == header.length) {
                    var obj = {};
                    for (var h in header){
                        obj[header[h]] = rows[i][h];
                    }
                    data.push(obj);
                } else {
                    throw new ParseError(i);
                    return false;
                }
            }
            //console.log("return data");
            //console.log(data);
            return data;
        }

        function mode(array) {
            if(!arguments.length || array.length === 0) return null;
            var counter = {}, mode = array[0], max = 1;
            for(var i = 0; i < array.length; i++) {
                var el = array[i];
                if(counter[el] == null) counter[el] = 1;
                else counter[el]++;
                if(counter[el] > max) {
                    mode = el;
                    max = counter[el];
                }
            }
            return mode;
        }

        function sniff(objs) {
            var keys = {};
            d3.keys(objs[0]).forEach(function (d){ keys[d] = []; });
            objs.forEach(function(d){
                for(var key in keys) {
                    var type = dataProcessor.typeOf(d[key]);
                    if (type) keys[key].push(type);
                }
            });
            return keys;
        }

        function detectDelimiter(string){

            if (!arguments.length) return;

            var delimiters = [",",";","\t",":","|"],
                delimitersCount = delimiters.map(function (d){ return 0; }),
                header = string.split("\n")[0],
                character,
                quoted = false,
                firstChar = true;

            for (var i in header) {
                character = header[i];
                switch(character) {
                    case '"':
                        if (quoted) {
                            if (header[i+1] != '"') quoted = false;
                            else i++;
                        }
                        else if (firstChar) quoted = true;
                        break;

                    default:
                        if (quoted) break;
                        var index = delimiters.indexOf(character);
                        if (index !== -1) {
                            delimitersCount[index]++;
                            firstChar = true;
                            continue;
                        }
                        break;
                }
                if (firstChar) firstChar = false;
            }

            var maxCount = d3.max(delimitersCount);
            return maxCount == 0 ? '\0' : delimiters[delimitersCount.indexOf(maxCount)];
        }

        function ParseError(message) {
            this.name = "ParseError";
            this.message = message || "Sorry something went wrong while parsing your data.";
        }
        ParseError.prototype = new Error();
        ParseError.prototype.constructor = ParseError;

        parser.metadata = function(string){
            return d3.entries(sniff(parser(string))).map(function (d){
                return { key : d.key, type : mode(d.value) }
            })
        };

        parser.delimiter = delimiter;

        return parser;

    };

    dataProcessor.fillMeasure = function (measureJSON) {
        // belum dicoba, apakah measureArr yg dipassing dr PHP berupa JSON?
        // cek lagi line di bawah ini, emgnya bisa lsg di-assign measureArr dengan JSON.parse?
        var measureArr = JSON.parse(measureJSON);
        this.measure = measureArr;
    };

    dataProcessor.fillMeasureType = function (measureTypeJSON) {

    };

    dataProcessor.fillDimension = function (dimensionJSON) {

    };

    exports.dataProcessor = dataProcessor;

}(typeof exports !== 'undefined' && exports || this);