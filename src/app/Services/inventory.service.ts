import { Injectable, ViewContainerRef, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database'

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ToasterModule, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';
import { Globals } from './global.service';

@Injectable()
export class Inventory implements OnInit {
  
  inventoryObj;
  errorMsg;
  itemInfo;
  showItemInfo;
  itemID;
  isValid;
  isAdded;
  isEdited;
  itemList;
  private toasterService: ToasterService;

  public config1: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    animation: 'fade'
    
  });

  constructor(public af: AngularFireDatabase, public toast: ToasterService, public global: Globals) {
    this.global.IsAPPLICATION_ONLITNE();
    this.errorMsg = "";
    this.showItemInfo = false;
    
    this.inventoryObj = {
      Name: "",
      HSNCode: "",
      Rate: "",
      GST: "",
      RentRate: ""
    }
    this.itemInfo = {
      Name: "",
      HSNCode: "",
      Rate: "",
      GST: "",
      RentRate: ""
    }
    this.itemID = "-1";
    this.isValid = true;
    this.isAdded = false;
    this.isEdited = false;
    
  }

  getInventoryList() {
    this.global.IsAPPLICATION_ONLITNE();
    this.itemList = [];
    var obj = this.af.list('/Inventory').subscribe((result) => {
      this.itemList = result;
      this.itemList = this.itemList.sort((a,b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0));
     // obj.unsubscribe();
    });
  }

  ngOnInit() {
    this.global.IsAPPLICATION_ONLITNE();
  }

  saveItemInformation() {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
   

    if (self.inventoryObj.GST  && self.inventoryObj.Name && self.inventoryObj.HSNCode) {
        self.isValid = true;
        self.isAdded = true;
        self.af.list('/Inventory').push(self.inventoryObj).then((item) => {
         
          var key = item.key;
          self.inventoryObj.Key = key;
          self.af.list('/Inventory').update(key, self.inventoryObj).then((item) => {
            self.show();
            self.inventoryObj = {
              Name: "",
              HSNCode: "",
              Rate: "",
              GST: "",
              RentRate: ""
            }
          });
        });
    }
    
  }

  EditInventoryInformation() {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    if (self.itemInfo.GST  && self.itemInfo.Name && self.itemInfo.HSNCode) {
        self.isValid = true;
        var key = self.itemInfo.Key;
        self.af.list('/Inventory').update(key, self.itemInfo).then((item) => {
          self.showItemInfo = false;
          self.isEdited = true;
          self.itemID = "-1";
          self.showUpdatedMsg();
        });
      
    }
  }

  CancelEdit() {
    this.global.IsAPPLICATION_ONLITNE();
   var self = this;
   self.showItemInfo = false;
   self.itemID = "-1";
 }

  GetItemInformation() {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    self.isEdited = false;
    if(self.itemID != "-1"){
      var obj = self.af.list('/Inventory', {
        query: {
          orderByChild: 'Key',
          equalTo: self.itemID
        }
      }).subscribe((item) => {
        self.itemInfo = item[0];
        obj.unsubscribe();
      });
      self.showItemInfo = true;
    }
    else{
      self.showItemInfo = false;
    }
  }

  show() {
    this.global.IsAPPLICATION_ONLITNE();

    var toast: Toast = {
      type: 'success',
      title: 'Success!',
      body: 'Inventory Data Successfully Saved.',
      showCloseButton: true
    };

    this.toast.pop(toast);

  }

  showUpdatedMsg() {

   
    var toast: Toast = {
      type: 'success',
      title: 'Success!',
      body: 'Inventory Data Successfully Updated.',
      showCloseButton: true
    };

    this.toast.pop(toast);

  }

}
