import { UsuariosProvider } from './../providers/usuarios/usuarios';
import { GlobalsProvider } from './../providers/globals/globals';
import { Toast } from '@ionic-native/toast';
import { UtilityProvider } from './../providers/utility/utility';
import { SidebarPage } from './../pages/sidebar/sidebar';
import { LoginPage } from './../pages/login/login';
import { AuthProvider } from './../providers/auth/auth';
import { Component } from '@angular/core';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { NoEventPage } from '../pages/no-event/no-event';
import { Events } from 'ionic-angular';
@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any;
  rootPageParams:any;
  token: any;  
  constructor(private storage: Storage, statusBar: StatusBar, splashScreen: SplashScreen, private auth:AuthProvider, private utility: UtilityProvider, public toast: Toast, public globals: GlobalsProvider,public userProv: UsuariosProvider, public events: Events) {

    this.validateRootPage(statusBar, splashScreen, false);
    

  }

  validateRootPage(statusbar, splashscreen, hasFailed:boolean){
    const failed:boolean = hasFailed;
    return this.utility.isThereAnEvent().subscribe(data=>{
      if(data!=-1){
        this.storage.get('id_token').then(token => {
          if(token){
            this.auth.getUserDataByToken(token).subscribe(
              (success)=>{
                const tipo_usuario = success.json()["tipo_usuario"];
                if(tipo_usuario == 4){
                  this.setSaldo();
                  this.rootPage= SidebarPage;
                  this.storage.set('evento', data).then(()=>{
                    this.rootPageParams = {tipo_usuario: "Cliente"}
                  }).catch(e=>{console.log("falló: "+e)});
                }
                else{
                  this.storage.set('evento', data).then(()=>{
                    this.rootPage = LoginPage;
                  }).catch(e=>{console.log("falló: "+e)});
                }
              },
              (error)=>{
                this.storage.set('evento', data).then(()=>{
                  this.rootPage = LoginPage;
                }).catch(e=>{console.log("falló: "+e)});
              }
            )
          }
          else{
            this.storage.set('evento', data).then(()=>{
              this.rootPage = LoginPage;
            }).catch(e=>{console.log("falló: "+e)});
          }
        }).catch(e=>{
          this.storage.set('evento', data).then(()=>{
              this.rootPage = LoginPage;
            }).catch(e=>{console.log("falló: "+e)});
        })
        statusbar.hide();
        splashscreen.hide();
      }
      else{
        this.rootPage = NoEventPage;
      }
    },
    error =>{
      if(!failed){
        this.toast.showWithOptions(
          {
            message: "Conexión fallida, reintentando conectar",
            position: 'bottom',
            duration: 5000,
            addPixelsY: -80
          }).subscribe();
      }
      this.validateRootPage(statusbar, splashscreen, true);
    });
  }

  setSaldo(){
    this.storage.get('id').then(id => {
      if(id){
        this.userProv.getUserSaldo(id).subscribe(
          res => {
            this.globals.saldo = res[0].saldo;
          }
        );
      }
    })
  }

}

