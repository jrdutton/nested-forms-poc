import { Component, OnDestroy, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormControl, FormGroupDirective, Validators } from '@angular/forms';

@Component({
  selector: 'app-child-group1',
  templateUrl: './child-group1.component.html',
  styleUrls: ['./child-group1.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class ChildGroup1Component implements OnInit, OnDestroy {
  fg = this.fb.group({
    fc: this.fb.control('', Validators.required)
  });

  constructor(private fb: FormBuilder, private parent: FormGroupDirective) {}

  ngOnInit() {
    this.parent.form.addControl('child1', this.fg);
  }

  ngOnDestroy(): void {
    this.parent.form.removeControl('child1');
  }

  get fc() {
    return this.fg.get('fc') as FormControl;
  }

  isInvalid(): boolean {
    return this.fc && this.fc.errors && (this.fc.dirty || this.fc.touched);
  }
}
