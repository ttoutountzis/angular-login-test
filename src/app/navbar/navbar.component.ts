import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CustomerService } from './../customer.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private customer: CustomerService, private router: Router) {
   }

  ngOnInit() {
  }
  tryLogout() {
    this.customer.removeToken();
    this.router.navigateByUrl('/login');
  }

}
