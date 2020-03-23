import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../Services/userService';
import { UserDataInput } from '../user-details/UserInput';

@Component({
  selector: 'user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {

  tableSetting: any;
  userDetails: UserDataInput;
  totalCount: Number;

  constructor(private router: Router, private userData: UserData) { }

  
  ngOnInit() {
   
    this.userDetails = this.userData.getData();  //Fetch Data
    
    this.totalCount = this.userData.getCount(); //Fetch total count
  
      this.tableSetting = {
        columns: this.tableSettingColumns() // Set Columns for grid
      };
  }

  //Redirect on Edit
  redirect(data){  
    this.router.navigate(['UserDetails/edit',data.Id]);
  }

  //Delete record
  deleteValue(data){
    this.userDetails = this.userData.deleteData(data);
    this.totalCount = this.userData.getCount();
  }


  //Grid column settings
  tableSettingColumns() {
    return [
          {
              Id:1,
              title: "Name",
              classes: "ui_size_col",           
          },
          {
              Id:2,
              title: "Phone Number",
              classes: "ui_size_col",          
          },
          {
              Id:3,
              title: "Email Id",
              classes: "ui_size_col",         
          },
          {
              Id:4,
              title: "Gender",
              classes: "ui_size_col",         
          },
          {
              Id:5,
              title: "Location",
              classes: "ui_size_col",       
          },
          {
              Id:6,
              title: "Edit",
              classes: "ui_size_col",         
          },
          {
              Id:7,
              title: "Delete",
              classes: "ui_size_col",          
          }
        ];
    }

}
