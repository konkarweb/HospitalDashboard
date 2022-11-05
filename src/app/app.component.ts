import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  visible:boolean = true;
  onclick()
  {
   
    this.visible = !this.visible
  }
}
