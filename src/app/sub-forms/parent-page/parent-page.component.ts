import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ParentForm } from '../parent-form/parent-form.model';

@Component({
  selector: 'app-parent-page',
  templateUrl: './parent-page.component.html',
  styleUrls: ['./parent-page.component.scss']
})
export class ParentPageComponent implements OnInit {
  initialValue: ParentForm = {
    fc: '',
    child1: null,
    child2: null
  };

  nextValue: ParentForm = {
    fc: '',
    child1: null,
    child2: null
  };

  parentFormData$ = new BehaviorSubject<ParentForm>(this.initialValue);
  parentForm$ = this.parentFormData$.asObservable();

  constructor() {}

  ngOnInit() {}

  update(parentForm: ParentForm) {
    console.log(JSON.stringify(parentForm));
  }

  next() {
    this.parentFormData$.next(this.nextValue);
  }
}
