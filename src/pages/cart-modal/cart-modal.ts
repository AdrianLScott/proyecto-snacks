import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController, LoadingController, AlertController } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { PedidosProvider } from '../../providers/pedidos/pedidos';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import * as AppConfig from './../../app/main';
import * as socketIo from 'socket.io-client'; 

@IonicPage()
@Component({
  selector: 'page-cart-modal',
  templateUrl: 'cart-modal.html',
})
export class CartModalPage {
  cartItems: any[] =[];
  tienda: any;
  total: any;
  idPedido: any;
  bandera: boolean = false;
  paginaAnterior: any;
  estatus: any;
  createdCode = null;
  saldo: any;
  idUsuario;
  idTienda;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage: Storage, 
    public toast: ToastController, 
    public viewController: ViewController,
    public pedProv: PedidosProvider,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public provUser: UsuariosProvider) {

    //obtenemos el valor del indice de la tienda que seleccionamos en la caché
    this.idPedido = this.navParams.data.index;
    //obtenemos la pagina anterior
    this.paginaAnterior = this.navParams.data.pag;
    //obtenemos el estatus de el pedido que fue ingresado
    this.estatus = this.navParams.data.estatus;
    //obtenemos el id de la tiienda
    this.idTienda = this.navParams.data.idEmpresa;
   }

  //Esta funcion verifica los productos que tiene la tienda a la que se ingresó
  refresh(){

    if (this.estatus == "SinConfirmar") { //para el estatus SinConfirmar (lo que está en el carrito (caché))(opciones:eliminar productos, aumentar la cantidad, y pedir).
      //limpia la variable total para que no se sobre escriba
      this.total = 0.0;
      this.obtenerUsuario().then(
        (response)=>{this.obtenerSaldo();}
      );
      //obtiene lo que tiene la caché de pedidos
      this.storage.get("cart").then((data)=>{
        if (data != null) {
          //Recorre los indices de las tiendas
          for (let i = 0; i < data.length; i++) {

            let index = Number(this.idPedido);
            //checa si está la tienda que se seleccionó
            if (i == index) {
              //le asigna todo lo que tenga la tienda encontrada
              
              this.tienda = data[i];
              //verifia si la tienda no tiene nada
              if (this.tienda != null && this.tienda.length != 1) {
                //si tiene datos, hace un recorrido para meter los productos a una variable
                for (let i = 1; i < this.tienda.length; i++) {
          
                  this.cartItems.push(this.tienda[i]);
                  this.total = this.total + (this.tienda[i].cantidad * this.tienda[i].producto.precio);
                }
          
              }else{
                this.close();
              }
            }
          }
          
        }
      });
    }else if (this.estatus == "Realizado") {//para cargar los productos de los pedidos de la base de datos y el generador de código QR
      //abre el cargando mientras carga los datos
      let loading = this.loadingCtrl.create();
      loading.present();
      this.pedProv.getDetallesPedidos(this.idPedido).subscribe(
        //al obtener los datos, se guardan en this.pedidos y el cargando se cierra
        (data)=> {this.tienda = data;loading.dismiss(); this.getProductos(); this.generarCodigoQR();},
        //Si no, muestra el error
        (error)=> {console.log(error);}
      ) 
      
    }else {//para cargar los productos de los pedidos de la base de datos
      //abre el cargando mientras carga los datos
      let loading = this.loadingCtrl.create();
      loading.present();
      this.pedProv.getDetallesPedidos(this.idPedido).subscribe(
        //al obtener los datos, se guardan en this.pedidos y el cargando se cierra
        (data)=> {this.tienda = data;loading.dismiss(); this.getProductos(); },
        //Si no, muestra el error
        (error)=> {console.log(error);}
      ) 
    }
    
  }
  ionViewDidLoad(){
    this.refresh();
  }
  obtenerSaldo(){
    this.provUser.getUserSaldo(this.idUsuario).subscribe(
      (saldo)=>{this.saldo = saldo[0].saldo;},
      (error)=>{this.showResposeMsg("No se pudo obtener el saldo");}
      );
      
  }
  generarCodigoQR(){
    this.createdCode = this.idPedido;
  }
  
  getProductos(){
    this.total = 0.0;
    //verifia si la tienda no tiene nada
    if (this.tienda != null && this.tienda.length > 0) {
      //si tiene datos, hace un recorrido para meter los productos a una variable
      for (let i = 0; i < this.tienda.length; i++) {
        
        this.cartItems.push(this.tienda[i]);
        this.total = this.total + (this.tienda[i].cantidad * this.tienda[i].precio);
      }

    }else{
      this.close();
    }
  }

  close(){
    this.paginaAnterior.validarDatos();
    this.viewController.dismiss();
  }
  //esta es solo para remover los productos de el pedido (solo con estatus SinConfirmar)
  removeFromCart(i){
    //obtiene el index del producto para eliminarlo del carrito
    let Index = Number(this.idPedido);
    //carga el carrito de a cache para eliminar el producto
    this.storage.get("cart").then((data)=>{
      //Elimina el producto 
      data[Index].splice(i+1, 1);
      
      this.storage.set("cart", data).then( ()=>{

				const toast = this.toast.create({
					message: "Producto eliminado",
					duration: 1500
				});
        toast.present();
        this.cartItems.splice(0, this.cartItems.length);
        this.viewController._didLoad();
      }).catch(e=>{console.log("falló: "+e)});
    });
  }

  edicion(){
    if(this.bandera){
      this.bandera = false;
    }else{
      this.bandera= true;
    }
  }
