import { Component, OnInit } from '@angular/core';
import { FacebookService, InitParams } from 'ngx-facebook';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-facebook-sdk-sample';

  constructor(private fb: FacebookService) {
    fb.init(environment.facebook);
  }

  ngOnInit() {
  }
}
