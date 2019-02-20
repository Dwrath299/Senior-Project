import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Recipe } from '../../classes/recipe';
import { User } from '../../classes/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

    user: User;
    week: Map<String, Recipe[]>;
    userRef: AngularFirestoreCollection<User>;
    recipeRef: AngularFirestoreCollection<Recipe>;
  constructor(private db: AngularFirestore, private router: Router) {
      this.week = new Map<String, Recipe[]>();
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
        this.user.weeks.forEach(key => {
            const tempRecipe = new Recipe();
            this.recipeRef.doc(tempRecipe.id.toString()).ref.get().then(recipeDoc => {
                tempRecipe.picture = recipeDoc.data().picture;
                tempRecipe.title = recipeDoc.data().title;
                this.week[key] = tempRecipe;
            });
        });
      });

   }

  ngOnInit() {
  }

}
