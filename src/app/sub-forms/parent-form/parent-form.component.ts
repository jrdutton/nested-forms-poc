import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { pairwise, startWith, takeUntil } from 'rxjs/operators';
import { FormUtilsService } from '../../core/form-utils.service';
import { ParentForm } from './parent-form.model';

@Component({
  selector: 'app-parent-form',
  templateUrl: './parent-form.component.html',
  styleUrls: ['./parent-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParentFormComponent implements OnInit, OnChanges {
  _parentForm: ParentForm;
  @Input()
  set parentForm(value: ParentForm) {
    this._parentForm = value;
    this.update(value.fc);
    this.formUtilsService.setValues(this.fg, value);
  }

  @Output()
  result = new EventEmitter<ParentForm>();

  fg: FormGroup;

  show1 = false;
  show2 = false;
  formStatus = '';
  formValue = '';

  get fc() {
    return this.fg.get('fc') as FormControl;
  }

  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(private fb: FormBuilder, private formUtilsService: FormUtilsService) {
    this.fg = this.fb.group({
      fc: this.fb.control(this.parentForm ? this.parentForm.fc : '')
    });
  }

  ngOnInit() {
    this.fc.valueChanges
      .pipe(
        // tslint:disable-next-line: deprecation
        startWith(null),
        pairwise(),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(([oldValue, newValue]) => {
        if (oldValue !== newValue) {
          this.update(newValue);
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Parent form changes');
    console.log(changes);
  }

  update(value: string) {
    switch (value) {
      case 'child1':
        this.show1 = true;
        this.show2 = false;
        break;
      case 'child2':
        this.show1 = false;
        this.show2 = true;
        break;
      default:
        this.show1 = false;
        this.show2 = false;
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
