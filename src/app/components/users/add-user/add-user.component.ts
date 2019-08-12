import { Component, OnInit, Input } from '@angular/core';
import Axios, { Method } from 'axios';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html'
})
export class AddUserComponent {
  @Input() getUsers:Function;
  @Input() topMassage:Function;
  @Input() users:Array<any>;
  UDate:Array<any>;
  add: any ;

  ngOnInit(): void {
    this.add = {
      name : 'kek',
      lName: '',
      date: '',
      phone: '',
      mail: ''
    };
  }

  addNewUser() {
    if (!this.add.name){
      this.topMassage('Введите пожалуйста все данные')
      console.log(this.add);
      
    }else{
      let bodyJson = {
        name: this.add.name,
        lastName: this.add.lName,
        date: this.add.date,
        phoneNum: this.add.phone,
        mail: this.add.mail
      };    
      Axios.post('http://localhost:3013/addNewUser', bodyJson).then(res => {
        Axios.get('http://localhost:3013/users').then(res => {
          this.UDate = res.data
          this.users.push(this.UDate[this.UDate.length-1])
        })
        this.add.name = null;
        this.add.lName = null;
        /*
        this.add = {
          name: null,
          lName: null,
          date: null,
          phone: null,
          mail: null
        }
        */
      })
    }
  }
}
