import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent} from './app.component';
import { UserDetailsComponent} from '../app/user-details/user-details.component';
import { UserDataComponent } from '../app/user-data/user-data.component';
import { from } from 'rxjs';


export const routes: Routes = [
  { path: '', component: UserDataComponent },
  { path: 'UserDetails/edit/:id', component: UserDetailsComponent },
  { path: 'UserDetails/add', component: UserDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
