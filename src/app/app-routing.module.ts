import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ReactionSpeedComponent } from './reaction-speed/reaction-speed.component';
import { AltreTestComponent } from './altre-test/altre-test.component';


const appRoutes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'testos', component: MainPageComponent},
  {path: 'reaction-speed', component: ReactionSpeedComponent},
  {path: 'altre-test', component: AltreTestComponent},
  {path: 'main-page', component: MainPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
