import {
  Component,
  Input
} from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent {

  @Input() users: Array < any > ;
  @Input() http: string[];

}
