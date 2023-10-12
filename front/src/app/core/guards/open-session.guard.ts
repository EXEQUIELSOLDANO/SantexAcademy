import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenSessionGuard implements CanActivate {
  jwt: any; 
  constructor(private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.hasSesion() ){
      const decodeToken: any = jwtDecode(this.jwt);
      //Hacer una redirección
      if(decodeToken.is_admin){
        this.router.navigate(['/dashboard-admin']);
      }else{
        this.router.navigate(['/dashboard-pollster']);
      }
      return false;
    }    

    return true;
  }

  hasSesion():boolean {
    //recupero el jwt del localStorage
    this.jwt = localStorage.getItem('jwt');    

    //Si hay un token disponible decodifico el token
    if(this.jwt !== null){
      return true;
    }

    return false
  }  
}
