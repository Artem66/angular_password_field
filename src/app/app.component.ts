import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <form type='submit'>
    <input placeholder='enter password' #box  (keyup)="onKey(box.value)"/>
    <p [style.color]="colorEasy">Only letters/digits/symbols - the password is easy;</p>
    <p [style.color]='colorMedium'>Combination of letters-symbols/letters-digits/digits-symbols - the password is medium;</p>
    <p [style.color]='colorStrong'>Has letters, symbols and numbers - the password is strong;</p>
  </ form>
  `,
  styles: []
})
export class AppComponent {
  title = 'angular_password_field';
  colorEasy = 'grey';
  colorMedium = 'grey';
  colorStrong = 'grey';
  values = '';
  onKey(value: string) {
    if (value.length < 8) {
      this.colorEasy = 'red';
      this.colorMedium = 'red';
      this.colorStrong = 'red';
    }

    const isValidEasy = /^[a-zA-Z]+$/.test(value)
    || /^[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]+$/.test(value)
    || /^[0-9]+$/.test(value);

    const hasLettersNumbers = value.match(/^(?=.*[a-zA-Z])/) && value.match(/^(?=.*[0-9])/) && !value.match(/^(?=.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])/);
    const hasNumbersSymbols = value.match(/^(?=.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])/) && value.match(/^(?=.*[0-9])/) && !value.match(/^(?=.*[a-zA-Z])/);
    const hasSymbolsLetters = value.match(/^(?=.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])/) && value.match(/^(?=.*[a-zA-Z])/) && !value.match(/^(?=.*[0-9])/);
    const hasLettersNumbersSymbols = value.match(/^(?=.*[a-zA-Z])/) && value.match(/^(?=.*[0-9])/) && value.match(/^(?=.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])/);
    const isValidMedium = hasLettersNumbers || hasNumbersSymbols || hasSymbolsLetters;

    console.log('isValidMedium: ', isValidMedium);
    

    if (value.length >= 8
      && isValidEasy) {
      this.colorEasy = 'red';
      this.colorMedium = 'grey';
      this.colorStrong = 'grey';
    }

    if (value.length >= 8
       && isValidMedium) {
      this.colorEasy = 'yellow';
      this.colorMedium = 'yellow';
    }
    //  else {
    //   this.colorMedium = 'red';
    // }

    if (value.length >= 8
      && hasLettersNumbersSymbols) {
        this.colorEasy = 'green';
        this.colorMedium = 'green';
        this.colorStrong = 'green';
    }
    //  else {
    //   this.colorStrong = 'red';
    // }
  }
}
