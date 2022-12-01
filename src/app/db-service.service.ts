import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';
import { Point } from './models/coffee.model';

interface Parcial{
  nombre: string,
  fecha: Date,
  calificacion: number
}

@Injectable({
  providedIn: 'root'
})
export class DbServiceService {

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore
  ) { }

  ngOnInit(){

  }

  getPoints(){
    return this.db.collection('Points').valueChanges({ idField: 'id'})
  }

  createPoint(doc: any){
    let lat = parseFloat(doc.split(',')[0])
    let long = parseFloat(doc.split(',')[1])
    // return console.log(`${lat}, ${long}`)
    this.db.collection('Points').add({
      lat: lat,
      lon: long
    }).then(docRef =>{
      this.db.collection('Points').doc(docRef.id).update({ id: docRef.id })
    })
  }

  // Para eventos que pertenecen a un instructor
  getEventos(uid: string){
    return this.db.firestore.collection('eventos').where('uid', '==', uid)
  }

  getEventosAprobados(){
    return this.db.firestore.collection('eventos').where('aprobado', '==', true)
  }

  getAlumnoProfile(uid: string){
    return this.db.collection('alumnos').doc(uid).get()
  }

  solicitaEvento(evento: any){
    this.afAuth.user.subscribe(res=>{
      if(res){
        this.db.collection('eventos').add({...evento, aprobado: false, evaluado: false, uid: res.uid}).then(docRef =>{
          this.db.collection('eventos').doc(docRef.id).update({ id: docRef.id })
        })
      }
    })
  }

  getAllSolicitudes(){
    return this.db.collection('eventos').get()
  }

  elimSolicitud(docRef: string){
    this.db.collection('eventos').doc(docRef).delete()
  }

  aprobarEvento(docRef: string){
    return this.db.collection('eventos').doc(docRef).update({evaluado: true, aprobado: true})
  }

  rechazarEvento(docRef: string){
    return this.db.collection('eventos').doc(docRef).update({evaluado: true})
  }

  inscribirseEvento(docRef: string, nombre: string, uid: string){
    return this.db.collection('eventos').doc(docRef).collection('participantes').doc(uid).set({
      uid: uid,
      parciales: [],
      activo: true
    }).then(res=>{
      this.db.collection('alumnos').doc(uid).get().forEach(doc=>{
        if(doc.exists){
          const evento = {
            docRef: docRef,
            nombreEvento: nombre,
            activo: true
          }
          this.db.collection('alumnos').doc(uid).update({ eventos: firebase.default.firestore.FieldValue.arrayUnion(evento) })
        }else{
          this.db.collection('alumnos').doc(uid).set({
            uid: uid,
            eventos: [{docRef: docRef, activo: true, nombreEvento: nombre}]
          })
        }
      })
    })
  }

  getParticipantesEvento(docRef: string){
    return this.db.collection('eventos').doc(docRef).collection('participantes')
  }

  aggCalif(docRef: string, alumRef: string, calif: any){
    return this.db.collection('eventos').doc(docRef).collection('participantes').doc(alumRef).update({
      parciales: firebase.default.firestore.FieldValue.arrayUnion({...calif, fecha: firebase.default.firestore.Timestamp.fromDate(new Date())})
    })
  }

  getParticipante(docRef: string, userRef: string){
    return this.db.collection('eventos').doc(docRef).collection('participantes').doc(userRef).get()
  }

}
