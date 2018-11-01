import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ProductDetailProvider } from '../../providers/product-detail/product-detail';


/**
 * Generated class for the ProductDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
interface dataInterface {
	idempresa: number;
	idusuario: number;
	total: number;
	estatus: string;
} 

@IonicPage()
@Component({
  selector: 'page-product-details',
  templateUrl: 'product-details.html',
})
export class ProductDetailsPage {
	producto;
	currentNumber = 1;
	total;
	tienda;
	confMSG;
	data: dataInterface[]= [];
	errorMsg;

  constructor(public navCtrl: NavController, public prodProv: ProductDetailProvider, public navParams: NavParams, public alertCtrl: AlertController, public toast: ToastController) {
		this.producto = navParams.data.producto;
		this.tienda = navParams.data.tienda;
  	this.total = this.producto.precio;
	}

	increment() {
		if (this.currentNumber >= 99) {
			this.total=this.currentNumber*this.producto.precio;
		}else{
  			this.currentNumber++;
			 	this.total=this.currentNumber*this.producto.precio;
		}
	}

	decrement() {
		if (this.currentNumber <= 1) {
			this.total=this.currentNumber*this.producto.precio;
		}else{
			this.currentNumber--;
			 	this.total=this.currentNumber*this.producto.precio;
		}
		
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailsPage');
	}
	doPedido(){
		this.data = [{
				idempresa: this.tienda.id,
				idusuario: 1,
				total: this.total,
				estatus: 'Soliciado'
		}];
		this.prodProv.doPedido(this.data).subscribe(
			(response)=> {this.showResposeMsg(1);},
			(error)=> {this.showResposeMsg(2);}
	)
		
	}
	
	showResposeMsg(num: any){
		if (num==1) {
			this.errorMsg="Pedido Correctamente";
		}else{
			this.errorMsg="Hubo un problema";
		}
		const toast = this.toast.create({
      message: this.errorMsg,
      duration: 3000
    });
    toast.present();
	}
	confirmarPedido(){
		this.confMSG="Poducto: "+this.producto.nombre+"\n Cantidad: "+this.currentNumber+"\n ¿Todo correcto?";

		let alert = this.alertCtrl.create({
			title: 'Confirmar pedido',
			message: this.confMSG ,
			buttons: [
				{
					text: 'Cancelar',
					role: 'cancel',
					handler: () => {
						
					}
				},
				{
					text: 'Comprar',
					handler: () => {
						this.doPedido();
					}
				}
			]
		});
		alert.present();
	}

}
