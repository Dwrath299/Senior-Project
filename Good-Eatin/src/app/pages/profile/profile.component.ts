import { Component, OnInit } from '@angular/core';
import {User} from '../../classes/user';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    currentUser: User;
    targetUser: User;
    isCurrentUser: boolean;
    userRef: AngularFirestoreCollection<User>;

  constructor(private db: AngularFirestore, private router: Router) {
      this.currentUser.id = localStorage.getItem('userId');
      this.targetUser.id = localStorage.getItem('targetUserId');
      if (this.currentUser.id === this.targetUser.id) {
          this.isCurrentUser = true;
      } else {
          this.isCurrentUser = false;
      }
      this.userRef = db.collection('recipes');
      this.userRef.doc(this.targetUser.id).ref.get().then( doc => {
        this.targetUser.name = doc.data().name;
        this.targetUser.picture = doc.data().picture;
        this.targetUser.recipes = doc.data().recipes;
        this.targetUser.friends = doc.data().freinds;
        this.targetUser.weeks = doc.data().weeks;
      });

  }

  ngOnInit() {
  }

}
