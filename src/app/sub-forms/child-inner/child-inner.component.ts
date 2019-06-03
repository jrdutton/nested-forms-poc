import { Component, Input, OnDestroy, OnInit, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { FormUtilsService } from 'src/app/core/form-utils.service';
import { ChildInner } from './child-inner.model';

@Component({
  selector: 'app-child-inner',
  templateUrl: './child-inner.component.html',
  styleUrls: ['./child-inner.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }]
})
export class ChildInnerComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  childInner: ChildInner;

  fg: FormGroup;

  constructor(private fb: FormBuilder, private parent: FormGroupDirective, private formUtilsService: FormUtilsService) {
    this.fg = this.fb.group({
      input: this.fb.control('')
    });
  }

  ngOnChanges(changes: { [key: string]: SimpleChange }): void {
    if (changes.childInner && changes.childInner.isFirstChange()) {
      this.formUtilsService.setValues(this.fg, changes.childInner.currentValue);
    }
  }

  ngOnInit() {
    this.parent.form.addControl('childInner', this.fg);
  }

  ngOnDestroy(): void {
    this.parent.form.removeControl('childInner');
  }
}
