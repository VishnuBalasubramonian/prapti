import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase, DATABASE_PROVIDERS } from 'angularfire2/database';
import { DatePipe } from '../../../node_modules/@angular/common';
import { Globals } from './global.service';
import { getMatFormFieldDuplicatedHintError } from '@angular/material';
import { AnalyticService } from './analytic.service';

@Injectable()
export class ViewBillService implements OnInit {
  ngOnInit(): void {
    this.deletedItemKey = "";
  }

  deletedItemKey;
  isPurchaseInvoice;
  isOtherInvoice;
  invoiceList = [];
  rowData = [];
  purchaseRowData = [];
  otherBillData = [];
  month = "-1";
  year = "-1";
  currentBillObj;
  editedBillObj;
  isviewGrid;
  isviewpage;
  newInvoiceNumber;
  isEditBill;
  rowObj;
  lastInvoiceKey;
  lastInvoiceNo;
  itemList;
  currentItemKey;
  currentItem;
  dates;
  totalDays;
  isSalesEmpty;
  isIGSTEmpty;
  isRentEmpty;
  isPurchaseEmpty;
  isOtherBillEmpty;
  currentDuration;
  currentNoOfDays;
  currentFromDate;
  currentToDate;
  isSaleInvoice;
  isRentInvoice;
  isIGSTInvoice;
  currentEditedItemKey;
  currentRentDurationDays;
  currentNewFromDate;
  currentNewToDate;
  currentTotalNoOfDays;
  downloadKey;
  purchaseItem;
  previousBillObj;
  otherExpense;

  constructor(public af: AngularFireDatabase, public datePipe: DatePipe, public global: Globals, public analyticService: AnalyticService) {
    // this.GetLastInvoiceNumber();

this.deletedItemKey = "";
    this.global.IsAPPLICATION_ONLITNE();
    this.otherExpense = {
      Key: "",
      ExpenseTitle: "",
      SubTotal: 0,
      CGSTAmount: 0,
      SGSTAmount: 0,
      GrandTotal: 0,
      Date: "",
      Description: "",
      Month: ""
    };
    this.currentTotalNoOfDays = 0;
    this.downloadKey = "";
    this.currentRentDurationDays = [];
    this.currentNewFromDate = "";
    this.currentNewToDate = "";
    this.currentEditedItemKey = "";
    this.currentToDate = "";
    this.isSaleInvoice = true;
    this.isRentInvoice = false;
    this.isIGSTInvoice = false;
    this.isPurchaseInvoice = false;
    this.isOtherInvoice = false;
    this.currentFromDate = "";
    this.currentDuration = [];
    this.currentNoOfDays = 0;
    this.isSalesEmpty = true;
    this.isIGSTEmpty = true;
    this.isRentEmpty = true;
    this.isPurchaseEmpty = true;
    this.isOtherBillEmpty = true;
    this.dates = "";
    this.totalDays = 0;
    this.currentItem = {
      Key: "",
      Name: "",
      HSNCode: "",
      GST: 0,
      Rate: 0,
      Quantity: 0
    }
    this.currentItemKey = "";

    this.isviewGrid = true;
    this.lastInvoiceKey = "";
    this.lastInvoiceNo = 0;
    this.isviewpage = false;
    this.isEditBill = false;
    this.currentBillObj = {
      Key: "",
      InvoiceNumber: 0,
      ClientName: "",
      ClientAddressLine1: "",
      ClientAddressLine2: "",
      ClientCity: "",
      ClientPincode: "",
      GSTNumber: "29ALEPA1607J2ZD",
      Date: "",
      DCNumber: "",
      SiteName: "",
      ClientGSTNmber: "",
      PONumber: "",
      ItemList: [],
      TaxList: [],
      GrandTotal: 0,
      GrandTotalInWords: "",
      OutStandingAmount: 0,
      isRent: 0,
      isPaid: 0,
      isInvoice: 0,
      isPerformaInvoice: 0,
      SubTotal: 0,
      Month: "0",
      ConvertedInvoiceKey: "",
      IsCancelled: 0,
      IsPurchase: false,
      isIGST: 0,
      ReceivedDate: "",
      TDS: 0,
      OtherDetails: ""
    };
    this.editedBillObj = {
      Key: "",
      InvoiceNumber: 0,
      ClientName: "",
      ClientAddressLine1: "",
      ClientAddressLine2: "",
      ClientCity: "",
      ClientPincode: "",
      GSTNumber: "29ALEPA1607J2ZD",
      Date: "",
      DCNumber: "",
      SiteName: "",
      ClientGSTNmber: "",
      PONumber: "",
      ItemList: [],
      TaxList: [],
      GrandTotal: 0,
      GrandTotalInWords: "",
      OutStandingAmount: 0,
      isRent: 0,
      isPaid: 0,
      isInvoice: 0,
      isPerformaInvoice: 0,
      SubTotal: 0,
      Month: "0",
      ConvertedInvoiceKey: "",
      IsCancelled: 0,
      IsPurchase: false,
      isIGST: 0,
      ReceivedDate: "",
      TDS: 0,
      OtherDetails: ""
    };
    this.previousBillObj = {
      Key: "",
      InvoiceNumber: 0,
      ClientName: "",
      ClientAddressLine1: "",
      ClientAddressLine2: "",
      ClientCity: "",
      ClientPincode: "",
      GSTNumber: "29ALEPA1607J2ZD",
      Date: "",
      DCNumber: "",
      SiteName: "",
      ClientGSTNmber: "",
      PONumber: "",
      ItemList: [],
      TaxList: [],
      GrandTotal: 0,
      GrandTotalInWords: "",
      OutStandingAmount: 0,
      isRent: 0,
      isPaid: 0,
      isInvoice: 0,
      isPerformaInvoice: 0,
      SubTotal: 0,
      Month: "0",
      ConvertedInvoiceKey: "",
      IsCancelled: 0,
      IsPurchase: false,
      isIGST: 0,
      ReceivedDate: "",
      TDS: 0,
      OtherDetails: ""
    };
    this.purchaseItem = {
      Key: "",
      ClientName: "",
      PONumber: "",
      PODate: "",
      POAmount: 0,
      POGSTAmount: 0,
      GrandTotal: 0,
      Date: "",
      Month: ""
    }


  }

