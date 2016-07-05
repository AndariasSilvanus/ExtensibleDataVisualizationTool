-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jul 05, 2016 at 02:48 PM
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
(1, 'http://localhost/optikos/asset/img/bar.png', 1, 1, 'http://localhost/optikos/asset/js/worksheet/chart/bar.js', 'bar'),
(2, 'http://localhost/optikos/asset/img/column.png', 1, 1, 'http://localhost/optikos/asset/js/worksheet/chart/column.js', 'column'),
(3, 'http://localhost/optikos/asset/img/line.png', 1, 1, 'http://localhost/optikos/asset/js/worksheet/chart/line.js', 'line'),
(4, 'http://localhost/optikos/asset/img/pie.png', 1, 1, 'http://localhost/optikos/asset/js/worksheet/chart/pie.js', 'pie');

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
