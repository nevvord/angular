import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent  {

  @Input() oneUsers:Array<any>;
  @Input() users:string[];
}
