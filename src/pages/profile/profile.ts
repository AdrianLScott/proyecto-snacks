import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UsuariosProvider } from '../../providers/usuarios/usuarios';
import {Storage} from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
datosUsuario;
idUsuario;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public provUser: UsuariosProvider,
    public storage: Storage,
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
        console.log("IDUSER: "+this.idUsuario);
        //abre el cargando mientras carga los datos
        let loading = this.loadingCtrl.create();
        loading.present();
        this.provUser.getUserData(this.idUsuario).subscribe(
          //al obtener los datos, se guardan en this.datosUsuario y el cargando se cierra
          (data)=> {this.datosUsuario = data[0]; loading.dismiss();console.log(this.datosUsuario);},
          //Si no, muestra el error
          (error)=> {console.log(error);}
        );
        
 

      }else{
        console.log("no se encontró el id del usuario");
      }
    });
  }


}
