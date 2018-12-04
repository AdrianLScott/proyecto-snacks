import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import {Storage} from '@ionic/storage';
import { Toast } from '@ionic-native/toast';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
datosUsuario;
idUsuario;
codigoID;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public provUser: UsuariosProvider,
    public storage: Storage,
    public toast: Toast,
    public loadingCtrl: LoadingController) {
  }
 
  ionViewWillEnter() {
    this.getUserData();
  }
  getUserData(){
    this.storage.get("id").then((idUser)=>{
      if (idUser != null) {
        //si encuentra id, jala los pedidos del usuario de la base de datos
        this.idUsuario = Number(idUser);
        //abre el cargando mientras carga los datos
        let loading = this.loadingCtrl.create();
        loading.present();
        this.provUser.getUserData(this.idUsuario).subscribe(
          //al obtener los datos, se guardan en this.datosUsuario y el cargando se cierra
          (data)=> {this.datosUsuario = data[0]; loading.dismiss();this.codigoID=(Number(this.datosUsuario.id)).toString(16); },
          //Si no, muestra el error
          (error)=> {this.showMSG("Hubo un error de conexión, compruebe su conexión a internet.");}
        );
        
 

      }else{
        this.showMSG("No se encontró el usuario");
      }
    });
  }
  showMSG(msg){
    this.toast.showWithOptions(
      {
        message: msg,
        duration: 2000,
        position: 'bottom',
        addPixelsY: -80  // added a negative value to move it up a bit (default 0)
      }
    ).subscribe();
  }


}
