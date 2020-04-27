
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { CustomerModel } from './../model/customer';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  customers: Array<CustomerModel>;
  pages = 1;
  firstPage = true;
  lastPage = false;
  totalPages: number;
  addEditCustomer: CustomerModel;
  deleteCustomer: CustomerModel;
  addEditFlag = '';
  submitted = false;
  selectedIndex: any;



  constructor(private api: ApiService) { }

  @ViewChild('form')
  form: NgForm;


  ngOnInit() {
    this.getUsers();
    }
  getUsers() {
    this.customers = [];
    this.api.getUsers(this.pages.toString()).subscribe( res =>{
        this.customers = res.data;
        this.pages = res.page;
        this.totalPages = res.total_pages;
        if (this.totalPages === 1 && this.pages === 1) {
          this.firstPage = true;
          this.lastPage = true;
        } else if ( this.pages > 1  && this.totalPages > this.pages) {
          this.firstPage = false;
          this.lastPage = false;
        } else if ( this.pages === 1  && this.totalPages > this.pages) {
          this.firstPage = true;
          this.lastPage = false;
        } else {
          this.firstPage = false;
          this.lastPage = true;
        }
      });
  }
  nextPage() {
    this.pages = this.pages + 1;
    this.getUsers();
  }
  previousPage(){
    this.pages = this.pages - 1;
    this.getUsers();
  }
  onSubmit() {
    this.submitted = true;
  }
  addNewUser(){
    this.addEditCustomer = new CustomerModel();
    this.addEditFlag = 'Add';
    console.log(this.addEditCustomer);
    console.log(this.addEditFlag);
  }
  insertCustomer() {
    this.api.insertCustomer(this.addEditCustomer).subscribe(res => {
      this.customers.push(res);
      this.addEditCustomer = null;
      this.getUsers();
    });
  }
  selectCustomerToEdit(i) {
    this.addEditCustomer = null;
    this.selectedIndex = JSON.parse(JSON.stringify(this.customers[i]));
    this.addEditFlag = 'Edit';
    this.api.getCustomer(this.addEditCustomer).subscribe( res => this.addEditCustomer = res.data);
  }
  updateEditedCustomer() {
    this.api.updateCustomer(this.addEditCustomer).subscribe(res => {
      const i = this.customers.splice(this.customers.findIndex(x => x.id === this.addEditCustomer.id), 0);
      this.addEditCustomer = null;
    });
  }
  selectCustomerToDelete(i){
    this.deleteCustomer = null;
    this.deleteCustomer = JSON.parse(JSON.stringify(this.customers[i]));
  }
  deleteSelectedCustomer() {
    this.api.deleteCustomer(this.deleteCustomer).subscribe(res=> {
      const i = this.customers.splice(this.customers.findIndex(x => x.id === this.deleteCustomer.id), 0);
      this.getUsers();
      this.deleteCustomer = null;
    });
  }
}
