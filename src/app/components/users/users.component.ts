import {
  Component,
  OnInit
} from '@angular/core';
import Axios from 'axios';
import {
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  users: Array < any > ;
  oneUser: FormGroup;
  submitted: boolean = false;
  changeId: string;
  date: any;

  http = 'http://localhost:9200';

  ngOnInit() {
    this.getUsers();

    this.oneUser = new FormGroup({
      name: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      mail: new FormControl('', [Validators.required, Validators.email])
    });
  }

  get f() { // Ну да одной буквой :B
    return this.oneUser.controls;
  }

  getUsers() {
    Axios.get(this.http + '/test_users/_search').then(res => {
      this.users = res.data.hits.hits;
    })
  }
  
  changeUser(id) {
    Axios.get( this.http + '/test_users/_doc/' + id).then(res => {
      this.changeId = id;
      this.date = res.data._source.postDate;
      this.oneUser.patchValue({
        name: res.data._source.name,
        lastName: res.data._source.lastName,
        date: res.data._source.date,
        phone: res.data._source.phoneNum,
        mail: res.data._source.mail
      });
    })
  }

  removeUser(id) {
    Axios.delete(this.http + '/test_users/_doc/' + id).then(() => {
      this.users = this.users.filter(user => user._id !== id)
    })
  }

  putChange() {
    this.submitted = true;
    if (this.oneUser.invalid) {
      return;
    }
    const body = {
      name: this.oneUser.value.name,
      lastName: this.oneUser.value.lastName,
      date: this.oneUser.value.date,
      phoneNum: this.oneUser.value.phone,
      mail: this.oneUser.value.mail,
      postDate: this.date 
    }
    Axios.put(this.http + '/test_users/_doc/' + this.changeId, body).then(() =>
      this.users = this.users.map((user) => {
        if (user._id === this.changeId) {
          return Object.assign(user, {
            _id: this.changeId,
            _source: {
              ...body
            }
          })
        }
        return user
      })
    )
    this.submitted = false;
  }
  onReset() {
    this.submitted = false;
    this.oneUser.reset();
  }
}
