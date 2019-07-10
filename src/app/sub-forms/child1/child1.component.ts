import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { FormUtilsService } from '../../core/form-utils.service';
import { Child1 } from './child1.model';

@Component({
  selector: 'app-child1',
  templateUrl: './child1.component.html',
  styleUrls: ['./child1.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class Child1Component implements OnInit, OnDestroy, OnChanges {
  @Input()
  child1: Child1;

  fc: FormControl;
  fg: FormGroup;

  constructor(private fb: FormBuilder, private parent: FormGroupDirective, private formUtilsService: FormUtilsService) {
    this.fc = this.fb.control('', Validators.required);
    this.fg = this.fb.group({
      fc: this.fc
    });
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }): void {
    if (changes.child1) {
      this.formUtilsService.setValues(this.fg, changes.child1.currentValue);
    }
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
