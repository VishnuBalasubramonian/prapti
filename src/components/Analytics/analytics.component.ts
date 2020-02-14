import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../../app/Views/Home/home.component';

import { AnalyticService } from '../../app/Services/analytic.service';
import { UserCreation } from '../../app/Services/userCreation.service';
import { DownloadLedgerService } from '../../app/Services/downloadLedger.service';


@Component({
  selector: 'analytics',
  templateUrl: './analytics.component.html'
})

export class AnalyticsComponent implements OnInit {


  graphTab;

  constructor(public analyticService: AnalyticService, public userCreation: UserCreation) {
    this.analyticService.GetSalesOfTheYear();
    this.graphTab = 'Monthly';

  }

  ngOnInit(): void {
    this.graphTab = 'Monthly';
  }

  ChangeGraphTab(selectedTab) {
    this.graphTab = selectedTab;
  }
  // Pie


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  public chartClickedOutstanding(event) {
    console.log(event.target);
  }

  public randomize(): void {
    // Only Change 3 values
    //let data = [
    //  Math.round(Math.random() * 100),
    //  59,
    //  80,
    //  (Math.random() * 100),
    //  56,
    //  (Math.random() * 100),
    //  40];
    //let clone = JSON.parse(JSON.stringify(this.barChartData));
    //clone[0].data = data;
    //this.barChartData = clone;
    /**
     * (My guess), for Angular to recognize the change in the dataset
     * it has to change the dataset variable directly,
     * so one way around it, is to clone the data, change it and then
     * assign it;
     */
  }
}
