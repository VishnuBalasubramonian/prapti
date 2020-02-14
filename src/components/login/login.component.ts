import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { QrScannerComponent } from 'angular2-qrscanner';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { HomeComponent } from '../../app/Views/Home/home.component';
import { AuthService } from '../../app/Services/auth.service';
//import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  loginCred;
  QRCode;
  email: string;
  password: string;
  showSpinner: boolean = false;

  @ViewChild(QrScannerComponent) qrScannerComponent: QrScannerComponent ;

  constructor(private router: Router, private homeComponent: HomeComponent, private authService: AuthService) {
    homeComponent.isAuthenticated = false;
    this.loginCred = 0;
    this.QRCode = 0;
  }

  ngOnInit() {
    
  }

  UseCred(){
    this.loginCred = 1;
    this.QRCode = 0;
  }

  UseQR(){
    this.QRCode = 1;
    this.loginCred = 0;
  }

  ValidateForm() {
    this.showSpinner = true;
    //this.homeComponent.isAuthenticated = true;
    this.Login();
  }

  Login() {
    var self = this;
    this.authService.login(this.email, this.password).then(value => {
     
      self.showSpinner = false;
    })
      .catch(err => {
       
        self.showSpinner = false;
      });
    this.email = this.password = '';    
  }

}
