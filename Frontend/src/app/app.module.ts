import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CeleryUIComponent } from './celery-ui/celery-ui.component';
import { CsvDataComponent } from './csv-data/csv-data.component';
import { HighchartComponent } from './highchart/highchart.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { GochartComponent } from './gochart/gochart.component';
// import { MatDialog } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CeleryUIComponent,
    CsvDataComponent,
    HighchartComponent,
    GochartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    RouterModule,
    HighchartsChartModule,
    // MatDialog
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
