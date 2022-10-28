import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore} from '@angular/fire/compat/firestore';
import { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  type :any;
  RoomForm: any;
  showUpdate:any = false;
  rooms:any = [];
  selectedData:any ={};
  constructor(private router:Router,private db:AngularFirestore) { }

  ngOnInit(): void {
    this.type = new FormControl('all');
    this.showUpdate = false;
    this.getRoomData();

    this.RoomForm = new FormGroup({
      roomType: new FormControl(''),
      roomNo: new FormControl(''),
      mrp: new FormControl(''),
      price: new FormControl(''),
    });
   
    
  
  
  }

  getRoomData() {                                        
    this.db.collection('rooms').ref.get().then(snapshot =>{snapshot.docs.forEach(doc =>{ 
      // console.log(doc.data());
      // console.log(doc.id);
      let s_data:any =doc.data()
      let data = {
        ...s_data,
        id:doc.id
      }
      this.rooms.push(data);
      console.log(this.rooms);
    }) })  
  }
  addRoom()
  {
    this.router.navigate(["dashboard/add-room"]); 
  }

  onEdit(id:any)
  {
    this.showUpdate = true;
    this.selectedData = this.rooms.find((data:any)=>{
      if(data.id == id)
      {
        return data;
      }
    })
    console.log(this.selectedData);
    this.RoomForm.patchValue(this.selectedData);

  }

  closeUpdate()
  {
    this.showUpdate = false;
  }

  onUpdate()
  {
    console.log(this.RoomForm.value);
    this.db.collection('rooms').doc(this.selectedData.id).set(this.RoomForm.value);
    this.closeUpdate();
    this.selectedData = {};
    this.rooms = [];
    this.getRoomData();
    this.type.patchValue('all');
  }

  onDelete(id:any)
  {
    this.db.collection('rooms').doc(id).delete();
    alert("Data Deleted successfully");                                        
    this.rooms = [];
    this.getRoomData();
  }

  onTypeChange()
  {
    this.filterBy().subscribe( (data: any) => {
      console.log(data);
      this.rooms =  data;
  });
  }
  filterBy() {
    if(this.type.value != 'all')
    {
      console.log(this.type.value);
      
      let data = this.db.collection('rooms', ref => ref.where('roomType','==',this.type.value  )).valueChanges({idField: 'customIdName'})
      return data;
    }
    else
    {
      let data = this.db.collection('rooms').valueChanges({idField: 'customIdName'})
      return data; 
    }
  
  };
}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            