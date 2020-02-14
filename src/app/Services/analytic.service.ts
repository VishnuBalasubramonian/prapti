import { Injectable, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Globals } from './global.service';
import { isNgTemplate } from '@angular/compiler';
import { DatePipe, NgIf } from '@angular/common';
import { UserCreation } from './userCreation.service';
import { DownloadLedgerService } from './downloadLedger.service';
import { DownloadMonthlyReportService } from './downloadMonthlyReport.service';

@Injectable()
export class AnalyticService implements OnInit  {

  public monthTS1: any = 0;
  public monthTS2: any = 0;
  public monthTS3: any = 0;
  public monthTS4: any = 0;
  public monthTS5: any = 0;
  public monthTS6: any = 0;
  public monthTS7: any = 0;
  public monthTS8: any = 0;
  public monthTS9: any = 0;
  public monthTS10: any = 0;
  public monthTS11: any = 0;
  public monthTS12: any = 0;

  public monthTR1: any = 0;
  public monthTR2: any = 0;
  public monthTR3: any = 0;
  public monthTR4: any = 0;
  public monthTR5: any = 0;
  public monthTR6: any = 0;
  public monthTR7: any = 0;
  public monthTR8: any = 0;
  public monthTR9: any = 0;
  public monthTR10: any = 0;
  public monthTR11: any = 0;
  public monthTR12: any = 0;

  public monthTP1: any = 0;
  public monthTP2: any = 0;
  public monthTP3: any = 0;
  public monthTP4: any = 0;
  public monthTP5: any = 0;
  public monthTP6: any = 0;
  public monthTP7: any = 0;
  public monthTP8: any = 0;
  public monthTP9: any = 0;
  public monthTP10: any = 0;
  public monthTP11: any = 0;
  public monthTP12: any = 0;

  public monthTEX1: any = 0;
  public monthTEX2: any = 0;
  public monthTEX3: any = 0;
  public monthTEX4: any = 0;
  public monthTEX5: any = 0;
  public monthTEX6: any = 0;
  public monthTEX7: any = 0;
  public monthTEX8: any = 0;
  public monthTEX9: any = 0;
  public monthTEX10: any = 0;
  public monthTEX11: any = 0;
  public monthTEX12: any = 0;

  public monthP1: any = 0;
  public monthP2: any = 0;
  public monthP3: any = 0;
  public monthP4: any = 0;
  public monthP5: any = 0;
  public monthP6: any = 0;
  public monthP7: any = 0;
  public monthP8: any = 0;
  public monthP9: any = 0;
  public monthP10: any = 0;
  public monthP11: any = 0;
  public monthP12: any = 0;

  public monthPU1: any = 0;
  public monthPU2: any = 0;
  public monthPU3: any = 0;
  public monthPU4: any = 0;
  public monthPU5: any = 0;
  public monthPU6: any = 0;
  public monthPU7: any = 0;
  public monthPU8: any = 0;
  public monthPU9: any = 0;
  public monthPU10: any = 0;
  public monthPU11: any = 0;
  public monthPU12: any = 0;

  public monthS1: any = 0;
  public monthS2: any = 0;
  public monthS3: any = 0;
  public monthS4: any = 0;
  public monthS5: any = 0;
  public monthS6: any = 0;
  public monthS7: any = 0;
  public monthS8: any = 0;
  public monthS9: any = 0;
  public monthS10: any = 0;
  public monthS11: any = 0;
  public monthS12: any = 0;

  public monthR1: any = 0;
  public monthR2: any = 0;
  public monthR3: any = 0;
  public monthR4: any = 0;
  public monthR5: any = 0;
  public monthR6: any = 0;
  public monthR7: any = 0;
  public monthR8: any = 0;
  public monthR9: any = 0;
  public monthR10: any = 0;
  public monthR11: any = 0;
  public monthR12: any = 0;

  public monthGP1: any = 0;
  public monthGP2: any = 0;
  public monthGP3: any = 0;
  public monthGP4: any = 0;
  public monthGP5: any = 0;
  public monthGP6: any = 0;
  public monthGP7: any = 0;
  public monthGP8: any = 0;
  public monthGP9: any = 0;
  public monthGP10: any = 0;
  public monthGP11: any = 0;
  public monthGP12: any = 0;

  public monthGEX1: any = 0;
  public monthGEX2: any = 0;
  public monthGEX3: any = 0;
  public monthGEX4: any = 0;
  public monthGEX5: any = 0;
  public monthGEX6: any = 0;
  public monthGEX7: any = 0;
  public monthGEX8: any = 0;
  public monthGEX9: any = 0;
  public monthGEX10: any = 0;
  public monthGEX11: any = 0;
  public monthGEX12: any = 0;

  public monthGPU1: any = 0;
  public monthGPU2: any = 0;
  public monthGPU3: any = 0;
  public monthGPU4: any = 0;
  public monthGPU5: any = 0;
  public monthGPU6: any = 0;
  public monthGPU7: any = 0;
  public monthGPU8: any = 0;
  public monthGPU9: any = 0;
  public monthGPU10: any = 0;
  public monthGPU11: any = 0;
  public monthGPU12: any = 0;

  public monthGS1: any = 0;
  public monthGS2: any = 0;
  public monthGS3: any = 0;
  public monthGS4: any = 0;
  public monthGS5: any = 0;
  public monthGS6: any = 0;
  public monthGS7: any = 0;
  public monthGS8: any = 0;
  public monthGS9: any = 0;
  public monthGS10: any = 0;
  public monthGS11: any = 0;
  public monthGS12: any = 0;

  public monthGR1: any = 0;
  public monthGR2: any = 0;
  public monthGR3: any = 0;
  public monthGR4: any = 0;
  public monthGR5: any = 0;
  public monthGR6: any = 0;
  public monthGR7: any = 0;
  public monthGR8: any = 0;
  public monthGR9: any = 0;
  public monthGR10: any = 0;
  public monthGR11: any = 0;
  public monthGR12: any = 0;


  public mounth: any[] = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels: string[] = this.mounth;
  public barChartType: string = 'bar';
  public barChartLegend: boolean = true;

  public barChartData: any[] = [
       { data: [], label: 'Sale/IGST' },
       { data: [], label: 'Rent' },
       { data: [], label: 'Purchase' },
       { data: [], label: 'Other Expense' }
   
  ];

  public barChartDataGSTSales: any[] = [
    { data: [], label: 'Sale/IGST' },
    { data:[], label: 'Rent' },
    { data:[], label: 'Purchase' },
    { data: [], label: 'Other Expense' }
  ];

  public barChartDataSales: any[] = [
    { data: [], label: 'Sale/IGST' },
    { data: [], label: 'Rent' },
    { data: [], label: 'Purchase' },
    { data: [], label: 'Other Expense' }
  ];

  public chartColors: any[] = [
    { 
      backgroundColor:["#FFA1B5", "#86C7F3", "#FFE199", "#4AA36B"] 
    }];

    public barChartColors: any[] = [
      { 
        backgroundColor:"#FFA1B5"
      },
      { 
        backgroundColor:"#86C7F3"
      },
      { 
        backgroundColor:"#FFE199"
      },
      { 
        backgroundColor:"#4AA36B"
      }];

    
    public doughnutChartLabels:string[] = ['Sale/IGST Total Sales', 'Sale/IGST Oustanding Amount', 'Rent Total Sales', 'Rent Oustanding Amount'];
    public doughnutChartData:number[] = [];
    public doughnutChartType:string = 'doughnut';

    totalYearSales;
    totalYearRent;
    totalYearIGST;
    totalYearPurchase;
    totalYearOtherExpenses;
    totalYearOutstanding;

    figuresModalView;
    reportList;
    mReportDisplayList;
    selectedReportMonth;
    selectedReportType;

    selectedYear;
    analyticYear;
    thisYear;
    outstandingList;
    month;
    clientID;

    totalSalesSubTotalAmount;
    totalSalesGrandTotalAmount;
    totalSalesCGSTAmount;
    totalSalesSGSTAmount;
    totalSalesTaxAmount;

    totalIGSTSubTotalAmount;
    totalIGSTGrandTotalAmount;
    totalIGSTIGSTAmount;
    totalIGSTTaxAmount;

    totalRentSubTotalAmount;
    totalRentGrandTotalAmount;
    totalRentCGSTAmount;
    totalRentSGSTAmount;
    totalRentTaxAmount;

    totalClientOutstandingAmount;
    totalClientRecievedAmount;
    totalClientAmount;
    invoices;
    totalClientOutstandingGSTAmount;

