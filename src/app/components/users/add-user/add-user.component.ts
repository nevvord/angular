import {
  FormControl,
  Validators,
  FormGroup
} from '@angular/forms';
import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import Axios from 'axios';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html'
})

export class AddUserComponent implements OnInit {
  formAdd: FormGroup;
  @Input() users: Array < any > ;
  UDate: Array < any > ;
  submitted: boolean = false;

  ngOnInit() {
    this.formAdd = new FormGroup({
      name: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      mail: new FormControl('', [Validators.required, Validators.email])
    });
  }

  get f() { // Ну да одной буквой :B
    return this.formAdd.controls;
  }


  addNewUser() {
    this.submitted = true;
    if (this.formAdd.invalid) {
      console.log(this.formAdd.invalid)
      return;
    }
    const body = {
      name: this.formAdd.value.name,
      lastName: this.formAdd.value.lastName,
      date: this.formAdd.value.date,
      phoneNum: this.formAdd.value.phone,
      mail: this.formAdd.value.mail,
      postDate: new Date()
    }
    Axios.post('http://localhost:9200/test_users/_doc/', body).then(res => {
      if (!this.users) {
        this.users = []
      }
      this.users.push({
        _id: res.data._id,
        _source: {
          ...body
        }
      })
      this.onReset()
    })
  }

  onReset() {
    this.submitted = false;
    this.formAdd.reset();
  }

}