  UpdateCurrentBill(selectedKey) {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    self.downloadKey = selectedKey;
    var ss = self.af.list('/Invoice', {
      query: {
        orderByChild: 'Key',
        equalTo: selectedKey
      }
    }).subscribe((element) => {
      self.currentBillObj = element[0];
      ss.unsubscribe();
    });

  }

  DuplicateBill(billKey){
    var self = this;
    var ss = self.af.list('/Invoice', {
      query: {
        orderByChild: 'Key',
        equalTo: billKey
      }
    }).subscribe((element) => {
      var duplicateBill = element[0];
      ss.unsubscribe();
      var inv = self.af.list('/InvoiceSeq').subscribe((item) => {
        var lastInvoiceKey = item[0].$key;
        var newInvoiceNumber = Number(item[0].Number) + 1;
        duplicateBill.InvoiceNumber = newInvoiceNumber;
        var currentDate = new Date();
        duplicateBill.Date = self.datePipe.transform(currentDate, 'MM/dd/yyyy');
        duplicateBill.Month = (duplicateBill.Date).split("/")[0];
        inv.unsubscribe();
        self.af.list('/Invoice').push(duplicateBill).then((item) => {
          var key = item.key;
          duplicateBill.Key = key;
          var newSaleInvoiceKey = key;
          self.af.list('/Invoice').update(key, duplicateBill).then(() => {
            self.af.list('/InvoiceSeq').update(lastInvoiceKey, { "Number": newInvoiceNumber }).then(() => {
              self.SearchInvoice();
              alert("Bill has been Duplicated Successfully");
            });
          });
        });
      });
      
    });
  }

  ResetDurationList() {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    self.currentRentDurationDays = [];
    self.currentNewFromDate = "";
    self.currentNewToDate = "";
    self.currentTotalNoOfDays = 0;
  }

  AddNewDuration() {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    var lastIndex = self.currentRentDurationDays.length - 1;
    var newIndex = 0;
    if (lastIndex == -1) {
      newIndex = 1;
    }
    else {
      newIndex = Number(self.currentRentDurationDays[lastIndex].indexValue) + 1;
    }
    var newDurationObj = {
      indexValue: newIndex,
      fromDate: self.currentNewFromDate,
      toDate: self.currentNewToDate
    };
    self.currentRentDurationDays.push(newDurationObj);
  }

