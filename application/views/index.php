<?php
session_start();
$_SESSION["first"] = false;
$_SESSION["tableName"] = "";
?>

<!doctype html>
<html lang="en" ng-app="raw">
<head>
    <title>Optikós</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="Keywords" content="visualization,data,interface">

    <script>
        document.write('<base href="' + document.location + '" />');
    </script>

    <link rel="stylesheet" href="http://fonts.googleapis.com/css?family=Karla:400,400italic,700,700italic|Lato:400,700,900|Open+Sans:400,300,600,700,800|Roboto+Slab:400,300,100,700|Roboto:400,100,300,500,700,900&subset=latin,latin-ext"/>

    <link rel="stylesheet" href="asset/lib/bootstrap/dist/css/bootstrap.min.css"/>
    <link rel="stylesheet" type="text/css" href="asset/lib/angular-bootstrap-colorpicker/css/colorpicker.css">
    <link href="http://netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="asset/lib/codemirror/lib/codemirror.css">
    <link rel="stylesheet" href="asset/css/raw.css"/>
    <link rel="icon" href="favicon.ico?v=2" type="image/x-icon">
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">

</head>

<body data-spy="scroll" data-target="#raw-nav">

<nav class="navbar" role="navigation" id="raw-nav">
    <div class="container">

        <div class="navbar-header">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#raw-navbar">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="/#">Optikós</a>
        </div>

        <div class="collapse navbar-collapse navbar-right" id="raw-navbar">
            <ul class="nav navbar-nav">
                <li><a href="https://github.com/AndariasSilvanus/ExtensibleDataVisualizationTool">Github</a></li>
            </ul>
        </div>


    </div>
</nav>

<div ng-view class="wrap"></div>

<div id="footer">
    <div class="container">
        <div class="row">
            <div class="col-lg-6">
                <p><strong>RAW</strong> is a project by <a href="http://www.densitydesign.org">DensityDesign Lab</a></p>
                <p><a href="https://github.com/giorgiocaviglia">Giorgio Caviglia,</a> Michele Mauri, Giorgio Uboldi, Matteo Azzi</p>
                <p>&copy; 2013-2014 (<a href="https://raw.github.com/densitydesign/raw/master/LICENSE">LGPL License</a>)</p>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6">
                <p><a href="mailto:raw@densitydesign.org"><i class="fa fa-envelope breath-right"></i>raw@densitydesign.org</a></p>
                <p><a href="http://twitter.com/densitydesign"><i class="fa fa-twitter breath-right"></i>densitydesign</a></p>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6">
                <p><a href="http://github.com/densitydesign/raw"><i class="fa fa-github breath-right"></i>GitHub</a></p>
                <p><a href="https://groups.google.com/forum/?hl=en#!forum/densitydesign-raw"><i class="fa fa-google breath-right"></i>Google group</a></p>
            </div>
        </div>
    </div>
</div>

<!-- jquery -->
<script type="text/javascript" src="asset/lib/jquery/dist/jquery.min.js"></script>
<script type="text/javascript" src="asset/lib/jquery-ui/jquery-ui.min.js"></script>
<script type="text/javascript" src="asset/lib/jqueryui-touch-punch/jquery.ui.touch-punch.min.js"></script>
<!-- bootstrap -->
<script type="text/javascript" src="asset/lib/bootstrap/dist/js/bootstrap.min.js"></script>
<!--<script type="text/javascript" src="bower_components/mjolnic-bootstrap-colorpicker/js/bootstrap-colorpicker.js"></script>-->
<!-- d3 -->
<script type="text/javascript" src="asset/lib/d3/d3.min.js"></script>
<!-- codemirror -->
<script type="text/javascript" src="asset/lib/codemirror/lib/codemirror.js"></script>
<script type="text/javascript" src="asset/lib/codemirror/addon/display/placeholder.js"></script>
<!-- highcharts -->
<script type="text/javascript" src="asset/lib/highcharts/highcharts.js"></script>
<script type="text/javascript" src="asset/lib/highcharts/modules/treemap.js"></script>
<script type="text/javascript" src="asset/lib/highcharts/modules/heatmap.js"></script>

<!-- library -->
<script type="text/javascript" src="asset/js/dataProcessor.js"></script>

<!-- angular -->
<script type="text/javascript" src="asset/lib/angular/angular.min.js"></script>
<script type="text/javascript" src="asset/lib/angular-route/angular-route.min.js"></script>
<script type="text/javascript" src="asset/lib/angular-animate/angular-animate.min.js"></script>
<script type="text/javascript" src="asset/lib/angular-sanitize/angular-sanitize.min.js"></script>
<script type="text/javascript" src="asset/lib/angular-strap/dist/angular-strap.min.js"></script>
<script type="text/javascript" src="asset/lib/angular-ui/build/angular-ui.min.js"></script>
<script type="text/javascript" src="asset/lib/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js"></script>

<script src="asset/js/app.js"></script>
<script src="asset/js/service.js"></script>
<script src="asset/js/controller.js"></script>
<!--<script src="asset/js/filters.js"></script>-->
<!--<script src="asset/js/directives.js"></script>-->

<!-- google analytics -->
<!--<script src="asset/js/analytics.js"></script>-->

</body>
</html>
