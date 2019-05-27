import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {
  constructor() {}

  setChildControlFactory(control: FormArray, factory: () => AbstractControl) {
    (control as any).__createChildControl = factory;
  }

  createChildControl(control: FormArray) {
    return (control as any).__createChildControl();
  }

  setValues(control: AbstractControl, value: any) {
    if (control instanceof FormGroup) {
      if (value != null) {
        Object.keys(value).forEach(name => {
          if (control.contains(name)) {
            this.setValues(control.get(name), value[name]);
          }
        });
      }
    } else if (control instanceof FormArray) {
      const length = value ? value.length : 0;
      // Remove excess controls from the array
      while (control.length > length) {
        control.removeAt(control.length - 1);
      }
      // Add missing controls
      while (control.length < length) {
        control.push(this.createChildControl(control));
      }
      // Update all the values in the array
      for (let i = 0; i < length; ++i) {
        this.setValues(control.at(i), value[i]);
      }
    } else {
      control.setValue(value);
    }
  }

  validate(control: AbstractControl) {
    if (control instanceof FormGroup) {
      control.markAsTouched();
      control.updateValueAndValidity();

      (Object as any).values(control.controls).forEach(c => {
        this.validate(c);
      });
    } else if (control instanceof FormArray) {
      control.markAsTouched();
      control.updateValueAndValidity();

      control.controls.forEach(c => {
        this.validate(c);
      });
    } else {
      control.markAsTouched();
      control.updateValueAndValidity();
    }
  }
}
