import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DadhboardComponent } from './dadhboard/dadhboard.component';
import { MockapiDashboardComponent } from './mockapi/dashboard/mockapi.dashboard.component';
import { MockapiComponent } from './mockapi/mockapi.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'mock',
    pathMatch: 'full'
  },{
    path: 'mockapis',
    children:[
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: MockapiDashboardComponent,
      },
      {
        path: 'view',
        component: MockapiComponent,
      },
      {
        path: 'edit',
        component: MockapiComponent,
      },
      {
        path: 'new',
        component: MockapiComponent,
      }
    ]
  },{
    path: 'mock',
    component: DadhboardComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
