import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { NotificationsPage } from '../pages/notifications/notifications';
import { CartPage } from '../pages/cart/cart';
import { StoresPage } from '../pages/stores/stores';
import { RegisterPage} from '../pages/register/register'
import { ProviderTiendasProvider } from '../providers/provider-tiendas/provider-tiendas';
import { HttpClientModule } from '@angular/common/http';
import { LoginProvider } from '../providers/login/login';
import { RegisterProvider } from '../providers/register/register';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    NotificationsPage,
    CartPage,
    StoresPage,
    RegisterPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    NotificationsPage,
    CartPage,
    StoresPage,
    RegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProviderTiendasProvider,
    LoginProvider,
    RegisterProvider
  ]
})
export class AppModule {}
