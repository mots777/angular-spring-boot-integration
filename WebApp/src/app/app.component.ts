import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoggedIn = this.authService.loginStatusSubject;

  constructor(private authService: AuthenticationService, private router: RouterService,
    private appService: AppService) {
      this.authService.isUserLoggerIn().subscribe();
     }

  ngOnInit() {
    // this.authService.isUserLoggerIn().subscribe(() =>{
    //   this.isLoggedIn = true;
    // });
  }

  onReminderView() {
    
  }

  doLogout() {
    this.authService.logout();
    this.router.routeToLogin();
  }

  onToggleSideNav(value) {
    this.appService.notifySideNavToggle(value);
  }
}
