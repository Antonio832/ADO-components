import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DbServiceService } from '../db-service.service';

@Component({
  selector: 'app-gestion-materia',
  template: `
    <h1 MatDialogTitle>Calificaciones de {{data.nombre}}</h1>
    <div matDialogContent>
      <table *ngIf="calif.length">
        <tr>
            <th>Concepto de evaluacion</th>
            <th>Calificacion</th>
            <th>Fecha</th>
        </tr>
        <tr *ngFor="let elm of calif">
            <td>{{elm.concepto}}</td>
            <td>{{elm.calif}}</td>
            <td>{{elm.fecha | date:'dd/MM/YY'}}</td>
        </tr>
      </table>
    </div>
    <div matDialogActions>
      <button mat-raised-button [mat-dialog-close]="data">Cerrar</button>
      <button mat-raised-button [color]="'warn'" (click)="baja()"><mat-icon>remove_circle_outline</mat-icon> Darse de baja</button>
    </div>
  `,
  styles: [`
    `
  ]
})
export class GestionMateriaComponent implements OnInit {

  calif: any[] = []

  constructor(
    public dialogRef: MatDialogRef<GestionMateriaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dbService: DbServiceService
  ) { }

  ngOnInit(): void {
    this.dbService.getParticipante(this.data.docRef, this.data.userRef).forEach(doc=>{
      if(doc.exists){
        const data = doc.data()
        this.calif = data?.parciales
        for(let calificacion of this.calif){
          calificacion.fecha = calificacion.fecha.toDate()
        }
      }
    })
  }

  baja(){

  }

}
