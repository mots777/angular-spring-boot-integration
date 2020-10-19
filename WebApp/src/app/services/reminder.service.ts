import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Note } from './note';
import { Reminder } from './reminder';
import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { NotesService } from './notes.service';

@Injectable()
export class ReminderService {

  private reminderSvcUrl = 'http://localhost:8081/api/v1/reminder';

  reminders: Array<Reminder> = [];
  reminderSubject: BehaviorSubject<Array<Reminder>>;
  constructor(private http: HttpClient, private auth: AuthenticationService,
    private noteService: NotesService) {
    this.reminderSubject = new BehaviorSubject(this.reminders);
   }

   getReminders(): Observable<Array<Reminder>> {
    //  if(!this.reminderSubject) {
       this.reminderSubject = new BehaviorSubject(this.reminders);
       this.http.get<Array<Reminder>>(`${this.reminderSvcUrl}`, {
        headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth.getBearerToken()}`)
      })
       .subscribe(data => {
         this.reminders = data;
         this.reminderSubject.next(this.reminders);
       }, error => {
         this.reminderSubject.error(error);
       });
    //  }
     return this.reminderSubject;
   }

  addReminder(reminder: Reminder): Observable<Reminder> {
     const newReminder = Object.assign({}, reminder);
     newReminder.reminderCreatedBy = this.auth.getUserName();

     if(this.reminderSubject) {
       this.reminders.push(newReminder);
       this.reminderSubject.next(this.reminders);
     }

     return this.http.post<Reminder>(`${this.reminderSvcUrl}`, newReminder, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth.getBearerToken()}`)
    })
     .do(savedReminder => newReminder.reminderId = savedReminder.reminderId)
     .pipe(catchError(resp => {
       if(this.reminderSubject) {
         const index: number = this.reminders.findIndex(currentReminder => currentReminder === newReminder);
        this.reminders.splice(index, 1);
        this.reminderSubject.next(this.reminders);
       }
       return this.handleError(resp);
     }));
  }

  updateReminder(reminder: Reminder): Observable<Reminder> {
    return this.http.put<Reminder>(`${this.reminderSvcUrl}/${reminder.reminderId}`, reminder, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth.getBearerToken()}`)
    })
    .do(updatedReminder => {
      if(this.reminderSubject) {
        const index = this.findReminderIndexById(updatedReminder.reminderId);
        if(index > -1) {
          this.reminders[index] = updatedReminder;
        }
        this.reminderSubject.next(this.reminders);
      }
      this.noteService.updateReminder(reminder).subscribe();
    });
  }

  findReminderIndexById(reminderId: string) {
    return this.reminders.findIndex(currentReminder => currentReminder.reminderId === reminderId);
  }


   deleteReminder(reminderId: string): Observable<Reminder> {
    return this.http.delete<Reminder>(`${this.reminderSvcUrl}/${reminderId}`, {
      headers: new HttpHeaders().set('Authorization', `Bearer ${this.auth.getBearerToken()}`)
    })
    .do(() => {
        const index = this.findReminderIndexById(reminderId);
        if(index > -1) {
          this.reminders.splice(index, 1);
        this.reminderSubject.next(this.reminders);
      }
      this.noteService.deleteReminder(reminderId);
    });
  }

   private handleError(error: HttpErrorResponse): ErrorObservable {
     return new ErrorObservable(error);
   }
}
