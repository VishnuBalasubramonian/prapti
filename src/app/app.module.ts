import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingComponent } from './Views/landing/landing.component';
import { HomeComponent } from './Views/Home/home.component';
import { SliderModule } from 'angular-image-slider';
import { AngularFireModule } from 'angularfire2';
// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
import { LocationStrategy, HashLocationStrategy, DatePipe } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { NgQrScannerModule } from 'angular2-qrscanner';
import { NavigationPaneComponent } from '../components/NavigationPane/navigationPane.component';
import { AddClientComponent } from '../components/AddClient/addClient.component';
import { CreateBillComponent } from '../components/CreateBill/createBill.component';
import { ViewBillsComponent } from '../components/ViewBills/viewbills.component';
import { EmailComponent } from '../components/Email/email.component';
import { AnalyticsComponent } from '../components/Analytics/analytics.component';
import { LoginComponent } from '../components/login/login.component';
 import {AgGridModule} from 'ag-grid-angular/main';
import { AuthService } from '../app/Services/auth.service';
import { UserCreation } from '../app/Services/userCreation.service';
import { InventoryComponent } from '../components/Inventory/inventory.component';
import { Inventory } from '../app/Services/inventory.service';
import { LoadingSpinnerComponent } from '../components/loading-spinner/loading-spinner.component';
// import{File} from '@ionic-native/file'
// import{FileOpener} from '@ionic-native/file-opener'


import { CreateBillService } from '../app/Services/createBill.service';
import { ViewBillService } from './Services/viewBill.service';
import { AnalyticService} from './Services/analytic.service';
import { DownloadInvoiceService } from './Services/downloadInvoice.service';

import { ErrorLoggService } from './Services/ErrorLoggService';
import { GlobalErrorHandler } from './Services/GlobalErrorHandler';
import { Globals } from './Services/global.service';
import { DownloadLedgerService } from './Services/downloadLedger.service';

import { MatCardModule } from '@angular/material';
import { DownloadMonthlyReportService } from './Services/downloadMonthlyReport.service';

export const firebaseConfig = {
  apiKey: "AIzaSyBut12Z8AluLZHNnU6G1DA6WcbXmVt_TX4",
    authDomain: "praptibillingsw-71c95.firebaseapp.com",
    databaseURL: "https://praptibillingsw-71c95.firebaseio.com",
    projectId: "praptibillingsw-71c95",
    storageBucket: "praptibillingsw-71c95.appspot.com",
    messagingSenderId: "969606788511"
};

@NgModule({
  declarations: [
    HomeComponent,
    LandingComponent,
    LoginComponent,
    NavigationPaneComponent,
    AddClientComponent,
    InventoryComponent,
    CreateBillComponent,
    ViewBillsComponent,
    EmailComponent,
    AnalyticsComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    SliderModule,
    BrowserAnimationsModule,
    ToasterModule.forRoot(),
    RouterModule,
    BrowserModule,
    MatChipsModule,
    MatButtonModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    ChartsModule,
    NgQrScannerModule,
    AgGridModule.withComponents([]),
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      }
      
      
    ], { useHash: true })
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
    ErrorLoggService,
    Globals, AuthService, UserCreation, DownloadLedgerService,
     DownloadInvoiceService, ViewBillService, Inventory, 
     CreateBillService, DatePipe, AnalyticService, DownloadMonthlyReportService,
    // File,
    // FileOpener,

    { provide: LocationStrategy, useClass: HashLocationStrategy }],
    
  bootstrap: [LandingComponent]
})

export class AppModule {

  private toasterService: ToasterService;
  public config1: ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right',
    animation: 'fade'
  });

  constructor(public downloadService: DownloadInvoiceService, public authService: AuthService, public userCreationService: UserCreation, public inventory: Inventory, public createBill: CreateBillService, public viewBillService: ViewBillService, public analyticService: AnalyticService, public ledgerDownload:DownloadLedgerService) {
    
  }

 }
