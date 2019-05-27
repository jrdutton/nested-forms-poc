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
  @Input()
  child1: Child1;

  fg: FormGroup;

  get fc() {
    return this.fg.get('fc') as FormControl;
  }

  constructor(private fb: FormBuilder, private parent: FormGroupDirective) {}

  ngOnInit() {
    this.fg = this.fb.group({
      fc: this.fb.control(this.child1 ? this.child1.fc : '', Validators.required)
    });
    this.parent.form.addControl('child1', this.fg);
  }

  ngOnDestroy(): void {
    this.parent.form.removeControl('child1');
  }

  isInvalid(): boolean {
    return this.fc && this.fc.errors && (this.fc.dirty || this.fc.touched);
  }
}
