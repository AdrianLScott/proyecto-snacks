import { GlobalsProvider } from './../../providers/globals/globals';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Storage} from '@ionic/storage';
import { ModalController } from 'ionic-angular';
import { PedidosProvider } from '../../providers/pedidos/pedidos';
import { CartModalPage } from '../cart-modal/cart-modal';
import { Toast } from '@ionic-native/toast';


@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  //los pedidos en el carrito
  cartItems: any[]=[];
  //los pedidos separados por status
  realizados: any[]=[];
  entregados: any[]=[];
  solicitados: any[]=[];
  procesando: any[]=[];
  cancelados: any[]=[];
  //los pedidos de la base de datos
  pedidos;
  //el id del usuario
  idUsuario: number;
  category: string = 'carrito';
  categories: Array<string> = ['carrito', 'proceso', 'historial'];

  /* ****CONSTRUCTOR**** */
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public storage: Storage, 
    public toast: Toast,
    public modalCtrl: ModalController,
    public pedidosProv: PedidosProvider,
    public globals: GlobalsProvider
    ) {

      
    }
  //CARGA LA MAYORÍA DE DATOS, CHECA SI LOS PEDIDOS DE TIENDAS ESTÁN VACIAS Y MANDA A LLAMAR LA FUNCION DE OBTENER PEDIDOS
  validarDatos(){

    this.storage.ready().then(()=>{
      //para ver el usuario que está logueado
      this.obtenerPedidos();

      //obtien los datos de la caché
      this.storage.get("cart").then((data)=>{
        //checa si el carrito está vacio
        
        if (data != null) {
            //borra los registros que no tienen productos pedidos
            for (let i = 0; i < data.length; i++) {
              if (data[i].length <= 1) {
                data.splice(i, 1);
              }
            }
        }else{
         //esta es la variable booleana para saber si no hay pedidos

        }
        this.storage.set("cart", data).then( ()=>{
          this.cargarDatos();
        }).catch(e=>{console.log("falló: "+e)});

      })

    });
    
  }
  //Esta funcion carga los datos que tiene el carrito de compras en el Storage
  cargarDatos(){
    this.storage.ready().then(()=>{      
      //para lo que hay en el carrito
      this.storage.get("cart").then((data)=>{
        //checa si el carrito está vacio
        
        if (data != null) {
            //asigna las tiendas en las que se ha pedido algo a la variable
            this.cartItems = data;
        }else{
          //PAra decir que está vacio
        }
      });

    });
  }

  //Esta funcion jala los pedidos guardados en la base de datos
  obtenerPedidos(){
    this.pedidos=[];
    //carga el id del usuario
    this.storage.get("id").then((idUser)=>{
      if (idUser != null) {
        //si encuentra id, jala los pedidos del usuario de la base de datos
        this.idUsuario = Number(idUser);

        //abre el cargando mientras carga los datos

        this.pedidosProv.getPedidos(this.idUsuario).subscribe(
          //al obtener los datos, se guardan en this.pedidos y el cargando se cierra
          (data)=> {this.pedidos = data; this.organizarPedidos();},
          //Si no, muestra el error
          (error)=> {console.log(error);}
        ) 

      }else{
        console.log("no se encontró el id del usuario");
      }
    });
  }
  
  organizarPedidos(){
    this.limpiarVariables();
    
    if (this.pedidos.length > 0 || this.pedidos != null) {
      for (let i = 0; i < this.pedidos.length; i++) {
        if (this.pedidos[i].estatus == "Solicitado") {//si hay pedidos solicitados
          this.solicitados.push(this.pedidos[i]);

        }else if (this.pedidos[i].estatus == "En proceso") {// si hay pedidos que estan siendo proocesados
          this.procesando.push(this.pedidos[i]);

        }else if (this.pedidos[i].estatus == "Realizado") {// si hay pedidos que estan listos pero no entregados
          this.realizados.push(this.pedidos[i]);

        }else if (this.pedidos[i].estatus == "Entregado") {// si hay pedidos entregados
          this.entregados.push(this.pedidos[i]);

        }else if (this.pedidos[i].estatus == "Cancelado") {// si hay pedidos cancelados
          this.cancelados.push(this.pedidos[i]);
        }
      }
    }else{
      this.limpiarVariables();
    }
  }
  limpiarVariables(){
    //variables
    this.realizados=[];
    this.entregados=[];
    this.solicitados=[];
    this.procesando=[];
    this.cancelados=[];
  }
  eliminarCarrito(indice){
    this.cartItems.splice(indice, 1);
    this.storage.set("cart", this.cartItems).then( ()=>{
      this.cargarDatos();
      this.toast.showWithOptions(
        {
          message: "Pedido eliminado",
          duration: 2000,
          position: 'bottom',
          addPixelsY: -80  // added a negative value to move it up a bit (default 0)
        }
      ).subscribe();
    }).catch(e=>{console.log("falló: "+e)});
    
  }
  eliminarPedido(idPedido, estatus, index){
    if (estatus == "Cancelado") {
      this.cancelados.splice(index, 1);
    }else{
      this.entregados.splice(index, 1);
    }
    this.pedidosProv.eliminarPedido(idPedido).subscribe(
      (response)=>{
        if (response) {
          this.validarDatos();
          this.toastMsg("Se eliminó el producto correcatmente");
        }else{
          this.toastMsg("No se puedo eliminar, verifique su conexión a internet");
        }
      }
    );
    
    //console.log("Se va a eliminar el pedido: "+this.idPedido);
  }

  toastMsg(msg){
    this.toast.showWithOptions(
      {
        message: msg,
        duration: 2000,
        position: 'bottom',
        addPixelsY: -80  // added a negative value to move it up a bit (default 0)
      }
    ).subscribe();
  }

  ionViewWillEnter(){
    this.validarDatos();
    this.globals.badgeCarrito = null;
  }

  irCarrito(i, estatus, idEmpresa) {
    const modal = this.modalCtrl.create(CartModalPage, {index: i, pag: this, estatus :estatus, idEmpresa: idEmpresa});
    modal.present();  

  }

  doRefresh(refresher) {
    
    setTimeout(() => {
      this.validarDatos();
      refresher.complete();
    }, 2000);
  }


}
