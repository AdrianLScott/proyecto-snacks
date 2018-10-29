<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * 
 */
class Aplicacion_snacks_model extends CI_Model {
	
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
		$query = $this->db->get('empresas');
		return $query->result();
	}

	public function addUser($data){
		print_r($data[0]->contraseña);
		$data[0]->contraseña = password_hash($data[0]->contraseña, PASSWORD_DEFAULT);
		return $this->db->insert('usuarios', $data[0]);
	}

	public function getProductos()
		{
			$q = $this->db->get('productos');
			return $q->result();
		}
	
	//ACABA VAN LAS FUNCIONES
	
}