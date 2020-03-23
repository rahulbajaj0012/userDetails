import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserData } from '../Services/userService';
import { UserDataInput } from './UserInput'; 
import { Router } from '@angular/router';
import { FormControl, FormBuilder, FormGroup, Validators,FormArray} from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  registerForm: FormGroup;
  userInfo: UserDataInput  ={
    Id:null,
    name:"",
    phoneNumber:'',
    email:'',
    gender:'',
    location:[]
    
  };
  isLocationSelected: boolean = false;

  
  constructor(private route: ActivatedRoute, private userData: UserData, private router: Router,private formBuilder: FormBuilder) { 

  }

  isEditFlow:boolean = false;
  locations = ['Bangalore','Mumbai','Delhi'];
  genderlist = [{title:'Select', Id:1},{title:'Male',Id:2},{title:'Female',Id:3}];
  
  ngOnInit() {
    //Read Id value from route
    this.route.params.subscribe(params => {
      let id = params['id'];
      id && (this.userInfo = this.userData.getUserData(id));
      id? this.isEditFlow = true:this.isEditFlow= false;
    });

    //Validations 
     this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            phoneNumber: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            gender: ['', Validators.required],
            location: this.formBuilder.array([], [Validators.required])    
        })
      // setInitial Value for Gender/Location  
      this.setInitialValue();  
        
       
     
  }

  setInitialValue(){
    const location: FormArray = this.registerForm.get('location') as FormArray;
    this.userInfo.location.forEach(item => {
        location.push(new FormControl(item))
    });
    this.userInfo.gender? (this.userInfo.gender) : (this.userInfo.gender = this.genderlist[0].title);
  }

  get userForm() { 
    return this.registerForm.controls; 
  }

  //Update Locations on checkBox Action
  updateCheckedLocations(e){
    const location: FormArray = this.registerForm.get('location') as FormArray;
    this.isLocationSelected = true;
    if (e.target.checked) {
      location.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      location.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          location.removeAt(i);
          return;
        }
        i++;
      });
    }
    
  }

  //On form Submit
  onSubmit(){
    if(this.isEditFlow){
      this.userInfo.location = this.registerForm.controls.location.value;
      this.userData.updateData(this.userData);

    }
    else{
      this.userInfo.Id = new Date().getTime();
      this.userInfo.location = this.registerForm.controls.location.value;
      this.userData.setData(this.userInfo);
    }
 
    this.router.navigate(['']);
  }

}
