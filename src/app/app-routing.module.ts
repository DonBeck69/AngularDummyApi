import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TestDataComponent } from './test-data/test-data.component'
import { EmployeeComponent } from "./employee/employee.component";

const routes: Routes = [
  { path: 'employee', component: EmployeeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
