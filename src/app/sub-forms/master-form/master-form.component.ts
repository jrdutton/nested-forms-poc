import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { setValues, validate } from '../helpers';

export interface MasterForm {
  fg1: { child1: { fc: string } };
  fg2: { child1: { fc: string }; child2: { fc: string; fa: { inner1: string; inner2: string }[] } };
}

@Component({
  selector: 'app-master-form',
  templateUrl: './master-form.component.html',
  styleUrls: ['./master-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MasterFormComponent implements OnInit {
  @Input()
  set masterForm(value: MasterForm) {
    setValues(this.fg, value);
  }

  show1 = true;
  show2 = false;
  formStatus = '';

  fg1 = this.fb.group({});
  fg2 = this.fb.group({});
  fg = this.fb.group({ fg1: this.fg1, fg2: this.fg2 });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  toggle1() {
    this.show1 = !this.show1;
  }

  toggle2() {
    this.show2 = !this.show2;
  }

  submit() {
    validate(this.fg);
    this.formStatus = this.fg.valid ? 'VALID' : 'INVALID';
  }
}
