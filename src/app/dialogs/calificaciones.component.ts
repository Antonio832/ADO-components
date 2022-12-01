import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DbServiceService } from '../db-service.service';
import { EditComponent } from './edit.component';

@Component({
  selector: 'app-calificaciones',
  template: `
    <h1 matDialogTitle>Calificaciones para {{data.uid}}</h1>
    <div matDialogContent>
      <h2>Evaluaciones</h2>
      <table *ngIf="data.parciales.length">
        <tr>
            <th>Concepto de evaluacion</th>
            <th>Calificacion</th>
            <th>Fecha</th>
            <th>Editar</th>
        </tr>
        <tr *ngFor="let elm of data.parciales">
            <td>{{elm.concepto}}</td>
            <td>{{elm.calif}}</td>
            <td>{{elm.fecha | date:'dd/MM/YY'}}</td>
            <td>
                <button mat-icon-button (click)="editaCal()">
                    <mat-icon style="color: rgba(26, 190, 65, 0.785);">edit</mat-icon>
                </button>
            </td>
        </tr>
      </table>
      <div class="form">
        <mat-form-field appearance="outline">
          <mat-label>Concepto</mat-label>
          <input [(ngModel)]="concepto" autocomplete="off" matInput />
        </mat-form-field>
        <mat-form-field appearance="outline">
          <mat-label>Calificacion</mat-label>
          <input [(ngModel)]="calif" autocomplete="off" matInput type="number"/>
        </mat-form-field>
        <button mat-raised-button [disabled]="!concepto || !calif" (click)="aggEval()">
          <mat-icon>add</mat-icon>
          Agregar Evaluacion
        </button>
      </div>
    </div>
    <div matDialogActions>
      <button mat-raised-button [matDialogClose]="data">Cerrar</button>
    </div>
  `,
  styles: [`
      .form{
        display: flex;
        flex-direction: column;
        width: 50%;
        padding-bottom: 1rem;
      }
    `
  ]
})
export class CalificacionesComponent implements OnInit {

  concepto: string | undefined
  calif: number | undefined

  constructor(
    public dialogRef: MatDialogRef<CalificacionesComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dbService: DbServiceService
  ) { }

  ngOnInit(): void {
    for(let calif of this.data.parciales){
      calif.fecha = calif.fecha.toDate()
    }
    console.log(this.data)
  }

  editaCal(){
    const dialogRef = this.dialog.open(EditComponent)

    dialogRef.afterClosed().subscribe(res=>{
      if(res){
        console.log(res)
      }
    })
  }

  aggEval(){
    return this.dbService.aggCalif(this.data.materiaRef, this.data.uid, {concepto: this.concepto, calif: this.calif}).then(res=>{
      this.data.parciales.push({concepto: this.concepto, calif: this.calif, fecha: new Date()})
    })
  }

}
