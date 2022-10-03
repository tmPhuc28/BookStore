import {FormControl} from '@angular/forms';

export function noWhitespaceValidator(control: FormControl) {
  const isSpace = (control.value || '').trim().length === 0;
  return isSpace ? {whitespace: true} : null;
}