  SaveCurrentTotal() {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    self.previousBillObj = self.editedBillObj;
  }

  ResetTotal() {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    self.editedBillObj = self.previousBillObj;
  }

  UpdateItemRentRate(itemKeyValue, event) {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    self.editedBillObj.ItemList.forEach(element => {
      if (element.Key == itemKeyValue) {
        element.RentRate = event.target.value;
      }
    });
  }

  UpdateItemAmount(itemKeyValue, event) {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    self.editedBillObj.ItemList.forEach(element => {
      if (element.Key == itemKeyValue) {
        element.Amount = Number(event.target.value);
      }
    });

    var subTotal = 0;
    var taxAmount = 0;
    var grandTotal = 0;
    var outStanding = Number(self.editedBillObj.GrandTotal) - Number(self.editedBillObj.OutStandingAmount);
    self.editedBillObj.ItemList.forEach(element => {
      subTotal += element.Amount;
    });

    taxAmount = (0.09) * subTotal;
    grandTotal = subTotal + (2 * taxAmount);
    self.editedBillObj.SubTotal = subTotal;
    self.editedBillObj.GrandTotal = Math.round(grandTotal);
    if (self.isIGSTInvoice == true) {
      self.editedBillObj.TaxList[0].Tax = (taxAmount * 2);
      self.editedBillObj.TaxList[0].TaxBreakup[0] = (taxAmount * 2);
    }
    else {
      self.editedBillObj.TaxList[0].Tax = (taxAmount * 2);
      self.editedBillObj.TaxList[0].TaxBreakup[0].Amount = (taxAmount);
      self.editedBillObj.TaxList[0].TaxBreakup[1].Amount = (taxAmount);
    }
    self.editedBillObj.GrandTotalInWords = "Rupees " + (self.NumberToWords(Number(self.editedBillObj.GrandTotal))) + " only";
    if (outStanding == 0) {
      self.editedBillObj.OutStandingAmount = self.editedBillObj.GrandTotal;
    }
    else if (outStanding < 0) {
      self.editedBillObj.OutStandingAmount = self.editedBillObj.GrandTotal + (outStanding * (-1));
    }
    else if (outStanding > 0) {
      self.editedBillObj.OutStandingAmount = self.editedBillObj.GrandTotal = outStanding;
    }
  }

  RemoveDuration(index) {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    self.currentDuration.forEach(element => {
      if (element.indexValue == index) {
        var pos = self.currentDuration.indexOf(element);
        if (pos != -1) {
          self.currentDuration.splice(pos, 1);
        }
      }
    });
  }

  AddDuration() {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    if (self.currentDuration) {


      var self = this;
      var lastIndex = self.currentDuration.length - 1;
      var newIndex = 0;
      if (lastIndex == -1) {
        newIndex = 1;
      }
      else {
        newIndex = Number(self.currentDuration[lastIndex].indexValue) + 1;
      }
      var newDurationObj = {
        indexValue: newIndex,
        fromDate: self.currentFromDate,
        toDate: self.currentToDate
      };
      self.currentDuration.push(newDurationObj);
    }
  }

  CurrentItemDuration(itemKey) {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    self.currentEditedItemKey = itemKey;
    self.editedBillObj.ItemList.forEach(element => {
      if (element.Key == itemKey) {
        self.currentDuration = element.RentDurationDates;
        self.currentNoOfDays = element.TotalRentDays;
      }
    });
  }

  GetLastInvoiceNumber() {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    self.af.list('/InvoiceSeq').subscribe((item) => {
      self.lastInvoiceKey = item[0].$key;
      self.newInvoiceNumber = Number(item[0].Number) + 1;
    });
  }

