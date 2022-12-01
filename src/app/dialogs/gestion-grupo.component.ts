import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DbServiceService } from '../db-service.service';
import { CalificacionesComponent } from './calificaciones.component';

@Component({
  selector: 'app-gestion-grupo',
  template: `
    <div matDialogTitle>Calificaciones del grupo {{data.nombre}}</div>
    <div matDialogContent>
      <p *ngIf="!alumnos.length" matCardSubtitle>No hay participantes</p>
      <table *ngIf="alumnos.length">
        <tr>
            <th style="padding-inline: .5rem;">Participante</th>
            <th style="padding-inline: .5rem;">Estatus</th>
            <th>Evaluaciones</th>
        </tr>
        <tr *ngFor="let alumno of alumnos">
            <td>{{alumno.uid}}</td>
            <td>{{alumno.estatus ? 'Activo' : 'Inactivo'}}</td>
            <td>
              <button mat-raised-button *ngIf="alumno.activo" (click)="abreCalif(alumno)">Editar<mat-icon>edit</mat-icon></button>
              <button mat-raised-button *ngIf="!alumno.activo">Ver <mat-icon>visibility</mat-icon></button>
            </td>
        </tr>
      </table>
    </div>
    <div matDialogActions>
      <button mat-raised-button [mat-dialog-close]="data">Cerrar</button>
      <button mat-raised-button [color]="'warn'" (click)="reporteFinal()">Entregar Informe Final</button>
    </div>
  `,
  styles: [
  ]
})
export class GestionGrupoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<GestionGrupoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private dbService: DbServiceService
  ) { }

  alumnos: any[] = []

  ngOnInit(): void {
    this.dbService.getParticipantesEvento(this.data.docRef).get().forEach(res=>{
      res.docs.forEach(doc=>{
        this.alumnos.push(doc.data())
      })
      console.log(this.alumnos)
    })
    console.log(this.data)
  }

  abreCalif(alumno: any){
    const dialogRef = this.dialog.open(CalificacionesComponent,{
      data: {...alumno, materiaRef: this.data.docRef}
    })
  }

  reporteFinal(){
    
  }

}
