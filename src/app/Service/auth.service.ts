import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Login } from "../Model/login.module";
import { JwtPayload } from "../Model/jwtPayload/jwtpayload.module";
import {  WindowRefService } from "./window.service";
import { Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
  })

  export class AuthService {

    jwtPayload:JwtPayload = new JwtPayload();
    constructor(private _httpService:HttpClient,private route:Router,private windowRef: WindowRefService) { }
    
    login(login:Login):Observable<any> {
      return this._httpService.post("https://localhost:7275/api/Authentication/Login",login);
    }
  
    decodeToken():JwtPayload
    {
      const token = window.localStorage.getItem('token');
      if(token!=null)
      {
      this.jwtPayload = this.decodeJwt(token);
    }
    return this.jwtPayload;
    }

     decodeJwt(token: string): any {
     
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
      return JSON.parse(decodedPayload);
  } 
  
    getTokenExpirationDate(): Date{
      const decodedToken = this.decodeToken();
      if(decodedToken && decodedToken.exp){
        const date = new Date();
        date.setUTCSeconds(decodedToken.exp);
        return date;
      }
      else{
        return new Date();
      }
    }

    isTokenExpired():boolean{
        const tokenExpirationDate = this.getTokenExpirationDate()
        if(tokenExpirationDate)
        {
          return !(tokenExpirationDate.valueOf()>new Date().valueOf());
        }
        else
        {
          return false;
        }
      }
    
      logout(){
        const window = this.windowRef.nativeWindow;
        if (window && window.localStorage) {
          window.localStorage.clear();
        }
        this.route.navigateByUrl("");
      }
}
  

