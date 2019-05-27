import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ParentForm } from '../parent-form/parent-form.model';

@Component({
  selector: 'app-parent-page',
  templateUrl: './parent-page.component.html',
  styleUrls: ['./parent-page.component.scss']
})
export class ParentPageComponent implements OnInit {
  private initialPF = {
    fc: '',
    child1: null,
    child2: null
  };

  private child1PF = {
    fc: 'child1',
    child1: {
      fc: 'Child 1'
    }
  };

  private child2PF = {
    fc: 'child2',
    child2: {
      fc: 'Child 2',
      childShared1: {
        fa: [{ inner1: '123', inner2: 'abc' }, { inner1: '456', inner2: 'def' }]
      },
      childShared2: null
    }
  };

  parentFormData$ = new BehaviorSubject<ParentForm>(this.initialPF);
  parentForm$ = this.parentFormData$.asObservable();

  constructor() {}

  ngOnInit() {}

  update(parentForm: ParentForm) {
    console.log(JSON.stringify(parentForm));
  }

  reset() {
    this.parentFormData$.next({ ...this.initialPF } as ParentForm);
  }

  child1() {
    this.parentFormData$.next({ ...this.child1PF } as ParentForm);
  }

  child2() {
    this.parentFormData$.next({ ...this.child2PF } as ParentForm);
  }
}
