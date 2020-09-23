import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { map } from 'rxjs/operators';

import { TestData } from './TestData';

@Component({
  selector: 'app-test-data',
  templateUrl: './test-data.component.html',
  styleUrls: ['./test-data.component.css']
})
export class TestDataComponent implements OnInit {
  public data: any;//Array<TestData> = new Array<TestData>();
  private headers: HttpHeaders = new HttpHeaders({ 
    "Content-Type": "application/json", 
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,OPTIONS",
    "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  });

  //http://dummy.restapiexample.com/api/v1/employees
  constructor(http: HttpClient) { 
    http.get('api/v1/employees', { headers: this.headers }).subscribe(result => {
      this.data = result["data"];
      console.log(result);
    }, error => console.error(error));
  }

  ngOnInit(): void {
  }

  public onClickMe() {
    let newData: TestData = new TestData({
      howMany: 4,
      thing: "three",
      wotsit: "a usfull thing"
    });

    this.data.push(newData);
  }


}



