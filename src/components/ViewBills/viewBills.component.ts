import {Component, ViewChild, ElementRef} from '@angular/core';
import {ViewBillService} from '../../app/Services/viewBill.service';
import { DownloadInvoiceService } from '../../app/Services/downloadInvoice.service';
declare var pdfMake: any;
declare var pdfFonts: any;

import '../../assets/js/pdfMake/pdfmake';
import '../../assets/js/pdfMake/vfs_fonts';

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
    selector: 'view-bills',
    templateUrl: './viewBills.component.html'
})

export class ViewBillsComponent{

  showSpinner: boolean = false;
    private gridApi;
    private gridcolumnApi;
     columnDefs;
    private sortingOrder; 
    companyName;
    isSaleInvoice;
    isRentInvoice;
    isIGSTInvoice;
    Address;
    PartyGstNoval;
     PoWoNumber;
    siteName1;
    gstIntitle;
    PoWoNumberval;
    gstInval;
    invoiceNumberval;
    dateval;
    dcNoval;
    siteNameval;
    siteNameval1;
    total;
    cgst;
    sgst;
    isStamp;
    grandtotal;
    rowsitems: [{
        slNo:any,
        discriptionOfGoods:any,
        HSNSAC:any,
        qty:any,
        rate:any,
        amount:any,
    }];

    
   
constructor(public viewBillService: ViewBillService, public downloadService: DownloadInvoiceService  ){
    

    this.isStamp = false;
    this.viewBillService.isSaleInvoice = true;
    this.viewBillService.isRentInvoice = false;
    this.viewBillService.isIGSTInvoice = false;
    this.viewBillService.isPurchaseInvoice = false;
    this.viewBillService.isOtherInvoice = false;
    viewBillService.isviewGrid = true;
    viewBillService.isviewpage = false;
    viewBillService.isEditBill = false;
}

ngOnInit() {
    this.isStamp = false;
  this.viewBillService.loadInventoryAndInvoiceOfTheMonth();
}

SearchInvoice() {
  this.viewBillService.SearchInvoice();
}

BackToSearch(){
    var self = this;
    self.viewBillService.loadInventoryAndInvoiceOfTheMonth();
    self.viewBillService.isviewGrid = true;
    self.viewBillService.isviewpage = false;
    self.viewBillService.isEditBill = false;
}

ChooseAddSaleInvoice(){
    var self = this;
    self.viewBillService.isSaleInvoice = true;
    self.viewBillService.isRentInvoice = false;
    self.viewBillService.isIGSTInvoice = false;
    self.viewBillService.isPurchaseInvoice = false;
    this.viewBillService.isOtherInvoice = false;
    self.viewBillService.isviewGrid = true;
    self.viewBillService.isviewpage = false;
    self.viewBillService.isEditBill = false;
}

ChooseAddRentInvoice(){
    var self = this;
    self.viewBillService.isSaleInvoice = false;
    self.viewBillService.isRentInvoice = true;
    self.viewBillService.isIGSTInvoice = false;
    self.viewBillService.isPurchaseInvoice = false;
    this.viewBillService.isOtherInvoice = false;
    self.viewBillService.loadInventoryAndInvoiceOfTheMonth();
    self.viewBillService.isviewGrid = true;
    self.viewBillService.isviewpage = false;
    self.viewBillService.isEditBill = false;
}

ChooseAddIGSTInvoice(){
    var self = this;
    self.viewBillService.isSaleInvoice = false;
    self.viewBillService.isRentInvoice = false;
    self.viewBillService.isIGSTInvoice = true;
    self.viewBillService.isPurchaseInvoice = false;
    this.viewBillService.isOtherInvoice = false;
    self.viewBillService.loadInventoryAndInvoiceOfTheMonth();
    self.viewBillService.isviewGrid = true;
    self.viewBillService.isviewpage = false;
    self.viewBillService.isEditBill = false;
}

ChooseOtherInvoice(){
    var self = this;
    self.viewBillService.isSaleInvoice = false;
    self.viewBillService.isRentInvoice = false;
    self.viewBillService.isIGSTInvoice = false;
    self.viewBillService.isPurchaseInvoice = false;
    self.viewBillService.isOtherInvoice = true;
    self.viewBillService.loadInventoryAndInvoiceOfTheMonth();
    self.viewBillService.isviewGrid = true;
    self.viewBillService.isviewpage = false;
    self.viewBillService.isEditBill = false;
}

ChoosePurchaseInvoice(){
    var self = this;
    self.viewBillService.isSaleInvoice = false;
    self.viewBillService.isRentInvoice = false;
    self.viewBillService.isIGSTInvoice = false;
    self.viewBillService.isPurchaseInvoice = true;
    this.viewBillService.isOtherInvoice = false;
    self.viewBillService.loadInventoryAndInvoiceOfTheMonth();
    self.viewBillService.isviewGrid = true;
    self.viewBillService.isviewpage = false;
    self.viewBillService.isEditBill = false;
}



    public onRowClicked(e) {
        var self = this;
        if (e.event.target !== undefined) {
            let data = e.data;
            let actionType = e.event.target.getAttribute("data-action-type");
            if (actionType == "view") {
              self.viewBillService.ViewSelectedBill(data);
            }
           
        }
    }

    

   public onGridReady(params) {
        params.api.sizeColumnsToFit();
      }

    public onActionViewClick(data: any){
       console.log(data);
        var self = this;
        self.viewBillService.isviewGrid = false;
        self.viewBillService.isviewpage = true;
        self.viewBillService.isEditBill =  false;
    }

    public onActionUpdateClick(data: any){
        console.log("Update action clicked", data);
    }
    public onActionDownloadClick(data: any){
        console.log("Remove action clicked", data);
    }
    backToView()
    {
        var self = this;
        // self.isviewGrid = true;
        // self.isviewpage = false;
    }

    IncreementQuantity(){

    }

    DecreementQuantity(){

    }

    DownloadInvoice(){
        var self = this;

        var invoiceType = "";
        if(self.viewBillService.currentBillObj.isRent == 1){
            invoiceType = "RentInvoice";
        }
        else {
            invoiceType = "SaleInvoice";
        }
        
    self.downloadService.DownloadInvoice(self.viewBillService.currentBillObj, invoiceType, self.isStamp);
    self.isStamp = false;
    }

    

}
