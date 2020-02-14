import { Injectable, ViewContainerRef, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database'

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ToasterModule, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { Globals } from './global.service';


@Injectable()
export class UserCreation implements OnInit {
  

ngOnInit(){
  this.af.list('/Client').subscribe((result) => {
    this.clientList = result;
    
  });
  
}

  userObj;
  
errorMsg;
isValid;
isAdded;
isEdited;
clientList = [];
clientID;
clientInfo;
showClientInfo;

 showSpinner: boolean = false;

  private toasterService: ToasterService;

  public config1: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    animation: 'fade'
  });

  

  constructor(public af: AngularFireDatabase, public toast: ToasterService, public global: Globals) {
    this.global.IsAPPLICATION_ONLITNE();
    this.errorMsg = "";
    this.showClientInfo = false;
   this.userObj = {
      Name: "",
      GST: "",
      Address1: "",
      Address2: "",
      City: "",
      Pincode: "",
      Email: "",
      PhoneNumber: "",
      Key:""
    }
    this.clientInfo = {
      Name: "",
      GST: "",
      Address1: "",
      Address2: "",
      City: "",
      Pincode: "",
      Email: "",
      PhoneNumber: "",
      Key:""
    }
    this.clientID = "-1";
    this.isValid = true;
    this.isAdded = false;
    this.isEdited = false;
   
 }

GetClientList() {
  this.global.IsAPPLICATION_ONLITNE();
    this.clientList = [];
    this.af.list('/Client').subscribe((result) => {
      this.clientList = result;
      this.clientList = this.clientList.sort((a,b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0));
     
    });
  }


  GetClientInformation() {
    this.global.IsAPPLICATION_ONLITNE();
   var self = this;
   self.isEdited = false;
   if(this.clientID != "-1"){
    self.af.list('/Client',{
      query: {
        orderByChild: 'Key',
        equalTo: this.clientID
      }
    }).subscribe((item) => {
      self.clientInfo = item[0];
     
    });
this.showClientInfo = true;
   }
 }

  EditUserInformation() {
    this.global.IsAPPLICATION_ONLITNE();
   var self = this;
   if (self.clientInfo.Name)
   {
      self.isValid = true;
      this.showSpinner = true;
      var key = self.clientInfo.Key;
      self.af.list('/Client').update(key, self.clientInfo).then((item) => {
        self.showClientInfo = false;
        self.isEdited = true;
        self.clientID = "-1";
        self.showUpdatedMsg();
        this.showSpinner = false;
      }).catch((ex) => {

        this.showSpinner = false;
        alert("ERROR" + ex.message);
      });
    
   }
 }

  CancelEdit() {
    this.global.IsAPPLICATION_ONLITNE();
   var self = this;
   self.showClientInfo = false;
   self.clientID = "-1";
 }

 

 saveUserInformation() {
  this.global.IsAPPLICATION_ONLITNE();
var self = this;
if (self.userObj.Name)
{
    this.showSpinner = true;
    self.isValid = true;
    self.isAdded = true;
    self.af.list('/Client').push(self.userObj).then((item) => {
      var key = item.key;
      self.userObj.Key = key;
      self.af.list('/Client').update(key, self.userObj).then((item) => {
          self.show();
          this.showSpinner = false;
          self.GetClientList();
      }).catch((ex) => {
        this.showSpinner = false;
        });
    }).catch((ex) => {
      this.showSpinner = false;
      });
}
}

 
show() {


  var toast: Toast = {
    type: 'success',
    title: 'Success!',
    body: 'Client Data Successfully Saved.',
    showCloseButton: true
  };

  this.toast.pop(toast);

}

showUpdatedMsg() {


  var toast: Toast = {
    type: 'success',
    title: 'Success!',
    body: 'Client Data Successfully Updated.',
    showCloseButton: true
  };

  this.toast.pop(toast);

}

}
