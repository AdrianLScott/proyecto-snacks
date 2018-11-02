<?php 
	require APPPATH . '/libraries/JWT.php';
	/**
	 * 
	 */
	class implementJwt
	{
		private $key = "KEY_TO_DECODE";
		public function GenerateToken($data){
			return JWT::encode($data, $this->key);
		}

		public function DecodeToken($jwt){
			return JWT::decode($jwt, $this->key,array('HS256'));
		}
	}
 ?>