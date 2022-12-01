import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { DbServiceService } from '../db-service.service';

interface evento{
  tipo: string,
  nombre: string,
  horas: number,
  descripcion: string,
  modalidad: string,
  evaluado: boolean
}

@Component({
  selector: 'app-evaluar-eventos',
  templateUrl: './evaluar-eventos.component.html',
  styleUrls: ['./evaluar-eventos.component.scss']
})
export class EvaluarEventosComponent implements OnInit {

  eventos: any[] = []

  eventosEval: any [] = []

  constructor(private dbService: DbServiceService) { }

  ngOnInit(): void {
    console.log('Se acaba de cargar este componente')
    this.dbService.getAllSolicitudes()
    .forEach(res=>{
      res.docs.forEach(doc=>{
          let data = doc.data() as evento
          if(data.evaluado){
            this.eventosEval.push(data)
          }else{
            this.eventos.push(data)
          }
        }
      )
    })
  }

  apruebaEvento(docRef: string){
    this.removeFromEventos(docRef)
    return this.dbService.aprobarEvento(docRef)
  }
  
  removeFromEventos(docRef: string){
    for(let evento of this.eventos){
      if(evento.id == docRef){
        this.eventos.splice(this.eventos.indexOf(evento),1)
      }
    }
  }
  
  rechazarEvento(docRef: string){
    this.removeFromEventos(docRef)
    return this.dbService.rechazarEvento(docRef)
  }

}
