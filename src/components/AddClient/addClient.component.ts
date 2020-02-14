import {Component} from '@angular/core';
import { HomeComponent } from '../../app/Views/Home/home.component';

import {UserCreation} from '../../app/Services/userCreation.service'
@Component({
    selector: 'add-client',
    templateUrl: './addClient.component.html'
})

export class AddClientComponent{

  isAddClient;
  isEditClient;
  clientList;
  showSpinner: boolean = false;

  constructor(public userCreation: UserCreation){
    this.isAddClient = true;
    this.isEditClient = false;
  }
  ngOnInit() {
    this.userCreation.GetClientList()
    console.log("ClientInit");
  }

  ChooseAddClient(){
    var self = this;
    self.isAddClient = true;
    self.isEditClient = false;
    self.clientList = [];
    self.userCreation.isEdited = false;
  }

  ChooseEditClient() {

    

    var self = this;
    self.isAddClient = false;
    self.isEditClient = true;
    self.userCreation.isAdded = false;
    self.userCreation.isValid = true;
    self.clientList = self.userCreation.clientList;
    self.userCreation.isEdited = false;

  }
}
