import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CustomerFilterComponent } from './customer-filter/customer-filter.component';
import { HttpClientModule } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PanelModule } from 'primeng/panel';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { InputValueTypePipe } from './pipes/input-value-type.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CustomerFilterComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    DropdownModule,
    FormsModule,
    BrowserAnimationsModule,
    PanelModule,
    DividerModule,
    CommonModule,
    InputValueTypePipe
  ],
  providers: [InputValueTypePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
