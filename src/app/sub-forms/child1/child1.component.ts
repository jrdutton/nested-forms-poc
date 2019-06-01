import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Child1 } from './child1.model';

@Component({
  selector: 'app-child1',
  templateUrl: './child1.component.html',
  styleUrls: ['./child1.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class Child1Component implements OnInit, OnDestroy {
  _child1: Child1;
  @Input()
  set child1(value: Child1) {
    this._child1 = value;
    if (value) {
      this.fg.patchValue(value);
    }
  }

  fc: FormControl;
  fg: FormGroup;

  constructor(private fb: FormBuilder, private parent: FormGroupDirective) {
    this.fc = this.fb.control('', Validators.required);
    this.fg = this.fb.group({
      fc: this.fc
    });
  }

  ngOnInit() {
    this.parent.form.addControl('child1', this.fg);
  }

  ngOnDestroy(): void {
    this.parent.form.removeControl('child1');
  }

  isInvalid(): boolean {
    return this.fc && this.fc.errors && (this.fc.dirty || this.fc.touched);
  }
}
