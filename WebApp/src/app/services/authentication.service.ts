import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { User, UserProfile } from '../services/user';

@Injectable()
export class AuthenticationService {

  public static BEARER_TOKEN = 'bearer-token';
  public static USER_NAME = 'user-name';
  loginStatusSubject = new BehaviorSubject(false);

  private authUrl: string = 'http://localhost:8089/api/v1/auth';
  private profileUrl: string = 'http://localhost:8080/api/v1/user';


  constructor(private http: HttpClient) {
  }

  authenticateUser(userData) {
    return this.http.post(`${this.authUrl}/login`, userData);
  }

  isUserLoggerIn(): Observable<boolean> {
    if(this.getBearerToken()) {
      this.loginStatusSubject.next(true);
      return Observable.of(true);
    } else {
      this.loginStatusSubject.next(false);
      return Observable.of(false);
    }
  }

  register(uiUser: User) {
    return this.http.post(`${this.authUrl}/register`, uiUser)
    .do(() => this.createProfile(uiUser));
  }

  createProfile(uiUser: User) {
    const userProfile = <UserProfile> uiUser;
    userProfile.userName = `${uiUser.firstName} ${uiUser.lastName}`;
    return this.http.post(`${this.profileUrl}`, userProfile)
    .subscribe();
  }

  updateProfile(uiUserProfile: UserProfile) {
    return this.http.put(`${this.profileUrl}/${this.getUserName}`, uiUserProfile, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.getBearerToken()}`)
    });
  }

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.profileUrl}/${this.getUserName}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.getBearerToken()}`)
    });
  }

  logout() {
    this.clearAuthentication();
  }

  setBearerToken(token) {
    localStorage.setItem(AuthenticationService.BEARER_TOKEN, token);
  }

  getBearerToken() {
    return localStorage.getItem(AuthenticationService.BEARER_TOKEN);
  }

  setUserName(userName) {
    localStorage.setItem(AuthenticationService.USER_NAME, userName);
  }

  getUserName() {
    return localStorage.getItem(AuthenticationService.USER_NAME);
  }

  private clearAuthentication() {
    localStorage.removeItem(AuthenticationService.USER_NAME);
    localStorage.removeItem(AuthenticationService.BEARER_TOKEN);
  }
}
