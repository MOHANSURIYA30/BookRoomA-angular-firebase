import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  showUpdate:any = false;
  users:any =[];
  selectedUser:any;
  name = new FormControl('');
  email = new FormControl('');
  verified = new FormControl('');
  constructor(private router:Router,private db:AngularFirestore) { }

  ngOnInit(): void {
    this.showUpdate = false;
    this.getUserData();
  }


  onEdit(id:any)
  {
    this.showUpdate = true;
    this.selectedUser = this.users.find((data:any)=>{
      if(data.id == id)
      {
        return data;
      }
    })
    console.log(this.selectedUser);
    this.name.patchValue(this.selectedUser.displayName);
    this.email.patchValue(this.selectedUser.email);
    this.verified.patchValue(this.selectedUser.emailVerified);
    // this.RoomForm.patchValue(this.selectedData);

  }

  closeUpdate()
  {
    this.showUpdate = false;
  }

  getUserData() {                                        
    this.db.collection('users').ref.get().then(snapshot =>{snapshot.docs.forEach(doc =>{ 
      // console.log(doc.data());
      // console.log(doc.id);
      let s_data:any =doc.data()
      let data = {
        ...s_data,
        id:doc.id
      }
      this.users.push(data);
      console.log(this.users);
    }) })  
  }

  onUpdate()
  {
    console.log(this.name.value);
    let data = {
      displayName:this.name.value,
      email:this.email.value,
      emailVerified:this.verified.value

    }
    this.db.collection('users').doc(this.selectedUser.id).update(data);
    this.closeUpdate();
    this.selectedUser = {};
    this.users = [];
    this.getUserData();
  }

}