    totalPurchaseSubTotalAmount;
    totalPurchaseGrandTotalAmount;
    totalPurchaseCGSTAmount;
    totalPurchaseSGSTAmount;
    totalPurchaseTaxAmount;

    totalSalesAmount;
    totalSalesGSTAmount;
    totalPOExpense;
    totalPOExpenseGSTAmount;

    totalOtherExpSubTotalAmount;
    totalOtherExpGrandTotalAmount;
    totalOtherExpCGSTAmount;
    totalOtherExpSGSTAmount;
    totalOtherExpTaxAmount;

    totalPurchaseAllTaxAmount;
    totalPurchaseAllGrandTotal;
    totalProfitAmount;
    totalGSTDifferenceAmount;

    allClients;
    clientKey;
    financialYearStart;
    financialYearEnd;
    selectedClient;
    selectedClientBills;
    ledgerBillList;
    clientBillTotalAmount;
    clientBillRecievedAmount;
    clientBillTDS;
    clientBillInvoiceRecieved;
    clientBillRemainingAmount;
    editBillInvoiceObj;
    editLedgerBillObj;
    previousReceivedAmount;
    oldBalance;
    clientTotalOutstanding;
    monthKey;
    totalYearProfit;
    currentMargin;
    monthlySelectedtab;

  constructor(public af: AngularFireDatabase, public global : Globals, public datePipe: DatePipe, public userCreation: UserCreation, public downloadLedger: DownloadLedgerService, public downloadMonthlyreport: DownloadMonthlyReportService) {
    this.global.IsAPPLICATION_ONLITNE();
    this.figuresModalView = "All Figures";
    this.selectedYear = (new Date().getFullYear()).toString();
    this.analyticYear = (new Date().getFullYear()).toString();
    this.GetTotalSaleData();
    this.thisYear = (datePipe.transform(Date.now(),'yyyy-MM-dd')).split("-")[0];
    this.outstandingList = [];
    this.reportList = [];
    this.mReportDisplayList = [];
    this.selectedReportMonth = "-1";
    this.selectedReportType = "-1";
    this.month = "-1";
    this.clientID = "0";
    this.totalSalesSubTotalAmount = 0;
    this.totalSalesGrandTotalAmount = 0;
    this.totalSalesCGSTAmount = 0;
    this.totalSalesSGSTAmount = 0;
    this.totalSalesTaxAmount = 0;
    this.totalIGSTSubTotalAmount = 0;
    this.totalIGSTGrandTotalAmount = 0;
    this.totalIGSTIGSTAmount = 0;
    this.totalIGSTTaxAmount = 0;
    this.totalRentSubTotalAmount = 0;
    this.totalRentGrandTotalAmount = 0;
    this.totalRentCGSTAmount = 0;
    this.totalRentSGSTAmount = 0;
    this.totalRentTaxAmount = 0;
    this.totalProfitAmount = 0;
    this.totalGSTDifferenceAmount = 0;
    this.totalClientAmount = 0;
    this.totalClientOutstandingAmount = 0;
    this.totalClientRecievedAmount = 0;
    this.invoices = "";
    this.totalClientOutstandingGSTAmount = 0;
    this.monthlySelectedtab = 'Figures';

    this.totalOtherExpSubTotalAmount = 0;
    this.totalOtherExpGrandTotalAmount = 0;
    this.totalOtherExpCGSTAmount = 0;
    this.totalOtherExpSGSTAmount = 0;
    this.totalPurchaseTaxAmount = 0;

    this.totalPurchaseSubTotalAmount = 0;
    this.totalPurchaseGrandTotalAmount = 0;
    this.totalSalesAmount = 0;
    this.totalSalesGSTAmount = 0;
    this.totalPurchaseCGSTAmount = 0;
    this.totalPurchaseSGSTAmount = 0;
    this.totalOtherExpTaxAmount = 0;
    this.totalPurchaseAllTaxAmount = 0;
    this.totalPurchaseAllGrandTotal = 0; 
    this.allClients = [];
    this.clientKey = "";
    this.financialYearStart = 0;
    this.financialYearEnd = 0;
    this.selectedClient = "";
    this.selectedClientBills = [];
    this.ledgerBillList = [];
    this.clientBillTotalAmount = 0;
    this.clientBillRecievedAmount = 0;
    this.clientBillTDS = 0;
    this.clientBillInvoiceRecieved = 0;
    this.clientBillRemainingAmount = 0;
    this.ResetTotalFigures();
    this.editBillInvoiceObj = {
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
    this.editLedgerBillObj = {
      Key: "",
      InvoiceNumber: 0,
      Date: "",
      SiteName: "",
      Amount: 0,
      ReceivedAmount: 0,
      TDS: 0,
      ReceivedDate: "",
      OtherDetails: ""
    };
    this.previousReceivedAmount = 0;
    this.oldBalance = 0;
    this.clientTotalOutstanding = 0;
    this.monthKey = "-1";
  }

  ngOnInit(): void {
    this.global.IsAPPLICATION_ONLITNE();
    this.figuresModalView = "All Figures";
    this.selectedYear = (new Date().getFullYear()).toString();
    this.analyticYear = (new Date().getFullYear()).toString();
    this.GetTotalSaleData();
    this.thisYear = (this.datePipe.transform(Date.now(),'yyyy-MM-dd')).split("-")[0];
    this.outstandingList = [];
    this.reportList = [];
    this.mReportDisplayList = [];
    this.month = "-1";
    this.clientID = "0";
    this.totalSalesSubTotalAmount = 0;
    this.totalSalesGrandTotalAmount = 0;
    this.totalSalesCGSTAmount = 0;
    this.totalSalesSGSTAmount = 0;
    this.totalIGSTSubTotalAmount = 0;
    this.totalIGSTGrandTotalAmount = 0;
    this.totalIGSTIGSTAmount = 0;
    this.totalIGSTTaxAmount = 0;
    this.totalRentSubTotalAmount = 0;
    this.totalRentGrandTotalAmount = 0;
    this.totalRentCGSTAmount = 0;
    this.totalRentSGSTAmount = 0;
    this.totalRentTaxAmount = 0;
    this.totalProfitAmount = 0;
    this.totalGSTDifferenceAmount = 0;
    this.totalClientAmount = 0;
    this.totalClientOutstandingAmount = 0;
    this.totalClientRecievedAmount = 0;
    this.invoices = "";
    this.totalClientOutstandingGSTAmount = 0;
    this.ResetTotalFigures
    this.monthlySelectedtab = 'Figures';
    this.totalOtherExpSubTotalAmount = 0;
    this.totalOtherExpGrandTotalAmount = 0;
    this.totalOtherExpCGSTAmount = 0;
    this.totalOtherExpSGSTAmount = 0;

    this.totalPurchaseSubTotalAmount = 0;
    this.totalPurchaseGrandTotalAmount = 0;
    
    this.totalPurchaseCGSTAmount = 0;
    this.totalPurchaseSGSTAmount = 0;
    this.totalPurchaseAllTaxAmount = 0;
    this.totalPurchaseAllGrandTotal = 0;
    this.allClients = [];
    this.clientKey = "";
    this.financialYearStart = 0;
    this.financialYearEnd = 0;
    this.selectedClient = "";
    this.selectedClientBills = [];
    this.ledgerBillList = [];
    this.clientBillTotalAmount = 0;
    this.clientBillRecievedAmount = 0;
    this.clientBillTDS = 0;
    this.clientBillInvoiceRecieved = 0;
    this.clientBillRemainingAmount = 0;
    this.editBillInvoiceObj = {
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
    this.editLedgerBillObj = {
      Key: "",
      InvoiceNumber: 0,
      Date: "",
      SiteName: "",
      Amount: 0,
      ReceivedAmount: 0,
      TDS: 0,
      ReceivedDate: ""
    };
    this.previousReceivedAmount = 0;
    this.oldBalance = 0;
    this.clientTotalOutstanding = 0;
    this.monthKey = "-1";
  }

  GetOutstandingList() {
    var self = this;
    var invoiceListObj = self.af.list('/Invoice', {
      query: {
        orderByChild: 'isPaid',
        equalTo: 0
      }
    }).subscribe((invoices) => {
      if(invoices.length > 0){
        self.outstandingList = [];
        for (let index = 0; index < invoices.length; index++) {

          if(invoices[index].isPerformaInvoice == 0 && invoices[index].IsCancelled == 0){
            var position = 0;
            for (let jindex = 0; jindex < self.outstandingList.length; jindex++) {
              if(invoices[index].ClientName == self.outstandingList[jindex].Client){
                position = jindex;
                break;
              }
            }
            if(position != 0){
              self.outstandingList.Total += Number(invoices[index].GrandTotal);
              self.outstandingList.Outstanding += Number(invoices[index].OutStandingAmount);
              if(self.outstandingList.Invoices == ""){
                self.outstandingList.Invoices = (invoices[index].InvoiceNumber).toString();
              }
              else{
                self.outstandingList.Invoices += ", " + (invoices[index].InvoiceNumber).toString();
              }
            }
            else if(position == 0){
              var unpaidObj = {
                Client: invoices[index].ClientName,
                Total: Number(invoices[index].GrandTotal),
                Outstanding: Number(invoices[index].OutStandingAmount),
                Invoices: (invoices[index].InvoiceNumber).toString() 
              };
              self.outstandingList.push(unpaidObj);
            }
          }
        }
      }
      invoiceListObj.unsubscribe();
    });
  }

  GetTotalSaleData() {
    var self = this;
    var currentYear = self.analyticYear;
    var obj = self.af.list('/Invoice').subscribe((result)=> {


      
        if(result.length > 0){
          for (let index = 1; index <= 12; index++) {
            var searchMonth = index.toString();
            if(index <= 9){
              searchMonth = "0"+searchMonth;
            }
            var totalGSTSalesAmount = 0;
            var totalGSTRentAmount = 0;
            var totalSubTotalSalesAmount = 0;
            var totalSubTotalRentAmount = 0;
            var totalSale = 0;
            var totalRent = 0;

            result.forEach(element => {
              var invoiceYear  = Number((element.Date).split("/")[2]);
              var invoiceMonth = (element.Date).split("/")[0];
              if(invoiceYear == currentYear && invoiceMonth == searchMonth){
                if((element.isRent == 0 || element.IsIGST == 1) && !element.IsPurchase && element.IsCancelled == 0 && element.isPerformaInvoice == 0){
                  totalGSTSalesAmount += Math.round(element.GrandTotal);
                  totalSubTotalSalesAmount += element.SubTotal;
                  totalSale += 1;
                }
                else if(element.isRent == 1 && element.IsIGST == 0 && !element.IsPurchase && element.IsCancelled == 0 && element.isPerformaInvoice == 0){
                  totalGSTRentAmount += Math.round(element.GrandTotal);
                  totalSubTotalRentAmount += element.SubTotal;
                  totalRent += 1;
                }
              }
            });
            self.af.list('/Analytic/' + currentYear).update(index.toString(), { value: totalSale }).then(() => {self.GetSalesOfTheYear(); });
            self.af.list('/AnalyticRent/' + currentYear).update(index.toString(), { value: totalRent }).then(() => {self.GetSalesOfTheYear(); });

            self.af.list('/AnalyticSalesWithGST/' + currentYear).update(index.toString(), { value: totalGSTSalesAmount }).then(() => {self.GetSalesOfTheYear(); })
            self.af.list('/AnalyticRentWithGST/' + currentYear).update(index.toString(), { value: totalGSTRentAmount }).then(() => {self.GetSalesOfTheYear(); })

            self.af.list('/AnalyticSalesWithOutGST/' + currentYear).update(index.toString(), { value: totalSubTotalSalesAmount }).then(() => { self.GetSalesOfTheYear();})
            self.af.list('/AnalyticRentWithOutGST/' + currentYear).update(index.toString(), { value: totalSubTotalRentAmount }).then(() => { self.GetSalesOfTheYear();})
          }
        }
        
    });
    self.GetTotalPurchaseData();
    obj.unsubscribe();
  }

  GetTotalPurchaseData() {
    var self = this;
    var currentYear = this.analyticYear;
    var obj = self.af.list('/PurchaseInvoice').subscribe((result)=> {
      
      if(result.length > 0){
        for (let index = 1; index <= 12; index++) {
          var searchMonth = index.toString();
          if(index <= 9){
            searchMonth = "0"+searchMonth;
          }
          
          var totalGSTPurchasedAmount = 0;
          var totalSubPurchaseAmount = 0;
          var totalPurchase = 0;

          result.forEach(element => {
            var invoiceYear  = Number((element.PODate).split("-")[0]);
            var invoiceMonth = (element.PODate).split("-")[1];
            if(invoiceYear == currentYear && invoiceMonth == searchMonth){
              totalGSTPurchasedAmount += element.GrandTotal;
              totalSubPurchaseAmount += element.POAmount;
              totalPurchase += 1;
            }
          });
          self.af.list('/AnalyticPurchase/' + currentYear).update(index.toString(), { value: totalPurchase }).then(() => {self.GetSalesOfTheYear(); });
          self.af.list('/AnalyticPurchaseAmount/' + currentYear).update(index.toString(), { value: totalGSTPurchasedAmount }).then(() => { self.GetSalesOfTheYear();});
          self.af.list('/AnalyticPurchaseAmountWithoutGST/' + currentYear).update(index.toString(), { value: totalSubPurchaseAmount }).then(() => { self.GetSalesOfTheYear();});
        }
      }
      obj.unsubscribe();
    });
    self.GetTotalOtherExpenseData();
  }

  GetTotalOtherExpenseData(){
    var self = this;
    var currentYear = this.analyticYear;
    var obj = self.af.list('/OtherExpense').subscribe((result)=> {
      
      if(result.length > 0){
        for (let index = 1; index <= 12; index++) {
          var searchMonth = index.toString();
          if(index <= 9){
            searchMonth = "0"+searchMonth;
          }
          
          var totalGSTOtherExpAmount = 0;
          var totalSubOtherExpAmount = 0;
          var totalOtherExp = 0;

          result.forEach(element => {
            var invoiceYear  = Number((element.Date).split("/")[2]);
            var invoiceMonth = (element.Date).split("/")[0];
            if(invoiceYear == currentYear && invoiceMonth == searchMonth){
              totalGSTOtherExpAmount += element.GrandTotal;
              totalSubOtherExpAmount += element.SubTotal;
              totalOtherExp += 1;
            }
          });
          self.af.list('/AnalyticOtherExp/' + currentYear).update(index.toString(), { value: totalOtherExp }).then(() => {self.GetSalesOfTheYear(); });
          self.af.list('/AnalyticOtherExpAmount/' + currentYear).update(index.toString(), { value: totalGSTOtherExpAmount }).then(() => { self.GetSalesOfTheYear();});
          self.af.list('/AnalyticOtherExpAmountWithoutGST/' + currentYear).update(index.toString(), { value: totalSubOtherExpAmount }).then(() => { self.GetSalesOfTheYear();});
        }
      }
      obj.unsubscribe();
    });
  }

TotalOustanding() {
  var self = this;
  self.global.IsAPPLICATION_ONLITNE();
  var grandTotalSale = 0;
  var grandTotalRent = 0;
  var outstandingSale = 0; 
  var outstandingRent = 0;
  var invoiceObj = self.af.list('/Invoice').subscribe((result) => {
   
  result.forEach(element => {
    if((element.IsIGST == 1)||(element.isRent == 0)){
      grandTotalSale += Math.round(Number(element.GrandTotal));
      outstandingSale += Math.round(Number(element.OutStandingAmount));
    }
    else if((element.IsIGST == 0) && (element.isRent == 1)){
      grandTotalRent += Math.round(Number(element.GrandTotal));
      outstandingRent += Math.round(Number(element.OutStandingAmount));
    }
  });
  self.doughnutChartData = [grandTotalSale, outstandingSale, grandTotalRent, outstandingRent];
  invoiceObj.unsubscribe();
});

}

  GetSalesOfTheYear() {
    this.global.IsAPPLICATION_ONLITNE();
    var currentDateMonth = new Date().getMonth() + 1;
    var currentDateYear = this.analyticYear;
    var self = this;

    var totalSales = [];
    var totalRent = [];
    var totalPurchased = [];
    var totalOtherExp = [];

    var obj = this.af.list('/Analytic/' + currentDateYear).subscribe((result) => {
     

      result.forEach((item) => {

        switch (item.$key) {
          case '1': {
            self.monthTS1 = item.value;
            break;
          }
          case '2': {
            self.monthTS2 = item.value;
            break;
          }
          case '3': {
            self.monthTS3 = item.value;
            break;
          }
          case '4': {
            self.monthTS4 = item.value;
            break;
          }
          case '5': {
            self.monthTS5 = item.value;
            break;
          }
          case '6': {
            self.monthTS6 = item.value;
            break;
          }
          case '7': {
            self.monthTS7 = item.value;
            break;
          }
          case '8': {
            self.monthTS8 = item.value;
            break;
          }
          case '9': {
            self.monthTS9 = item.value;
            break;
          }
          case '10': {
            self.monthTS10 = item.value;
            break;
          }
          case '11': {
            self.monthTS11 = item.value;
            break;
          }
          case '12': {
            self.monthTS12 = item.value;
            break;
          }
        }
      });

      totalSales  = [self.monthTS1, self.monthTS2, self.monthTS3, self.monthTS4, self.monthTS5, self.monthTS6, self.monthTS7, self.monthTS8, self.monthTS9, self.monthTS10, self.monthTS11, self.monthTS12];
obj.unsubscribe();
    var obj1 = this.af.list('/AnalyticPurchase/' + currentDateYear).subscribe((result) => {
      
      result.forEach((item) => {

        switch (item.$key) {
          case '1': {
            self.monthTP1 = item.value;
            break;
          }
          case '2': {
            self.monthTP2 = item.value;
            break;
          }
          case '3': {
            self.monthTP3 = item.value;
            break;
          }
          case '4': {
            self.monthTP4 = item.value;
            break;
          }
          case '5': {
            self.monthTP5 = item.value;
            break;
          }
          case '6': {
            self.monthTP6 = item.value;
            break;
          }
          case '7': {
            self.monthTP7 = item.value;
            break;
          }
          case '8': {
            self.monthTP8 = item.value;
            break;
          }
          case '9': {
            self.monthTP9 = item.value;
            break;
          }
          case '10': {
            self.monthTP10 = item.value;
            break;
          }
          case '11': {
            self.monthTP11 = item.value;
            break;
          }
          case '12': {
            self.monthTP12 = item.value;
            break;
          }
        }
      });

      totalPurchased  = [self.monthTP1, self.monthTP2, self.monthTP3, self.monthTP4, self.monthTP5, self.monthTP6, self.monthTP7, self.monthTP8, self.monthTP9, self.monthTP10, self.monthTP11, self.monthTP12];
      obj1.unsubscribe();
      var obj2 = this.af.list('/AnalyticRent/' + currentDateYear).subscribe((result) => {
        
        result.forEach((item) => {

          switch (item.$key) {
            case '1': {
              self.monthTR1 = item.value;
              break;
            }
            case '2': {
              self.monthTR2 = item.value;
              break;
            }
            case '3': {
              self.monthTR3 = item.value;
              break;
            }
            case '4': {
              self.monthTR4 = item.value;
              break;
            }
            case '5': {
              self.monthTR5 = item.value;
              break;
            }
            case '6': {
              self.monthTR6 = item.value;
              break;
            }
            case '7': {
              self.monthTR7 = item.value;
              break;
            }
            case '8': {
              self.monthTR8 = item.value;
              break;
            }
            case '9': {
              self.monthTR9 = item.value;
              break;
            }
            case '10': {
              self.monthTR10 = item.value;
              break;
            }
            case '11': {
              self.monthTR11 = item.value;
              break;
            }
            case '12': {
              self.monthTR12 = item.value;
              break;
            }
          }




        });

        totalRent = [self.monthTR1, self.monthTR2, self.monthTR3, self.monthTR4, self.monthTR5, self.monthTR6, self.monthTR7, self.monthTR8, self.monthTR9, self.monthTR10, self.monthTR11, self.monthTR12];
        obj2.unsubscribe();
        var obj3 = this.af.list('/AnalyticOtherExp/' + currentDateYear).subscribe((result) => {
        
          result.forEach((item) => {
  
            switch (item.$key) {
              case '1': {
                self.monthTEX1 = item.value;
                break;
              }
              case '2': {
                self.monthTEX2 = item.value;
                break;
              }
              case '3': {
                self.monthTEX3 = item.value;
                break;
              }
              case '4': {
                self.monthTEX4 = item.value;
                break;
              }
              case '5': {
                self.monthTEX5 = item.value;
                break;
              }
              case '6': {
                self.monthTEX6 = item.value;
                break;
              }
              case '7': {
                self.monthTEX7 = item.value;
                break;
              }
              case '8': {
                self.monthTEX8 = item.value;
                break;
              }
              case '9': {
                self.monthTEX9 = item.value;
                break;
              }
              case '10': {
                self.monthTEX10 = item.value;
                break;
              }
              case '11': {
                self.monthTEX11 = item.value;
                break;
              }
              case '12': {
                self.monthTEX12 = item.value;
                break;
              }
            }
  
  
  
  
          });
  
          totalOtherExp = [self.monthTEX1, self.monthTEX2, self.monthTEX3, self.monthTEX4, self.monthTEX5, self.monthTEX6, self.monthTEX7, self.monthTEX8, self.monthTEX9, self.monthTEX10, self.monthTEX11, self.monthTEX12];
  
          self.barChartData = [{ data: totalSales, label: 'Sale/IGST' }, { data: totalRent, label: 'Rent' }, { data: totalPurchased, label: 'Purchase' }, { data: totalOtherExp, label: 'Other Expense' }];
          obj3.unsubscribe();
        });
        

      });


    });

    
    });

    this.GetGSTSalesPurchseOfTheYear();
    this.GetWithOutGSTSalesPurchseOfTheYear();
    this.TotalOustanding();
  }

  GetGSTSalesPurchseOfTheYear() {
    this.global.IsAPPLICATION_ONLITNE();
    var currentDateMonth = new Date().getMonth() + 1;
    var currentDateYear = this.analyticYear;
    var self = this;

    var obj = this.af.list('/AnalyticSalesWithGST/' + currentDateYear).subscribe((result) => {
      
      var purchasedata = [];
      var salesdata = [];
      var rentdata = [];
      var otherExpData = [];

      result.forEach((item) => {

        switch (item.$key) {
          case '1': {
            self.monthGS1 = item.value;
            break;
          }
          case '2': {
            self.monthGS2 = item.value;
            break;
          }
          case '3': {
            self.monthGS3 = item.value;
            break;
          }
          case '4': {
            self.monthGS4 = item.value;
            break;
          }
          case '5': {
            self.monthGS5 = item.value;
            break;
          }
          case '6': {
            self.monthGS6 = item.value;
            break;
          }
          case '7': {
            self.monthGS7 = item.value;
            break;
          }
          case '8': {
            self.monthGS8 = item.value;
            break;
          }
          case '9': {
            self.monthGS9 = item.value;
            break;
          }
          case '10': {
            self.monthGS10 = item.value;
            break;
          }
          case '11': {
            self.monthGS11 = item.value;
            break;
          }
          case '12': {
            self.monthGS12 = item.value;
            break;
          }
        }

        
        salesdata = [self.monthGS1, self.monthGS2, self.monthGS3, self.monthGS4, self.monthGS5, self.monthGS6, self.monthGS7, self.monthGS8, self.monthGS9, self.monthGS10, self.monthGS11, self.monthGS12];


      })


      
      obj.unsubscribe();
      var obj1 = this.af.list('/AnalyticRentWithGST/' + currentDateYear).subscribe((rentResult) => {
        rentResult.forEach((item) => {

          switch (item.$key) {
            case '1': {
              self.monthGR1 = item.value;
              break;
            }
            case '2': {
              self.monthGR2 = item.value;
              break;
            }
            case '3': {
              self.monthGR3 = item.value;
              break;
            }
            case '4': {
              self.monthGR4 = item.value;
              break;
            }
            case '5': {
              self.monthGR5 = item.value;
              break;
            }
            case '6': {
              self.monthGR6 = item.value;
              break;
            }
            case '7': {
              self.monthGR7 = item.value;
              break;
            }
            case '8': {
              self.monthGR8 = item.value;
              break;
            }
            case '9': {
              self.monthGR9 = item.value;
              break;
            }
            case '10': {
              self.monthGR10 = item.value;
              break;
            }
            case '11': {
              self.monthGR11 = item.value;
              break;
            }
            case '12': {
              self.monthGR12 = item.value;
              break;
            }
          }
  
  
          rentdata = [self.monthGR1, self.monthGR2, self.monthGR3, self.monthGR4, self.monthGR5, self.monthGR6, self.monthGR7, self.monthGR8, self.monthGR9, self.monthGR10, self.monthGR11, self.monthGR12];
          
  
        })
        obj1.unsubscribe();
        var obj2 = this.af.list('/AnalyticPurchaseAmount/' + currentDateYear).subscribe((result) => {
      
          result.forEach((item) => {
  
            switch (item.$key) {
              case '1': {
                self.monthGP1 = item.value;
                break;
              }
              case '2': {
                self.monthGP2 = item.value;
                break;
              }
              case '3': {
                self.monthGP3 = item.value;
                break;
              }
              case '4': {
                self.monthGP4 = item.value;
                break;
              }
              case '5': {
                self.monthGP5 = item.value;
                break;
              }
              case '6': {
                self.monthGP6 = item.value;
                break;
              }
              case '7': {
                self.monthGP7 = item.value;
                break;
              }
              case '8': {
                self.monthGP8 = item.value;
                break;
              }
              case '9': {
                self.monthGP9 = item.value;
                break;
              }
              case '10': {
                self.monthGP10 = item.value;
                break;
              }
              case '11': {
                self.monthGP11 = item.value;
                break;
              }
              case '12': {
                self.monthGP12 = item.value;
                break;
              }
            }
  
  
  
  
          });
  
         purchasedata = [self.monthGP1, self.monthGP2, self.monthGP3, self.monthGP4, self.monthGP5, self.monthGP6, self.monthGP7, self.monthGP8, self.monthGP9, self.monthGP10, self.monthGP11, self.monthGP12];
         obj2.unsubscribe();
         var obj3 = this.af.list('/AnalyticOtherExpAmount/' + currentDateYear).subscribe((result) => {
      
          result.forEach((item) => {
  
            switch (item.$key) {
              case '1': {
                self.monthGEX1 = item.value;
                break;
              }
              case '2': {
                self.monthGEX2 = item.value;
                break;
              }
              case '3': {
                self.monthGEX3 = item.value;
                break;
              }
              case '4': {
                self.monthGEX4 = item.value;
                break;
              }
              case '5': {
                self.monthGEX5 = item.value;
                break;
              }
              case '6': {
                self.monthGEX6 = item.value;
                break;
              }
              case '7': {
                self.monthGEX7 = item.value;
                break;
              }
              case '8': {
                self.monthGEX8 = item.value;
                break;
              }
              case '9': {
                self.monthGEX9 = item.value;
                break;
              }
              case '10': {
                self.monthGEX10 = item.value;
                break;
              }
              case '11': {
                self.monthGEX11 = item.value;
                break;
              }
              case '12': {
                self.monthGEX12 = item.value;
                break;
              }
            }
  
  
  
  
          });
  
         otherExpData = [self.monthGEX1, self.monthGEX2, self.monthGEX3, self.monthGEX4, self.monthGEX5, self.monthGEX6, self.monthGEX7, self.monthGEX8, self.monthGEX9, self.monthGEX10, self.monthGEX11, self.monthGEX12];
         self.barChartDataGSTSales = [{ data: salesdata, label: 'Sale/IGST' }, { data: rentdata, label: 'Rent' },{ data: purchasedata, label: 'Purchase' },{ data: otherExpData, label: 'Other Expense' } ];
         obj3.unsubscribe();
        });
         
        });
      });
    });
  }

  

  GetWithOutGSTSalesPurchseOfTheYear() {
    this.global.IsAPPLICATION_ONLITNE();
    var currentDateMonth = new Date().getMonth() + 1;
    var currentDateYear = this.analyticYear;
    var self = this;

    var obj = this.af.list('/AnalyticSalesWithOutGST/' + currentDateYear).subscribe((result) => {
      var purchasedata = [];
      var salesdata = [];
      var rentdata = [];
      var otherExpData = [];

      result.forEach((item) => {

        switch (item.$key) {
          case '1': {
            self.monthS1 = item.value;
            break;
          }
          case '2': {
            self.monthS2 = item.value;
            break;
          }
          case '3': {
            self.monthS3 = item.value;
            break;
          }
          case '4': {
            self.monthS4 = item.value;
            break;
          }
          case '5': {
            self.monthS5 = item.value;
            break;
          }
          case '6': {
            self.monthS6 = item.value;
            break;
          }
          case '7': {
            self.monthS7 = item.value;
            break;
          }
          case '8': {
            self.monthS8 = item.value;
            break;
          }
          case '9': {
            self.monthS9 = item.value;
            break;
          }
          case '10': {
            self.monthS10 = item.value;
            break;
          }
          case '11': {
            self.monthS11 = item.value;
            break;
          }
          case '12': {
            self.monthS12 = item.value;
            break;
          }
        }


        salesdata = [self.monthS1, self.monthS2, self.monthS3, self.monthS4, self.monthS5, self.monthS6, self.monthS7, self.monthS8, self.monthS9, self.monthS10, self.monthS11, self.monthS12];


      });
      obj.unsubscribe();
      var obj1 = this.af.list('/AnalyticRentWithOutGST/' + currentDateYear).subscribe((result) => {
        result.forEach((item) => {

          switch (item.$key) {
            case '1': {
              self.monthR1 = item.value;
              break;
            }
            case '2': {
              self.monthR2 = item.value;
              break;
            }
            case '3': {
              self.monthR3 = item.value;
              break;
            }
            case '4': {
              self.monthR4 = item.value;
              break;
            }
            case '5': {
              self.monthR5 = item.value;
              break;
            }
            case '6': {
              self.monthR6 = item.value;
              break;
            }
            case '7': {
              self.monthR7 = item.value;
              break;
            }
            case '8': {
              self.monthR8 = item.value;
              break;
            }
            case '9': {
              self.monthR9 = item.value;
              break;
            }
            case '10': {
              self.monthR10 = item.value;
              break;
            }
            case '11': {
              self.monthR11 = item.value;
              break;
            }
            case '12': {
              self.monthR12 = item.value;
              break;
            }
          }


          rentdata = [self.monthR1, self.monthR2, self.monthR3, self.monthR4, self.monthR5, self.monthR6, self.monthR7, self.monthR8, self.monthR9, self.monthR10, self.monthR11, self.monthR12];

        });
        obj1.unsubscribe();
        var obj2 = this.af.list('/AnalyticPurchaseAmountWithoutGST/' + currentDateYear).subscribe((result) => {
          result.forEach((item) => {
  
            switch (item.$key) {
              case '1': {
                self.monthGP1 = item.value;
                break;
              }
              case '2': {
                self.monthGP2 = item.value;
                break;
              }
              case '3': {
                self.monthGP3 = item.value;
                break;
              }
              case '4': {
                self.monthGP4 = item.value;
                break;
              }
              case '5': {
                self.monthGP5 = item.value;
                break;
              }
              case '6': {
                self.monthGP6 = item.value;
                break;
              }
              case '7': {
                self.monthGP7 = item.value;
                break;
              }
              case '8': {
                self.monthGP8 = item.value;
                break;
              }
              case '9': {
                self.monthGP9 = item.value;
                break;
              }
              case '10': {
                self.monthGP10 = item.value;
                break;
              }
              case '11': {
                self.monthGP11 = item.value;
                break;
              }
              case '12': {
                self.monthGP12 = item.value;
                break;
              }
            }
  
  
  
  
          });
  
         purchasedata = [self.monthGP1, self.monthGP2, self.monthGP3, self.monthGP4, self.monthGP5, self.monthGP6, self.monthGP7, self.monthGP8, self.monthGP9, self.monthGP10, self.monthGP11, self.monthGP12];
         obj2.unsubscribe();
         var obj3 = this.af.list('/AnalyticOtherExpAmountWithoutGST/' + currentDateYear).subscribe((result) => {
          result.forEach((item) => {
  
            switch (item.$key) {
              case '1': {
                self.monthGEX1 = item.value;
                break;
              }
              case '2': {
                self.monthGEX2 = item.value;
                break;
              }
              case '3': {
                self.monthGEX3 = item.value;
                break;
              }
              case '4': {
                self.monthGEX4 = item.value;
                break;
              }
              case '5': {
                self.monthGEX5 = item.value;
                break;
              }
              case '6': {
                self.monthGEX6 = item.value;
                break;
              }
              case '7': {
                self.monthGEX7 = item.value;
                break;
              }
              case '8': {
                self.monthGEX8 = item.value;
                break;
              }
              case '9': {
                self.monthGEX9 = item.value;
                break;
              }
              case '10': {
                self.monthGEX10 = item.value;
                break;
              }
              case '11': {
                self.monthGEX11 = item.value;
                break;
              }
              case '12': {
                self.monthGEX12 = item.value;
                break;
              }
            }
  
  
  
  
          });
  
         otherExpData = [self.monthGEX1, self.monthGEX2, self.monthGEX3, self.monthGEX4, self.monthGEX5, self.monthGEX6, self.monthGEX7, self.monthGEX8, self.monthGEX9, self.monthGEX10, self.monthGEX11, self.monthGEX12];
         self.barChartDataSales = [{ data: salesdata, label: 'Sale/IGST' }, { data: rentdata, label: 'Rent' }, { data: purchasedata, label: 'Purchase' }, { data: otherExpData, label: 'Other Expense' }];
         obj3.unsubscribe();
        });
        });
      });
    });
  }

 

  GetClientFigures(){
    var self = this;
    self.totalPurchaseAllGrandTotal = 0;
    self.totalPurchaseAllTaxAmount = 0;
    self.totalProfitAmount = 0;
    self.totalGSTDifferenceAmount = 0;
    self.invoices = "";
    self.totalClientOutstandingGSTAmount = 0;
    var invoiceNode = self.af.list('/Invoice', {
      query: {
        orderByChild: 'ClientName',
        equalTo: self.clientID
      }
    }).subscribe((result) => {
      self.totalClientAmount = 0;
      self.totalClientRecievedAmount = 0;
      self.totalClientOutstandingAmount = 0;
      if(result.length > 0){
        result.forEach(element => {
          self.totalClientAmount += Number(element.GrandTotal);
          self.totalClientOutstandingAmount += Number(element.OutStandingAmount);
          self.totalClientRecievedAmount += self.totalClientAmount - self.totalClientOutstandingAmount;
          if(self.totalClientOutstandingAmount > 0){
            if(self.invoices != ""){
              self.invoices += ", "
            }
            self.invoices += (element.InvoiceNumber).toString();
            self.totalClientOutstandingGSTAmount += Number(element.TaxList[0].Tax);
          }
        });
      }
      invoiceNode.unsubscribe();
    });

  }

  GetAllAmount1(){
    var self = this;
    var salesNode = self.af.list('/AnalyticSalesWithGST/'+self.selectedYear+'/' + self.month)
      .subscribe((result) => {
        var salesWithGST = 0;
        if(result.length > 0){
          result.forEach(element => {
            if(element.$key == self.month){
              salesWithGST = result[0].value;
            }
          });
        }
        var rentNode = self.af.list('/AnalyticRentWithGST/'+self.selectedYear+'/' + self.month).subscribe((result1) => {
          var rentWithGST = 0;
            if(result1.length > 0){
              rentWithGST = result1[0].value;
            }
            var salesNodeNoGST = self.af.list('/AnalyticSalesWithOutGST/'+self.selectedYear+'/' + self.month).subscribe((result2) => {
              var salesWithoutGST = 0;
              if(result2.length > 0){
                salesWithoutGST = result2[0].value;
              }
              var rentNodeNoGST = self.af.list('/AnalyticRentWithOutGST/'+self.selectedYear+'/' + self.month).subscribe((result3) => {
                var rentWithoutGST = 0;
                if(result3.length > 0){
                  rentWithoutGST = result3[0].value;
                }
                var purchaseNode = self.af.list('/AnalyticPurchaseAmount/'+self.selectedYear+'/' + self.month).subscribe((result4) => {
                  var purchaseWithGST = 0;
                  if(result4.length > 0){
                    purchaseWithGST = result4[0].value;
                  }
                  var purchaseNodeNoGST = self.af.list('/AnalyticPurchaseAmountWithoutGST/'+self.selectedYear+'/' + self.month).subscribe((result5) => {
                    var purchaseWithoutGST = 0;
                    if(result5.length > 0){
                      purchaseWithoutGST = result5[0].value;
                    }
                    var otherExpNode = self.af.list('/AnalyticOtherExpAmount/'+self.selectedYear+'/' + self.month).subscribe((result6) => {
                      var otherExpWithGST = 0;
                      if(result6.length > 0){
                        otherExpWithGST = result6[0].value;
                      }
                      var otherExpNoGST = self.af.list('/AnalyticOtherExpAmountWithoutGST/'+self.selectedYear+'/' + self.month).subscribe((result7) => {
                        var otherExpWithoutGST = 0;
                        if(result7.length > 0){
                          otherExpWithoutGST = result7[0].value;
                        }
                        self.totalSalesSubTotalAmount = (salesWithoutGST + rentWithoutGST);
                        self.totalSalesGrandTotalAmount = (salesWithGST + rentWithGST);
                        var taxAmountS = Number(self.totalSalesSubTotalAmount) * (0.18);
                        self.totalSalesCGSTAmount = Number(Number(taxAmountS/2).toFixed(2));
                        self.totalSalesSGSTAmount = Number(Number(taxAmountS/2).toFixed(2));
  
                        self.totalPurchaseSubTotalAmount = purchaseWithoutGST;
                        self.totalPurchaseGrandTotalAmount = purchaseWithGST;
                        var taxAmountP = Number(self.totalPurchaseSubTotalAmount) * (0.18);
                        self.totalPurchaseCGSTAmount = Number(Number(taxAmountP/2).toFixed(2));
                        self.totalPurchaseSGSTAmount = Number(Number(taxAmountP/2).toFixed(2));
  
                        self.totalOtherExpSubTotalAmount = otherExpWithoutGST;
                        self.totalOtherExpGrandTotalAmount = otherExpWithGST;
                        var taxAmountO = Number(self.totalOtherExpGrandTotalAmount) * (0.18);
                        self.totalOtherExpCGSTAmount = Number(Number(taxAmountO/2).toFixed(2));
                        self.totalOtherExpSGSTAmount = Number(Number(taxAmountO/2).toFixed(2));
  
                        self.totalOtherExpTaxAmount = self.totalOtherExpCGSTAmount + self.totalOtherExpSGSTAmount;
                        self.totalSalesTaxAmount = taxAmountS;
                        self.totalPurchaseAllTaxAmount = taxAmountP + self.totalOtherExpTaxAmount;
                        self.totalPurchaseAllGrandTotal = self.totalPurchaseGrandTotalAmount + self.totalOtherExpGrandTotalAmount;
                        self.totalProfitAmount = self.totalSalesSubTotalAmount - (self.totalPurchaseSubTotalAmount + self.totalOtherExpGrandTotalAmount);
                        self.totalGSTDifferenceAmount = Number(Number((self.totalSalesCGSTAmount * 2) - (self.totalPurchaseCGSTAmount * 2)).toFixed(2));
                        otherExpNoGST.unsubscribe();
                      });
                      otherExpNode.unsubscribe();
                    });
                    purchaseNodeNoGST.unsubscribe();
                  });
                  purchaseNode.unsubscribe();
                });
                rentNodeNoGST.unsubscribe();
              });
              salesNodeNoGST.unsubscribe();
            });
            rentNode.unsubscribe();
          });
        salesNode.unsubscribe();
      });
  }
  

  

  ResetFiguresValues(){
    var self=  this;
    self.totalIGSTSubTotalAmount = 0;
    self.totalIGSTGrandTotalAmount = 0;
    self.totalIGSTIGSTAmount = 0;
    self.totalIGSTTaxAmount = 0;
    self.totalSalesSubTotalAmount = 0;
      self.totalPurchaseSubTotalAmount = 0;
      self.totalOtherExpSubTotalAmount = 0;
      self.totalSalesCGSTAmount = 0;
      self.totalPurchaseCGSTAmount = 0;
      self.totalSalesSGSTAmount = 0;
      self.totalPurchaseSGSTAmount = 0;
      self.totalSalesGrandTotalAmount = 0;
      self.totalPurchaseGrandTotalAmount = 0;
      self.totalSalesAmount = 0;
    self.totalSalesGSTAmount = 0;
      self.totalOtherExpGrandTotalAmount = 0;
      self.totalSalesGrandTotalAmount = 0;
      self.totalSalesTaxAmount = 0;
      self.totalPurchaseAllGrandTotal = 0;
      self.totalPurchaseAllTaxAmount = 0;
      self.totalProfitAmount = 0;
      self.totalGSTDifferenceAmount = 0;
      self.totalRentSubTotalAmount = 0;
      self.totalRentGrandTotalAmount = 0;
      self.totalRentCGSTAmount = 0;
      self.totalRentSGSTAmount = 0;
      self.totalRentTaxAmount = 0;
      self.totalPOExpense = 0;
      self.totalPOExpenseGSTAmount = 0;
      this.totalSalesAmount = 0;
      this.totalSalesGSTAmount = 0;
  }

  SetupLedger(){
    var self = this;
    self.GetClients();
    var currentYear = Number(self.selectedYear);
    var currentMonth = Number(new Date().getMonth()) + 1;
    // var currentYear = Number(((self.datePipe.transform(currentDate, 'MM/dd/yyyy')).toString()).split("/")[2]);
    // var currentMonth = Number(((self.datePipe.transform(currentDate, 'MM/dd/yyyy')).toString()).split("/")[1]);
    if(currentMonth < 4){
      self.financialYearStart = currentYear - 1;
      self.financialYearEnd = currentYear;
    }
    else{
      self.financialYearStart = currentYear;
      self.financialYearEnd = currentYear + 1;
    }
    
  }

  GetAllClientBills(){
    var self = this;
    var invoiceNodeObj = self.af.list('/Invoice', {
      query: {
        orderByChild: 'ClientName',
        equalTo: self.selectedClient
      }
    }).subscribe((result) => {
        
        if(result.length > 0){
          self.selectedClientBills = [];
          if(self.monthKey == "-1"){
            self.selectedClientBills = result;
          }
          else {
            result.forEach(item => {
              if(item.Month == self.monthKey){
                self.selectedClientBills.push(item);
              }
            });
          }
          self.ledgerBillList = [];
          self.selectedClientBills.forEach(bill => {

            var currentBillTDS = bill.TDS;
            // var recievedAmount = ((Number(bill.GrandTotal) - Number(bill.OutStandingAmount))) - Number(currentBillTDS);
            var recievedAmount = ((Number(bill.GrandTotal) - Number(bill.OutStandingAmount)));
            
            var currentBillRecievedDate = bill.ReceivedDate;
            if(currentBillTDS == undefined){
              currentBillTDS = 0;
              bill.TDS = 0;
            }
            if(currentBillRecievedDate == undefined){
              currentBillRecievedDate = "";
              bill.RecievedDate = "";
            }
            var ledgerBillObj = {
              Key: bill.Key,
              InvoiceNumber: bill.InvoiceNumber,
              Date: bill.Date,
              SiteName: bill.SiteName,
              Amount: bill.GrandTotal,
              ReceivedAmount: recievedAmount,
              TDS: bill.TDS,
              ReceivedDate: currentBillRecievedDate,
              isPaid: bill.isPaid,
              OtherDetails: bill.OtherDetails
            };
            self.ledgerBillList.push(ledgerBillObj);
          });
        }
        else{
          self.selectedClientBills = [];
          self.ledgerBillList = [];
        }
        self.CalculateLedgerSummary();
       invoiceNodeObj.unsubscribe(); 
    });
  }

  CalculateLedgerSummary(){
    var self = this;
    self.clientBillTotalAmount = 0;
    self.clientBillRecievedAmount = 0;
    self.clientBillTDS = 0;
    self.clientBillInvoiceRecieved = 0;
    self.clientBillRemainingAmount = 0;
    self.ledgerBillList.forEach(ledgerBill => {
      self.clientBillTotalAmount += Number(ledgerBill.Amount);
      self.clientBillRecievedAmount += Number(ledgerBill.OtherDetails);
      self.clientBillTDS += Number(ledgerBill.TDS);
      self.clientBillInvoiceRecieved += Number(ledgerBill.ReceivedAmount);
    });
    var amountDifference = 0;
    if(self.clientBillTotalAmount > self.clientBillRecievedAmount){
      amountDifference = self.clientBillTotalAmount - self.clientBillRecievedAmount;
    }
    //This might never occur
    else{
      amountDifference = self.clientBillRecievedAmount - self.clientBillTotalAmount;
    }
    self.clientBillRemainingAmount = (amountDifference - self.clientBillTDS) - self.previousReceivedAmount;
    self.clientTotalOutstanding = self.clientBillRemainingAmount + self.oldBalance;
  }

  GetClients(){
    var self = this;
    var clientListObj = self.af.list('/Client').subscribe((result) => {
      self.allClients = result;
      // this.itemList = this.itemList.sort((a,b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0));
      self.allClients = self.allClients.sort((a,b) => (a.Name > b.Name) ? 1 : ((b.Name > a.Name) ? -1 : 0));
      //clientListObj.unsubscribe();
    });
  }
   
  ChooseClient(){
    var self = this;
    var clientsObj = self.af.list('/Client', {
      query: {
        orderByChild: 'Key',
        equalTo: self.clientKey
      }
    }).subscribe((result) => {
      if(result.length > 0){
        self.selectedClient = result[0].Name;
        self.GetAllClientBills();
      }
      else{
        self.selectedClient = "";
      }
      clientsObj.unsubscribe();
    });
  }

  SetEditBillObject(billKey){
    var self = this;

    var invoiceNode = self.af.list('/Invoice', {
      query: {
        orderByChild: 'Key',
        equalTo: billKey
      }
    }).subscribe((allInvoices) => {
      if(allInvoices.length > 0){
        self.editBillInvoiceObj = allInvoices[0];
        self.ledgerBillList.forEach(ledgerBill => {
          if(ledgerBill.Key == self.editBillInvoiceObj.Key){
            self.editLedgerBillObj = ledgerBill;
          }
        });
      }
      else{
        this.editBillInvoiceObj = {
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
          TDS: 0
        };
        this.editLedgerBillObj = {
          Key: "",
          InvoiceNumber: 0,
          Date: "",
          SiteName: "",
          Amount: 0,
          ReceivedAmount: 0,
          TDS: 0,
          ReceivedDate: ""
        };
      }
    });
  }

  UpdateInvoiceInfo(editedInvoice){
    var self = this;
    var invoiceNode = self.af.list('/Invoice', {
          query: {
            orderByChild: 'Key',
            equalTo: editedInvoice.Key
          }
        }).subscribe((result) => {
          result[0].TDS = Number(editedInvoice.TDS);
          // result[0].OutStandingAmount = (Number(result[0].GrandTotal)) - (Number(editedInvoice.ReceivedAmount) + Number(result[0].TDS));
          result[0].OutStandingAmount = (Number(result[0].GrandTotal)) - (Number(editedInvoice.ReceivedAmount));

          if(result[0].OutStandingAmount == 0){
            result[0].isPaid = 1;
            editedInvoice.isPaid = 1;
          }
          else{
            result[0].isPaid = 0;
            editedInvoice.isPaid = 0;
          }
          if(editedInvoice.ReceivedDate == undefined){
            result[0].ReceivedDate = "";
          }
          else{
            result[0].ReceivedDate = editedInvoice.ReceivedDate;
          }

          result[0].OtherDetails = editedInvoice.OtherDetails;
          
          invoiceNode.unsubscribe();
          self.af.list('/Invoice').update(result[0].Key, result[0]).then(() => {
            
            self.GetAllClientBills();
          });
        });
  }

  UpdateToPaid(invoiceKey){
    var self = this;
    self.ledgerBillList.forEach(ledgerBill => {
      if(invoiceKey == ledgerBill.Key){
        ledgerBill.isPaid = 1;
        ledgerBill.ReceivedAmount = ledgerBill.Amount;
      }
    });
    var invoiceNode = self.af.list('/Invoice', {
      query: {
        orderByChild: 'Key',
        equalTo: invoiceKey
      }
    }).subscribe((result) => {
      if(result.length > 0){
        result[0].OutStandingAmount = 0;
        result[0].isPaid = 1;
        self.af.list('/Invoice').update(result[0].Key, result[0]).then(() => {
          self.CalculateLedgerSummary();
        });
        
      }
      invoiceNode.unsubscribe();
    });
  }

  DownloadLedger(){
    var self = this;
    var ledgerSummary = {
      TotalAmount: self.clientBillTotalAmount,
      RecievedAmount: self.clientBillRecievedAmount,
      TDS: self.clientBillTDS,
      OutstandingAmount: self.clientBillRemainingAmount,
      InvoiceRecievedAmount: self.clientBillInvoiceRecieved
    };
    var clientDB = self.af.list('/Client', {
      query : {
        orderByChild: 'Name',
        equalTo: self.selectedClient
      }
    }).subscribe((result) => {
      if(result.length > 0){
        var clientDetails = {
          Address1: result[0].Address1,
          Address2: result[0].Address2,
          City: result[0].City,
          Pincode: result[0].Pincode
        };
        self.downloadLedger.DownloadLedger(self.ledgerBillList, self.selectedClient, self.monthKey, self.selectedYear, ledgerSummary, clientDetails);
      }
      else{
        console.log('Invalid Client Name');
      }
      clientDB.unsubscribe();
    });
    
  }

  DownloadMonthlyReport(){
    var self = this;
    self.downloadMonthlyreport.DownloadMonthlyReport(self.mReportDisplayList, self.selectedReportMonth, self.selectedReportType);
  }

  SetupFigures(){
    var self = this;
    self.figuresModalView = "All Figures";
  }

  ChooseFiguresTab(selectedTab){
    var self = this;
    self.figuresModalView = selectedTab;
    if(this.figuresModalView == 'All Figures'){
      this.selectedReportMonth = "-1";
      this.selectedReportType = "-1";
    }
  }

  GetMonthlyReport(){
    var self = this;
    self.reportList = [];
    self.mReportDisplayList = [];
    var invoiceDB = self.af.list('/Invoice', {
      query: {
        orderByChild: 'Month',
        equalTo: self.selectedReportMonth
      }
    }).subscribe((result) => {
      if(result.length > 0){
        self.reportList = result;
        self.CalculateMonthlyFigures();
        self.FilterMonthlyBills();
      }
      else {
        self.reportList = [];
        self.mReportDisplayList = [];
      }
      invoiceDB.unsubscribe();
    });
  }

  CalculateMonthlyFigures() {
    var self = this;
    self.ResetFiguresValues();
    self.reportList.forEach(element => {
      if(element.isIGST == 1 || element.IsIGST == 1){
        self.totalIGSTSubTotalAmount += Number(element.SubTotal);
        self.totalIGSTGrandTotalAmount += Number(element.GrandTotal);
      }
      else if(element.isRent == 0) {
        self.totalSalesSubTotalAmount += Number(element.SubTotal);
        self.totalSalesGrandTotalAmount += Number(element.GrandTotal);
      }
      else if(element.isRent == 1) {
        self.totalRentSubTotalAmount += Number(element.SubTotal);
        self.totalRentGrandTotalAmount += Number(element.GrandTotal);
      }
      self.totalIGSTIGSTAmount = (Number(self.totalIGSTSubTotalAmount) * 0.18).toFixed(2);
      self.totalSalesCGSTAmount = (Number(self.totalSalesSubTotalAmount) * 0.09).toFixed(2);
      self.totalSalesSGSTAmount = (Number(self.totalSalesSubTotalAmount) * 0.09).toFixed(2);
      self.totalRentCGSTAmount = (Number(self.totalRentSubTotalAmount) * 0.09).toFixed(2);
      self.totalRentSGSTAmount = (Number(self.totalRentSubTotalAmount) * 0.09).toFixed(2);

    });
    self.totalSalesAmount = self.totalIGSTGrandTotalAmount + self.totalRentGrandTotalAmount + self.totalSalesGrandTotalAmount;
    self.totalSalesGSTAmount = self.totalIGSTIGSTAmount + (self.totalSalesCGSTAmount + self.totalSalesSGSTAmount) + (self.totalRentCGSTAmount + self.totalRentSGSTAmount);
    self.CalculatePurchaseFigures();
  }

  CalculatePurchaseFigures() {
    var self = this;
var pInvoiceDB = self.af.list('/PurchaseInvoice', {
      query: {
        orderByChild: 'Month',
        equalTo: self.selectedReportMonth
      }
    }).subscribe((data) => {
      if(data.length > 0){
        data.forEach(element => {
          self.totalPurchaseGrandTotalAmount += Number(element.GrandTotal);
          self.totalPurchaseSubTotalAmount += Number(element.POAmount);
          self.totalPurchaseCGSTAmount += (Number(element.POAmount) * 0.18);
          self.totalPurchaseSGSTAmount += (Number(element.POAmount) * 0.18);
        });
        self.totalPurchaseCGSTAmount = Number(self.totalPurchaseCGSTAmount).toFixed(2);
        self.totalPurchaseSGSTAmount = Number(self.totalPurchaseSGSTAmount).toFixed(2);
      }
      self.CalculateOtherExpenses();
      pInvoiceDB.unsubscribe();
    });
  }

  CalculateOtherExpenses() {
    var self = this;
var oInvoiceDB = self.af.list('/OtherExpense', {
      query: {
        orderByChild: 'Month',
        equalTo: self.selectedReportMonth
      }
    }).subscribe((data) => {
      if(data.length > 0){
        data.forEach(element => {
          self.totalOtherExpGrandTotalAmount += Number(element.GrandTotal);
          self.totalOtherExpSubTotalAmount += Number(element.SubTotal);
          self.totalOtherExpCGSTAmount += (Number(element.CGSTAmount) * 0.18);
          self.totalOtherExpSGSTAmount += (Number(element.SGSTAmount) * 0.18);
        });
        self.totalOtherExpCGSTAmount = Number(self.totalOtherExpCGSTAmount).toFixed(2);
        self.totalOtherExpSGSTAmount = Number(self.totalOtherExpSGSTAmount).toFixed(2);
      }
      self.totalPOExpense = self.totalPurchaseGrandTotalAmount + self.totalOtherExpGrandTotalAmount;
      self.totalPOExpenseGSTAmount = (Number(self.totalPurchaseCGSTAmount) * 2) + (Number(self.totalOtherExpCGSTAmount) * 2);
      self.totalGSTDifferenceAmount = Number(self.totalSalesGSTAmount) - Number(self.totalPOExpenseGSTAmount);
      
      oInvoiceDB.unsubscribe();
    });
  }

  GetAllFigures(){
    var self = this;
    self.ResetTotalFigures();
    var invoiceDB = self.af.list('/Invoice').subscribe((result) => {
      if(result.length > 0){
        result.forEach(element => {
          if(element.isPerformaInvoice == 0){
            if(element.isIGST == 1 || element.IsIGST == 1){
              self.totalYearIGST += Number(element.GrandTotal);
            }
            else if(element.isRent == 0){
              self.totalYearSales += Number(element.GrandTotal);
            }
            else if(element.isRent == 1){
              self.totalYearRent += Number(element.GrandTotal);
            }
            self.totalYearOutstanding += Number(element.OutStandingAmount);
          }
        });
      }
      var purchaseInvoiceDB = self.af.list('/PurchaseInvoice').subscribe((result) => {
        if(result.length > 0){
          result.forEach(element => {
            self.totalYearPurchase += element.GrandTotal;
          });
        }
        
        var otherExpenseDB = self.af.list('/PurchaseInvoice').subscribe((result) => {
          if(result.length > 0){
            result.forEach(element => {
              self.totalYearOtherExpenses += Number(element.GrandTotal);
            });
          }
          self.totalYearProfit = ((self.totalYearSales + self.totalYearRent + self.totalYearIGST) - (self.totalYearPurchase + self.totalYearOtherExpenses)).toFixed(2);
          if(self.totalYearProfit == 0)
            self.currentMargin = "None";
          else if(self.totalYearProfit > 0)
            self.currentMargin = "Profit";
          else {
            self.currentMargin = "Loss";
            self.totalYearProfit *= -1;
          }
            
          
        });
      });
      
    });
  }

  FilterMonthlyBills(){
    var self = this;
    self.mReportDisplayList = [];
    switch(self.selectedReportType){
      case "-1":
        self.mReportDisplayList = self.reportList;
        break;
      case "Outstanding":
        self.reportList.forEach(report => {
          if(report.isPaid == 0)
            self.mReportDisplayList.push(report);
        });
        break;
        case "Sale":
        self.reportList.forEach(report => {
          if(report.isRent == 0 && (report.isIGST == 0 && report.IsIGST == 0))
            self.mReportDisplayList.push(report);
        });
        break;
        case "Rent":
        self.reportList.forEach(report => {
          if(report.isRent == 1 && (report.isIGST == 0 && report.IsIGST == 0))
            self.mReportDisplayList.push(report);
        });
        break;
        case "IGST":
        self.reportList.forEach(report => {
          if(report.isIGST == 0 && report.IsIGST == 0)
            self.mReportDisplayList.push(report);
        });
        break;
        default:
          self.mReportDisplayList = [];
    }
  }

  ResetTotalFigures(){
    this.totalYearSales = 0;
    this.totalYearRent = 0;
    this.totalYearIGST = 0;
    this.totalYearPurchase = 0;
    this.totalYearOtherExpenses = 0;
    this.totalYearOutstanding = 0;
    this.totalYearProfit = 0;
    this.currentMargin = "None";
  }

  ChooseMonthlyType(selectedType){
    var self = this;
    self.monthlySelectedtab = selectedType;
  }

}
