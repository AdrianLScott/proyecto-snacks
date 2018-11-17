import { ForgotPasswordPage } from './../pages/forgot-password/forgot-password';
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
import { ProductsPage } from '../pages/products/products';
import { UtilityProvider } from '../providers/utility/utility';
import { ProviderProductosProvider } from '../providers/provider-productos/provider-productos';
import { AuthProvider } from '../providers/auth/auth';
import { IonicStorageModule } from '@ionic/storage';
import { Storage } from '@ionic/storage';
import { HttpModule, Http } from '@angular/http';
import { AuthHttp, AuthConfig,JwtHelper } from 'angular2-jwt';
import { ProductDetailsPage } from '../pages/product-details/product-details';
import { ProductDetailProvider } from '../providers/product-detail/product-detail';
import { ForgotPasswordProvider } from '../providers/forgot-password/forgot-password';
import { CartModalPage } from '../pages/cart-modal/cart-modal';
import { SocketProvider } from '../providers/socket/socket';
//import { OneSignal } from '@ionic-native/onesignal'; DESCOMENTAAR
import { NotificationsProvider } from '../providers/notifications/notifications';
import { PopNotificationsComponent} from '../components/pop-notifications/pop-notifications';
import { Toast } from '@ionic-native/toast';
import { PedidosProvider } from '../providers/pedidos/pedidos';
let storage = new Storage({});

export function getAuthHttp(http) {
  return new AuthHttp(new AuthConfig({
    noJwtError: true,
    globalHeaders: [{'Accept': 'application/json'}],
    tokenGetter: (() => storage.get('id_token')),
  }), http);
}

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    NotificationsPage,
    CartPage,
    StoresPage,
    RegisterPage,
    ProductsPage,
    ProductDetailsPage,
    ForgotPasswordPage,
    CartModalPage,
    PopNotificationsComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    IonicStorageModule.forRoot(),
    HttpModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    NotificationsPage,
    CartPage,
    StoresPage,
    RegisterPage,
    ProductsPage,
    ProductDetailsPage,
    ForgotPasswordPage,
    CartModalPage,
    PopNotificationsComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {
      provide: AuthHttp,
      useFactory: getAuthHttp,
      deps: [Http]
    },
    ProviderTiendasProvider,
    UtilityProvider,
    ProviderProductosProvider,
    AuthProvider,
    JwtHelper,
    ProductDetailProvider,
    ForgotPasswordProvider,
    SocketProvider,
    /*OneSignal DESCOMENTAAR*/,
    NotificationsProvider,
    Toast,
    PedidosProvider
  ]
})
export class AppModule {}
