import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private userFirebase: Observable<firebase.User>;
    private currentUser: User;
    private user: User;
    private userRef: AngularFirestoreCollection<User>;
    private userDoc: AngularFirestoreDocument<User>;
    private success: Promise<any>;
    private userDetails: firebase.User = null;

  constructor(public _firebaseAuth: AngularFireAuth, private db: AngularFirestore, private router: Router) {
        this.userFirebase = _firebaseAuth.authState;
        this.currentUser = new User();
        this.userFirebase.subscribe(
                (user) => {
                if (user) {
                    this.userDetails = user;
                    this.isNewUser();
                } else {
                    this.userDetails = null;
                }
                }
            );
        this.userRef = db.collection('users');
  }

   signInWithGoogle() {
       this.success = this._firebaseAuth.auth
       .signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(user => {
           this.router.navigate(['/calendar']);
       });
       return this.success;
   }

   register(email, password) {
       this.success = this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
       return this.success;
   }
   signInRegular(email, password) {
     const credential = firebase.auth.EmailAuthProvider.credential( email, password );

     this.success = this._firebaseAuth.auth
     .signInWithEmailAndPassword(email, password).then(user => {
           this.router.navigate(['/calendar']);
       });
     return this.success;
   }

   documentToDomainObject = _ => {
       const object = _.payload.doc.data();
       object.id = _.payload.doc.id;
       return object;
   }

   isNewUser() {
       this.userRef.doc(this.userDetails.uid).ref.get()
                        .then(doc => {
                                // This user doesn't exist!
                                if (!doc.exists) {
                                    // Need to create the user
                                    // Create empty array of friends  (Poor lonely new user)
                                    const friends = Array<string>();
                                    // Create empty array of recipes (This user is going to starve!)
                                    const recipes = Array<string>();
                                    // Create empty array of weeks (This user has no future!)
                                    const weeks = Array<string>();
                                    // Makes a user
                                    this.currentUser.id = this.userDetails.uid;
                                    this.currentUser.name = this.userDetails.displayName;
                                    this.currentUser.friends = friends;
                                    this.currentUser.recipes = recipes;
                                    this.currentUser.weeks = weeks;
                                    // Store it in cloud firestore
                                    this.userRef.doc(this.currentUser.id).set(Object.assign({}, this.currentUser));
                                    localStorage.setItem('userId', this.userDetails.uid);
                                    return true;
                                } else {
                                    // This is a return user, need to grab it's data
                                    // tslint:disable-next-line:no-shadowed-variable
                                    this.userRef.doc(this.userDetails.uid).ref.get().then((doc) => {
                                        if (doc.exists) {
                                            this.currentUser.id = doc.data().id;
                                            this.currentUser.name = doc.data().name;
                                            this.currentUser.friends = doc.data().friends;
                                            this.currentUser.recipes = doc.data().recipes;
                                            this.currentUser.weeks = doc.data().weeks;
                                            localStorage.setItem('userId', this.currentUser.id);
                                        }
                                    });
                                    return false;
                                }

                        });
   }


   getUser(id: string) {
        this.userRef.doc(id).ref.get().then((doc) => {
            if (doc.exists) {
                this.user = new User();
                this.user.id = doc.data().id;
                this.user.name = doc.data().name;
                this.user.friends = doc.data().friends;
                this.user.recipes = doc.data().recipes;
                this.user.weeks = doc.data().weeks;
            }
        }).catch(function(error) {
            console.log('Error getting document:', error);
        });
        return this.user;

    }


   isLoggedIn(): boolean {
        return localStorage.getItem('userId') !== null;
    }

   logout() {
       this._firebaseAuth.auth.signOut().then((res) => this.router.navigate(['/']));
       localStorage.removeItem('userId');
   }
}
