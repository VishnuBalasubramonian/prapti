import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { HomeComponent } from '../../app/Views/Home/home.component';
import { CreateBillService } from '../../app/Services/createBill.service';

declare var pdfMake: any;
declare var pdfFonts: any;

import '../../assets/js/pdfMake/pdfmake';
import '../../assets/js/pdfMake/vfs_fonts';
import { DownloadInvoiceService } from '../../app/Services/downloadInvoice.service';

pdfMake.vfs = pdfMake.vfs;



pdfMake.fonts = {
  COMIC: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Regular.ttf',
    italics: 'Roboto-Regular.ttf',
    bolditalics: 'Roboto-Regular.ttf',
  }
}


@Component({
    selector: 'create-bill',
    templateUrl: './createBill.component.html'
})

export class CreateBillComponent implements OnInit{
    @ViewChild('content') content: ElementRef;
    saleType;
    today;
    isStamp;
   // pdfMake;
    buildPdf;
    showSpinner: boolean = false;

    public item: {firstName: string, lastName: string} = 
      {firstName: 'Peter', lastName: 'Parker'};
    pdf: any;
    
constructor(public createBillService: CreateBillService, public downloadService: DownloadInvoiceService /*public pdfmake: PdfmakeService */){
    this.saleType = "";
    this.createBillService.loadClientAndInventoryData();
    this.isStamp = false;
    this.today = new Date();
}
CreateBill() {
    this.createBillService.CreateBill('Sale', 'GST',this)
  }
downloadPDF(){
}

  ngOnInit() {
    this.isStamp = false;
    this.createBillService.loadClientAndInventoryData();
    this.saleType = "";
    this.today = new Date();


    
    
}

ResetToNewInvoice() {
  var self = this;
    self.createBillService.isAdded = false;
}

CreateTable(){
    var self = this;
    const elementToPrint = document.getElementById('testing'); //The html element to become a pdf


}

ChooseAddSaleInvoice(){
    var self = this;
    self.createBillService.isSaleInvoice = true;
    self.createBillService.isRentInvoice = false;
    self.createBillService.isPurchaseInvoice = false;
    self.createBillService.isOtherInvoice = false;
    self.createBillService.isIGSTBill = false;
    self.createBillService.loadClientAndInventoryData();
    self.ResetItemList();
}

ChooseAddRentInvoice(){
    var self = this;
    self.createBillService.isSaleInvoice = false;
    self.createBillService.isRentInvoice = true;
    self.createBillService.isPurchaseInvoice = false;
    self.createBillService.isOtherInvoice = false;
    self.createBillService.isIGSTBill = false;
    self.createBillService.loadClientAndInventoryData();
    self.ResetItemList();
}

ChooseAddIGSTInvoice(){
    var self = this;
    self.createBillService.isSaleInvoice = false;
    self.createBillService.isRentInvoice = false;
    self.createBillService.isPurchaseInvoice = false;
    self.createBillService.isOtherInvoice = false;
    self.createBillService.isIGSTBill = false;
    self.ResetItemList();
}

ChooseAddPurchaseInvoice(){
    var self = this;
    self.createBillService.isSaleInvoice = false;
    self.createBillService.isRentInvoice = false;
    self.createBillService.isPurchaseInvoice = true;
    self.createBillService.isOtherInvoice = false;
    self.createBillService.isIGSTBill = false;
    self.ResetItemList();
}

ChooseAddOtherInvoice(){
    var self = this;
    self.createBillService.isSaleInvoice = false;
    self.createBillService.isRentInvoice = false;
    self.createBillService.isPurchaseInvoice = false;
    self.createBillService.isOtherInvoice = true;
    self.createBillService.isIGSTBill = false;
    self.ResetItemList();
}


ShowTextBox(event){
    if(event.target.checked){
        this.createBillService.showAdvanceAmount = true;
    }
    else{
        this.createBillService.showAdvanceAmount = false;
        this.createBillService.advancePayment = 0;
        this.createBillService.CalculateSubTotal();
    }
}

ResetForm(){
    var self = this;
    self.createBillService.selectedItemList = [];
    self.createBillService.billType = -1;
    self.createBillService.clientKey = -1;
    self.createBillService.currentItemKey = -1;
    self.createBillService.tradeSource = false;
    self.createBillService.showAdvanceAmount = false;
    self.createBillService.advancePayment = 0;
    self.createBillService.isClientSelected = false;
    self.createBillService.DCNum = "";
    self.createBillService.SiteName = "";
    self.createBillService.POWONum = "";
    self.createBillService.isIGSTBill = false;
}

ResetItemList(){
    var self = this;
    self.createBillService.selectedItemList = [];
}

DeleteItem(itemKey){
    
var self = this;
self.createBillService.selectedItemList.forEach(element => {
    if(element.Key == itemKey){
        const index: number = self.createBillService.selectedItemList.indexOf(element);
    if (index !== -1) {
        self.createBillService.selectedItemList.splice(index, 1);
    } 
    }
});
self.createBillService.CalculateSubTotal();
}

DecreementQuantity(itemKey){
    var self = this;
    var currentScale = "";
    self.createBillService.selectedItemList.forEach(element => {
        if(element.Key == itemKey){
            currentScale = element.Scale;
            if(element.Quantity == 1){
                const index: number = self.createBillService.selectedItemList.indexOf(element);
                if (index !== -1) {
                self.createBillService.selectedItemList.splice(index, 1);
            }
            }
            else{
                element.Quantity -= 1;
            }
        }
    });
    if(currentScale != "Days" && currentScale != "Month" && currentScale != "Day"){
    self.createBillService.CalculateSubTotal();
    }
}

IncreementQuantity(itemKey){
    var self = this;
    var currentScale = "";
    self.createBillService.selectedItemList.forEach(element => {
        if(element.Key == itemKey){
            element.Quantity += 1;
            currentScale = element.Scale;
        }
    });
if(currentScale != "Days" && currentScale != "Month" && currentScale != "Day"){
    self.createBillService.CalculateSubTotal();
}
    
}

DownloadInvoice(){
    var self = this;
    var invoiceType = "";
    if(self.createBillService.isSaleInvoice){
        invoiceType = "SaleInvoice";
    }
    else{
        invoiceType = "RentInvoice";
    }
self.downloadService.DownloadInvoice(self.createBillService.lastBillObj, invoiceType, self.isStamp);
self.isStamp = false;
}
}