  ConvertSelectedBill(data) {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    var currentDate = new Date();

    self.currentBillObj.Date = self.datePipe.transform(currentDate, 'MM/dd/yyyy');

    self.GetLastInvoiceNumber();
    var ss = self.af.list('/Invoice', {
      query: {
        orderByChild: 'Key',
        equalTo: data
      }
    }).subscribe((element) => {
      self.currentBillObj = element[0];
      self.currentBillObj.isInvoice = 1;
      self.currentBillObj.isPerformaInvoice = 0;
      var currentDate = new Date();
      self.currentBillObj.Date = self.datePipe.transform(currentDate, 'MM/dd/yyyy');
      self.currentBillObj.InvoiceNumber = self.newInvoiceNumber;
      self.af.list('/Invoice').push(self.currentBillObj).then((item) => {
        var key = item.key;
        self.currentBillObj.Key = key;
        self.af.list('/Invoice').update(key, self.currentBillObj).then(() => {
          self.af.list('/InvoiceSeq').update(self.lastInvoiceKey, { "Number": self.newInvoiceNumber }).then(() => {
            self.af.list('/Invoice').update(element[0].Key, element[0]).then(() => {
            });
          });
        });
      });
      self.isviewGrid = false;
      self.isviewpage = true;
      self.isEditBill = false;
      ss.unsubscribe();
      self.editedBillObj = self.currentBillObj;
    });
    self.currentBillObj = self.editedBillObj;
  }



  loadInventoryAndInvoiceOfTheMonth() {
  var self = this;
  self.global.IsAPPLICATION_ONLITNE();
    var obj = self.af.list('/Inventory').subscribe((result) => {
      self.itemList = result;
      // if (self.isRentInvoice == true) {
      //   self.itemList.forEach(element => {
      //     if (element.RentRate == "" || element.RentRate == 0 || element.RentDate == undefined) {
      //       var indexVal = self.itemList.indexOf(element);
      //       self.itemList.splice(indexVal, 1);
      //     }
      //   });
      // }
      self.itemList = self.itemList.sort((a,b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0));
      var obj2 = self.af.list('/Invoice', {
        query: {
          orderByChild: 'Month',
          equalTo: self.month
        }
      }).subscribe((element) => {
        self.invoiceList = [];
        for(var index = 0;index < element.length; index++){
          if(element[index].Date.split("/")[2] == self.year){
            self.invoiceList.push(element[index]);
          }
        }
        // self.invoiceList = element;
        obj2.unsubscribe();
        obj.unsubscribe();
      });

    });
  }

  CancelBill() {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    self.editedBillObj.IsCancelled = 1;
    self.af.list('/Invoice').update(self.editedBillObj.Key, self.editedBillObj).then(() => {
      self.loadInventoryAndInvoiceOfTheMonth();
      self.isEditBill = false;
      self.isviewGrid = true;
      self.isviewpage = false;
    });

  }

  SetDeletedKey(deletedItemKey){
    var self = this;
    self.global.IsAPPLICATION_ONLITNE();
    self.deletedItemKey = deletedItemKey;
  }

  DeletePurchaseBill(){
    var self = this;
    self.global.IsAPPLICATION_ONLITNE();
    self.af.list('/PurchaseInvoice/' + self.deletedItemKey).remove().then(() => {
      self.SearchInvoice();
      self.analyticService.GetTotalSaleData();
    });
  }

  SaveChanges() {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    if (self.isPurchaseInvoice == true) {
      self.purchaseItem.Month = (self.purchaseItem.PODate).split("-")[1];
      self.purchaseItem.GrandTotal = self.purchaseItem.POAmount + self.purchaseItem.POGSTAmount;
      self.af.list('/PurchaseInvoice').update(self.purchaseItem.Key, self.purchaseItem).then(() => {
        self.isEditBill = false;
        self.isviewGrid = true;
        self.isviewpage = false;
        self.SearchInvoice();
      });

    }
    else if(self.isOtherInvoice){
      self.otherExpense.Month = (self.otherExpense.Date).split("/")[0];
      self.af.list('/OtherExpense').update(self.otherExpense.Key, self.otherExpense).then(() => {
        self.isEditBill = false;
        self.isviewGrid = true;
        self.isviewpage = false;
        self.SearchInvoice();
        self.otherExpense = {
          Key: "",
          ExpenseTitle: "",
          SubTotal: 0,
          CGSTAmount: 0,
          SGSTAmount: 0,
          GrandTotal: 0,
          Date: "",
          Description: "",
          Month: ""
        };
      });
    }
    else {
      self.editedBillObj.OutStandingAmount = Math.round(self.editedBillObj.OutStandingAmount);
      self.editedBillObj.GrandTotal = Math.round(self.editedBillObj.GrandTotal);
      self.editedBillObj.GrandTotalInWords = "Rupees " + (self.NumberToWords(self.editedBillObj.GrandTotal)) + " only";
      self.editedBillObj.Month = (self.editedBillObj.Date).split("/")[0];
      if (self.editedBillObj.OutStandingAmount == 0) {
        self.editedBillObj.isPaid = 1;
      }
      else {
        self.editedBillObj.isPaid = 0;
      }
      self.af.list('/Invoice').update(self.editedBillObj.Key, self.editedBillObj).then(() => {
        self.currentBillObj = self.editedBillObj;
        self.isEditBill = false;
        self.isviewGrid = true;
        self.isviewpage = false;
        self.SearchInvoice();
      });
    }
  }

