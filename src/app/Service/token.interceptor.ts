import { HttpClient, HttpInterceptorFn } from '@angular/common/http';
import { WindowRefService } from './window.service';
import { Observable } from 'rxjs';
import { User } from '../Model/user.module';
import { Injectable } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const window = new WindowRefService().nativeWindow;
  const token = window? window.localStorage.getItem('token'):null;

  if(token){
    const reqWithToken = req.clone({
      setHeaders: {
        Authorization:`Bearer ${token}`
      }
    });
    return next(reqWithToken)
  }
  else{
    return next(req);
  }
};