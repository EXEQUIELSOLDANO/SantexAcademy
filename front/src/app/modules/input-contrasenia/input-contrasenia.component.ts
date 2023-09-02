import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PasswordService } from 'src/app/core/services/password.service';
import { HttpClient } from '@angular/common/http'; 

type password={
  password:string;
}
@Component({
  selector: 'app-input-contrasenia',
  templateUrl: './input-contrasenia.component.html',
  styleUrls: ['./input-contrasenia.component.css']
})
export class InputContraseniaComponent implements OnInit {
  password = new FormControl("",[Validators.password, Validators.required])

  constructor(private http:HttpClient, private passwordservice: PasswordService,  private router: Router) { }

  ngOnInit(): void {
  }

  redirectToData() {
    if(this.password.valid==false){
      console.log("error");
      return;

    }
   
    this.passwordservice.login(this.password.value).subscribe(

      (response) => {
        this.router.navigate(['/dashboard']); // ingresar componente proximo
        
      },
      (error) => {
        console.error('Error en el inicio de password', error);
        this.router.navigate(['/dashboard']);
        // Lógica de manejo de error
      }
    );
  }

}
