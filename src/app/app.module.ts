import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SubFormsModule } from './sub-forms/sub-forms.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SubFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
