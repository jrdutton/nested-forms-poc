import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MasterForm } from '../master-form/master-form.component';

@Component({
  selector: 'app-master-page',
  templateUrl: './master-page.component.html',
  styleUrls: ['./master-page.component.scss']
})
export class MasterPageComponent implements OnInit {
  masterForm$ = new BehaviorSubject<MasterForm>(null);

  constructor() {}

  ngOnInit() {}

  changeChildren(): void {
    this.masterForm$.next({
      fg1: { child1: { fc: 'Bonjour' } },
      fg2: {
        child1: { fc: 'Hello' },
        child2: { fc: 'World', fa: [{ inner1: 'James', inner2: 'D' }, { inner1: 'John', inner2: 'EB' }, { inner1: 'Ben', inner2: 'M' }] }
      }
    });
  }
}
