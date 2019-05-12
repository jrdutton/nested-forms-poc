import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormArray, FormBuilder, FormControl, FormGroupDirective, Validators } from '@angular/forms';
import { setChildControlFactory } from '../helpers';

@Component({
  selector: 'app-child-group2',
  templateUrl: './child-group2.component.html',
  styleUrls: ['./child-group2.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class ChildGroup2Component implements OnInit, OnDestroy {
  fg = this.fb.group({
    fc: this.fb.control('', Validators.required),
    fa: this.fb.array([])
  });

  constructor(private fb: FormBuilder, private parent: FormGroupDirective) {}

  ngOnInit() {
    setChildControlFactory(this.fa, () => this.faItemFactory());
    this.parent.form.addControl('child2', this.fg);
  }

  ngOnDestroy(): void {
    this.parent.form.removeControl('child2');
  }

  get fc() {
    return this.fg.get('fc') as FormControl;
  }

  get fa() {
    return this.fg.get('fa') as FormArray;
  }

  inner1(i: number) {
    if (!this.fa) {
      return null;
    }

    if (!this.fa.controls) {
      return null;
    }

    if (this.fa.controls.length < i + 1) {
      return null;
    }

    return this.fa.controls[i].get('inner1');
  }

  inner2(i: number) {
    if (!this.fa) {
      return null;
    }

    if (!this.fa.controls) {
      return null;
    }

    if (this.fa.controls.length < i + 1) {
      return null;
    }

    return this.fa.controls[i].get('inner2');
  }

  isInvalid(): boolean {
    return this.fc && this.fc.errors && (this.fc.dirty || this.fc.touched);
  }

  isInvalidInner1(i: number): boolean {
    const inner1 = this.inner1(i);
    return inner1 && inner1.errors && (inner1.dirty || inner1.touched);
  }

  isInvalidInner2(i: number): boolean {
    const inner2 = this.inner2(i);
    return inner2 && inner2.errors && (inner2.dirty || inner2.touched);
  }

  add() {
    this.fa.push(this.faItemFactory());
  }

  delete(i: number) {
    this.fa.removeAt(i);
  }

  faItemFactory(): AbstractControl {
    return this.fb.group({
      inner1: ['', Validators.required],
      inner2: ''
    });
  }
}
