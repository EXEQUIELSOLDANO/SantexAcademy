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

  constructor(private adminService: AdminsService, private pollsterService: PollstersService, private router: Router){ }

  ngOnInit(){
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

  redirectTo(){
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
    this.usersToShow = this.users.slice(startIndex, endIndex);
  }

  goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= this.totalButtons) {
      this.currentPage = pageNumber;
      this.updateUsersToShow();
    }
  }
}
