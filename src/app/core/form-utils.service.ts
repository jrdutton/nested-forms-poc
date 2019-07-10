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

  reset(
    control: AbstractControl,
    markAsPristineOpts?: {
      onlySelf?: boolean;
    },
    markAsUntouchedOpts?: {
      onlySelf?: boolean;
    }
  ) {
    if (control instanceof FormGroup) {
      control.markAsPristine(markAsPristineOpts);
      control.markAsUntouched(markAsUntouchedOpts);

      (Object as any).values(control.controls).forEach(c => {
        this.reset(c, markAsPristineOpts, markAsUntouchedOpts);
      });
    } else if (control instanceof FormArray) {
      control.markAsPristine(markAsPristineOpts);
      control.markAsUntouched(markAsUntouchedOpts);

      control.controls.forEach(c => {
        this.reset(c, markAsPristineOpts, markAsUntouchedOpts);
      });
    } else {
      control.markAsPristine(markAsPristineOpts);
      control.markAsUntouched(markAsUntouchedOpts);
    }
  }

  validate(
    control: AbstractControl,
    markAsTouchedOpts?: {
      onlySelf?: boolean;
    },
    updateValueAndValidityOpts?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
    }
  ) {
    if (control instanceof FormGroup) {
      control.markAsTouched(markAsTouchedOpts);
      control.updateValueAndValidity(updateValueAndValidityOpts);

      (Object as any).values(control.controls).forEach(c => {
        this.validate(c, markAsTouchedOpts, updateValueAndValidityOpts);
      });
    } else if (control instanceof FormArray) {
      control.markAsTouched(markAsTouchedOpts);
      control.updateValueAndValidity(updateValueAndValidityOpts);

      control.controls.forEach(c => {
        this.validate(c, markAsTouchedOpts, updateValueAndValidityOpts);
      });
    } else {
      control.markAsTouched(markAsTouchedOpts);
      control.updateValueAndValidity(updateValueAndValidityOpts);
    }
  }
}
