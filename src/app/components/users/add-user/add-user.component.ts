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
  UDate:string[];

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
      Axios.get('http://localhost:3012/users').then(res => {
      this.UDate = res.data
      this.users.push(this.UDate[this.UDate.length-1])
    })
    })
  }
}
