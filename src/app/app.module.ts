import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { environment } from '../environments/environment'
import { AngularFireModule } from '@angular/fire'
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFirestoreModule } from '@angular/fire/firestore'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule, } from '@angular/material/card'
import { MatSlideToggleModule, } from '@angular/material/slide-toggle'
import { MatSelectModule } from '@angular/material/select'
import { MatTabsModule } from '@angular/material/tabs'
import { MatDialogModule } from '@angular/material/dialog'

import { MatFormFieldModule } from '@angular/material/form-field'
import { FormsModule} from '@angular/forms'
import { MatInputModule, } from '@angular/material/input'
import { ReactiveFormsModule } from '@angular/forms'
import { MatIconModule } from '@angular/material/icon';
import { CreaEventoComponent } from './crea-evento/crea-evento.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { EvaluarEventosComponent } from './evaluar-eventos/evaluar-eventos.component';
import { AlumnoInscrComponent } from './alumno-inscr/alumno-inscr.component';
import { GestionGrupoComponent } from './dialogs/gestion-grupo.component'
import { GestionMateriaComponent } from './dialogs/gestion-materia.component';
import { CalificacionesComponent } from './dialogs/calificaciones.component';
import { EditComponent } from './dialogs/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    CreaEventoComponent,
    LoginComponent,
    MainComponent,
    EvaluarEventosComponent,
    AlumnoInscrComponent,
    GestionGrupoComponent,
    GestionMateriaComponent,
    CalificacionesComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    MatCardModule,
    MatSlideToggleModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTabsModule,
    MatSelectModule,
    AngularFirestoreModule, 
    MatButtonModule,
    AppRoutingModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
