import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {
  public isCreated$: Subject<boolean> = new Subject<boolean>();

  constructor() { }
  
  formValid(form: FormGroup, field: string, validation?: string) {
    let value: boolean = true;

    if (form.valid) {
      value = true;
    }

    if ((form.get(field)?.dirty || form.get(field)?.touched) || !form.get(field)?.valid) {
      if (validation != null && form.get(field)?.hasError(validation)) {
        value = false;
      }
    }

    return value;
  }

  setIsCreated(success: boolean) {
    this.isCreated$.next(success);
  }
}
