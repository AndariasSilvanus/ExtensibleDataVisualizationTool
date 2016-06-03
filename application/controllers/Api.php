<?php

/**
 * Created by PhpStorm.
 * User: Andarias Silvanus
 * Date: 16/05/26
 * Time: 5:46 PM
 */

// For debugging purpose
ini_set('display_errors', 'On');
error_reporting(E_ALL | E_STRICT);

defined('BASEPATH') OR exit('No direct script access allowed');
require APPPATH.'/libraries/REST_Controller.php';

class Api extends REST_Controller {
    // specify own database credentials
    private $host = "localhost";
    private $db_name = "extensibleVisualization";
    private $username = "root";
    private $password = "";

    // attribute
    private $tableName = "";
    private $columnName = array();
    public $conn;
    private $data;

    // constructor
//    function __construct() {
//        parent::__construct(); // Init parent contructor
//        if (isset($_GET['action']) && $_GET['action']=='add') {
//            $this->data = file_get_contents("php://input");
//            echo $this->data;
//        $this->connect();
//        }
//    }
	
	public function addData_post(){
		$this->data = json_decode(file_get_contents("php://input"), true);
        if (!empty($this->data) && !$this->data && isset($this->data)) {
//            $this->connect();

            if (!$this->tableName) {
                $this->invokeCreateTable();
                echo "table created";
            }
            else {
                $this->deleteTable();
                $this->tableName = empty($this->tableName);
                $this->columnName = empty($this->columnName);
                $this->invokeCreateTable();
                echo "table deleted";
            }
        }
	}
	
	public function addData_get(){
		echo "<h1>masuk add data!</h1>";
	}

    private function invokeCreateTable() {
        $this->tableName = $this->generateString(50);
        $this->columnName = array_keys($this->data[0]);
        $dataExample = $this->data[0];
        $this->createTable($this->tableName, $this->columnName, $dataExample);
    }

    private function generateString($length){
        $charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        $key = "";
        for($i=0; $i<$length; $i++)
            $key .= $charset[(mt_rand(0,(strlen($charset)-1)))];
        return $key;
    }

    // get the database connection
    private function connect(){
        $this->conn = null;

        $this->conn = mysqli_connect($this->host, $this->username, $this->password, $this->db_name);
        if (mysqli_connect_errno()){
            // can't connect to mySQL
        }

        return $this->conn;
    }

    private function createTable($tableName, $columnName, $dataExample) {

        $arrayField = array();
        for ($i=0; $i<count($columnName); $i++) {
            $temp = array();
            if (is_int($dataExample[$i])) {
                $temp['type'] = 'INT';
            }
            else {
                $temp['type'] = 'TEXT';
            }
            $arrayField[$columnName[$i]] = $temp;
        }

        $this->api_dbforge->createTable($tableName, $arrayField);
    }

    private function createTableOld($tableName, $columnName) {

        // Build mySQL query to create table
        $query = 'CREATE TABLE IF NOT EXISTS `' . $tableName . '`(';
        $numItems = count($columnName);
        $i = 0;
        foreach ($columnName as $col) {
            array_push($this->columnName, $col);
            $query = $query . '`$col` text NOT NULL';
            if (++$i != $numItems) // not last index
                $query = $query . ',';
        }

        // Insert query to database
        $result = mysqli_query($this->conn, $query);

        if ($result) return TRUE;
        else return FALSE;
    }

    private function insertTable($tableValue) {
        $query = 'INSERT INTO ' . $this->tableName . '(';

        $numItems = count($this->columnName);
        $i = 0;
        foreach ($this->columnName as $col) {
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

    private function deleteTable() {
        return ($this->api_model->delete_table());
    }

    private function destroyConn(){
        mysqli_close($this->conn);
    }
}