  IncreementQuantity(data) {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    var currentScale = "";
    self.editedBillObj.ItemList.forEach(element => {
      if (element.Key == data) {
        element.Quantity += 1;
        currentScale = element.Scale;
      }
    });
    if(currentScale != "Days" && currentScale != "Month" && currentScale != "Day"){
    self.CalculateSubTotal();
    }
  }

  AddItem() {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    if (self.isSaleInvoice || self.isIGSTInvoice) {
      var itemListLength = self.editedBillObj.ItemList.length;
      var isPresent = false;
      for (let index = 0; index < itemListLength; index++) {
        if (self.editedBillObj.ItemList[index].Key == self.currentItemKey) {
          isPresent = true;
          self.editedBillObj.ItemList[index].Quantity += 1;
          self.editedBillObj.ItemList[index].Amount = Number(self.editedBillObj.ItemList[index].Rate) * Number(self.editedBillObj.ItemList[index].Quantity);
          self.CalculateSubTotal();
          break;
        }


      }

      if (!isPresent) {
        var obj3 = self.af.list('/Inventory', {
          query: {
            orderByChild: 'Key',
            equalTo: self.currentItemKey
          }
        }).subscribe((item) => {
          self.currentItem = item[0];
          self.currentItem.Quantity = 1;
          self.currentItem.Dates = self.dates;
          self.currentItem.TotalDays = self.totalDays;
          self.currentItem.Amount = Number(self.currentItem.Quantity) * Number(self.currentItem.Rate);
          self.currentItem.Scale = "No";
          self.editedBillObj.ItemList.push(self.currentItem);
          self.CalculateSubTotal();
          obj3.unsubscribe();
        });


      }
    }
    else if (self.isRentInvoice) {
      var itemListLength = self.editedBillObj.ItemList.length;
      var daysTotal = 0;
      for (let index = 0; index < self.currentRentDurationDays.length; index++) {
        daysTotal += self.GetDurationInDays(self.currentRentDurationDays[index].fromDate, self.currentRentDurationDays[index].toDate);

      }

      var obj = self.af.list('/Inventory', {
        query: {
          orderByChild: 'Key',
          equalTo: self.currentItemKey
        }
      }).subscribe((item) => {
        self.currentItem = item[0];
        self.currentItem.Quantity = 1;
        self.currentItem.RentDurationDates = self.currentRentDurationDays;
        self.currentItem.TotalRentDays = daysTotal.toString();
        // self.currentItem.Amount = Number(self.currentItem.Quantity) * (Number(self.currentItem.RentRate) * Number(self.currentItem.TotalRentDays));
        self.currentItem.Amount = Number(self.currentItem.Quantity) * (Number(self.currentItem.RentRate));
        self.currentItem.Scale = "Nos";
        self.editedBillObj.ItemList.push(self.currentItem);
        self.CalculateSubTotal();
        obj.unsubscribe();
      });
    }


  }
  GetDurationInDays(fromDate, toDate): number {
    this.global.IsAPPLICATION_ONLITNE();
    var dt1 = new Date(fromDate);
    var dt2 = new Date(toDate);
    var days = Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
    return days + 1;

  }
  EditItem() {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    var daysTotal = 0;
    for (let index = 0; index < self.currentDuration.length; index++) {
      daysTotal += self.GetDurationInDays(self.currentDuration[index].fromDate, self.currentDuration[index].toDate);

    }
    self.editedBillObj.ItemList.forEach(element => {
      if (element.Key == self.currentEditedItemKey) {
        element.RentDurationDates = self.currentDuration;
        element.TotalRentDays = daysTotal.toString();
      }
    });

    self.CalculateSubTotal();
  }

