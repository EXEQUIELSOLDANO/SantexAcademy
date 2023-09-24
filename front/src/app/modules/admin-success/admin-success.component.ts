import { Component,OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-admin-success',
  templateUrl: './admin-success.component.html',
  styleUrls: ['./admin-success.component.css']
})
export class AdminSuccessComponent implements  OnInit{
 text:string =""
  constructor(private router: Router, private route: ActivatedRoute) { 
  
  }
  

  ngOnInit(): void {
    const data= this.route.snapshot.data
    this.text= data["text"]
    }
 
  redirectToDashboard(): void {
    this.router.navigate(['/users-list']);
}

}
