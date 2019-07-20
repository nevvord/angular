import { Component, OnInit, Input } from '@angular/core';
import Axios, { Method } from 'axios';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  @Input() getUsers:Function;
  @Input() users:string[];

  constructor() { }

  ngOnInit() {

    }
  addNewUser(name, lastName, date, num, mail) {
    let bodyJson = {
      name: name,
      lastName: lastName,
      date: date,
      phoneNum: num,
      mail: mail
    };    
    Axios.post('http://localhost:3012/addNewUser', bodyJson).then(res => {
      this.getUsers()
      console.log(res);
      
      
      this.users.push(res);
    })
  }
}
