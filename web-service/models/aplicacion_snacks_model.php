<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * 
 */
class Aplicacion_snacks_model extends CI_Model {
	protected $_levels  = array('DEBUG' => '0');
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
		$query = $this->db->select('*')->from('empresas')->where('estatus',1)->get();
		return $query->result();
	}

	public function addUser($data){
		$data[0]->contraseña = password_hash($data[0]->contraseña, PASSWORD_DEFAULT);
		try{
		    if($this->db->insert('usuarios', $data[0])){
		    	return 1;
		    }
		    else{
		    	return $this->db->error();
		    }
		}
		catch(Exception $e){
		    return $this->db->error();
		}

	}

	public function getIdByUser($user){
		return $this->db->select('id')->where('nombre',$user)->get('usuarios')->row();
	}

	public function getProductos($id)
	{
		$q = $this->db->select('*')->from('productos')->where('idempresa',$id)->get();
		return $q->result();
	}

	public function getUser($data){

		try{
			$q = $this->db->select('*')->from('usuarios')->where(array('nombre'=>$data->user,'estatus'=>1,'idperfil'=>4))->get()->row();
			if(!is_null($q)){
				$encrypted_pass = $q->contraseña;
				if(password_verify($data->password, $encrypted_pass)){
					return (array) $q;
				}
				else{
					$obj = array('code'=>151, 'message'=>'Usuario o contraseña incorrecta.');
					return $obj;
				}
			}
			else{
				$obj = array('code'=>150, 'message'=>'No se encontró el usuario.');
				return $obj;
			}
		}
		catch(Exception $e){
		    return $this->db->error();
		}
	}
	
	//ACABA VAN LAS FUNCIONES
	
}