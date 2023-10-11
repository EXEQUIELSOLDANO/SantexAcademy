import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { AdminsService } from 'src/app/core/services/admins.service';
import { PollstersService } from 'src/app/core/services/pollsters.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  admins: any[] = [];
  pollsters: any[] = [];
  users: any[] = [];
  usersPerPage = 10;
  totalButtons = 0;
  currentPage = 0;
  usersToShow: any[] = [];
  selectedPage = 1;
  isDeleteUserModalOpen = false;
  idUserToDelete = 0;
  nameUser = '';
  lastNameUser = '';
  typeUser = '';
  inputSearch = '';

  constructor(private adminService: AdminsService, private pollsterService: PollstersService, private router: Router) { }

  ngOnInit() {
    forkJoin([
      this.adminService.getAdmins(),
      this.pollsterService.getPollsters()
    ]).subscribe(([admins, pollsters]) => {
      this.admins = admins;
      this.pollsters = pollsters;
      this.users = [...this.admins, ...this.pollsters];
      this.totalButtons = Math.ceil(this.users.length / this.usersPerPage);
      this.currentPage = 1;
      this.updateUsersToShow();
    });
  }

  redirectTo() {
    this.router.navigate(['/dashboard-admin'])
  }

  //Pasar el totalButtons a formato array para poder utilizar el ngFor
  getPageNumbers(): number[] {
    const pageNumbers = [];
    for (let i = 1; i <= this.totalButtons; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  }

  updateUsersToShow() {
    const startIndex = (this.currentPage - 1) * this.usersPerPage;
    const endIndex = startIndex + this.usersPerPage;

    // Filtrar usuarios por nombre o apellido
    const filteredUsers = this.users.filter(user =>
      user.firstname.toLowerCase().includes(this.inputSearch.toLowerCase()) ||
      user.lastname.toLowerCase().includes(this.inputSearch.toLowerCase())
    );

    // Recalcular el total de botones del paginador
    this.totalButtons = Math.ceil(filteredUsers.length / this.usersPerPage);

    // Guardar los usuarios que se necesiten mostrar por pagina
    this.usersToShow = filteredUsers.slice(startIndex, endIndex);
  }

  goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalButtons) {
      this.currentPage = pageNumber;
      this.updateUsersToShow();
      this.selectedPage = pageNumber;
    }
  }


  redirectToCreateUser() {
    this.router.navigate(['create-user'])
  }
  redirectToUpdateUser(id: number, roll: string) {
    this.router.navigate(['update-user', id, roll])

  }

  openDeleteUserModal(id: number, name: string, lastname: string, type: string) {
    this.isDeleteUserModalOpen = true;
    this.idUserToDelete = id;
    this.nameUser = name;
    this.lastNameUser = lastname;
    this.typeUser = type;
  }

  closeDeleteUserModal(event: boolean) {
    if (!event) {
      this.isDeleteUserModalOpen = false;
    }
  }

  deleteUser(typeUser: string) {
    let resDeleteAdmin: any;
    let resDeletePollster: any;

    if (typeUser === 'admin') {
      resDeleteAdmin = this.adminService.deleteAdmin(this.idUserToDelete).subscribe({
        next: (res) => res
      });

      if (!resDeleteAdmin) {
        console.log('Ocurrió un error, no se pudo eliminar este administrador.');
        return
      }
    } else {
      resDeletePollster = this.pollsterService.deletePollster(this.idUserToDelete).subscribe({
        next: (res) => res
      });

      if (!resDeletePollster) {
        console.log('Ocurrió un error, no se pudo eliminar este encuestador ', resDeletePollster);
        return
      }
    }

    //Reseteamos las variables
    this.isDeleteUserModalOpen = false;
    this.idUserToDelete = 0;

    //Redirigimos
    this.router.navigate(['/user-delete-success']);
  }

  onSearch() {
    this.updateUsersToShow();
  }
}
