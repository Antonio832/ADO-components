import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { DbServiceService } from '../db-service.service';
import { GestionGrupoComponent } from '../dialogs/gestion-grupo.component';
import { GestionMateriaComponent } from '../dialogs/gestion-materia.component';

@Component({
  selector: 'app-crea-evento',
  templateUrl: './crea-evento.component.html',
  styleUrls: ['./crea-evento.component.scss']
})
export class CreaEventoComponent implements OnInit {

  tipoCurso: string = ''
  nombreCurso: string = ''
  horasCurso: number = 0
  descCurso: string = ''
  modalidadCurso: string =''

  eventos: any[] = []

  constructor(private db: DbServiceService, private afAuth: AngularFireAuth, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.afAuth.user.subscribe(res=>{
      if(res){
        this.db.getEventos(res.uid).onSnapshot( snap=>{
          let aux: any[] = []
          snap.docs.forEach(doc=> aux.push(doc.data()))
          this.eventos = [...aux]
        })
      }
    })
  }

  solicitaEvento(){
    if(!this.tipoCurso || !this.nombreCurso || !this.horasCurso || !this.descCurso || !this.modalidadCurso) return
    this.db.solicitaEvento({
      tipo: this.tipoCurso,
      nombre: this.nombreCurso,
      horas: this.horasCurso,
      descripcion: this.descCurso,
      modalidad: this.modalidadCurso
    })
    this.tipoCurso = ''
    this.nombreCurso = ''
    this.horasCurso = 0
    this.descCurso = ''
    this.modalidadCurso = ''
  }

  eliminaSol(docRef: string){
    this.db.elimSolicitud(docRef)
  }

  verGrupo(grupo: any){
    const dialogRef = this.dialog.open(GestionGrupoComponent,{
      data: grupo
    })
  }

}
