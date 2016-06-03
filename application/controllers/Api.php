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
    private $columnName = array();
    public $conn;
    private $data;

    // constructor
    function __construct() {
        session_start();
        parent::__construct(); // Init parent contructor

//        if (isset($_GET['action']) && $_GET['action']=='add') {
//            $this->data = file_get_contents("php://input");
//            echo $this->data;
//        }
    }
	
	public function addData_post(){
        echo "\nfirst: ".$_SESSION["first"];

		$this->data = json_decode(file_get_contents("php://input"), true);
        if (!empty($this->data) && $this->data && isset($this->data)) {

            if (!($_SESSION["first"])) {
                if ($this->invokeCreateTable()) {
                    $_SESSION["first"] = true;
                    echo "\ntableName: ".$_SESSION["tableName"];
                    echo "\ntable created";
                    $this->insertData();
                }
            }
            else {
                if ($this->deleteTable($_SESSION["tableName"])) {
                    echo "\ntable deleted";
                    $_SESSION["tableName"] = "";
                    $this->columnName = empty($this->columnName);
                    if ($this->invokeCreateTable()) {
                        echo "\ntableName: ".$_SESSION["tableName"];
                        echo "\ntable created";
                        $this->insertData();
                    }
                }
            }
        }
	}

    private function insertData(){
        foreach ($this->data as $row) {
            echo "\nrow dr insert: ";
            var_dump($row);
            $res = $this->api_model->insert_table($_SESSION["tableName"],$row);
            echo "\nhasil insert: ".$res;
        }
    }
	
	public function addData_get(){
		echo "<h1>masuk add data!</h1>";
	}

    private function invokeCreateTable() {
        $_SESSION["tableName"] = $this->generateString(50);
        $this->columnName = array_keys($this->data[0]);
        $dataExample = $this->data[0];
        $dataExample = array_values($dataExample);
        return ($this->createTable($_SESSION["tableName"], $this->columnName, $dataExample));
    }

    private function generateString($length){
        $charset = "abcdefghijklmnopqrstuvwxyz0123456789";
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

        if ($this->connect()) {
            // Build mySQL query to create table
            $query = 'CREATE TABLE IF NOT EXISTS `' . $tableName . '`(';
            $numItems = count($columnName);
            $i = 0;
            foreach ($columnName as $col) {
                if (ctype_digit($dataExample[$i]))
                    $query = $query . '`'.$col.'` INT NOT NULL';
                else
                    $query = $query . '`'.$col.'` TEXT NOT NULL';

                $i++;
                if ($i != $numItems) // not last index
                    $query = $query . ',';
                else
                    $query = $query . ')';
            }

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

    private function insertTable($tableValue) {
        $query = 'INSERT INTO ' . $_SESSION["tableName"] . '(';

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

    private function deleteTable($tableName) {
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

    private function destroyConn(){
        mysqli_close($this->conn);
    }
}