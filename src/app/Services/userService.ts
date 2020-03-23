import { Injectable } from '@angular/core';
import { UserDetails } from '../data'

@Injectable({
    providedIn: 'root'
})

export class UserData{
   
    data: any;
    constructor(){
        this.data = UserDetails;
    }

    //Return list of data
    getData(){
        return this.data;
    }

    // Get user data for Edit
    getUserData(Id){
        const selectedData = this.data.filter(item=> item.Id == Id);
        return selectedData[0];
    }

    // Add new user Data
    setData(data){
        this.data.push(data);
    }

    //Get total count
    getCount(){
        return this.data.length;
    }


    // Update record on edit
    updateData(userUpdatedData){
        this.data.forEach(item => {
            if(item.id == userUpdatedData.id){
                item = userUpdatedData;
            }
        });
    }

    //Delete Record
    deleteData(value){
         this.data = this.data.filter(item=> item.Id != value.Id);
         return this.data;
    }
}