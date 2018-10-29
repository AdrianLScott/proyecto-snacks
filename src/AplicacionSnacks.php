<?php
defined('BASEPATH') OR exit('No direct script access allowed');
	
class AplicacionSnacks extends CI_Controller {
	function __construct() {

	    header('Access-Control-Allow-Origin: *');
	    header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
	    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
	    $method = $_SERVER['REQUEST_METHOD'];
	    if($method == "OPTIONS") {
	        die();
	    }
	    parent::__construct();
	}

	public function getStores(){
		$this->load->model('aplicacion_snacks_model');
		$stores = $this->aplicacion_snacks_model->getStores();
		echo json_encode($stores);
	}


	public function addUser(){
		$this->load->model('aplicacion_snacks_model');
		$json_str = file_get_contents('php://input');
		//echo $json_str;
		$json_obj = json_decode($json_str);
		echo $this->aplicacion_snacks_model->addUser($json_obj, true);
	}

	public function getProductos()
	{
		$this->load->model('productos_model');
		$productos = $this->productos_model->getProductos();
		echo json_encode($productos);
		//$this->load->view('welcome_message');
	}
}
