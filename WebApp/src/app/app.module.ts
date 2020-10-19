import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { NotesService } from './services/notes.service';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';
import { ReminderService } from './services/reminder.service';
import { AppService } from './services/app.service';
import { CanActivateRouteGuard } from './can-activate-route.guard';

// All the material module imports
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { 
  MatTooltipModule,
  MatIconModule,
  MatChipsModule,
  MatMenuModule,
  MatSidenavModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatTabsModule,
  MatAutocompleteModule
} from '@angular/material'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NoteTakerComponent } from './note-taker/note-taker.component';
import { NoteViewComponent } from './note-view/note-view.component';
import { ListViewComponent } from './list-view/list-view.component';
import { NoteComponent } from './note/note.component';
import { EditNoteViewComponent } from './edit-note-view/edit-note-view.component';
import { EditNoteOpenerComponent } from './edit-note-opener/edit-note-opener.component';
import { ReminderComponent } from './reminder/reminder.component';
import { EditReminderOpenerComponent } from './edit-reminder-opener/edit-reminder-opener.component';
import { EditReminderViewComponent } from './edit-reminder-view/edit-reminder-view.component';
import { AddReminderViewComponent } from './add-reminder-view/add-reminder-view.component';
import { AddReminderOpenerComponent } from './add-reminder-opener/add-reminder-opener.component';
import { DeleteNoteOpenerComponent } from './delete-note-opener/delete-note-opener.component';
import { DeleteNoteDialogComponent } from './delete-note-dialog/delete-note-dialog.component';
import { CategoryComponent } from './category/category.component';
import { EditCategoryViewComponent } from './edit-category-view/edit-category-view.component';
import { EditCategoryOpenerComponent } from './edit-category-opener/edit-category-opener.component';
import { AddCategoryViewComponent } from './add-category-view/add-category-view.component';
import { AddCategoryOpenerComponent } from './add-category-opener/add-category-opener.component';
import { CategoryService } from './services/category.service';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ProfileComponent } from './profile/profile.component';
import { ReminderNoteViewComponent } from './reminder-note-view/reminder-note-view.component';
import { DeleteCategoryDialogComponent } from './delete-category-dialog/delete-category-dialog.component';
import { CategoryViewComponent } from './category-view/category-view.component';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [CanActivateRouteGuard],
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'view/noteview' },
      { path: 'view/noteview', component: NoteViewComponent },
      { path: 'view/listview', component: ListViewComponent },
      { path: 'view/reminderview', component: ReminderNoteViewComponent },
      { path: 'view/categoryview/:categoryId', component: CategoryViewComponent },
      {
        path: 'note/:noteId/edit',
        component: EditNoteOpenerComponent,
        outlet: 'noteEditOutlet'
      },
      {
        path: 'note/:noteId/delete',
        component: DeleteNoteOpenerComponent,
        outlet: 'noteEditOutlet'
      },
      {
        path: 'category/:noteId/:categoryId/edit',
        component: EditCategoryOpenerComponent,
        outlet: 'noteEditOutlet'
      },
      {
        path: 'category/:noteId/add',
        component: AddCategoryOpenerComponent,
        outlet: 'noteEditOutlet'
      },
      {
        path: 'reminder/:noteId/:reminderId/edit',
        component: EditReminderOpenerComponent,
        outlet: 'noteEditOutlet'
      },
      {
        path: 'reminder/:noteId/add',
        component: AddReminderOpenerComponent,
        outlet: 'noteEditOutlet'
      }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    NoteTakerComponent,
    NoteViewComponent,
    ListViewComponent,
    NoteComponent,
    EditNoteViewComponent,
    EditNoteOpenerComponent,
    ReminderComponent,
    EditReminderOpenerComponent,
    EditReminderViewComponent,
    AddReminderViewComponent,
    AddReminderOpenerComponent,
    DeleteNoteOpenerComponent,
    DeleteNoteDialogComponent,
    CategoryComponent,
    EditCategoryViewComponent,
    EditCategoryOpenerComponent,
    AddCategoryViewComponent,
    AddCategoryOpenerComponent,
    SideNavComponent,
    SignUpComponent,
    ProfileComponent,
    ReminderNoteViewComponent,
    DeleteCategoryDialogComponent,
    CategoryViewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatSnackBarModule,
    MatMenuModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatListModule,
    MatGridListModule,
    MatDividerModule,
    MatSelectModule,
    MatTooltipModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientModule,
    MatDialogModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    NotesService,
    RouterService,
    ReminderService,
    CategoryService,
    AuthenticationService,
    AppService,
    CanActivateRouteGuard
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    EditNoteViewComponent,
    EditReminderViewComponent,
    AddReminderViewComponent,
    DeleteNoteDialogComponent,
    AddCategoryViewComponent,
    EditCategoryViewComponent,
    DeleteCategoryDialogComponent
  ]
})
export class AppModule { }
