import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreaEventoComponent } from './crea-evento/crea-evento.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
