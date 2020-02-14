
import { Injectable, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { DatePipe } from '../../../node_modules/@angular/common';
import { Globals } from './global.service';


@Injectable()
export class CreateBillService implements OnInit {
  ngOnInit(): void {
    var self = this;
    self.loadClientAndInventoryData();
  }

  loadClientAndInventoryData() {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    self.itemList = [];
    var ogj = self.af.list('/Client').subscribe((result) => {
      self.clientList = result;
      self.clientList = self.clientList.sort((a,b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0));

      var obj2 = self.af.list('/Inventory').subscribe((result) => {
        self.itemList = result;
        
        // if (self.isRentInvoice == true) {
        //   self.itemList.forEach(element => {
        //     if (element.RentRate == "" || element.RentRate == 0 || element.RentRate == undefined) {
        //       var indexVal = self.itemList.indexOf(element);
        //       self.itemList.splice(indexVal, 1);
        //     }
        //   });
        // }
        self.itemList = self.itemList.sort((a,b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0));

        obj2.unsubscribe();
        ogj.unsubscribe();
      });


    });

  }

  rentDurations;
  datepickerError;
  isSaleInvoice;
  isRentInvoice;
  isPurchaseInvoice;
  isOtherInvoice;
  isIGSTBill;
  currentItemFromDate;
  currentItemToDate;
  POWONum;
  DCNum;
  SiteName;
  lastBillObj;
  itemList;
  tradeSource;
  outstandingAmount;
  nofRentDurations;
  advancePayment;
  clientList;
  currentItem;
  currentItemKey;
  selectedItemList;
  billObj;
  billType;
  todayDate;
  clientKey;
  selectedClientInfo;
  rentTotalDays;
  rentDays;
  isValid;
  isAdded;
  successMsg;
  errorMsg;
  newBillObj;
  isClientSelected;
  subTotal;
  currentTaxList;
  showAdvanceAmount;
  currentTaxDisplayList;
  grandTotal;
  IsIGST;
  dates;
  totalDays;
  newInvoiceNumber;
  newSaleInvoiceKey;
  lastInvoiceKey;
  TotalRentDays;
  RentDurationDates;
  currentFromDate;
  currentToDate;
  isPurchaseOrder;
  purchaseItem;
  otherExpense;



  ResetRentDuration() {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    self.rentDurations = [];
    self.datepickerError = "";
  }

  RemoveDuration(currentIndex) {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    self.rentDurations.forEach(element => {
      if (element.indexValue == currentIndex) {
        const pos: number = self.rentDurations.indexOf(element);
        if (pos != -1) {
          self.rentDurations.splice(pos, 1);
        }
      }
    });
    var arrayLength = self.rentDurations.length;
    for (let index = 1; index <= arrayLength; index++) {
      self.rentDurations[index].indexValue = index;

    }
  }

  UpdateDurationList(currentIndex) {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    self.rentDurations.forEach(element => {
      if (element.indexValue == currentIndex) {
        element.toDate = self.currentToDate;
        element.fromDate = self.currentFromDate;
      }
    });
  }

  AddDuration() {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    if (self.currentToDate == "" || self.currentFromDate == "") { self.datepickerError = " Date can't be Empty"; }
    else if (new Date(self.currentToDate) < new Date(self.currentFromDate)) {
      self.datepickerError = "To Date can't be before from date";
    }
    else {
      self.datepickerError = "";
      var lastIndex = self.rentDurations.length - 1;
      var newIndex = 0;
      if (lastIndex == -1) {
        newIndex = 1;
      }
      else {
        newIndex = Number(self.rentDurations[lastIndex].indexValue) + 1;
      }
      var newDurationObj = {
        indexValue: newIndex,
        fromDate: self.currentFromDate,
        toDate: self.currentToDate
      };
      self.rentDurations.push(newDurationObj);
    }

  }
  constructor(public af: AngularFireDatabase, public datePipe: DatePipe, public global: Globals) {
    this.global.IsAPPLICATION_ONLITNE();
    this.datepickerError = "";
    this.nofRentDurations = 1;
    this.rentDurations = [];
    this.currentFromDate = "";
    this.currentToDate = "";
    this.isPurchaseOrder = false;
    // for (let index = 1; index <= this.nofRentDurations; index++) {
    //   var durationObj = {
    //     indexValue: index,
    //     fromDate: "",
    //     toDate: ""
    //   };
    //   this.rentDurations.push(index);
    //}
    this.TotalRentDays = "";
    this.RentDurationDates = "";
    this.isSaleInvoice = true;
    this.isRentInvoice = false;
    this.isPurchaseInvoice = false;
    this.isOtherInvoice = false;
    this.currentItemFromDate = "";
    this.currentItemToDate = "";
    this.isIGSTBill = false;
    this.tradeSource = false;
    this.showAdvanceAmount = false;
    this.POWONum = "";
    this.SiteName = "";
    this.DCNum = "";
    this.newInvoiceNumber = 0;
    this.newBillObj = {
      ClientName: "",
      InvoiceType: "",
      Total: "",
      Date: ""
    }
    this.newSaleInvoiceKey = "";
    this.currentTaxList = [];
    this.dates = "";
    this.totalDays = 0;
    this.advancePayment = 0;
    this.outstandingAmount;
    this.IsIGST = 0;
    this.currentTaxDisplayList = [];
    this.subTotal = 0;
    this.isClientSelected = false;
    this.isValid = true;
    this.isAdded = false;
    this.errorMsg = "";
    this.successMsg = "";
    this.rentDays = "";
    this.rentTotalDays = 0;
    this.billType = -1;
    this.todayDate = "";
    this.clientKey = -1;
    this.selectedClientInfo = [];
    this.grandTotal = 0;
    this.billObj = {
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
    }
    this.lastBillObj = {
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
    }
    this.currentItem = {
      Key: "",
      Name: "",
      HSNCode: "",
      GST: 0,
      Rate: 0,
      Quantity: 0,
      Scale: ""
    }

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
    this.currentItemKey = "";
    this.selectedItemList = [];


    //this.af.list('/Client').subscribe((result) => {
    //  this.clientList = result;
    //});
    //this.af.list('/Inventory').subscribe((result) => {
    //  this.itemList = result;
    //});

    this.GetLastInvoiceNumber();
    this.loadClientAndInventoryData();
  }


  GetLastInvoiceNumber() {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    self.af.list('/InvoiceSeq').subscribe((item) => {
      self.lastInvoiceKey = item[0].$key;
      self.newInvoiceNumber = Number(item[0].Number) + 1;
    });
  }

  AddItem() {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    // self.rentDurations = [];
    if (self.isSaleInvoice == true) {
      var itemListLength = self.selectedItemList.length;
      var isPresent = false;
      for (let index = 0; index < itemListLength; index++) {
        if (self.selectedItemList[index].Key == self.currentItemKey) {
          isPresent = true;
          self.selectedItemList[index].Scale = "No";
          self.selectedItemList[index].Quantity += 1;
          self.selectedItemList[index].Amount = Number(self.selectedItemList[index].Rate) * Number(self.selectedItemList[index].Quantity);
          self.CalculateSubTotal();
          break;
        }

      }

      if (!isPresent) {
        var obj = self.af.list('/Inventory', {
          query: {
            orderByChild: 'Key',
            equalTo: self.currentItemKey
          }
        }).subscribe((item) => {
          self.currentItem = item[0];
          self.currentItem.Quantity = 1;
          self.currentItem.Dates = "";
          self.currentItem.TotalDays = 0;
          self.currentItem.Amount = Number(self.currentItem.Quantity) * Number(self.currentItem.Rate);
          self.currentItem.Scale = "No";
          self.selectedItemList.push(self.currentItem);
          self.CalculateSubTotal();
          obj.unsubscribe();
        });


      }
    }
    else if (self.isRentInvoice == true) {
      var itemListLength = self.selectedItemList.length;
      var isPresent = false;
      var daysTotal = 0;
      for (let index = 0; index < self.rentDurations.length; index++) {
        daysTotal += self.GetDurationInDays(self.rentDurations[index].fromDate, self.rentDurations[index].toDate);

      }

      var obj = self.af.list('/Inventory', {
        query: {
          orderByChild: 'Key',
          equalTo: self.currentItemKey
        }
      }).subscribe((item) => {
        self.currentItem = item[0];
        self.currentItem.Quantity = 1;
        self.currentItem.RentDurationDates = self.rentDurations;
        self.currentItem.TotalRentDays = daysTotal.toString();
        // self.currentItem.Amount = Number(self.currentItem.Quantity) * (Number(self.currentItem.RentRate) * Number(self.currentItem.TotalRentDays));
        self.currentItem.Amount = Number(self.currentItem.Quantity) * (Number(self.currentItem.RentRate));
        self.currentItem.Scale = "No";
        self.selectedItemList.push(self.currentItem);
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
  UpdateItemRate(editedItemKey, event) {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    self.selectedItemList.forEach(element => {
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

  UpdateItemScale(editedItemKey, event) {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    self.selectedItemList.forEach(element => {
      if (element.Key == editedItemKey) {
        element.Scale = event.target.value;
      }
      self.CalculateSubTotal();
    });
  }
  CalculateSubTotal() {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    self.subTotal = 0;
    self.selectedItemList.forEach(element => {
      if (self.isRentInvoice) {
        element.Amount = (parseInt(element.RentRate) * parseInt(element.Quantity));
        self.subTotal += element.Amount;
      }
      else {
        element.Amount = (parseInt(element.Rate) * parseInt(element.Quantity));
        self.subTotal += element.Amount;
      }
    });

    var hsnCodes = [];
    for (let index = 0; index < self.selectedItemList.length; index++) {
      var isExistHSNCode = false;
      for (let jindex = 0; jindex < hsnCodes.length; jindex++) {
        if (self.selectedItemList[index].HSNCode == hsnCodes[jindex]) {
          isExistHSNCode = true;
          break;
        }
      }
      if (!isExistHSNCode) {
        var hsnObj = {
          HSNCode: "",
          GST: ""
        }
        hsnObj.HSNCode = self.selectedItemList[index].HSNCode;
        hsnObj.GST = self.selectedItemList[index].GST;
        hsnCodes.push(hsnObj);
      }
    }

    var currentTaxList = [];
    for (let index = 0; index < hsnCodes.length; index++) {
      var currentTaxObj = {
        HSNCode: hsnCodes[index].HSNCode,
        Tax: 0,
        GST: 0
      }
      var currentTaxAmount = 0;
      for (let jindex = 0; jindex < self.selectedItemList.length; jindex++) {
        if (self.selectedItemList[jindex].GST == hsnCodes[index].GST) {
          if (self.isRentInvoice) {
            // currentTaxAmount += (parseInt(self.selectedItemList[jindex].RentRate) * (self.selectedItemList[jindex].TotalRentDays) * parseInt(self.selectedItemList[jindex].Quantity)) * (parseInt(self.selectedItemList[jindex].GST) / 100)
            currentTaxAmount += (parseInt(self.selectedItemList[jindex].RentRate) * parseInt(self.selectedItemList[jindex].Quantity)) * (parseInt(self.selectedItemList[jindex].GST) / 100)
          }
          else {
            currentTaxAmount += (parseInt(self.selectedItemList[jindex].Rate) * parseInt(self.selectedItemList[jindex].Quantity)) * (parseInt(self.selectedItemList[jindex].GST) / 100)
          }

          currentTaxObj.GST = self.selectedItemList[jindex].GST;
        }
      }
      currentTaxObj.Tax = currentTaxAmount;

      currentTaxList.push(currentTaxObj);
    }
    self.currentTaxList = currentTaxList;

    self.currentTaxDisplayList = [];
    for (var i = 0; i < self.currentTaxList.length; i++) {
      var isExistEntry = false;
      var isExistCode = false;
      var existingEntry = {
        HSNCode: "",
        Tax: 0,
        GST: 0
      };
      for (var j = 0; j < self.currentTaxDisplayList.length; j++) {
        if (self.currentTaxList[i].GST == self.currentTaxDisplayList[j].GST) {
          isExistEntry = true;
          existingEntry = self.currentTaxDisplayList[j];
          var codes = self.currentTaxDisplayList[j].HSNCode.split(",");
          for (var z = 0; z < codes.length; z++) {
            if (self.currentTaxList[i].HSNCode == codes[z]) {
              isExistCode = true;
            }
          }
        }
      }

      if (!isExistEntry) {
        self.currentTaxDisplayList.push(self.currentTaxList[i]);
      }
      else if (isExistEntry && !isExistCode) {
        for (var v = 0; v < self.currentTaxDisplayList.length; v++) {
          if (self.currentTaxDisplayList[v] == existingEntry) {
            self.currentTaxDisplayList[v].HSNCode += "," + self.currentTaxList[i].HSNCode;
          }
        }
      }
    }

    for (var e = 0; e < self.currentTaxDisplayList.length; e++) {
      var objList = [];

      if (!self.isIGSTBill) {
        var obj = {
          TaxBreakup: "",
          Amount: 0
        }
        obj.TaxBreakup = "CGST @ " + (parseInt(self.currentTaxDisplayList[e].GST) / 2) + "%";
        obj.Amount = self.currentTaxDisplayList[e].Tax / 2;
        objList.push(obj);

        var obj2 = {
          TaxBreakup: "",
          Amount: 0
        }

        obj2.TaxBreakup = "SGST @ " + (parseInt(self.currentTaxDisplayList[e].GST) / 2) + "%";
        obj2.Amount = self.currentTaxDisplayList[e].Tax / 2;
        objList.push(obj2);
      }
      else {
        var obj = {
          TaxBreakup: "IGST @ " + self.currentTaxDisplayList[e].GST + "%",
          Amount: parseInt(self.currentTaxDisplayList[e].Tax)
        }

        objList.push(obj);
      }



      self.currentTaxDisplayList[e].TaxBreakup = objList;
    }

    self.grandTotal = 0;
    var taxSum = 0;
    self.currentTaxDisplayList.forEach(element => {
      taxSum += element.Tax;
    });

    self.grandTotal = Math.round(self.subTotal + taxSum);
    self.outstandingAmount = self.grandTotal - self.advancePayment;

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

  GetClientInfo() {
    this.global.IsAPPLICATION_ONLITNE();
    var self = this;
    this.isClientSelected = true;
    var obj = self.af.list('/Client', {
      query: {
        orderByChild: 'Key',
        equalTo: self.clientKey
      }
    }).subscribe((item) => {
      self.selectedClientInfo = item[0];
      self.billObj.ClientName = self.selectedClientInfo.Name;
      self.billObj.ClientAddressLine1 = self.selectedClientInfo.Address1 == undefined ? "" : self.selectedClientInfo.Address1;
      self.billObj.ClientAddressLine2 = self.selectedClientInfo.Address2 == undefined ? "" : self.selectedClientInfo.Address2;
      self.billObj.ClientCity = self.selectedClientInfo.City == undefined ? "" : self.selectedClientInfo.City;
      self.billObj.ClientGSTNmber = self.selectedClientInfo.GST == undefined ? "" : self.selectedClientInfo.GST;
      self.billObj.ClientPincode = self.selectedClientInfo.Pincode == undefined ? "" : self.selectedClientInfo.Pincode;
      obj.unsubscribe();
    });
  }

  UpdateAndSaveSalesAnaltytic() {
    this.global.IsAPPLICATION_ONLITNE();
    var currentDateMonth = new Date().getMonth() + 1;
    var currentDateYear = new Date().getFullYear();

    var obj = this.af.list('/Analytic/' + currentDateYear + '/' + currentDateMonth).subscribe((result) => {
      var total = 1;
      if (result.length > 0) {
        var total = Number(result[0].$value) + 1;
      }


      this.af.list('/Analytic/' + currentDateYear).update(currentDateMonth.toString(), { value: total }).then(() => {

        



      })
      obj.unsubscribe();

    });
  }

  UpdateAndSaveSalesAmountWithGSTAnaltytic(amount) {



    this.global.IsAPPLICATION_ONLITNE();
    var currentDateMonth = new Date().getMonth() + 1;
    var currentDateYear = new Date().getFullYear();

    var obj = this.af.list('/AnalyticSalesWithGST/' + currentDateYear + '/' + currentDateMonth).subscribe((result) => {
      var total = Number(amount);
      if (result.length > 0) {
       total = Number(result[0].$value) + Number(amount);
      }


      this.af.list('/AnalyticSalesWithGST/' + currentDateYear).update(currentDateMonth.toString(), { value: total }).then(() => {





      })
      obj.unsubscribe();

    });
  }

  UpdateAndSavePurchaseAmountWithGSTAnaltytic(amount) {
    this.global.IsAPPLICATION_ONLITNE();
    var currentDateMonth = new Date().getMonth() + 1;
    var currentDateYear = new Date().getFullYear();

    var obj = this.af.list('/AnalyticPurchaseWithGST/' + currentDateYear + '/' + currentDateMonth).subscribe((result) => {
      var total = Number(amount);
      if (result.length > 0) {
       total = Number(result[0].$value) + Number(amount);
      }


      this.af.list('/AnalyticPurchaseWithGST/' + currentDateYear).update(currentDateMonth.toString(), { value: total }).then(() => {





      })
      obj.unsubscribe();

    });
  }

  UpdateAndSaveSalesAmountWithOutGSTAnaltytic(amount) {
    this.global.IsAPPLICATION_ONLITNE();
    var currentDateMonth = new Date().getMonth() + 1;
    var currentDateYear = new Date().getFullYear();

    var obj = this.af.list('/AnalyticSalesWithOutGST/' + currentDateYear + '/' + currentDateMonth).subscribe((result) => {
      var total = Number(amount);
      if (result.length > 0) {
        total = Number(result[0].$value) + Number(total);
      }


      this.af.list('/AnalyticSalesWithOutGST/' + currentDateYear).update(currentDateMonth.toString(), { value: total }).then(() => {





      })
      obj.unsubscribe();

    });
  }
  UpdateAndSavePurchaseAmountWithoutGSTAnaltytic(amount) {
    this.global.IsAPPLICATION_ONLITNE();
    var currentDateMonth = new Date().getMonth() + 1;
    var currentDateYear = new Date().getFullYear();

    var obj = this.af.list('/AnalyticPurchaseWithOutGST/' + currentDateYear + '/' + currentDateMonth).subscribe((result) => {
      var total = Number(amount);
      if (result.length > 0) {
       total = Number(result[0].$value) + Number(amount);
      }


      this.af.list('/AnalyticPurchaseWithOutGST/' + currentDateYear).update(currentDateMonth.toString(), { value: total }).then(() => {





      })
      obj.unsubscribe();

    });
  }

  CalculateGrandTotal(){
    var self = this;
    self.otherExpense.GrandTotal = self.otherExpense.SubTotal + self.otherExpense.CGSTAmount + self.otherExpense.SGSTAmount;
  }


  CreateBill(saleType, taxType, controllerContext) {
    this.global.IsAPPLICATION_ONLITNE();
    controllerContext.showSpinner = true;
    var self = this;
    if (self.isPurchaseInvoice) {
      self.isValid = true;
      self.isAdded = true;
      self.successMsg = "Your Invoice has been created Successfully";
      var currentDate = new Date();
      self.purchaseItem.Date = self.datePipe.transform(currentDate, 'MM/dd/yyyy');
      self.purchaseItem.Month = (self.purchaseItem.PODate).split("-")[1];
      self.purchaseItem.GrandTotal = self.purchaseItem.POAmount + self.purchaseItem.POGSTAmount;
      self.af.list('/PurchaseInvoice').push(self.purchaseItem).then((item) => {
        var key = item.key;
        self.purchaseItem.Key = key;
        self.af.list('/PurchaseInvoice').update(key, self.purchaseItem).then((item) => {
          controllerContext.showSpinner = false;

          self.purchaseItem = {
            Key: "",
            ClientName: "",
            PONumber: "",
            PODate: "",
            POAmount: 0,
            POGSTAmount: 0,
            GrandTotal: 0,
            Date: "",
            Month: ""

          };

          // if (self.lastBillObj.IsPurchase && self.lastBillObj.IsCancelled == 0 && self.lastBillObj.isPerformaInvoice == 0) {
            
          //   var CGST = Number(Number(self.purchaseItem.GrandTotal) - Number(self.purchaseItem.POAmount)) / 2;
          //   var SGST = Number(Number(self.purchaseItem.GrandTotal) - Number(self.purchaseItem.POAmount)) / 2;
          //   var TotalTax = Number(Number(self.purchaseItem.GrandTotal) - Number(self.purchaseItem.POAmount));
          //   self.UpdateAndSavePurchaseAmountWithGSTAnaltytic(TotalTax);
          //   self.UpdateAndSavePurchaseAmountWithoutGSTAnaltytic(self.purchaseItem.POAmount);
          //}

        }).catch((ex) => {

          controllerContext.showSpinner = false;
          alert("ERROR" + ex.message);

        });
      }).catch((ex) => {

        controllerContext.showSpinner = false;
          alert("ERROR" + ex.message);
      
      });


    }
    else if(self.isOtherInvoice){
      self.isValid = true;
      self.isAdded = true;
      self.successMsg = "Your Invoice has been created Successfully";
      var currentDate = new Date();
      self.otherExpense.Date = self.datePipe.transform(currentDate, 'MM/dd/yyyy');
      self.otherExpense.Month = (self.otherExpense.Date).split("/")[0];
      self.af.list('/OtherExpense').push(self.otherExpense).then((result) => {
        var key = result.key;
        self.otherExpense.Key = key;
        self.af.list('/OtherExpense').update(key, self.otherExpense).then((item) => {
          controllerContext.showSpinner = false;
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
        }).catch((ex) => {

          controllerContext.showSpinner = false;
          alert("ERROR" + ex.message);

        });
      }).catch((ex) => {

        controllerContext.showSpinner = false;
          alert("ERROR" + ex.message);
      
      });
    }
    else {

      if (self.billType != -1 && self.clientKey != -1) {

        if (self.isSaleInvoice) {
          self.billObj.isRent = 0;
        }
        else if (self.isRentInvoice) {
          self.billObj.isRent = 1;
        }
        if (self.billType == 1) {
          if (self.isPurchaseOrder) {
            self.billObj.isInvoice = 1;
            self.billObj.isPerformaInvoice = 0;
            self.billObj.IsPurchase = true;
            self.billObj.InvoiceNumber = "Purchase Bill";
          }
          else {
            self.billObj.isInvoice = 1;
            self.billObj.isPerformaInvoice = 0;
            self.billObj.IsPurchase = false;
            self.newBillObj.InvoiceType = "Invoice";
            self.billObj.InvoiceNumber = self.newInvoiceNumber;
          }
        }

        else if (self.billType == 2 || self.isPurchaseOrder) {

          if (self.isPurchaseOrder) {
            self.billObj.isInvoice = 0;
            self.billObj.isPerformaInvoice = 0;
            self.billObj.IsPurchase = true;
            self.billObj.InvoiceNumber = "Purchase Bill";
          }
          else {
            self.billObj.isInvoice = 0;
            self.billObj.isPerformaInvoice = 1;
            self.billObj.IsPurchase = false;
            self.newBillObj.InvoiceType = "Performa Invoice";
            self.billObj.InvoiceNumber = "N/A"
          }
        }

        var currentDate = new Date();

        self.billObj.Date = self.datePipe.transform(currentDate, 'MM/dd/yyyy');
        self.billObj.Month = (self.billObj.Date.toString()).split("/")[0];
        self.billObj.ItemList = self.selectedItemList;

        self.billObj.TaxList = self.currentTaxDisplayList;

        self.billObj.SubTotal = self.subTotal;
        self.billObj.GrandTotal = Math.round(self.grandTotal);
        self.billObj.GrandTotalInWords = "Rupees " + (self.NumberToWords(Number(self.billObj.GrandTotal))) + " only";
        self.billObj.OutStandingAmount = self.outstandingAmount;


        self.billObj.DCNumber = self.DCNum;
        self.billObj.SiteName = self.SiteName;
        self.billObj.PONumber = self.POWONum;
        if (self.outstandingAmount <= 0) {
          self.billObj.isPaid = 1;
        }
        else {
          self.billObj.isPaid = 0;
        }
        if (self.isIGSTBill == 1) {
          self.billObj.IsIGST = 1;
        }
        else {
          self.billObj.IsIGST = 0;
        }


        self.af.list('/Invoice').push(self.billObj).then((item) => {
          var key = item.key;
          self.billObj.Key = key;
          self.newSaleInvoiceKey = key;
          self.af.list('/Invoice').update(key, self.billObj).then(() => {

            if (self.billType == 1 && !self.isPurchaseOrder) {
              self.af.list('/InvoiceSeq').update(self.lastInvoiceKey, { "Number": self.newInvoiceNumber }).then(() => {





              }).catch((ex) => {

                controllerContext.showSpinner = false;
                alert("ERROR" + ex.message);

              });;
            }

            var obj1 = self.af.list('/Invoice', {
              query: {
                orderByChild: 'Key',
                equalTo: self.newSaleInvoiceKey
              }
            }).subscribe((item) => {
              self.lastBillObj = item[0];

              //if (!self.lastBillObj.IsPurchase && self.lastBillObj.IsCancelled == 0 && self.lastBillObj.isPerformaInvoice == 0) {
              //  self.UpdateAndSaveSalesAnaltytic();
               
              //  var CGST = Number(Number(self.lastBillObj.GrandTotal) - Number(self.lastBillObj.SubTotal)) / 2;
              //  var SGST = Number(Number(self.lastBillObj.GrandTotal) - Number(self.lastBillObj.SubTotal)) / 2;
              //  var TotalTax = Number(Number(self.lastBillObj.GrandTotal) - Number(self.lastBillObj.SubTotal));

              //  self.UpdateAndSaveSalesAmountWithGSTAnaltytic(TotalTax);
              //  self.UpdateAndSaveSalesAmountWithOutGSTAnaltytic(self.lastBillObj.SubTotal);

              //} 
                   
              obj1.unsubscribe();
              controllerContext.showSpinner = false;
            });

            self.newBillObj.ClientName = self.billObj.ClientName;
            self.newBillObj.Total = self.billObj.GrandTotal;
            self.newBillObj.Date = self.billObj.Date;
            self.isValid = true;
            self.isAdded = true;
            self.successMsg = "Your Invoice has been created Successfully";
            self.selectedItemList = [];
            self.isClientSelected = false;
            self.clientKey = -1;
            self.billType = -1;
            self.currentTaxList = [];
            self.currentTaxDisplayList = [];
            self.subTotal = 0;
            self.grandTotal = 0;
            self.currentItemKey = -1;
            self.advancePayment = 0;
            self.IsIGST = 0;
            self.DCNum = "";
            self.SiteName = "";
            self.POWONum = "";
            self.showAdvanceAmount = false;
            self.tradeSource = false;
            self.billObj = {
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
            }
          }).catch((ex) => {

            controllerContext.showSpinner = false;
            alert("ERROR" + ex.message);

          });;
        }).catch((ex) => {

          controllerContext.showSpinner = false;
          alert("ERROR" + ex.message);

        });;
      }
      else {
        self.isValid = false;
        self.errorMsg = "Please Select all the Required(*) Fields";
      }
    }
  }


}
