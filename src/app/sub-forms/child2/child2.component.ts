import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Child2 } from './child2.model';

@Component({
  selector: 'app-child2',
  templateUrl: './child2.component.html',
  styleUrls: ['./child2.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class Child2Component implements OnInit, OnDestroy {
  _child2: Child2;
  @Input()
  set child2(value: Child2) {
    this._child2 = value;
    this.show1 = false;
    this.show2 = false;
    if (value) {
      this.show1 = Boolean(value.childShared1);
      this.show2 = Boolean(value.childShared2);
      this.fc.patchValue(value.fc);
    }
  }

  fc: FormControl;
  fg: FormGroup;

  show1 = false;
  show2 = false;

  constructor(private fb: FormBuilder, private parent: FormGroupDirective) {
    this.fc = this.fb.control('', Validators.required);
    this.fg = this.fb.group({
      fc: this.fc
    });
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
