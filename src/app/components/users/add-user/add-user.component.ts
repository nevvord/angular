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

  addNewUser(name, lastName, date, num, mail) {
    if (!name || !lastName || !date || !num || !mail){
      this.topMassage('Введите пожалуйста все данные')
    }else{
      let bodyJson = {
        name: name,
        lastName: lastName,
        date: date,
        phoneNum: num,
        mail: mail
      };    
      Axios.post('http://localhost:3013/addNewUser', bodyJson).then(res => {
        Axios.get('http://localhost:3013/users').then(res => {
          this.UDate = res.data
          this.users.push(this.UDate[this.UDate.length-1])
        })
      })
    }
  }
}
