import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Child2 } from './child2.model';

@Component({
  selector: 'app-child2',
  templateUrl: './child2.component.html',
  styleUrls: ['./child2.component.scss']
})
export class Child2Component implements OnInit, OnDestroy {
  @Input()
  child2: Child2;

  fg: FormGroup;

  get fc() {
    return this.fg.get('fc') as FormControl;
  }

  constructor(private fb: FormBuilder, private parent: FormGroupDirective) {}

  ngOnInit() {
    this.fg = this.fb.group({
      fc: this.fb.control(this.child2 ? this.child2.fc : '', Validators.required)
    });
    this.parent.form.addControl('child2', this.fg);
  }

  ngOnDestroy(): void {
    this.parent.form.removeControl('child2');
  }

  isInvalid(): boolean {
    return this.fc && this.fc.errors && (this.fc.dirty || this.fc.touched);
  }
}
