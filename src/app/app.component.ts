import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './Shared/loader/loader.component';
import { ToastComponent } from './Shared/toast/toast.component';
import { MapComponent } from './Pages/map/map.component';
//import { map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent, ToastComponent, MapComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'AdminDona';

  constructor() {

  }

  ngOnInit(): void {
    
  }

}
