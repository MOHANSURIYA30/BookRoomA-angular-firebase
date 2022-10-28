import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRoomComponent } from './add-room/add-room.component';
import { BookingComponent } from './booking/booking.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoomComponent } from './room/room.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'dashboard',
    pathMatch:'full'
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    children:[
      {
        path:'',
        component:RoomComponent
      },
      {
        path:'users',
        component:UserComponent
      },
      {
        path:'rooms',
        component:RoomComponent
      },
      {
        path:'add-room',
        component:AddRoomComponent
      },
      {
        path:'bookings',
        component:BookingComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