//esta funcion sirve para cancelar un pedido siempre y cuando no se esté preparando
  cancelarPedido(){
    console.log(this.idPedido);
    const socket = socketIo(AppConfig.cfg.nodeServer);
    let data = {
      idEmpresa: this.idTienda,
      idPedido: this.idPedido,
      clase: this.close()
    };
    console.log("id Tienda: "+this.idTienda);
    socket.emit('cancelar-pedido',data, 
    function(confirmation){
      if (confirmation) {
        data.clase
      } else {
        console.log("no jalo");
      }
    });
  }

  eliminarPedido(){
    this.pedProv.eliminarPedido(this.idPedido).subscribe(
      (response)=>{
        if (response) {
          this.close()
        }else{
          this.showResposeMsg("No se pudo eliminar");
        }
      }
    );
    
    //console.log("Se va a eliminar el pedido: "+this.idPedido);
  }
  obtenerUsuario(){
    return this.storage.get("id").then((idUser)=>{
      if (idUser != null) {
        //si encuentra id
        this.idUsuario = Number(idUser);
        return this.idUsuario;
      }else{
        this.idUsuario = null;
        return this.idUsuario;
      }
    });
  }
  doPedido(){
    //socket.close();
    this.obtenerSaldo();
    if (this.saldo >= this.total && this.idUsuario != null) {
      let data={
        idEmpresa: this.idTienda,
        pedido: this.cartItems,
        idUsuario: this.idUsuario,
        close: this.quitarTienda(),
        total: this.total
      };
      console.log(this.idTienda);
      const socket = socketIo(AppConfig.cfg.nodeServer);
      socket.emit('add-pedido',data,
        function(confirmation){
          if (confirmation) {
            data.close;
          } else {
            console.log("no jalo");
          }
        }
      )
      
    }else{
      const toast = this.toast.create({
        message: "Saldo insuficiente",
        duration: 1500
      });
      toast.present();
    }
  }
  quitarTienda(){
    //carga el carrito de a cache para eliminar el producto
    this.storage.get("cart").then((data)=>{
      //Elimina el producto 
      data.splice(this.idPedido, 1);
      
      this.storage.set("cart", data).then( ()=>{

				const toast = this.toast.create({
					message: "Pedido Correctamente",
					duration: 1500
				});
        toast.present();
        //this.cartItems.splice(0, this.cartItems.length);
        this.close();
      }).catch(e=>{console.log("falló: "+e)});
    });
  }
	
	showResposeMsg(num: any){
		let errorMsg ="";
		if (num==1) {
			errorMsg="Pedido Correctamente";
		}else if(num==2){
			errorMsg="Hubo un problema, intente más tarde";
		}else{
      errorMsg=num;
    }
		const toast = this.toast.create({
			message: errorMsg,
			duration: 3000
    	});
    	toast.present();
	}
	confirmarPedido(){

		let confMSG="¿Está todo correcto?";
		let alert = this.alertCtrl.create({
			title: 'Confirmar pedido',
			message: confMSG ,
			buttons: [
				{
					text: 'Cancelar',
					role: 'cancel',
					handler: () => {
						
					}
				},
				{
					text: 'Pedir',
					handler: () => {
						this.doPedido();
					}
				}
			]
		});
		alert.present();
	}

}
