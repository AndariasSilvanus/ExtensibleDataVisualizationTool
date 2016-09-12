-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 08, 2016 at 07:25 PM
-- Server version: 10.1.9-MariaDB
-- PHP Version: 5.6.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `extensiblevisualization`
--

-- --------------------------------------------------------

--
-- Table structure for table `chart-table`
--

CREATE TABLE `chart-table` (
  `id` int(11) NOT NULL,
  `url-thumbnail` varchar(100) NOT NULL,
  `dimension-sum` int(11) NOT NULL,
  `measure-sum` int(11) NOT NULL,
  `url-js` varchar(100) NOT NULL,
  `type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `chart-table`
--

INSERT INTO `chart-table` (`id`, `url-thumbnail`, `dimension-sum`, `measure-sum`, `url-js`, `type`) VALUES
(1, 'http://localhost/optikos/asset/img/bar.png', 1, 1, 'asset/js/worksheet/chart/bar.js', 'bar'),
(3, 'http://localhost/optikos/asset/img/line.png', 1, 1, 'asset/js/worksheet/chart/line.js', 'line'),
(4, 'http://localhost/optikos/asset/img/pie.png', 1, 1, 'asset/js/worksheet/chart/pie.js', 'pie'),
(5, 'http://localhost/optikos/asset/img/funnel.png', 1, 1, 'asset/js/worksheet/chart/funnel.js', 'funnel'),
(6, 'http://localhost/optikos/asset/img/waterfall.jpg', 1, 1, 'asset/js/worksheet/chart/waterfall.js', 'waterfall'),
(7, 'http://localhost/optikos/asset/img/scatter.png', 1, 2, 'asset/js/worksheet/chart/scatter.js', 'scatter'),
(8, 'http://localhost/optikos/asset/img/columnrange.png', 1, 2, 'asset/js/worksheet/chart/columnrange.js', 'columnrange'),
(9, 'http://localhost/optikos/asset/img/bubble.jpg', 1, 3, 'asset/js/worksheet/chart/bubble.js', 'bubble'),
(10, 'http://localhost/optikos/asset/img/spline.png', 1, 1, 'asset/js/worksheet/chart/spline.js', 'spline'),
(11, 'http://localhost/optikos/asset/img/pyramid.png', 1, 1, 'asset/js/worksheet/chart/pyramid.js', 'pyramid'),
(12, 'http://localhost/optikos/asset/img/area.jpg', 1, 1, 'asset/js/worksheet/chart/area.js', 'area'),
(13, 'http://localhost/optikos/asset/img/heatmap.png', 1, 1, 'asset/js/worksheet/chart/heatmap.js', 'heatmap'),
(14, 'http://localhost/optikos/asset/img/treemap.png', 1, 1, 'asset/js/worksheet/chart/treemap.js', 'treemap'),
(15, 'http://localhost/optikos/asset/img/boxplot.png', 1, 1, 'asset/js/worksheet/chart/boxplot.js', 'boxplot'),
(16, 'http://localhost/optikos/asset/img/polar.png', 1, 4, 'asset/js/worksheet/chart/polar.js', 'polar'),
(17, 'http://localhost/optikos/asset/img/areaspline.png', 1, 1, 'asset/js/worksheet/chart/areaspline.js', 'areaspline'),
(18, 'http://localhost/optikos/asset/img/column.png', 1, 1, 'asset/js/worksheet/chart/column.js', 'column');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chart-table`
--
ALTER TABLE `chart-table`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chart-table`
--
ALTER TABLE `chart-table`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
