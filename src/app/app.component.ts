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
    
    const regLetters = /^(?=.*[a-zA-Z])/;
    const regNumbers = /^(?=.*[0-9])/;
    const regSymbols = /^(?=.*[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])/;

    const isValidEasy = value.match(regLetters)
    || value.match(regNumbers)
    || value.match(regSymbols);

    const hasLettersNumbers = value.match(regLetters)
      && value.match(regNumbers)
      && !value.match(regSymbols);
    const hasNumbersSymbols = value.match(regSymbols)
      && value.match(regNumbers)
      && !value.match(regLetters);
    const hasSymbolsLetters = value.match(regSymbols)
      && value.match(regLetters)
      && !value.match(regNumbers);
    const hasLettersNumbersSymbols = value.match(regLetters)
      && value.match(regNumbers)
      && value.match(regSymbols);
    const isValidMedium = hasLettersNumbers 
      || hasNumbersSymbols
      || hasSymbolsLetters;
    

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

    if (value.length >= 8
      && hasLettersNumbersSymbols) {
        this.colorEasy = 'green';
        this.colorMedium = 'green';
        this.colorStrong = 'green';
    }
  }
}
