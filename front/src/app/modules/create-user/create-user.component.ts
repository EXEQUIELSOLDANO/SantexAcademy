import { HttpClient } from '@angular/common/http';
import { Component, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { AdminsService } from 'src/app/core/services/admins.service';
import { ActivatedRoute } from '@angular/router';
import { PollstersService } from 'src/app/core/services/pollsters.service';
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  usuario: any;
  text: string = "";
  nombre = ''; 
  apellido = ''; 
  dni = ''; 
  telefono = ''; 
  direccion = ''; 
  email = ''; 
  tipoUsuario = '';
  error = false;  

  submitUser() {
    //Validacion
    if(this.nombre === '' || this.apellido === '' || this.dni === '' || this.telefono === '' || this.direccion === '' || this.email === '' || this.tipoUsuario === ''){
      this.showError();
      return
    }
    this.usuario = {
      firstname: this.nombre,
      lastname: this.apellido,
      dni: parseInt(this.dni),
      phone: parseInt(this.telefono),
      adress: this.direccion,
      email: this.email,
      password: 0,
      poll_id: 0,
      roll: this.tipoUsuario,
    };

    this.redirectTo(this.usuario.roll)
  }

  constructor(private router: Router, private http: HttpClient, private adminsService: AdminsService, private route: ActivatedRoute, private pollstersService: PollstersService) { }

  ngOnInit(): void {
    const data = this.route.snapshot.data
    this.text = data["text"]
  }
  redirectTo(tipo: string): void {
    if (tipo === 'admin') {
      //this.adminsService .submitAdmin(this.usuario);
      console.log('administrador creado', this.usuario);
      this.adminsService.submitAdmin(this.usuario).subscribe({
        next: () => {
          console.log('Admin guardado en la DB')
          this.redirectToCreateSuccess();
        },
        error: () => {
          console.log('Ocurrio un error en la DB')
        }
      })
    } else /*if (this.usuario.roll === 'encuestador')*/ {
      //this.pollstersService.submitPollsters(this.usuario);
      
      delete this.usuario.poll_id;
      
      console.log('encuestador creado', this.usuario)
      this.pollstersService.submitPollster(this.usuario).subscribe({
        next: () => {
          console.log('Encuestador guardado en la DB');
          this.redirectToCreateSuccess();
        },
        error: () => {
          console.log('Ocurrio un error en la DB')
        }
      })
    }
    
    //this.router.navigate(['users-list'])
  }
  redirectToCreateSuccess(): void {
    this.router.navigate(['user-create-success'])
  }

  redirectToUserList(){
    this.router.navigate(['users-list'])
  }

  showError(){
    this.error = true;
    setTimeout(() => {
      this.error = false;
    }, 3000);
  }
}