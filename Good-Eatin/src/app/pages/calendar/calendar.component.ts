import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Recipe } from '../../classes/recipe';
import { User } from '../../classes/user';
import { Week } from '../../classes/week';
import { Router } from '@angular/router';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

    user: User;
    week1: Week;
    week2: Week;
    userRef: AngularFirestoreCollection<User>;
    recipeRef: AngularFirestoreCollection<Recipe>;
    weekRef: AngularFirestoreCollection<Week>;
  constructor(private db: AngularFirestore, private router: Router) {
      // The Current Week
      this.week1 = new Week();
      // Next Week
      this.week2 = new Week();
      
      this.userRef = db.collection('users');
      this.recipeRef = db.collection('recipe');
      localStorage.removeItem('recipeId');
      this.user = new User();
      this.user.id = localStorage.getItem('userId');
      this.userRef.doc(this.user.id).ref.get().then( doc => {
        this.user.friends = doc.data().friends;
        this.user.picture = doc.data().picture;
        this.user.recipes = doc.data().recipes;
        this.user.weeks = doc.data().weeks;
        this.user.weeks.forEach(weekID => {
          
        });
      });

   }

  ngOnInit() {
  }

}
