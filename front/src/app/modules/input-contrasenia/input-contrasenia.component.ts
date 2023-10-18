import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordService } from 'src/app/core/services/password.service';
import { HttpClient } from '@angular/common/http'; 
import jwtDecode from 'jwt-decode';

type password={
  password:string;
}
@Component({
  selector: 'app-input-contrasenia',
  templateUrl: './input-contrasenia.component.html',
  styleUrls: ['./input-contrasenia.component.css']
})//min 3
export class InputContraseniaComponent implements OnInit {
  password = new FormControl("",[Validators.minLength(3), Validators.required]);
  formSubmitted = false;

  constructor(private passwordservice: PasswordService,  private router: Router) { }

  ngOnInit(): void {
  
  }

  redirectToData() {
    this.formSubmitted = true;
    
    if(this.password.valid==false){
      console.log("error");
      return;
    }
   
    this.passwordservice.login(this.password.value).subscribe({

      next:(response) => {
        //Guardo el token en el local storage
        localStorage.setItem('jwt', `${response.accessToken}`);

        //recupero el token y lo decodifico
        const token = localStorage.getItem('jwt')
        const decodeToken: any = token !== null ? jwtDecode(token) : null;

        if(decodeToken.is_admin){
          this.router.navigate(['/dashboard-admin']); // ingresar componente proximo
        } else{
          this.router.navigate(['/dashboard-pollster']); // ingresar componente proximo
        }
        
      },
      error:(error) => {
        console.error('Error en el inicio de password', error);
        // this.router.navigate(['/dashboard']);
        // Lógica de manejo de error
      }
    });
  }

}
