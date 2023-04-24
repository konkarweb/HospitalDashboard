import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { BarChartService } from '../bar-chart.service';



@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  public chart: any;
  public  data: any;
  constructor(private dataService: BarChartService) { }

  ngOnInit(): void {
    this.createChart();
  }


  async createChart(){
    this.data = await this.dataService.getParentChildBar().toPromise();
    // this.dataService.getParentChildBar().subscribe(data => {
    //   this.data = data;
    //   // this.isLoading = false;
    //   console.log(data);
    // });

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: this.data,
      options: {
        aspectRatio:2.5
      }
      
    });
  }
}
