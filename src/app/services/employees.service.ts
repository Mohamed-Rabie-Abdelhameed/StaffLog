import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';
import { map } from 'rxjs';
import { Time } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  private url = 'https://stafflog-a8a53-default-rtdb.firebaseio.com/';
  constructor(private http: HttpClient) {}

  addEmployee(employee: Employee) {
    return this.http.post<{
      name: string;
      empId: number;
      department: string;
      date: Date;
    }>(`${this.url}/employees.json`, employee);
  }

  getEmployees() {
    return this.http
      .get<{ [key: string]: Employee }>(`${this.url}/employees.json`)
      .pipe(
        map((responseData) => {
          const employeesArray: Employee[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              employeesArray.push({ ...responseData[key], id: key });
            }
          }
          return employeesArray;
        })
      );
  }
}
