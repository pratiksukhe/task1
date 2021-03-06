import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: Object;
  public links = new Array<{ text: string; path: string }>();

  constructor(private auth: AngularFireAuth) {
    this.auth.authState.subscribe((user) => {
      this.getById(user.uid)
        .then((result) => {
          console.log(result.role);
          if (result.role === 'Student') {
            this.links.push({ text: 'Student Dashboard', path: 'student' });
          } else if (result.role === 'Teacher') {
            this.links.push({ text: 'Teacher Dashboard', path: 'teacher' });
          }
          //this.updateNavAfterAuth(result.role);
        })
        .catch((error) => console.log(error));
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  signUp(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }

  signIn(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  getUser() {
    return this.auth.authState;
  }

  // updateNavAfterAuth(role: string): void {
  //   if (role === 'Student') {
  //     this.links.push({ text: 'Student Dashboard', path: 'student' });
  //   } else if (role === 'Teacher') {
  //     this.links.push({ text: 'Teacher Dashboard', path: 'teacher' });
  //   }
  // }

  getLinks() {
    return this.links;
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return user !== null ? true : false;
  }

  getAll() {
    return firebase
      .database()
      .ref(`/users`)
      .once('value')
      .then((snapshot) => {
        return snapshot.val();
      });
  }
  getById(id) {
    return firebase
      .database()
      .ref(`/users/${id}`)
      .once('value')
      .then((snapshot) => {
        return snapshot.val();
      });
  }

  signOut() {
    this.auth.signOut();
  }
}
