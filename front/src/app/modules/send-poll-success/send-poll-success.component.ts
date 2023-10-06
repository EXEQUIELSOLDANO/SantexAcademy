import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-send-poll-success',
  templateUrl: './send-poll-success.component.html',
  styleUrls: ['./send-poll-success.component.css']
})
export class SendPollSuccessComponent implements OnInit {

  constructor(private router: Router) {

  }
  ngOnInit(): void {

  }

  redirectTo() {
    this.router.navigate(['dashboard-pollster']);
  }
}
