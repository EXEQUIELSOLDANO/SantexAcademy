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
  updateAdminsService: any;
  idUsuario = -1;
  roll: any;



  submitUser() {
    //Validacion
    if (this.nombre === '' || this.apellido === '' || this.dni === '' || this.telefono === '' || this.direccion === '' || this.email === '' || this.tipoUsuario === '') {
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
  updateUser() {
    //Validacion
    if (this.nombre === '' || this.apellido === '' || this.dni === '' || this.telefono === '' || this.direccion === '' || this.email === '' || this.tipoUsuario === '') {
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
    this.redirectToUpdate(this.usuario.roll, 1)
  }
  constructor(private router: Router, private http: HttpClient, private adminsService: AdminsService, private route: ActivatedRoute, private pollstersService: PollstersService) { }

  ngOnInit(): void {
    const data = this.route.snapshot.data
    this.text = data["text"];
    let id = this.route.snapshot.paramMap.get("id");
    let roll = this.route.snapshot.paramMap.get("roll");


    if (id && roll) {
      this.idUsuario = parseInt(id, 10);
      if (roll === "encuestador") {
        this.pollstersService.getOnePollsterById(this.idUsuario).subscribe({
          next: (data) => {
            this.nombre = data.firstname;
            this.apellido = data.lastname;
            this.dni = data.dni.toString();
            this.telefono = data.phone.toString();
            this.direccion = data.adress;
            this.email = data.email;
            this.roll = data.id;
            console.log(data)
            //TODO agregar los campos
          }
        })
      }
      if (roll === "admin") {
        this.adminsService.getAdminById(this.idUsuario).subscribe({
          next: (data) => {
            this.nombre = data.firstname;
            this.apellido = data.lastname;
            this.dni = data.dni.toString();
            this.telefono = data.phone.toString();
            this.direccion = data.adress;
            this.email = data.email;
            this.roll = data.id;
            console.log(data)
            //TODO agregar los campos
          }
        })
      }
    }

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
  }
  redirectToUpdate(tipo: string, id: number): void {
    if (tipo === 'admin') {
      //this.adminsService .updateAdmin(this.usuario);
      console.log('administrador editado', this.usuario);
      this.adminsService.updateAdmin(this.usuario, id).subscribe({
        next: () => {
          console.log('Admin guardado en la DB')
          this.redirectToUpDateSuccess();
        },
        error: () => {
          console.log('Ocurrio un error en la DB')
        }
      })
    } else /*if (this.usuario.roll === 'encuestador')*/ {
      //this.pollstersService.updatePollsters(this.usuario);
      delete this.usuario.poll_id;


      console.log('encuestador editado', this.usuario)
      this.pollstersService.updatePollster(this.usuario, id).subscribe({
        next: () => {
          console.log('Encuestador guardado en la DB');
          this.redirectToUpDateSuccess();
        },
        error: () => {
          console.log('Ocurrio un error en la DB')
        }
      })
    }

  }

  redirectToCreateSuccess(): void {
    this.router.navigate(['user-create-success'])
  }

  redirectToUserList() {
    this.router.navigate(['users-list'])
  }
  redirectToUpDateSuccess(): void {
    this.router.navigate(['user-update-success'])
  }

  showError() {
    this.error = true;
    setTimeout(() => {
      this.error = false;
    }, 3000);
  }
}
export interface UserGeneral {
  
  "id": number,
  "firstname": string,
  "lastname": string,
  "dni": number,
  "phone": number,
  "adress": string,
  "email": string,
  "password_id": number,
  "roll": string,
}
