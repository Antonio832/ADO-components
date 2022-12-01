import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { DbServiceService } from '../db-service.service';
import { GestionMateriaComponent } from '../dialogs/gestion-materia.component';

@Component({
  selector: 'app-alumno-inscr',
  templateUrl: './alumno-inscr.component.html',
  styleUrls: ['./alumno-inscr.component.scss']
})
export class AlumnoInscrComponent implements OnInit {

  constructor(private dbService: DbServiceService, private afAuth: AngularFireAuth, public dialog: MatDialog) { }

  eventosAprobados: any[] = []

  eventosInscritos: any[] = []

  alumnoProfile: any

  ngOnInit(): void {
    this.dbService.getEventosAprobados().onSnapshot(snap=>{
      let aux: any[] = []
      snap.docs.forEach(doc => aux.push(doc.data()))
      this.eventosAprobados = [...aux]
      console.log(this.eventosAprobados)
    })

    this.afAuth.user.subscribe(res=>{
      if(res){
        this.dbService.getAlumnoProfile(res.uid).forEach(doc=>{
          if(doc.exists){
            this.alumnoProfile = doc.data()
          }
        }).then(()=>{
          for(let evento of this.alumnoProfile.eventos){
            for(let eventoA of this.eventosAprobados){
              if(eventoA.id == evento.docRef){
                this.eventosAprobados.splice(this.eventosAprobados.indexOf(evento),1)
              }
            }
          }
          console.log(this.alumnoProfile)
        })
      }
    })
  }

  inscribeEvento(docRef: string, nombre: string){
    this.afAuth.user.subscribe(res=>{
      if(res){
        return this.dbService.inscribirseEvento(docRef,nombre,res.uid).then(res=>{
          for(let evento of this.eventosAprobados){
            if(evento.id == docRef){
              this.eventosAprobados.splice(this.eventosAprobados.indexOf(evento),1)
            }
          }
        })
      }
      return
    })
  }

  verEvento(docRef: string, nombreEvento: string){
    const dialogRef = this.dialog.open(GestionMateriaComponent,{
      data: {docRef, userRef: this.alumnoProfile.uid, nombre: nombreEvento}
    })
  }

}
