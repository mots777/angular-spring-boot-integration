import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AppService {

  private toggleSideNav: boolean;
  public toggleSideNavSubject: BehaviorSubject<Boolean>;

  private isRemindersView: boolean;
  private isRemindersViewSubject: BehaviorSubject<Boolean>;

  private isCategoryView: boolean;
  private isCategoryViewSubject: BehaviorSubject<Boolean>;

  private disableCategorySelect: boolean = true;
  private disableCategorySelectSubject: BehaviorSubject<Boolean>;

  private disableReminderSelect: boolean = true;
  private disableReminderSelectSubject: BehaviorSubject<Boolean>;

  private searchInput: String = '';
  private searchInputSubject: BehaviorSubject<String>;

  constructor() { }

  setSearchInput(value: String) {
    this.searchInput = value;
    if(!this.searchInputSubject) {
      this.searchInputSubject = new BehaviorSubject(this.searchInput);
    }
    this.searchInputSubject.next(this.searchInput);
  }

  getSearchInput() {
    if(!this.searchInputSubject) {
      this.searchInputSubject = new BehaviorSubject(this.searchInput);
    }
    return this.searchInputSubject;
  }

  setDisableSelectReminderNoteTaker(value: boolean) {
    this.disableReminderSelect = value;
    if(!this.disableReminderSelectSubject) {
      this.disableReminderSelectSubject = new BehaviorSubject(this.disableReminderSelect);
    }
    this.disableReminderSelectSubject.next(this.disableReminderSelect);
  }

  getDisableSelectReminderNoteTaker() {
    if(!this.disableReminderSelectSubject) {
      this.disableReminderSelectSubject = new BehaviorSubject(this.disableReminderSelect);
    }
    return this.disableReminderSelectSubject;
  }

  setDisableSelectCategoryNoteTaker(value: boolean) {
    this.disableCategorySelect = value;
    if(!this.disableCategorySelectSubject) {
      this.disableCategorySelectSubject = new BehaviorSubject(this.disableCategorySelect);
    }
    this.disableCategorySelectSubject.next(this.disableCategorySelect);
  }

  getDisableSelectCategoryNoteTaker() {
    if(!this.disableCategorySelectSubject) {
      this.disableCategorySelectSubject = new BehaviorSubject(this.disableCategorySelect);
    }
    return this.disableCategorySelectSubject;
  }

  notifySideNavToggle(status: boolean) {
    this.toggleSideNav = status;
    this.toggleSideNavSubject.next(this.toggleSideNav);
  }

  getSideNavStatus() {
    if(!this.toggleSideNavSubject) {
      this.toggleSideNavSubject = new BehaviorSubject(this.toggleSideNav);
    }

    return this.toggleSideNavSubject;
  }

  setIsRemindersView(value: boolean) {
    this.isRemindersView = value;
    this.isRemindersViewSubject.next(this.isRemindersView);
  }

  getIsRemindersView() {
    if(!this.isRemindersViewSubject) {
      this.isRemindersViewSubject = new BehaviorSubject(this.isRemindersView);
    }
    return this.isRemindersViewSubject;
  }

  setIsCategoryView(value: boolean) {
    this.isCategoryView = value;
    this.isCategoryViewSubject.next(this.isCategoryView);
  }

  getIsCategoryView() {
    if(!this.isCategoryViewSubject) {
      this.isCategoryViewSubject = new BehaviorSubject(this.isCategoryView);
    }
    return this.isCategoryViewSubject;
  }

}
