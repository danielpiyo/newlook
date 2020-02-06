import { Injectable } from '@angular/core';
import { Settings } from './setting.model';

@Injectable()
export class AppSettings {
  public settings = new Settings(
    'Stanbick', // theme name
    true, // loadingSpinner
    true, // fixedHeader
    true, // sidenavIsOpened
    true, // sidenavIsPinned
    true, // sidenavUserBlock
    'vertical', // horizontal , vertical
    'default', // default, compact, mini
    'indigo-light', // indigo-light, teal-light, red-light, blue-dark, green-dark, pink-dark
    false, // true = rtl, false = ltr
    ''
  );
}
