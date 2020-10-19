import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';
import { NgForm } from '@angular/forms';
import { User } from '../services/user';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  showPassword: boolean;
  errorMsg: string;
  constructor(public snackBar: MatSnackBar, private authService: AuthenticationService, private route: RouterService) { }
  ngOnInit() {
    this.showPassword = false;
  }

  register(form: NgForm) {
    if (form.valid) {
      const uiUser: User = form.value;
      this.authService.register(uiUser).subscribe(
        (res) => {
          this.showConfirmation();
          this.route.routeToLogin();
        },
        err => this.errorMsg = err
      );
    }
  }

  showConfirmation() {
    this.snackBar.open(
      'You are signed up, please login to continue !!!',
      undefined,
      { duration: 6000, verticalPosition: 'top', horizontalPosition: 'center' }
    );
  }

}
