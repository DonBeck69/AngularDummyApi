import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { EmployeeData, Employee } from './Employee';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  public employeeData: EmployeeData = new EmployeeData();

  // mostley for justin case. Helps with CORS issus.  
  private headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  });

  // default json file in assets and included in the build
  private getPath: string = "assets/employee.json";

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {
    // use the query parameter to use iether the included json file data or go to
    // the web site.
    this.activatedRoute.queryParamMap.subscribe((params: ParamMap) => {
      console.log(params);
      if (params["params"]["web"] === "true") {
        //this uses a proxy, look at proxy.conf.json
        this.getPath = "api/v1/employees";
      }
      http.get<EmployeeData>(this.getPath, { headers: this.headers }).subscribe(result => {
        this.employeeData = result;
        console.log(result);
      }, error => console.error(error));

    });

  }

  ngOnInit(): void {
  }

  // one button, one field, one direction sort. Initiated by the "sort" button
  public onSortClick(): void {
    this.employeeData.data = this.SortEmployeesBySalary(this.employeeData.data);
  }

  public onSortClickAge(): void {
    this.employeeData.data = this.SortEmployeesByAge(this.employeeData.data);
  }


  // sorts the array of Employees object by salary. 
  private SortEmployeesBySalary(Employees: Array<Employee>): Array<Employee> {
    let ret: Array<Employee> = new Array<Employee>();

    // sort function
    ret = Employees.sort((e1: Employee, e2: Employee) => {
      if (e2.employee_salary > e1.employee_salary) {
        return 1;
      }
      if (e2.employee_salary < e1.employee_salary) {
        return -1;
      }
      return 0;
    });

    return ret;
  }

  private SortEmployeesByAge(Employees: Array<Employee>): Array<Employee> {
    let ret: Array<Employee> = new Array<Employee>();

    // sort function
    ret = Employees.sort((e1: Employee, e2: Employee) => {
      if (e2.employee_age > e1.employee_age) {
        return 1;
      }
      if (e2.employee_age < e1.employee_age) {
        return -1;
      }
      return 0;
    });

    return ret;
  }




}

