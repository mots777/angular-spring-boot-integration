import { Component, OnInit } from '@angular/core';
import { RouterService } from '../services/router.service';
import { AuthenticationService } from '../services/authentication.service';
import { NotesService } from '../services/notes.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitMessage: string;
  bearerToken: any;
  constructor(private auth: AuthenticationService, private router: RouterService,
    private notesService: NotesService) { }

  ngOnInit() {

  }

  loginSubmit(userData) {
    return this.auth.authenticateUser(userData).subscribe(
      res => {
        this.bearerToken = res['token'];
        this.auth.setBearerToken(this.bearerToken);
        this.auth.setUserName(userData.userId);
        this.notesService.fetchNotes();
        this.router.routeToDashboard();        
      },
      err => {this.submitMessage = err.error.message}
    );
  }

}
