import { AuthProvider } from './../providers/auth/auth';
import { Component } from '@angular/core';
import { Platform, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../pages/login/login';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;
  token: string;
  constructor(private storage: Storage, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private auth:AuthProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.hasToken().then(data=>{
        if(this.isTokenValid()){
          this.rootPage= 'SidebarPage';
        }
        else{
          this.rootPage= LoginPage;
        }
      },(error) => {
        this.rootPage = LoginPage;
      })
      .catch(e=>{
        this.rootPage=LoginPage
      });
    });
  }

  /**
   * Checa si existe el token en el storage
  **/
  hasToken(){
    return this.storage.get('id_token').then(data=>{
      if(data){
        this.token = data;
      }
      else{
        this.token = undefined;
      }
    });
  }

  isTokenValid(){
    if(this.token !== undefined){
      return this.auth.getUserDataByToken(this.token).subscribe(
        (success)=>{console.log(success.json());},
        (error)=>{return false;},
      );
    }
  }
}

