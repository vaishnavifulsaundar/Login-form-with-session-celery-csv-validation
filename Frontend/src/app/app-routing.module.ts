import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CsvDataComponent } from './csv-data/csv-data.component';
import { AuthGuard } from './auth.guard';
import { HighchartComponent } from './highchart/highchart.component';
import { GochartComponent } from './gochart/gochart.component';
import { CeleryUIComponent } from './celery-ui/celery-ui.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  { path: 'csv', component:CsvDataComponent, canActivate: [AuthGuard] },
  {path:'highchart',component:HighchartComponent},
  {path:'gochart',component:GochartComponent},
  {path:'celery',component:CeleryUIComponent},

  { path: '**', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
