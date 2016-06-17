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

    // constructor
    function __construct() {
        session_start();
        parent::__construct(); // Init parent contructor
    }

    // Handle GET and POST method
    public function addData_get(){
        echo "<h1>masuk add data!</h1>";
    }

	public function addData_post(){

//		$this->data = json_decode(file_get_contents("php://input"), true);
        $this->api_model->setData(json_decode(file_get_contents("php://input"), true));
        if (!empty($this->api_model->getData()) && $this->api_model->getData()) {

            if (!($_SESSION["first"])) {
                if ($this->api_model->invokeCreateTable()) {
                    $_SESSION["first"] = true;
                    echo "\ntableName: ".$_SESSION["tableName"];
                    echo "\ntable created";
                    $this->api_model->insertData();
                }
            }
            else {
                if ($this->api_model->deleteTable($_SESSION["tableName"])) {
                    echo "\ntable deleted";
                    $_SESSION["tableName"] = "";
                    $this->columnName = empty($this->columnName);
                    if ($this->api_model->invokeCreateTable()) {
                        echo "\ntableName: ".$_SESSION["tableName"];
                        echo "\ntable created";
                        $this->api_model->insertData();
                    }
                }
            }
            echo "\nDimension: ";
            var_dump($_SESSION["dimension"]);
            echo "\nMeasure: ";
            var_dump($_SESSION["measure"]);
        }
	}

    public function fillMeasure_get(){
        $this->response($_SESSION["measure"], 200);
    }

    public function fillMeasureType_get(){
        $this->response($_SESSION["measure_type"], 200);
    }

    public function fillDimension_get(){
        $this->response($_SESSION["dimension"], 200);
    }

    public function deleteDimension_get() {
        $dimensionName = $this->get('dimensionName');
        if ($dimensionName){
            if (($key_idx = array_search($dimensionName, $_SESSION["measure"])) !== false) {
                unset($_SESSION["dimension"][$key_idx]);
            }
            $this->response($_SESSION["dimension"], 200);
        }
    }

    public function pushDimension_get() {
        $dimensionName = $this->get('dimensionName');
        if ($dimensionName){
            array_push($_SESSION["dimension"], $dimensionName);
            $this->response($_SESSION["dimension"], 200);
        }
    }

    public function deleteMeasure_get() {
        $measureName = $this->get('measureName');
        if ($measureName){
            if (($key_idx = array_search($measureName, $_SESSION["measure"])) !== false) {
                unset($_SESSION["measure"][$key_idx]);
                unset($_SESSION["measure_type"][$key_idx]);
                $this->response($_SESSION["measure"], 200);
            }
        }
    }

    public function pushMeasure_get() {
        $measureName = $this->get('measureName');
        if ($measureName){
            array_push($_SESSION["measure"], $measureName);
            array_push($_SESSION["measure_type"], "SUM");
            $this->response($_SESSION["measure"], 200);
        }
    }

    public function changeMeasureType_get() {
        // belum dicoba, gatau bisa nerima 2 parameter ga di GET
        $measureName = $this->get('measureName');
        $measureType = $this->get('type');
        if ($measureName && $measureType){
            $found = false;
            $length = count($_SESSION["measure_type"]);
            $i = 0;
            while ((!$found) && ($i < $length)) {
                if ($_SESSION["measure"][$i] == $measureName) {
                    $_SESSION["measure_type"][$i] = $measureType;
                    $found = true;
                }
                else
                    $i++;
            }
            $this->response($_SESSION["measure_type"], 200);
        }
    }

}