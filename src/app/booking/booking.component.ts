import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookingDetails:any =[];
  showUpdate:any = false;
  selectedRoom:any;
  status:any = new FormControl('');
  backUp :any =[];
  // FILTER VARIABLE
  fromDate :any = new FormControl('');
  toDate :any = new FormControl('');
  bookStatus:any = new FormControl('all');
  name :any= new FormControl('');
  pendingCount:any = 0;
  confirmedCount:any = 0;
  constructor(private db:AngularFirestore) { }
    ngOnInit(): void {
    this.showUpdate = false;
    this.getBookings().subscribe( (data: any) => {
      // console.log(data);
      this.bookingDetails =  data;
      this.backUp = data;
  });
      
    this.filterBy('pending').subscribe( (data: any) => {
      console.log(data);
      this.pendingCount =  data.length;
      });

      this.filterBy('confirmed').subscribe( (data: any) => {
        console.log(data);
        this.confirmedCount =  data.length;
        });  
 
  }

  getBookings() {
    let data = this.db.collection('bookings').valueChanges({idField: 'customIdName'})
    return data;
  };

  closeUpdate()
  {
    this.showUpdate = false;
  }

  onEdit(id:any)
  {
    this.showUpdate = true;
    this.selectedRoom = this.bookingDetails.find((data:any)=>{
      if(data.customIdName == id)
      {
        return data;
      }
    })
    console.log(this.selectedRoom);
    this.status.patchValue(this.selectedRoom.status);

  }

  

  onUpdate()
  {
    console.log(this.status.value);
    let data = {
      fromDate:this.selectedRoom.fromDate,
      room_id:this.selectedRoom.room_id,
      room_no:this.selectedRoom.room_no,
      status:this.status.value,
      toDate:this.selectedRoom.toDate,
      user_email:this.selectedRoom.user_email
    }
    this.db.collection('bookings').doc(this.selectedRoom.customIdName).set(data);
    this.closeUpdate();
    this.selectedRoom = {};
    this.bookingDetails = [];
    this.getBookings().subscribe( (data: any) => {
      console.log(data);
      this.bookingDetails =  data;
     });
     this.fromDate.patchValue('');
     this.toDate.patchValue('');
     this.bookStatus.patchValue('all');
     this.name.patchValue('');

  }


  filterBooking()
  {
    this.bookingDetails = this.backUp.filter((data:any)=>{
      // console.log(new Date(this.fromDate.value).getTime());  
      let f_date = (this.fromDate.value.length != 0 )? new Date(this.fromDate.value).getTime() : 0;
      let t_date = (this.toDate.value.length != 0 )? new Date(this.toDate.value).getTime() :  3332102400000 ;
      let b_status =this.bookStatus.value;
      console.log(new Date(t_date));
      console.log(f_date);
      console.log(t_date);
      console.log( b_status);
      
      
        if(new Date(data.fromDate).getTime() >= f_date  && new Date(data.toDate).getTime()  <= t_date  )
        {
          if(b_status == 'all' )
          {
            return data
          }
          else if(data.status == b_status)
          {
            return data
          }
          // console.log(data);  
        }
    })

    console.log(this.bookingDetails);
    if(this.name.value.length != 0)
    {
      this.bookingDetails = this.bookingDetails.filter((data:any)=>{
        if(data.user_email == this.name.value )
        {
          return data
        }
      }) 
    }
    
  }

  filterBy(val:any) {
      let data = this.db.collection('bookings', ref => ref.where('status','==',val  )).valueChanges({idField: 'customIdName'})
      return data;
  };
}
