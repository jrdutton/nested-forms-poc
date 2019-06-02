import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ControlContainer, FormArray, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { FormUtilsService } from 'src/app/core/form-utils.service';
import { ChildInner } from './child-inner.model';

@Component({
  selector: 'app-child-inner',
  templateUrl: './child-inner.component.html',
  styleUrls: ['./child-inner.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class ChildInnerComponent implements OnInit, OnDestroy {
  _childInner: ChildInner;
  @Input()
  set childInner(value: ChildInner) {
    this._childInner = value;
    this.formUtilsService.setValues(this.fg, value);
  }

  fa: FormArray;
  fg: FormGroup;

  show2(i: number) {
    if (this._childInner && this._childInner.fa && this._childInner.fa[i] && this._childInner.fa[i].child2) {
      return true;
    }

    return false;
  }

  constructor(private fb: FormBuilder, private parent: FormGroupDirective, private formUtilsService: FormUtilsService) {
    this.fa = this.fb.array([]);
    this.fg = this.fb.group({
      fa: this.fa
    });
    this.formUtilsService.setChildControlFactory(this.fa, () => this.faItemFactory());
  }

  ngOnInit() {
    this.parent.form.addControl('childInner', this.fg);
  }

  ngOnDestroy(): void {
    this.parent.form.removeControl('childInner');
  }

  add() {
    this.fa.push(this.faItemFactory());
  }

  delete(i: number) {
    this.fa.removeAt(i);
  }

  faItemFactory(): AbstractControl {
    return this.fb.group({});
  }
}
