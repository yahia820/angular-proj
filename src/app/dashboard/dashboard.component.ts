import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  public canvas : any;
  public ctx :any;
  public chartColor: any;
  public chartEmail : any;
  public chartHours :any;

    ngOnInit(){
      this.chartColor = "#FFFFFF";

      this.canvas = document.getElementById("chartHours");
      this.ctx = this.canvas.getContext("2d");


    }
}