  DecreementQuantity(data) {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    var currentScale = "";
    self.editedBillObj.ItemList.forEach(element => {
      if (element.Key == data) {
        currentScale = element.Scale;
        if (element.Quantity == 1) {
          const index: number = self.editedBillObj.ItemList.indexOf(element);
          if (index !== -1) {
            self.editedBillObj.ItemList.splice(index, 1);
          }
        }
        else {
          element.Quantity -= 1;
        }
      }
    });
    if(currentScale != "Days" && currentScale != "Month" && currentScale != "Day"){
    self.CalculateSubTotal();
    }
  }



  DeleteItem(data) {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    self.editedBillObj.ItemList.forEach(element => {
      if (element.Key == data) {
        const index: number = self.editedBillObj.ItemList.indexOf(element);
        if (index !== -1) {
          self.editedBillObj.ItemList.splice(index, 1);
        }
      }
    });
    self.CalculateSubTotal();
  }
  NumberToWords(num) {
    this.global.IsAPPLICATION_ONLITNE();
    var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
    var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    if ((num = num.toString()).length > 9) return 'overflow';
    var n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (Number(n[1]) != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (Number(n[2]) != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (Number(n[3]) != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (Number(n[4]) != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (Number(n[5]) != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
    return str;
  }

  CalculateSubTotal() {

    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    var outstandingAmount = self.editedBillObj.OutStandingAmount;
    var currentGrandTotal = self.editedBillObj.GrandTotal;
    var subTotal = 0;
    var taxSubList = [];
    var taxAmount = 0;
    for (let index = 0; index < self.editedBillObj.ItemList.length; index++) {
      if (self.isRentInvoice) {
        // self.editedBillObj.ItemList[index].Amount = Number(self.editedBillObj.ItemList[index].Quantity * (self.editedBillObj.ItemList[index].RentRate) * Number(self.editedBillObj.ItemList[index].TotalRentDays));
        self.editedBillObj.ItemList[index].Amount = Number(self.editedBillObj.ItemList[index].Quantity * (self.editedBillObj.ItemList[index].RentRate));
      }
      else {
        self.editedBillObj.ItemList[index].Amount = Number(self.editedBillObj.ItemList[index].Quantity * self.editedBillObj.ItemList[index].Rate);
      }


      subTotal += self.editedBillObj.ItemList[index].Amount;
      var isPresentGST = false;
      var position = 0;
      for (let jindex = 0; jindex < taxSubList.length; jindex++) {
        if (Number((self.editedBillObj.ItemList[index].GST).toString().replace("%", "")) == Number((taxSubList[jindex].GST).toString().replace("%", ""))) {
          isPresentGST = true;
          position = jindex;
          break;
        }
      }
      if (!isPresentGST) {

        var amount = self.editedBillObj.ItemList[index].Amount * (Number((self.editedBillObj.ItemList[index].GST).toString().split("%")[0]) / 100);


        var taxSubListObj = {
          HSNCode: self.editedBillObj.ItemList[index].HSNCode,
          GST: self.editedBillObj.ItemList[index].GST,
          Tax: amount,
          TaxBreakup: []
        }
        if(self.editedBillObj.isRent == 1 && self.editedBillObj.IsIGST == 1){
          var taxBreakupnode = {
            Amount: amount,
            TaxBreakup: "IGST @ 18%"
          };
          taxSubListObj.TaxBreakup.push(taxBreakupnode);
        }
        else if(self.editedBillObj.isRent == 0 && self.editedBillObj.IsIGST == 1){
          var taxBreakupnode = {
            Amount: amount,
            TaxBreakup: "IGST @ 18%"
          };
          taxSubListObj.TaxBreakup.push(taxBreakupnode);
        }
        taxSubList.push(taxSubListObj);
      }
      else {
        var hsnIndex = (taxSubList[position].HSNCode).indexOf(self.editedBillObj.ItemList[index].HSNCode)
        if (hsnIndex == -1) {
          taxSubList[position].HSNCode += "," + self.editedBillObj.ItemList[index].HSNCode;
        }
        var amount = Number(taxSubList[position].Tax) + (self.editedBillObj.ItemList[index].Amount * ((Number((self.editedBillObj.ItemList[index].GST).toString().split("%")[0]) / 100)));
        taxSubList[position].Tax = amount;
      }
    }

    taxSubList.forEach(element => {
      var taxBreakUpList = [];
      if (self.editedBillObj.IsIGST == 0) {
        var taxBreakUpC = {
          Amount: 0,
          TaxBreakup: ""
        }
        taxBreakUpC.Amount = Number(element.Tax) / 2;
        taxBreakUpC.TaxBreakup = "CGST @ " + (Number((element.GST).toString().split("%")[0]) / 2) + "%";
        taxBreakUpList.push(taxBreakUpC);
        var taxBreakUpS = {
          Amount: 0,
          TaxBreakup: ""
        }
        taxBreakUpS.Amount = Number(element.Tax) / 2;
        taxBreakUpS.TaxBreakup = "SGST @ " + (Number((element.GST).toString().split("%")[0]) / 2) + "%";
        taxBreakUpList.push(taxBreakUpS);
        element.TaxBreakup = taxBreakUpList;
        taxAmount += (Number(taxBreakUpS.Amount) + Number(taxBreakUpC.Amount));
      }
      else {
        var taxBreakup = {
          Amount: Number(element.Tax),
          TaxBreakup: "IGST @ " + element.GST
        }
        taxBreakUpList.push(taxBreakup);
        taxAmount += Number(element.Tax)
      }
    });

    self.editedBillObj.TaxList = taxSubList;
    self.editedBillObj.SubTotal = subTotal;
    self.editedBillObj.GrandTotal = subTotal + taxAmount;
    self.editedBillObj.GrandTotalInWords = "Rupees " + (self.NumberToWords(Number(self.editedBillObj.GrandTotal))) + "only";
    if (self.editedBillObj.GrandTotal != currentGrandTotal) {
      self.editedBillObj.OutStandingAmount += (self.editedBillObj.GrandTotal - currentGrandTotal);
    }
  }

  UpdateItemRate(editedItemKey, event) {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    self.editedBillObj.ItemList.forEach(element => {
      if (element.Key == editedItemKey) {
        if (self.isRentInvoice) {
          element.RentRate = Number(event.target.value);
          // element.Amount = element.Quantity * element.RentRate * element.TotalRentDays;
          element.Amount = element.Quantity * element.RentRate;
        }
        else {
          element.Rate = Number(event.target.value);
          element.Amount = element.Quantity * element.Rate;
        }
      }
      self.CalculateSubTotal();
    });
  }

  UpdateToPaid(data) {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;

    var targetElement: any;
    self.invoiceList.forEach(element => {
      if (element.Key == data) {
        element.OutStandingAmount = 0;
        element.isPaid = 1;
        targetElement = element;
      }
    });
    self.af.list('/Invoice').update(data, targetElement).then((item) => {

    });



  }



  ViewSelectedBill(data) {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    self.isviewGrid = false;
    self.isviewpage = true;
    self.isEditBill = false;
    var ss = self.af.list('/Invoice', {
      query: {
        orderByChild: 'Key',
        equalTo: data
      }
    }).subscribe((element) => {
      self.currentBillObj = element[0];
      ss.unsubscribe();
    });
  }



  EditSelectedBill(data) {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    self.isviewGrid = false;
    self.isviewpage = false;
    self.isEditBill = true;
    var ss = self.af.list('/Invoice', {
      query: {
        orderByChild: 'Key',
        equalTo: data
      }
    }).subscribe((element) => {
      self.editedBillObj = element[0];

      ss.unsubscribe();
    });

  }

  EditPurchaseBill(data) {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    self.isviewGrid = false;
    self.isviewpage = false;
    self.isEditBill = true;
    var ss = self.af.list('/PurchaseInvoice', {
      query: {
        orderByChild: 'Key',
        equalTo: data
      }
    }).subscribe((element) => {
      self.purchaseItem = element[0];

      ss.unsubscribe();
    });

  }

  EditOtherExpenseBill(data){
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    self.isviewGrid = false;
    self.isviewpage = false;
    self.isEditBill = true;
    var ss = self.af.list('/OtherExpense', {
      query: {
        orderByChild: 'Key',
        equalTo: data
      }
    }).subscribe((element) => {
      self.otherExpense = element[0];

      ss.unsubscribe();
    });
  }

  CalculateGrandTotal(){
    var self = this;
    self.otherExpense.GrandTotal = self.otherExpense.SubTotal + self.otherExpense.CGSTAmount + self.otherExpense.SGSTAmount;
  }

  UpdateItemScale(editedItemKey, event) {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    self.editedBillObj.ItemList.forEach(element => {
      if (element.Key == editedItemKey) {
        element.Scale = event.target.value;
      }
      self.CalculateSubTotal();
    });
  }



  SearchInvoice() {
    this.global.IsAPPLICATION_ONLITNE();
    //   controllerContext.showSpinner = true;
    var self = this;
    self.isIGSTEmpty = true;
    self.isRentEmpty = true;
    self.isSalesEmpty = true;
    self.isPurchaseEmpty = true;
    self.isOtherBillEmpty = true;

    var obj = self.af.list('/Invoice', {
      query: {
        orderByChild: 'Month',
        equalTo: self.month
      }
    }).subscribe((element) => {
      self.invoiceList = [];
      for(var index = 0;index < element.length; index++){
        if(element[index].Date.split("/")[2] == self.year){
          self.invoiceList.push(element[index]);
        }
      }
      // self.invoiceList = element;
      self.rowData = [];

      for (let index = 0; index < self.invoiceList.length; index++) {
        if (self.invoiceList[index].IsIGST == 1) {
          self.isIGSTEmpty = false;
        }
        if (self.invoiceList[index].isRent == 1) {
          self.isRentEmpty = false;
        }
        if (self.invoiceList[index].isRent == 0 && self.invoiceList[index].IsIGST == 0 && self.invoiceList[index].IsPurchase == false) {
          self.isSalesEmpty = false;
        }
        if (self.invoiceList[index].IsPurchase == true) {
          self.isPurchaseEmpty = false;
        }


        self.rowData.push({
          key: self.invoiceList[index].Key,
          invocieNo: self.invoiceList[index].InvoiceNumber,
          client: self.invoiceList[index].ClientName,
          invoiceType: ((self.invoiceList[index].isPerformaInvoice == 0) ? 'INVOICE' : 'PERFORMA INVOICE'),
          grandTotal: self.invoiceList[index].GrandTotal,
          outstandingAmt: self.invoiceList[index].OutStandingAmount,
          status: ((Number(self.invoiceList[index].isPaid) == 0) ? 'NOT PAID' : 'PAID'),
          date: self.invoiceList[index].Date
        });
      }
      //    controllerContext.showSpinner = false;
      obj.unsubscribe();

    });

    var obj2 = self.af.list('/PurchaseInvoice', {
      query: {
        orderByChild: 'Month',
        equalTo: self.month
      }
    }).subscribe((element) => {
      self.purchaseRowData = [];
      if (element.length > 0) {
        self.isPurchaseEmpty = false;
      }
      for (let index = 0; index < element.length; index++) {

        self.purchaseRowData.push({
          key: element[index].Key,
          poNumber: element[index].PONumber,
          client: element[index].ClientName,
          PODate: element[index].PODate,
          grandTotal: element[index].POAmount + element[index].POGSTAmount,
          POAmount: element[index].POAmount,
          POGSTAmount: element[index].POGSTAmount,
          date: element[index].Date
        });
      }
      //    controllerContext.showSpinner = false;
      obj2.unsubscribe();

    });

    var obj3 = self.af.list('/OtherExpense', {
      query: {
        orderByChild: 'Month',
        equalTo: self.month
      }
    }).subscribe((element) => {
      self.otherBillData = [];
      if (element.length > 0) {
        self.isOtherBillEmpty = false;
      }
      for (let index = 0; index < element.length; index++) {

        self.otherBillData.push({
          Key: element[index].Key,
          ExpenseTitle: element[index].ExpenseTitle,
          Date: element[index].Date,
          CGSTAmount: element[index].CGSTAmount,
          SGSTAmount: element[index].SGSTAmount,
          SubTotal: element[index].SubTotal,
          GrandTotal: element[index].GrandTotal,
          Description: element[index].Description
        });
      }
      //    controllerContext.showSpinner = false;
      obj3.unsubscribe();

    });


  }

}
