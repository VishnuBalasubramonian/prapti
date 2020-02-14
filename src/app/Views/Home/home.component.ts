import {Component, AfterViewInit, ViewChild, ElementRef} from '@angular/core';


import { isNumber } from 'util';
import { AuthService } from '../../Services/auth.service';
import { UserCreation } from '../../Services/userCreation.service';
import { Inventory } from '../../Services/inventory.service';
import { CreateBillService } from '../../Services/createBill.service';
import { ViewBillService } from '../../Services/viewBill.service';

@Component({
    selector: 'page-home',
    templateUrl: './home.component.html'
})

export class HomeComponent{
  currentScreen;
  current_phNum;
  grandTotal;
  validNumber;
  validNumberEntered;

  isAuthenticated;
  inventory;
  addClient;
  createBill;
  viewBill;
  email;
  
  


  constructor( public authService: AuthService, private userCreation: UserCreation, private inventoryService: Inventory, private createBillService:CreateBillService, private viewBillService: ViewBillService) {
      this.isAuthenticated = false;
      this.addClient = true;
      this.createBill = false;
      this.viewBill = false;
      this.inventory = false;
      this.email=false;
    }

    ngOnInit() {
     
      history.pushState(null, null, location.href);
      window.onpopstate = function (event) {
        history.go(1);
      };

    }

    ShowAddClient(){
      var self = this;
      self.addClient = true;
      self.createBill = false;
      self.viewBill = false;
      self.inventory = false;
      self.userCreation.isEdited = false;
      this.userCreation.isAdded = false;
      this.inventoryService.isAdded = false;
      this.userCreation.isEdited = false;
      this.inventoryService.isEdited = false;
      this.createBillService.isAdded = false;
      this.createBillService.isValid = true;
      this.userCreation.isValid = true;
      this.inventoryService.isValid = true;
      this.email=false;
    }

    ShowCreateBill(){
      this.createBill = true;
      this.addClient = false;
      this.viewBill = false;
      this.inventory = false;
      this.userCreation.isAdded = false;
      this.inventoryService.isAdded = false;
      this.userCreation.isEdited = false;
      this.inventoryService.isEdited = false;
      this.createBillService.isAdded = false;
      this.createBillService.isValid = true;
      this.userCreation.isValid = true;
      this.inventoryService.isValid = true;
      this.email=false;
    }
    ShowViewBill(){
      this.viewBill = true;
      this.addClient = false;
      this.createBill = false;
      this.inventory = false;
      this.userCreation.isAdded = false;
      this.inventoryService.isAdded = false;
      this.userCreation.isEdited = false;
      this.inventoryService.isEdited = false;
      this.createBillService.isAdded = false;
      this.createBillService.isValid = true;
      this.userCreation.isValid = true;
      this.inventoryService.isValid = true;
      this.viewBillService.isviewGrid = true;
      this.viewBillService.isviewpage = false;
      this.viewBillService.isEditBill = false;
      this.viewBillService.month = "-1";
      this.viewBillService.rowData = [];
      this.email=false;
    }
    ShowInventory(){
      this.viewBill = false;
      this.addClient = false;
      this.createBill = false;
      this.inventory = true;
      this.userCreation.isAdded = false;
      this.inventoryService.isAdded = false;
      this.userCreation.isEdited = false;
      this.inventoryService.isEdited = false;
      this.createBillService.isAdded = false;
      this.createBillService.isValid = true;
      this.userCreation.isValid = true;
      this.inventoryService.isValid = true;
      this.email=false;
    }


    
    Logout() {
      this.authService.logout();
    }
   Email()
   {
    this.viewBill = false;
    this.addClient = false;
    this.createBill = false;
    this.inventory = false;
    this.userCreation.isAdded = false;
    this.inventoryService.isAdded = false;
    this.userCreation.isEdited = false;
    this.inventoryService.isEdited = false;
    this.createBillService.isAdded = false;
    this.createBillService.isValid = false;
    this.userCreation.isValid = false;
    this.inventoryService.isValid = false;
    this.email=true;
   }

    
}
