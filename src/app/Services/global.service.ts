import { Injectable, ViewContainerRef, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database'

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'angular2-toaster';

@Injectable()
export class Globals implements OnInit {
  
  public isPaymentDone = 0;
  public nextPaymentDate = '';

ngOnInit(){

  this.getPaymentDetails();
  
}


 constructor(public af: AngularFireDatabase) {
   this.getPaymentDetails();
   
 }

 public getPaymentDetails() {
   var self = this;
   var obj2 = this.af.list('/HasNanPayment/').subscribe((result) => {

     self.isPaymentDone = result[0].$value;
     self.nextPaymentDate = result[1].$value;
     if (!self.isPaymentDone)
     {
       
       alert(result[2].$value);
     }
   })
 }
  
 public IsAPPLICATION_ONLITNE() {
   if (!navigator.onLine) {
     var onlineStatus = `Application is not Online? Please check your internate connection.Please Refresh your page.`;
     alert(onlineStatus);
     throw ("Application is not Online? Please check your internate connection.Please Refresh your page.");

   }
 }

}
