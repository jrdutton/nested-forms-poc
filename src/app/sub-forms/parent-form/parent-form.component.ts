import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormUtilsService } from '../../core/form-utils.service';
import { ParentForm } from './parent-form.model';

@Component({
  selector: 'app-parent-form',
  templateUrl: './parent-form.component.html',
  styleUrls: ['./parent-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParentFormComponent implements OnInit {
  _parentForm: ParentForm;
  @Input()
  set parentForm(value: ParentForm) {
    this._parentForm = value;
    this.formUtilsService.setValues(this.fg, value);
    this.formStatus = '';
    this.formValue = '';
  }

  @Output()
  result = new EventEmitter<ParentForm>();

  fc: FormControl;
  fg: FormGroup;

  show1 = false;
  show2 = false;
  showOuter = false;

  formStatus = '';
  formValue = '';

  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(private fb: FormBuilder, private formUtilsService: FormUtilsService) {
    this.fc = this.fb.control('');
    this.fg = this.fb.group({
      fc: this.fc
    });

    this.update();
  }

  ngOnInit() {
    this.fc.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => this.update());
  }

  update() {
    switch (this.fc.value) {
      case 'child1':
        this.show1 = true;
        this.show2 = false;
        this.showOuter = false;
        break;
      case 'child2':
        this.show1 = false;
        this.show2 = true;
        this.showOuter = false;
        break;
      case 'childOuter':
        this.show1 = false;
        this.show2 = false;
        this.showOuter = true;
        break;
      default:
        this.show1 = false;
        this.show2 = false;
        this.showOuter = false;
        break;
    }
  }

  submit() {
    this.formUtilsService.validate(this.fg);
    this.formStatus = this.fg.valid ? 'VALID' : 'INVALID';
    this.formValue = JSON.stringify(this.fg.value);
    if (this.fg.valid) {
      this.result.emit({ ...this.fg.value } as ParentForm);
    }
  }
}
