import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SlideShowComponent } from './slide-show/slide-show.component';
import { ProgressTimerComponent } from './progress-timer/progress-timer.component';
import { DigitalTimerComponent } from './digital-timer/digital-timer.component';

@NgModule({
  declarations: [
    AppComponent,
    SlideShowComponent,
    ProgressTimerComponent,
    DigitalTimerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
