import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ProductDetailProvider } from '../../providers/product-detail/product-detail';
import {Storage} from '@ionic/storage';



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
	idUser;  

  constructor(
	  public navCtrl: NavController, public prodProv: ProductDetailProvider, public navParams: NavParams, public alertCtrl: AlertController, public toast: ToastController, public storage: Storage) {
		this.producto = navParams.data.producto;
		this.tienda = navParams.data.tienda;
		console.log(this.tienda);
		this.idUser = this.storage.get('id');
		console.log(this.idUser);
  	this.total = this.producto.precio;
	}

	increment() {
		if (this.currentNumber >= 20) {
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
	}

	doPedido(){
		this.data = [{
				idempresa: this.tienda.id,
				idusuario: this.idUser,
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

	AddToPedidos(product){
		console.log(product);
		//obtiene los datos del storage carrito
		this.storage.get("cart").then((data)=> {
			//compara si el carrito está vacio, para agregarlo
			if (data == null || data.length <= 0) {
				console.log(this.tienda.id);
				data=[];
				data.push([
					{"tienda": this.tienda},
					{
						"producto": product,
						"cantidad": this.currentNumber,
						"total": this.total
				}]);

			//En caso de que si tenga, compara si el producto que acaba de pedir ya estaba en el carrito
			}else {
				let productAdded = 0;
				let storeAdded = 0;
				//recorre el arreglo para ver si la tienda esta en esa pocision
				for (let i = 0; i < data.length; i++) {
					if (product.idempresa == data[i][0].tienda.id) {
						//Dentro de Data[i] estan los indexes de los pedidos pero siempre el primer index (0) va a ser los datos de la tienda
					if (this.tienda.id == data[i][0].tienda.id) {
						//la tienda actual se encuentra en el carrito

						//aquí reorre los productos que tenga, empieza desde 1 porque 0 son los datos de la tienda
						for (let x = 1; x < data[i].length; x++) {
							if (product.id == data[i][x].producto.id ) {
								//si entra aquí indica que el producto ya etsá en el carrito y se va a modificar su información
								console.log("el producto tambien está en el carrito");
								let qty = data[i][x].cantidad;

								data[i][x].cantidad = qty + this.currentNumber;
								data[i][x].total = parseFloat(data[i][x].total) + parseFloat(this.total);

								//bandera para indicar que el producto esta agregado
								productAdded=1;
							}
						}
						storeAdded=1;
					}	//la tienda no está en el carrito

					
						//checa la bandera para ver si el producto no está agregado 1 = agregado, 0 = no agregado
						if (productAdded == 0) {
							console.log("Se agregó un producto nuevo");
							data[i].push(
								{
									"producto": product,
									"cantidad": this.currentNumber,
									"total": this.total
								});
						}
					}
					
				}					

				if (storeAdded == 0) {
					console.log("Aqui se agrega la tienda nueva");
					//Aquí se agrega la tienda nueva en caso de que no esté
					data.push([
						{"tienda": this.tienda},
						{
							"producto": product,
							"cantidad": this.currentNumber,
							"total": this.total
					}]);
				}
				
			}
			
			

			this.storage.set("cart", data).then( ()=>{
				console.log("Carrito modificado");
				console.log(data);

				const toast = this.toast.create({
					message: "Pedido modificado",
					duration: 2000
				});
				toast.present();
			}).catch(e=>{console.log("falló: "+e)});

		});

	}

}
