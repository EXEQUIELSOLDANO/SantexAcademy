import { HttpClient } from '@angular/common/http';
import { Component, OnInit,  } from '@angular/core';
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

  submitAdmin() {
    
    const nombre = 'vanina'; 
    const apellido = ''; 
    const dni = ''; 
    const telefono = ''; 
    const direccion = ''; 
    const email = ''; 
    const tipo = '';  

    this.usuario = {
      nombre,
      apellido,
      dni,
      telefono,
      direccion,
      email,
      tipo,
    };
    if (this.usuario.tipo === 'Administrador') {
      this.adminsService .submitAdmin(this.usuario);
      
    } else if (this.usuario.tipo === 'Encuestador') {
      this.pollstersService.submitPollsters(this.usuario);
    }

  }
  constructor(private router: Router, private http: HttpClient, private adminsService: AdminsService, private route: ActivatedRoute, private pollstersService: PollstersService) { }

  ngOnInit(): void {
    const data = this.route.snapshot.data
    this.text = data["text"]
  }
  redirectTo(): void {
    this.router.navigate(['users-list'])
  }
  redirectToNvo(): void {
    this.router.navigate(['user-create-success'])
  }
}