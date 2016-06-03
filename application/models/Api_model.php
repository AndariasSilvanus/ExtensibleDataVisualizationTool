<?php

/**
 * Created by PhpStorm.
 * User: Andarias Silvanus
 * Date: 16/06/02
 * Time: 11:55 PM
 */
class Api_model extends CI_Model {

    public function __construct() {
        parent::__construct();
    }

    public function get_table($tableName) {
        $query = $this->db->get($tableName);
        return $query->result();
    }

    public function delete_table() {
        $this->db->empty_table();
    }


}