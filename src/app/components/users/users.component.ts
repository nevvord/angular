import { Component, OnInit } from '@angular/core';
import Axios from 'axios';
import { log } from 'util';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users:string[];
  oneUser:any;
  

  constructor() { }

  ngOnInit() {
    this.getUsers()
  }

  getUsers () {
    Axios.get('http://localhost:3012/users').then(res => {
      this.users = res.data;
      this.oneUser = this.users[0];
      console.log(this.users);
      
    })
  }

  

  changeUser (id) {
    Axios.get('http://localhost:3012/user/'+ id).then(res => {
      this.oneUser = res.data;
    })
  }

  removeUser(id) {
    Axios.delete('http://localhost:3012/user/'+ id).then(
      this.users = this.users.filter( u => u._id !== id )
    )
  }

  putChange(id, name, lastName, date, num, mail) {
    let bodyJson = {
      name: name,
      lastName: lastName,
      date: date,
      phoneNum: num,
      mail: mail
    };
    Axios.put('http://localhost:3012/userChange/'+ id, bodyJson).then(
      
    )
  }
}
