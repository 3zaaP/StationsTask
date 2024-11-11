import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { StationsService } from '../stations.service';
import { asyncScheduler, interval } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';

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
    this.updateCount();

    this.dateForm.get('start').valueChanges.subscribe(() => {
      this.change().then(() => {
        console.log('start');
        this.updateCount();
        this.service.updateStations(this.stations);
      });
    });

    this.dateForm.get('end').valueChanges.subscribe(() => {
      this.change().then(() => {
        console.log('end');
        this.updateCount();
        this.service.updateStations(this.stations);
      });
    });
  }
  getStations() {
    this.stations = this.service.getStations();
  }
  change(): Promise<void> {
    return new Promise<void>((resolve) => {
      const start =
        this.datePipe.transform(
          this.dateForm.get('start').value,
          'yyyy-MM-dd'
        ) ?? 0;
      const end =
        this.datePipe.transform(this.dateForm.get('end').value, 'yyyy-MM-dd') ??
        0;
      const now = this.datePipe.transform(new Date(), 'yyyy-MM-dd') ?? 0;
      this.stations = this.service.getStations().filter((st: any) => {
        const last_updated =
          this.datePipe.transform(st.last_updated, 'yyyy-MM-dd') ?? 0;
        if (start != 0) {
          return (
            last_updated >= start && last_updated <= (end != 0 ? end : now)
          );
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
      resolve();
    });
  }
  updateCount() {
    this.monitored_stations_count =
      this.stations.length -
      this.stations.filter((st: any) => !st.active).length;
  }
}
