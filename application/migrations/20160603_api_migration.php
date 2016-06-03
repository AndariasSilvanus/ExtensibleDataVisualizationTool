<?php
/**
 * Created by PhpStorm.
 * User: Andarias Silvanus
 * Date: 16/06/03
 * Time: 12:25 AM
 */

defined('BASEPATH') OR exit('No direct script access allowed');

class Api_dbforge extends CI_Migration {
    public function createTable ($tableName, $arrayField) {
        $this->dbforge->add_field($arrayField);
        $this->dbforge->create_table($tableName);
    }
}