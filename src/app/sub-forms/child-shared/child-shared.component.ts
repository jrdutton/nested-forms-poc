import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormArray, FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { FormUtilsService } from '../../core/form-utils.service';
import { ChildShared } from './child-shared.model';

@Component({
  selector: 'app-child-shared',
  templateUrl: './child-shared.component.html',
  styleUrls: ['./child-shared.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class ChildSharedComponent implements OnInit, OnDestroy {
  _childShared: ChildShared;
  @Input()
  set childShared(value: ChildShared) {
    this._childShared = value;
    this.formUtilsService.setValues(this.fg, value);
  }

  @Input()
  controlName: string;

  fa: FormArray;
  fg: FormGroup;

  constructor(private fb: FormBuilder, private parent: FormGroupDirective, private formUtilsService: FormUtilsService) {
    this.fa = this.fb.array([]);
    this.fg = this.fb.group({
      fa: this.fa
    });
    this.formUtilsService.setChildControlFactory(this.fa, () => this.faItemFactory());
  }

  ngOnInit() {
    this.parent.form.addControl(this.controlName, this.fg);
  }

  ngOnDestroy(): void {
    this.parent.form.removeControl(this.controlName);
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
