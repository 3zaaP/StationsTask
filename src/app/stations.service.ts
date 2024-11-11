import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StationsService {
  private filteredStations = new BehaviorSubject<any>([]);
  finalList = this.filteredStations.asObservable();
  filtred = false;
  constructor() {}

  getStations(): any {
    return [
      {
        id: 0,
        name: 'Station 1',
        location: 'Location 1',
        active: true,
        last_updated: '2024-01-01',
        total_sales: 11000,
        total_value: 102200,
        compression_state: 'compressed',
        total_transaction_count: 1000,
        max_transaction_hour: 18000,
        max_transaction_datetime: '2024-01-01 | 12:12PM',
      },
      {
        id: 1,
        name: 'Station 2',
        location: 'Location 2',
        active: true,
        last_updated: '2024-02-02',
        total_sales: 11000,
        total_value: 10600,
        compression_state: 'compressed',
        total_transaction_count: 1000,
        max_transaction_hour: 80800,
        max_transaction_datetime: '2024-02-02 | 12:12PM',
      },
      {
        id: 2,
        name: 'Station 3',
        location: 'Location 3',
        active: false,
        last_updated: '2024-03-03',
        total_sales: 11000,
        total_value: 10030,
        compression_state: 'compressed',
        total_transaction_count: 10700,
        max_transaction_hour: 65700,
        max_transaction_datetime: '2024-03-03 | 12:12PM',
      },
      {
        id: 3,
        name: 'Station 4',
        location: 'Location 4',
        active: true,
        last_updated: '2024-04-04',
        total_sales: 11000,
        total_value: 1000,
        compression_state: 'compressed',
        total_transaction_count: 10020,
        max_transaction_hour: 28200,
        max_transaction_datetime: '2024-04-04 | 12:12PM',
      },
      {
        id: 4,
        name: 'Station 5',
        location: 'Location 5',
        active: true,
        last_updated: '2024-05-05',
        total_sales: 11000,
        total_value: 1000,
        compression_state: 'UnCompressed',
        total_transaction_count: 10500,
        max_transaction_hour: 95700,
        max_transaction_datetime: '2024-05-05 | 12:12PM',
      },
      {
        id: 5,
        name: 'Station 6',
        location: 'Location 6',
        active: true,
        last_updated: '2024-06-06',
        total_sales: 11000,
        total_value: 10060,
        compression_state: 'compressed',
        total_transaction_count: 10004,
        max_transaction_hour: 12050,
        max_transaction_datetime: '2024-06-06 | 12:12PM',
      },
      {
        id: 6,
        name: 'Station 7',
        location: 'Location 7',
        active: true,
        last_updated: '2024-07-07',
        total_sales: 11000,
        total_value: 106600,
        compression_state: 'compressed',
        total_transaction_count: 10002,
        max_transaction_hour: 9900,
        max_transaction_datetime: '2024-07-07 | 12:12PM',
      },
    ];
  }
  updateStations(stations?: any) {
    this.filtred = true;
    console.log('service trigger');
    this.filteredStations.next(stations);
  }
}
