import { Component, OnInit } from '@angular/core';
import { StationsService } from '../stations.service';
import { asyncScheduler, interval } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, DatePipe],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss',
})
export class NavBarComponent implements OnInit {
  constructor(public service: StationsService, public fb: FormBuilder) {}
  dateForm: any;
  stations = [];
  datePipe = new DatePipe('en-US');
  monitored_stations_count = 0;
  update_time = 0;
  ngOnInit(): void {
    this.dateForm = this.fb.group({
      start: '',
      end: '',
    });

    this.stations = this.service.getStations();
    interval(1000).subscribe(() => {
      this.update_time++;
    });
    this.monitored_stations_count =
      this.stations.length -
      this.stations.filter((st: any) => !st.active).length;

    this.dateForm.get('start').valueChanges.subscribe(() => {
      this.change();
    });

    this.dateForm.get('end').valueChanges.subscribe(() => {
      this.change();
    });
  }
  getStations() {
    this.stations = this.service.getStations();
  }
  change() {
    const start =
      this.datePipe.transform(this.dateForm.get('start').value, 'yyyy-MM-dd') ??
      0;
    const end =
      this.datePipe.transform(this.dateForm.get('end').value, 'yyyy-MM-dd') ??
      0;
    const now = this.datePipe.transform(new Date(), 'yyyy-MM-dd') ?? 0;
    this.stations = this.stations.filter((st: any) => {
      const last_updated =
        this.datePipe.transform(st.last_updated, 'yyyy-MM-dd') ?? 0;
      if (start != 0) {
        return last_updated >= start && last_updated <= (end != 0 ? end : now);
      }
      if (end != 0) {
        return last_updated <= end;
      }
      if (start != 0 && end != 0) {
        return true;
      } else {
        return false;
      }
    });
  }
}
