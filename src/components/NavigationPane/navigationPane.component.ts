import {Component, OnInit} from '@angular/core';
import { HomeComponent } from '../../app/Views/Home/home.component';
import { Globals } from '../../app/Services/global.service';


@Component({
    selector: 'navigation-pane',
    templateUrl: './navigationPane.component.html'
})

export class NavigationPaneComponent implements OnInit {
  public nextPaymentDate = '';
  constructor(public homeComponent: HomeComponent, public globals: Globals ) {
   
  }

  ngOnInit() {
    this.globals.getPaymentDetails();
    this.nextPaymentDate = this.globals.nextPaymentDate;
   
  }
}
