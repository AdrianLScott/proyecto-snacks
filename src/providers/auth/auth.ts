import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Storage} from '@ionic/storage';
import 'rxjs/add/operator/toPromise';
import { UtilityProvider } from '../../providers/utility/utility';
import *  as AppConfig from '../../app/main';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class AuthProvider {
  
  private cfg: any;
  idToken: string;
  refreshSubscription: any;
  token: any;

  constructor(
    private storage: Storage,
    private http: Http,
    private utility: UtilityProvider) {
    this.cfg = AppConfig.cfg;
    this.storage.get('id_token').then(token => {
        this.idToken = token;
    });

  }

  /**
   * Elimina los datos del usuario de storage
   */
   logout() {
    this.storage.remove('id');
    this.storage.remove('user');
    this.storage.remove('id_token');
    this.storage.remove('cart');
  }
  /**
   * Recibe el token y retorna la información del usuario.
   */
  getUserDataByToken(token:String){
    return this.http.post(this.cfg.apiUrl + this.cfg.user.decodeToken, token); 
  }
  /**
   * Esta función registra al usuario en el web-service y recibe el usuario y token para guardarlo en
   * Storage.
   * @param userData Información a registrar delusuario
   */
  register(userData: any[]) {
    return this.http.post(this.cfg.apiUrl + this.cfg.user.register, userData)
      .toPromise()
      .then(data => {
        let json_obj = JSON.parse(data['_body']);
        if(json_obj['error'] === undefined){
          this.saveData(data);
          let rs = data.json();
          this.idToken = rs.token;
          return 1;
        }
        else{
          return json_obj['error'];
        }
      })
      .catch(e => {this.utility.displayErrorConnectionToast()});
  }

  login(user:string,pass:string){
    let userData = {'user':user,'password':pass}; 
    return this.http.post(this.cfg.apiUrl + this.cfg.user.login, userData)
      .toPromise()
      .then(data => {
        let json_obj = JSON.parse(data['_body']);
        if(json_obj['error'] === undefined){
          let rs = data.json();
          if(rs.tipo_usuario == 'Cliente'){
            this.saveData(data);
            this.idToken = rs.token; 
          }
          return {id: rs.id, user_type: rs.tipo_usuario == 'Cliente'?'Cliente':'Vendedor'};
        }
        else{
          return json_obj['error'];
        }
      })
      .catch(e => {this.utility.displayErrorConnectionToast()});
  }
  /**
   * Recibe los datos que va a guardar en storage.
   * @param data 
   */
  saveData(data: any) {
    let rs = data.json();
    this.storage.set("id", rs.id);
    this.storage.set("user", rs.nombre);
    this.storage.set("id_token", rs.token);
  }

  public hasTokenAndIsValid(){
    return this.hasToken().then(data=>{
      if(this.isTokenValid()){
        return true;
      }
      else{
        return false;
      }
    },(error) => {
      return false;
    })
    .catch(e=>{
      return false;
    });
  }
  /**
   * Checa si existe el token en el storage
  **/
  private hasToken(){
    return this.storage.get('id_token').then(data=>{
      if(data){
        this.token = data;
      }
      else{
        this.token = undefined;
      }
    });
  }
  /**
   * Verifica que el token que se encuentra en storage es valido
   */
  private isTokenValid(){
    if(this.token !== undefined){
      return this.getUserDataByToken(this.token).subscribe();
    }
  }
}
