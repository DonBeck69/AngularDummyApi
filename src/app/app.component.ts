import { Component } from '@angular/core';
//import { runInThisContext } from 'vm';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(private router: Router) {

  }
  public title: string =  "Angular test"

  public onClickEmployee(web: boolean) {
    this.router.navigate(["employee"], {queryParams: {web: web}});
  }


}
