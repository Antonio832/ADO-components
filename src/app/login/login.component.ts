import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import firebase from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth, private rtr: Router) { }

  ngOnInit(): void {
    this.afAuth.user.subscribe(res=>{
      if(res){
        this.rtr.navigate(['/'])
      }
    })
  }
  
  LogIn(){
    this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider)
    
  }

}
