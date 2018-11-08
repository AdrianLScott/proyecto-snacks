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
		this.idUser = this.storage.get('id');
		console.log(this.idUser);
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
		//obtiene los datos del storage carrito
		this.storage.get("cart").then((data)=> {
			//compara si el carrito está vacio, para agregarlo
			if (data == null || data.length <= 0) {
				console.log(this.tienda.id);
				data=[];
				data.push({[this.tienda.id]:[{
					"nombreTienda": this.tienda.nombre
						},
						{[product.id]: {
							"producto": product,
							"cantidad": this.currentNumber,
							"total": this.total
						}
					}]
				});

			//En caso de que si tenga, compara si el producto que acaba de pedir ya estaba en el carrito
			}else {
				let productAdded = 0;
				let storeAdded = 0;
				//recorre el arreglo para ver si la tienda esta en esa pocision
				for (let i = 0; i < data.length; i++) {

					//Obtiene los indexes de las tiendas
					let indexTienda = Object.keys(data[i]);
					//convierte el index de la tienda en numero
					let tienda = Number(indexTienda[0]);

					//compara si está la tienda actual en el carrito
					if (this.tienda.id == tienda) {

						//quiere decir que sí está en el carrito
						console.log("La tienda está agregada al carrito");
						
						//checa los indexes de los objetos dentro de la tienda
						let insideIndex = Object.keys(data[i][tienda]);
						
						//Recorre los indexes anteriores para buscar productos
						for (let x = 0; x < insideIndex.length; x++) {
							//convierte los indices de objetos en numero
							let inside = Number(insideIndex[x]);
							//obtiene los indexes de los productos
							let productoIndex = Object.keys(data[i][tienda][inside]);
							for (let y = 0; y < productoIndex.length; y++) {
								let producto = Number(productoIndex[y]);
								//compara si el producto que pide ya está en el carrito para modificar los datos del producto que ya estaba
								if (product.id == producto) {
									console.log("Ya está el producto en el carrito y en la tienda");
									
									let qty = data[i][tienda][inside][producto].cantidad;
			
									data[i][tienda][inside][producto].cantidad = qty + this.currentNumber;
									data[i][tienda][inside][producto].total = parseFloat(data[i][tienda][inside][producto].total) + parseFloat(this.total);
									//esta variable hace sabir si está o no está el producto ya pedido 1:ya está, 0: no está
									productAdded = 1;
								}
							}
							
						}
						if (productAdded == 0) {
							console.log("Se agregó un producto nuevo");
							data[i][tienda].push({
								[product.id]: {
									"producto": product,
									"cantidad": this.currentNumber,
									"total": this.total
								}
							});
						}
						
						storeAdded=1;

					}
					/*
					for (let x = 0; x < data[i].length; x++) {
						console.log("TIENDA # = "+data[i][x]);
						if (this.tienda.id == data[i][x]) {
							storeAdded=1;
							console.log("Ya está esa tienda en el carrito");
							//recorre los productos que hay en la tienda para ver si ya hay uno
							for (let p = 0; p < data[i][x].length; p++) {
								console.log("DATA[I][X][P] = "+data[i][x][p]);
								//si hay un producto en la tineda, lo modifica
								if (product.id == data[i][x][p]) {
									
			
									console.log("Ya etsá el producto en el carriot y en la tienda");
			
									let qty = data[i][x][p].cantidad;
			
									data[i][x][p].cantidad = qty + this.currentNumber;
									data[i][x][p].total = parseFloat(data[i][x][p].total) + parseFloat(this.total);
									//esta variable hace sabir si está o no está el producto ya pedido 1:ya está, 0: no está
									productAdded = 1;
								}
								
							}//si el producto no está agregado, lo agrega a la tienda
							if (productAdded == 0) {
								console.log("Se agregó un producto nuevo");
								data[i][x].push({[product.id]: {
									"producto": product,
									"cantidad": this.currentNumber,
									"total": this.total
									}
								});
							}
							
							
						}						
					}*/

					
				}
				if (storeAdded == 0) {
					console.log("Aqui se agrega la tienda nueva");
					data.push({[this.tienda.id]:[{
						"nombreTienda": this.tienda.nombre
							},
							{[product.id]: {
								"producto": product,
								"cantidad": this.currentNumber,
								"total": this.total
							}
						}]
					});
				}
				
			}
			
			

			this.storage.set("cart", data).then( ()=>{
				console.log("Carrito modificado");
				console.log(data);

				const toast = this.toast.create({
					message: "Pedido modificado",
					duration: 3000
				});
				toast.present();
			}).catch(e=>{console.log("falló: "+e)});

		});

	}

}
