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

  private headers: HttpHeaders = new HttpHeaders({ 
    "Content-Type": "application/json", 
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  });

  //private getPath: string = "api/v1/employees";
  private getPath: string = "assets/employee.json";

  constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) { 
    this.activatedRoute.queryParamMap.subscribe((params: ParamMap) => {
      console.log(params);
      if (params["params"]["web"] === "true")
      {
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

  public onSortClick(): void {
    this.employeeData.data = this.SortEmployeesBySalary(this.employeeData.data);
  }

  private SortEmployeesBySalary(Employees: Array<Employee>): Array<Employee> {
    let ret: Array<Employee> = new Array<Employee>();
    let salaries: Array<number> = new Array<number>();
    // build a number array of salaries
    Employees.forEach((employee: Employee) => {
      salaries.push(employee.employee_salary);
    });

    // sort function
    salaries.sort((num1: number, num2: number) => {
      if (num2 > num1) {
        return 1;
      }
      if (num2 < num1) {
        return -1;
      }
    });

    // loop sorted item number arry, find matching missing list item and add to result
    salaries.forEach(itemNumber => {
      let ldd: Employee = Employees.find(doc => {
        return doc.employee_salary === itemNumber;
      });
      ret.push(ldd);
    });

    return ret;
  }


}
