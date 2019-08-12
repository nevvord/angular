import {
  Component,
  OnInit
} from '@angular/core';
import Axios from 'axios';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  users: Array < any > ;
  oneUser: any;
  showTopMassage: boolean = false;
  topMassageInner: string;

  ngOnInit() {
      this.getUsers()
      console.log(this.showTopMassage);
  }

  topMassage(inner) {
    console.log(this.showTopMassage);
    this.topMassageInner = inner;
    this.showTopMassage = true;
    setTimeout(() => {
      this.showTopMassage = false;
    }, 5000);
    console.log(this.showTopMassage);
  }

  getUsers() {
    Axios.get('http://localhost:3013/users').then(res => {
      this.users = res.data;
      this.oneUser = this.users[0];
    })
  }

  changeUser(id) {
    Axios.get('http://localhost:3013/user/' + id).then(res => {
      this.oneUser = res.data;
    })
  }

  removeUser(id) {
    Axios.delete('http://localhost:3013/user/' + id).then(() => {
      this.users = this.users.filter(user => user._id !== id)
    })
  }

  putChange(id, name, lastName, date, num, mail) {
    let bodyJson = {
      name: name,
      lastName: lastName,
      date: date,
      phoneNum: num,
      mail: mail
    };
    Axios.put('http://localhost:3013/userChange/' + id, bodyJson).then(() =>
      this.users = this.users.map((user) => {
        if (user._id === id) {
          return Object.assign(user, bodyJson)
        }
        return user
      })
    )
  }
}
