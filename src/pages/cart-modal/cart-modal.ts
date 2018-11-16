import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import {Storage} from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-cart-modal',
  templateUrl: 'cart-modal.html',
})
export class CartModalPage {
  cartItems: any[] =[];
  tienda: any;
  total: any;
  indexTienda: any;
  bandera: boolean = false;
  paginaAnterior: any;
  @ViewChild('productos') productos;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public toast: ToastController, public viewController: ViewController) {
    //obtenemos el valor del indice de la tienda que seleccionamos en la caché
    this.indexTienda = this.navParams.data.index;
    //obtenemos la pagina anterior
    this.paginaAnterior = this.navParams.data.pag;
   }

  //Esta funcion verifica los productos que tiene la tienda a la que se ingresó
  refresh(){
    console.log("indefinido "+this.productos);
    //limpia la variable total para que no se sobre escriba
    this.total = 0.0;
    //obtiene lo que tiene la caché de pedidos
    this.storage.get("cart").then((data)=>{
      if (data != null) {
        //Recorre los indices de las tiendas
        for (let i = 0; i < data.length; i++) {

          let index = Number(this.indexTienda);
          //checa si está la tienda que se seleccionó
          if (i == index) {
            //le asigna todo lo que tenga la tienda encontrada
            
            this.tienda = data[i];
            console.log("tienda aqui tiene: "+this.tienda);
            //verifia si la tienda no tiene nada
            if (this.tienda != null && this.tienda.length != 1) {
              //si tiene datos, hace un recorrido para meter los productos a una variable
              for (let i = 1; i < this.tienda.length; i++) {
        
                this.cartItems.push(this.tienda[i]);
                this.total = this.total + (this.tienda[i].cantidad * this.tienda[i].producto.precio);
              }
              console.log(this.cartItems);
        
            }else{
              console.log("no tiene nada esta tienda");
              this.close();
            }
          }
        }
        
      }
    });
  }
  ionViewDidEnter(){
    this.refresh();
  }
  ionView

  close(){
    this.paginaAnterior.validarDatos();
    this.viewController.dismiss();
  }

  removeFromCart(i){
    
    let Index = Number(this.indexTienda);
    this.storage.get("cart").then((data)=>{
      data[Index].splice(i+1, 1);
      
      this.storage.set("cart", data).then( ()=>{
				console.log("Este es  el data: "+data);

				const toast = this.toast.create({
					message: "Producto eliminado",
					duration: 1500
				});
        toast.present();
        this.cartItems.splice(0, this.cartItems.length);
        this.viewController._didEnter();
      }).catch(e=>{console.log("falló: "+e)});
      
    });
  }

}
