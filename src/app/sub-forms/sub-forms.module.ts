import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChildSharedComponent } from './child-shared/child-shared.component';
import { Child1Component } from './child1/child1.component';
import { Child2Component } from './child2/child2.component';
import { ParentFormComponent } from './parent-form/parent-form.component';
import { ParentPageComponent } from './parent-page/parent-page.component';
import { ChildOuterComponent } from './child-outer/child-outer.component';
import { ChildInnerComponent } from './child-inner/child-inner.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [Child1Component, Child2Component, ChildSharedComponent, ParentFormComponent, ParentPageComponent, ChildOuterComponent, ChildInnerComponent],
  exports: [ParentPageComponent]
})
export class SubFormsModule {}
