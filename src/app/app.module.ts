import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrackingComponent } from './tracking/tracking.component';
import { TrackingHeaderComponent } from './tracking/tracking-header/tracking-header.component';
import { TrackingLinesComponent } from './tracking/tracking-lines/tracking-lines.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TrackingLineHeaderComponent } from './tracking/tracking-lines/tracking-line-header/tracking-line-header.component';
import { TrackingLineComponent } from './tracking/tracking-lines/tracking-line/tracking-line.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    TrackingComponent,
    TrackingHeaderComponent,
    TrackingLinesComponent,
    ButtonsComponent,
    TrackingLineHeaderComponent,
    TrackingLineComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
