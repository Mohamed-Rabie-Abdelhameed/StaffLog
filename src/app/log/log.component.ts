import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../services/employees.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css'],
})
export class LogComponent implements OnInit {
  constructor(private API: EmployeesService) {}
  logs!: Employee[];

  filteredLogs = this.logs;

  ngOnInit() {
    this.API.getEmployees().subscribe((response) => {
      this.logs = response;
      this.filteredLogs = this.logs;
    });
  }

  onDepartmentSelect(event: Event) {
    const selectedDept = (event.target as HTMLSelectElement).value;
    if (selectedDept) {
      this.filteredLogs = this.logs.filter((log) => {
        return log.department === selectedDept;
      });
    } else {
      this.filteredLogs = this.logs;
    }
  }

  formatTime(timeString: string): string {
    const date = new Date(timeString);
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const formattedTime = `${dayOfWeek} ${hours}:${minutes}`;
    return formattedTime;
  }
}
