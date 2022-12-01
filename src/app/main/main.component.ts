import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, public rtr: Router) { }

  vistaSelected = 'sol'

  userState: any
  loading = true
  loggedIn = false

  ngOnInit(): void {
    this.afAuth.user.subscribe(res=>{
      if(res){
        this.userState = res
        console.log(res)
        this.loggedIn = true
      }else{
        this.loggedIn = false
      }
      this.loading = false
    })
  }

  setVista(vista: string){
    return this.vistaSelected = vista
  }

}
