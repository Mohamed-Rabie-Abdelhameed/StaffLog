import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeesService } from '../services/employees.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private API: EmployeesService) {}

  @ViewChild('addForm')
  addForm!: NgForm;

  onSubmit(data: { name: string; id: number; department: string }) {
    console.log(data);
    var newEmployee: Employee = {
      name: data.name,
      empId: data.id,
      department: data.department,
      date: new Date(),
    };
    this.API.addEmployee(newEmployee).subscribe((response) => {
      console.log(response);
    }
    );
    this.addForm.reset();
  }
}
