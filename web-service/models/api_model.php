<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * 
 */
class Api_model extends CI_Model {
	
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
		$query = $this->db->select('empresas.id, empresas.nombre, empresas.descripcion, empresas.logotipo, empresas.estatus')->from('empresas, detallesevento')->where('empresas.estatus',1)->where('detallesevento.id_empresa=empresas.id')->where('detallesevento.id_evento',1)->get();
//		SELECT * FROM empresas, detallesevento WHERE empresas.id = detallesevento.id_empresa AND detallesevento.id_evento = 1

		return $query->result();
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

	public function addPedido($data){
		return $this->db->insert('pedidos', $data[0]);
	}

	public function getProductos($id)
		{
			$q = $this->db->select('*')->from('productos')->where('idempresa',$id)->get();
			return $q->result();
		}
	
	//ACABA VAN LAS FUNCIONES
	
}