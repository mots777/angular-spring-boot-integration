import { browser, by, element } from 'protractor';

fdescribe('Keep e2e test suite', () => {
  const userId = 'admin' + Math.round(1000 * Math.random());

  it('when page is loaded user should be redirected to login page', () => {
    browser.get('/');
    expect(browser.getCurrentUrl()).toContain('login');
    browser.sleep(2000);
  });

  it('when new member signs up the account is created and directs to login page', () => {
    element(by.id('signup')).click();
    browser.sleep(2000);
    element(by.id('firstName')).sendKeys('mothi');
    element(by.id('lastName')).sendKeys('mullackal');
    element(by.id('userId')).sendKeys(userId);
    element(by.id('userMobile')).sendKeys('7777777777');
    element(by.id('userPassword')).sendKeys('admin');
    element(by.id('userRole')).sendKeys('Admin');
    browser.sleep(2000);
    element(by.id('create-account')).click();
    browser.sleep(1000);
    expect(browser.getCurrentUrl()).toContain('login');
    browser.sleep(1000);
  });

  it('when user logs in notesview should be shown', () => {

    element(by.id('userId')).sendKeys(userId);
    element(by.id('userPassword')).sendKeys('admin');

    element(by.id('login')).click();
    
    expect(browser.getCurrentUrl()).toContain('dashboard/view/noteview');
  });

  it('user is able to see all the notes from the server', () => {
    const notes = element.all(by.css('mat-card'));

    expect(notes.count()).toBe(0);
  });

  it('use should be able to take new notes', () => {
    element(by.css('mat-expansion-panel')).click();

    element(by.id('title')).sendKeys('test_title');
    element(by.id('text')).sendKeys('test_text');
    browser.sleep(1000);
    element(by.id('notetaker-done')).click();
    browser.sleep(2000);
    element(by.css('mat-expansion-panel')).click();
    browser.sleep(1000);
    const notes = element.all(by.css('mat-card'));
    expect(notes.count()).toBe(1);
  });

  it('added note should remain when the browser is refreshed', () => {
    browser.refresh();
    const notes = element.all(by.css('mat-card'));
    expect(notes.count()).toBe(1);
  });

  it('user should be able to edit the note', () => {
    element(by.css('mat-expansion-panel')).click();
    browser.sleep(2000);
    const noteElements = element.all(by.css('.keep-c-note-click-area'));
    noteElements.get(0).click();
    browser.sleep(2000);
    // browser.pause();
    // const editNoteDialogElement = element.all(by.css('app-edit-note-view'));
    // expect(editNoteDialogElement.count()).toBe(1);
    // element.all(by.css('mat-card')).get(0).click();
    const editNoteDialogElement = element(by.model('note.noteTitle'));
    expect(editNoteDialogElement).toBeTruthy();

    browser.sleep(2000);
    element(by.id('editTitle')).clear();
    element(by.id('editTitle')).sendKeys('edited title');
    element(by.id('editText')).clear();
    element(by.id('editText')).sendKeys('edited text');
    browser.sleep(1000);
    const buttonElement = element(by.buttonText('Save'));
    buttonElement.click();
    browser.sleep(3000);
  });

  it('user should be able to add Category to the note', () => {
    // const addCategoryButton = element.all(by.id('add-category-to-note'));
    // addCategoryButton.get(0).click();

    const noteElements = element.all(by.css('.keep-c-note-click-area'));
    const note1Element = noteElements.get(0);
    browser.actions().mouseMove(note1Element);
    browser.sleep(5000);

    // const addCategoryButton = element(by.id('add-category-to-note'));
    // browser.actions().mouseMove(addCategoryButton).click().perform();
    // addCategoryButton.click();
    // browser.sleep(2000);

    // element(by.id('categoryName')).sendKeys('category 1');
    // element(by.id('categoryDescription')).sendKeys('category content 1');
    // const buttonElement = element(by.buttonText('Save'));
    // buttonElement.click();
    // browser.sleep(2000);

  });

  it('user should be able slide open the sidenav on click of dehaze button', () => {
    const buttonElement = element(by.id('sidenav'));
    buttonElement.click();

    browser.sleep(3000);
    const noteListButtonElement = element(by.buttonText('Notes'));
    expect(noteListButtonElement).toBeTruthy();
    
  });

  it('user should be able to add Category in sidenav', () => {
    const noteListButtonElement = element(by.id('addCategory'));
    noteListButtonElement.click();
    browser.sleep(3000);
    const addCategoryDialogElement = element(by.model('category.categoryName'));
    expect(addCategoryDialogElement).toBeTruthy();

    element(by.id('categoryName')).sendKeys('category 2');
    element(by.id('categoryDescription')).sendKeys('category content 2');
    const buttonElement = element(by.buttonText('Save'));
    buttonElement.click();
    browser.sleep(2000);

    const addedCategoryElements = element.all(by.css('.category-list-button'));
    expect(addedCategoryElements.count()).toBe(1);
    browser.sleep(2000);

    const categoryElements = element.all(by.cssContainingText('mat-icon','delete'));
    categoryElements.get(0).click();
    browser.sleep(2000);
    const yesButtonElement = element(by.buttonText('Yes'));
    yesButtonElement.click();
    browser.sleep(1000);
  
  });

  it('user should be able to see reminder notes', () => {

    element(by.css('mat-expansion-panel')).click();

    element(by.id('title')).sendKeys('reminder note title');
    element(by.id('text')).sendKeys('reminder note content');

    //select category
    browser.sleep(3000);
    element.all(by.tagName('mat-option')).then(function(options){
      browser.sleep(1000);
      options[0].click();
      browser.sleep(1000);
    });
    browser.sleep(1000);
    //choose reminder
    element(by.id('note-taker-reminder-list')).click();
    element(by.cssContainingText('.mat-option-text', 'rem1')).click();

    // element.all(by.tagName('mat-option')).then(function(options){
    //   browser.sleep(1000);
    //   options[0].click();
    //   browser.sleep(1000);
    // });
    // const remSpanSelect = element(by.binding('reminder.reminderName'));
    // remSpanSelect.click();

    // browser.sleep(1000);
    // const ele = element.all(by.className('flex-spacer')).get(0).click();

    browser.sleep(2000);
    const doneButton = element(by.id('notetaker-done'));
    browser.actions().mouseMove(doneButton).click().perform();
    doneButton.click();

    browser.sleep(3000);
    const notes = element.all(by.css('mat-card'));
    expect(notes.count()).toBe(2);

    const reminderListButtonElement = element(by.css('.reminder-list-button'));
    reminderListButtonElement.click();

    browser.sleep(2000);
    const reminders = element.all(by.css('mat-card'));
    expect(reminders.count()).toBe(1);
    browser.sleep(2000);
  });

  it('user should be able to search for notes', () => {
    element(by.id('search')).sendKeys('reminder note title');
    browser.sleep(2000);
    element(by.id('search-button')).click();
    const reminders = element.all(by.css('mat-card'));
    expect(reminders.count()).toBe(1);
  });
});


// import { AppPage } from './app.po';

// describe('keep App', () => {
//   let page: AppPage;

//   beforeEach(() => {
//     page = new AppPage();
//   });

//   it('should display welcome message', () => {
//     page.navigateTo();
//     expect(page.getParagraphText()).toEqual('Welcome to app!');
//   });
// });
