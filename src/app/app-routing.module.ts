import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AppComponent} from './app.component';
import {MainComponent} from './main/main.component';
import {ReadMailComponent} from './read-mail/read-mail.component';

const routes: Routes = [
  {
    component: DashboardComponent,
    path: 'dashboard'
  },
  {
    component: MainComponent,
    path: 'main'
  },
  {
    component: ReadMailComponent,
    path: 'read-mail/:mailId'
  },
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/main',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
