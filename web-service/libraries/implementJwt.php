<?php 
	require APPPATH . '/libraries/JWT.php';
	/**
	 * 
	 */
	class implementJwt
	{
		private $key = "";
		public function GenerateToken($data){
			return JWT::encode($data, $this->key);
		}

		public function DecodeToken($jwt){
			return JWT::decode($jwt, $this->key,array('HS256'));
		}
	}
 ?>