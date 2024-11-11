import { Component, OnInit } from '@angular/core';
import { StationsService } from '../stations.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  stations: any;
  view = 'list';
  total_value = 0;
  total_sales = 0;
  avg_sales = 0;
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
    console.log(this.stations);
  }
}
