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

  users: Array<any>;
  oneUser: Array<any> = [];

  ngOnInit() {
      this.getUsers()
  }

  getUsers() {
    Axios.get('http://localhost:9200/test_users/_search').then(res => {
      this.users = res.data.hits.hits;
      this.oneUser = this.users[0];
    })
  }

  changeUser(id) {
    Axios.get('http://localhost:9200/test_users/_doc/' + id).then(res => {
      this.oneUser = res.data;
    })
  }

  removeUser(id) {
    Axios.delete('http://localhost:9200/test_users/_doc/' + id).then(() => {
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
    Axios.put('http://localhost:9200/test_users/_doc/' + id, bodyJson).then(() =>
      this.users = this.users.map((user) => {
        if (user._id === id) {
          return Object.assign(user, {
            _id: id,
            _source:{
              ...bodyJson
            }
          })
        }
        return user
      })
    )
  }
}
