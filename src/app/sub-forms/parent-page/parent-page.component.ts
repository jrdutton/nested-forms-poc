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
    child2: null,
    childOuter: null
  };

  private child1SimplePF = {
    fc: 'child1',
    child1: {
      fc: 'Child 1 Simple'
    }
  };

  private child2SimplePF = {
    fc: 'child2',
    child2: {
      fc: 'Child 2 Simple',
      childShared1: {
        fa: [{ inner1: 'C2S 123', inner2: 'C2S abc' }, { inner1: 'C2S 456', inner2: 'C2S def' }]
      },
      childShared2: null
    }
  };

  private child2ComplexPF = {
    fc: 'child2',
    child2: {
      fc: 'Child 2 Complex',
      childShared1: {
        fa: [{ inner1: 'C2C 123', inner2: 'C2C abc' }, { inner1: 'C2C 456', inner2: 'C2C def' }]
      },
      childShared2: {
        fa: [{ inner1: 'C2C 321', inner2: 'C2C cba' }, { inner1: 'C2C 654', inner2: 'C2C fed' }]
      }
    }
  };

  private childOuterPF = {
    fc: 'childOuter',
    childOuter: {
      fa: [
        {
          input: 'CO 123',
          childInner: {
            input: 'CO abc'
          }
        },
        {
          input: 'CO 456',
          childInner: {
            input: 'CO def'
          }
        }
      ]
    }
  };

  private childOuter2PF = {
    fc: 'childOuter',
    childOuter: {
      fa: [
        {
          input: 'CO2 123',
          childInner: {
            input: 'CO2 abc'
          }
        }
      ]
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

  child1Simple() {
    this.parentFormData$.next({ ...this.child1SimplePF } as ParentForm);
  }

  child2Simple() {
    this.parentFormData$.next({ ...this.child2SimplePF } as ParentForm);
  }

  child2Complex() {
    this.parentFormData$.next({ ...this.child2ComplexPF } as ParentForm);
  }

  childOuter() {
    this.parentFormData$.next({ ...this.childOuterPF } as ParentForm);
  }

  childOuter2() {
    this.parentFormData$.next({ ...this.childOuter2PF } as ParentForm);
  }
}
