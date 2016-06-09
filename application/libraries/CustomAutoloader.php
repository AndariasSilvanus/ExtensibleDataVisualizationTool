<?php

/**
 * Created by PhpStorm.
 * User: Andarias Silvanus
 * Date: 16/06/09
 * Time: 11:22 PM
 */
class CustomAutoloader {
    public function __construct(){
        spl_autoload_register(array($this, 'loader'));
    }

    public function loader($className){
        if (substr($className, 0, 6) == 'models')
            require  APPPATH .  str_replace('\\', DIRECTORY_SEPARATOR, $className) . '.php';
    }
}