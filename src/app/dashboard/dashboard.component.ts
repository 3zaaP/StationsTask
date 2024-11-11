import { Component, OnInit } from '@angular/core';
import { StationsService } from '../stations.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  stations: any;
  view = 'graph';
  total_value = 0;
  total_sales = 0;
  avg_sales = 0;
  highst_sales_station: any;
  total_transaction_count = 0;
  constructor(public service: StationsService) {}
  ngOnInit(): void {
    this.stations = this.service.getStations();

    this.total_value = this.stations.reduce(
      (a: any, b: any) => a + b.total_value,
      0
    );
    this.total_sales = this.stations.reduce(
      (a: any, b: any) => a + b.total_sales,
      0
    );
    this.avg_sales = this.total_sales / this.stations.length;
    this.total_transaction_count = this.stations.reduce(
      (a: any, b: any) => a + b.total_transaction_count,
      0
    );
    this.highst_sales_station = this.service
      .getStations()
      .sort((a: any, b: any) => {
        return b.max_transaction_hour - a.max_transaction_hour;
      })
      .slice(0, 3);
    console.log(this.highst_sales_station);

    this.service.finalList.subscribe((data) => {
      console.log('dashboard trigger');
      if (this.service.filtred) {
        this.stations = data;
      }
    });
  }
}
