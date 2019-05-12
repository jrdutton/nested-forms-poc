import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

/**
 * Attach a factory function to a FormArray so that we can automatically create child controls inside `setValues()`
 */
export function setChildControlFactory(control: FormArray, factory: () => AbstractControl) {
  (control as any).__createChildControl = factory;
}

function createChildControl(control: FormArray) {
  return (control as any).__createChildControl();
}

/**
 * Recursively set the values of a form control, creating new children FormArrays as necessary
 */
export function setValues(control: AbstractControl, value: any) {
  if (control instanceof FormGroup) {
    if (value != null) {
      Object.keys(value).forEach(name => {
        if (control.contains(name)) {
          setValues(control.get(name), value[name]);
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
      control.push(createChildControl(control));
    }
    // Update all the values in the array
    for (let i = 0; i < length; ++i) {
      setValues(control.at(i), value[i]);
    }
  } else {
    control.setValue(value);
  }
}

export function validate(control: AbstractControl) {
  if (control instanceof FormGroup) {
    control.markAsTouched();
    control.updateValueAndValidity();

    (<any>Object).values(control.controls).forEach(c => {
      validate(c);
    });
  } else if (control instanceof FormArray) {
    control.markAsTouched();
    control.updateValueAndValidity();

    control.controls.forEach(c => {
      validate(c);
    });
  } else {
    control.markAsTouched();
    control.updateValueAndValidity();
  }
}
