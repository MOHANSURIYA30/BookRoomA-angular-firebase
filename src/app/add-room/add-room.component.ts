import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.css']
})
export class AddRoomComponent implements OnInit {
  addRoomForm: any;
  constructor(private db:AngularFirestore,
              private router:Router,
              private location:Location) { }

  ngOnInit(): void {
    // window.alert("ROOM ADDED SUCCESSFULLY !!!")

    this.addRoomForm = new FormGroup({
      roomType: new FormControl('single ac room'),
      roomNo: new FormControl(''),
      mrp: new FormControl(''),
      price: new FormControl(''),
    });
  }

  onSubmit()
  {
    // console.log(this.addRoomForm);
    console.log(this.addRoomForm.value);
    this.db.collection('rooms').add(this.addRoomForm.value);
    this.router.navigate(["dashboard/rooms"]);
    
  }

  goBack()
  {
    this.location.back()
  }

}
