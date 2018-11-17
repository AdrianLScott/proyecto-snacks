import { SidebarPage } from './../pages/sidebar/sidebar';
import { LoginPage } from './../pages/login/login';
import { AuthProvider } from './../providers/auth/auth';
import { Component, OnInit } from '@angular/core';
import { Platform, LoadingController, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
//import { OneSignal } from '@ionic-native/onesignal';
@Component({
  templateUrl: 'app.html'
})

export class MyApp implements OnInit {
  rootPage:any;
  token: any;
  constructor(private storage: Storage, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private auth:AuthProvider, public loadingCtrl: LoadingController/*, DESCOMENTAR private onesignal: OneSignal*/) {
    let loading = this.loadingCtrl.create();
    loading.present();
    this.hasToken().then(data=>{
      if(this.isTokenValid()){
        this.rootPage= SidebarPage;
      }
      else{
        this.rootPage = LoginPage;
      }
      loading.dismiss();
    },(error) => {
      this.rootPage = LoginPage;
      
      loading.dismiss();
    })
    .catch(e=>{
      this.rootPage=LoginPage;
      loading.dismiss();
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      // OneSignal Code start:
      // Enable to debug issues:
      // window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

      //--------------------------DESCOMENTAR-------------------------
      /* var notificationOpenedCallback = function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      }; */
      /* this.onesignal
      .startInit("9ba5748e-6561-4bdf-8c4c-77d4766fbde8", "108844902326")
      .handleNotificationOpened(notificationOpenedCallback)
      .endInit(); */
      //--------------------------------------------------------------.
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

  ngOnInit(): void{
    //socket.on('new-message', (data) => console.log(data));
  }
}

