<?php

/**
 * Created by PhpStorm.
 * User: Andarias Silvanus
 * Date: 16/06/02
 * Time: 11:55 PM
 */
class Api_model extends CI_Model {
    // specify own database credentials
    private $host = "localhost";
    private $db_name = "extensibleVisualization";
    private $username = "root";
    private $conn;
    private $password = "";
    private $tabledb;

    public function __construct() {
        parent::__construct();
        $this->tabledb = new TableDB;
        $this->conn = null;
    }

    public function get_table($tableName) {
        $query = $this->db->get($tableName);
        return $query->result();
    }

    public function delete_table($tableName) {
        echo "\ntableName yg mw didelete: ".$tableName;
        $query = $this->db->empty_table($tableName);
        echo "\nresult delete: ".$query;
        return $query;
    }

    public function insert_table($tableName, $data){
        $query = $this->db->insert($tableName, $data);
        return $query;
    }

    private function connect(){
        $this->conn = mysqli_connect($this->host, $this->username, $this->password, $this->db_name);
        if (mysqli_connect_errno()){
            // can't connect to mySQL
        }
        return $this->conn;
    }

    private function destroyConn(){
        mysqli_close($this->conn);
    }

    public function setData($data) {
        $this->tabledb->setData($data);
    }

    public function getData() {
        return $this->tabledb->getData();
    }

    public function invokeCreateTable() {
        $_SESSION["tableName"] = $this->generateString(50);
        $this->tabledb->setColumnName(array_keys($this->tabledb->getData()[0]));
        $dataExample = $this->tabledb->getData()[0];
        $dataExample = array_values($dataExample);
        return ($this->createTable($_SESSION["tableName"], $this->tabledb->getColumnName(), $dataExample));
    }

    private function generateString($length){
        $charset = "abcdefghijklmnopqrstuvwxyz0123456789";
        $key = "";
        for($i=0; $i<$length; $i++)
            $key .= $charset[(mt_rand(0,(strlen($charset)-1)))];
        return $key;
    }

    private function createTable($tableName, $columnName, $dataExample) {

        if ($this->connect()) {
            // Build mySQL query to create table
            $query = 'CREATE TABLE IF NOT EXISTS `' . $tableName . '`(';
            $numItems = count($columnName);
            $i = 0;

            // Dimension/Measure session preparation
            $dimensionArr = array();
            $measureArr = array();
            $measureTypeArr = array();

            foreach ($columnName as $col) {
                if (ctype_digit($dataExample[$i])) {
                    $query = $query . '`' . $col . '` INT NOT NULL';
                    array_push($measureArr, $col);
                    array_push($measureTypeArr, "SUM");
                }
                else {
                    $query = $query . '`' . $col . '` TEXT NOT NULL';
                    array_push($dimensionArr, $col);
                }

                $i++;
                if ($i != $numItems) // not last index
                    $query = $query . ',';
                else
                    $query = $query . ')';
            }

            // Push column name to Dimension/Measure session
            $_SESSION["dimension"] = $dimensionArr;
            $_SESSION["measure"] = $measureArr;
            $_SESSION["measure_type"] = $measureTypeArr;

            // Insert query to database
            $result = mysqli_query($this->conn, $query);
            echo "\nQUERY: ".$query;
            echo "\nResult: ".$result;
            $this->destroyConn();

            if ($result) return TRUE;
            else return FALSE;
        }
        else return FALSE;
    }

    public function deleteTable($tableName) {
        if ($this->connect()) {
            $query = "DROP table ".$tableName;

            // Insert query to database
            $result = mysqli_query($this->conn, $query);
            echo "\nQUERY: ".$query;
            echo "\nResult: ".$result;
            $this->destroyConn();

            if ($result) return TRUE;
            else return FALSE;
        }
        else return FALSE;
    }

    public function insertData(){
        foreach ($this->tabledb->getData() as $row) {
            $res = $this->insert_table($_SESSION["tableName"],$row);
        }
    }

    public function getChartTable () {
        $query = $this->db->get('chart-table');
        return $query->result_array();
    }

    public function getDataSeries ($dimensionContainer, $measureContainer, $tableName) {
        foreach ($dimensionContainer as $val) {
            $this->db->select($val['data']);
        }
//        print_r($measureContainer);
        foreach ($measureContainer as $val) {
            $mini_query = $val['measure_type'];
            $mini_query .= '(' . $val['data'] . ') AS ' . $val['data'];    // ini kalo misal SUM, hasilnya jadi select (SUM(measure)), tp jalan ga? ato mending select_sum(measure)?
            $this->db->select($mini_query);
        }
        $this->db->from($tableName);
        foreach ($dimensionContainer as $val) {
            $this->db->group_by($val['data']);
        }

        $result = $this->db->get();
        if ($result == null) {
            return array();
        }
        else {
            return $result->result_array();
        }
    }

    public function getDataDrillDown ($drilldown, $dimensionName, $dimensionVal, $measure, $tableName) {
        $this->db->select($drilldown);
        $this->db->select($measure);
        $this->db->from($tableName);
        for ($i = 0; $i < count($dimensionVal); $i++) {
            $this->db->where($dimensionName[$i], $dimensionVal[$i]);
        }
//        $this->db->where($dimensionName, $dimensionVal); // 1 where is just for 1dim1mea, how about for many dimension or many measure?
        $this->db->group_by($drilldown);

        $result = $this->db->get();
        if ($result == null) {
            return array();
        }
        else {
            return $result->result_array();
        }
    }

    // Unused function
    private function insertTable($tableValue) {
        $query = 'INSERT INTO ' . $_SESSION["tableName"] . '(';

        $numItems = count($this->tabledb->getColumnName());
        $i = 0;
        foreach ($this->tabledb->getColumnName() as $col) {
            $query = $query . $col;
            if (++$i != $numItems) // not last index
                $query = $query . ',';
            else
                $query = $query . ') VALUES ';
        }

        $numItems = count($tableValue);
        $i = 0;
        foreach ($tableValue as $row) {
            $numItemsRow = count($row);
            $j = 0;
            foreach($row as $val) {
                $query = $query . '(' . $val;
                if (++$j != $numItemsRow) // not last index
                    $query = $query . ',';
                else
                    $query = $query . ')';
            }
            if (++$i != $numItems) // not last index
                $query = $query . ',';
        }

        // Insert query to database
        $result = mysqli_query($this->conn, $query);

        if ($result) return TRUE;
        else return FALSE;
    }

    private function getRecords($query) {
        $result = mysqli_query($this->conn, $query);

        if (!$result) {
            echo 'Could not run query: ' . mysql_error();
            exit;
        }

        $row = mysql_fetch_row($result);
        return $row;
    }
}

class TableDB {
    private $columnName;
    private $data;

    public function __construct() {
        $this->columnName = array();
    }

    public function getColumnName() {
        return $this->columnName;
    }

    public function setColumnName($colName) {
        $this->columnName = $colName;
    }

    public function getData() {
        return $this->data;
    }

    public function setData($data) {
        $this->data = $data;
    }
}