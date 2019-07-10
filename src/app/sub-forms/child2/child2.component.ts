import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { FormUtilsService } from '../../core/form-utils.service';
import { Child2 } from './child2.model';

@Component({
  selector: 'app-child2',
  templateUrl: './child2.component.html',
  styleUrls: ['./child2.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class Child2Component implements OnInit, OnDestroy, OnChanges {
  @Input()
  child2: Child2;

  fc: FormControl;
  fg: FormGroup;

  show1 = false;
  show2 = false;

  constructor(private fb: FormBuilder, private parent: FormGroupDirective, private formUtilsService: FormUtilsService) {
    this.fc = this.fb.control('', Validators.required);
    this.fg = this.fb.group({
      fc: this.fc
    });
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }): void {
    if (changes.child2) {
      this.show1 = Boolean(changes.child2.currentValue.childShared1);
      this.show2 = Boolean(changes.child2.currentValue.childShared2);
      this.formUtilsService.setValues(this.fg, changes.child2.currentValue);
    }
  }

  ngOnInit() {
    this.parent.form.addControl('child2', this.fg);
  }

  ngOnDestroy(): void {
    this.parent.form.removeControl('child2');
  }

  isInvalid(): boolean {
    return this.fc && this.fc.errors && (this.fc.dirty || this.fc.touched);
  }
}
