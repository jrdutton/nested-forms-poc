import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChildGroup1Component } from './child-group1/child-group1.component';
import { ChildGroup2Component } from './child-group2/child-group2.component';
import { MasterFormComponent } from './master-form/master-form.component';
import { MasterPageComponent } from './master-page/master-page.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [MasterFormComponent, ChildGroup1Component, ChildGroup2Component, MasterPageComponent],
  exports: [MasterPageComponent]
})
export class SubFormsModule {}
