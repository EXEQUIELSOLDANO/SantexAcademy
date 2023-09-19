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

  constructor(private adminService: AdminsService, private pollsterService: PollstersService, private router: Router){ }

  ngOnInit(){
     forkJoin([
      this.adminService.getAdmins(),
      this.pollsterService.getPollsters()
    ]).subscribe(([admins, pollsters]) => {
      this.admins = admins;
      this.pollsters = pollsters;
      this.users = [...this.admins, ...this.pollsters];
    });
  }

  redirectTo(){
    this.router.navigate(['/dashboard-admin'])
  }
}
