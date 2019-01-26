import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../classes/user';
import { Friend } from '../classes/friend';
import { Recipe } from '../classes/recipe';
import { Week } from '../classes/week';
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
    private user: Observable<User>;
    private userRef: AngularFirestoreCollection<User>;
    private userDoc: AngularFirestoreDocument<User>;
    private authState: Observable<firebase.User>;
    private success: Promise<any>;
    private userDetails: firebase.User = null;

  constructor(public _firebaseAuth: AngularFireAuth, private db: AngularFirestore, private router: Router) {
        this.userFirebase = _firebaseAuth.authState;
        this.authState = this._firebaseAuth.authState;
        this.userFirebase.subscribe(
                (user) => {
                if (user) {
                    this.userDetails = user;
                    console.log(this.userDetails);
                } else {
                    this.userDetails = null;
                }
                }
            );
        this.userRef = db.collection('users');
  }

   signInWithGoogle() {
       this.success = this._firebaseAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
       return this.success;
   }

   register(email, password) {
       this.success = this._firebaseAuth.auth.createUserWithEmailAndPassword(email, password);
       return this.success;
   }
   signInRegular(email, password) {
     const credential = firebase.auth.EmailAuthProvider.credential( email, password );

     this.success = this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);
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
                                    const friends = Array<Friend>();
                                    // Create empty array of recipes (This user is going to starve!)
                                    const recipes = Array<Recipe>();
                                    // Create empty array of weeks (This user has no future!)
                                    const weeks = Array<Week>();
                                    // Makes a user
                                    this.currentUser = new User();
                                    this.currentUser.id = this.userDetails.uid;
                                    this.currentUser.name = this.userDetails.displayName;
                                    this.currentUser.friends = friends;
                                    this.currentUser.recipes = recipes;
                                    this.currentUser.weeks = weeks;
                                    // Store it in cloud firestore
                                    this.userRef.doc(this.currentUser.id).set(Object.assign({}, this.currentUser));
                                    return true;
                                } else {
                                    // This is a return user, need to grab it's data
                                    // tslint:disable-next-line:no-shadowed-variable
                                    this.userRef.doc(this.userDetails.uid).ref.get().then(function(doc) {
                                        if (doc.exists) {
                                            this.currentUser = doc.data();
                                        }
                                    });
                                    return false;
                                }

                        });
   }


   getCurrentUser() {

       return this.getUser(firebase.auth().currentUser.uid);
   }

   getUser(id: string) {
        this.userRef.doc(id).ref.get().then(function(doc) {
            if (doc.exists) {
                 this.user = doc.data();
            }
        }).catch(function(error) {
            console.log('Error getting document:', error);
        });
        return this.user;

    }


   isLoggedIn() {
       return this.authState !== null;
   }

   logout() {
       this._firebaseAuth.auth.signOut().then((res) => this.router.navigate(['/']));
   }
}
