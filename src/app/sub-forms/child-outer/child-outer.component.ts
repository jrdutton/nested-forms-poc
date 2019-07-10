import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import { AbstractControl, ControlContainer, FormArray, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { FormUtilsService } from '../../core/form-utils.service';
import { ChildOuter } from './child-outer.model';

@Component({
  selector: 'app-child-outer',
  templateUrl: './child-outer.component.html',
  styleUrls: ['./child-outer.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class ChildOuterComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  childOuter: ChildOuter;

  fa: FormArray;
  fg: FormGroup;

  constructor(private fb: FormBuilder, private parent: FormGroupDirective, private formUtilsService: FormUtilsService) {
    this.fa = this.fb.array([]);
    this.fg = this.fb.group({
      fa: this.fa
    });
    this.formUtilsService.setChildControlFactory(this.fa, () => this.faItemFactory());
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }): void {
    if (changes.childOuter && changes.childOuter.isFirstChange()) {
      this.formUtilsService.setValues(this.fg, changes.childOuter.currentValue);
    }
  }

  ngOnInit() {
    this.parent.form.addControl('childOuter', this.fg);
  }

  ngOnDestroy(): void {
    this.parent.form.removeControl('childOuter');
  }

  add() {
    this.fa.push(this.faItemFactory());
  }

  delete(i: number) {
    this.fa.removeAt(i);
  }

  faItemFactory(): AbstractControl {
    return this.fb.group({
      input: this.fb.control('')
    });
  }

  childInner(i: number) {
    return this.childOuter && this.childOuter.fa[i] && this.childOuter.fa[i].childInner ? this.childOuter.fa[i].childInner : null;
  }
}
