import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Recipe } from '../../classes/recipe';
import { User } from '../../classes/user';
import { Week } from '../../classes/week';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { async } from '@angular/core/testing';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

    user: User;
    weeks: Week[];
    userRef: AngularFirestoreCollection<User>;
    recipeRef: AngularFirestoreCollection<Recipe>;
    weekRef: AngularFirestoreCollection<Week>;
  constructor(private db: AngularFirestore, private router: Router) {
      // The Current Week
      this.weeks.push(new Week());
      // Next Week
      this.weeks.push(new Week());
      let dayHolder;


      this.userRef = db.collection('users');
      this.recipeRef = db.collection('recipe');
      this.weekRef = db.collection('weeks');
      localStorage.removeItem('recipeId');
      this.user = new User();
      this.user.id = localStorage.getItem('userId');
      this.userRef.doc(this.user.id).ref.get().then( doc => {
        this.user.friends = doc.data().friends;
        this.user.picture = doc.data().picture;
        this.user.recipes = doc.data().recipes;
        this.user.weeks = doc.data().weeks;
        let i = 0;
        this.user.weeks.forEach(weekID=> {
          this.weekRef.doc(weekID).ref.get().then( weekDoc => {
            this.weeks[i].startDate = weekDoc.data().startDate;

            // Get Sunday
            dayHolder = weekDoc.data().sunday;
            this.dayRecipes(dayHolder).then(value => {
              this.weeks[i].sunday = value;
            });
            // Get Monday
            dayHolder = weekDoc.data().monday;
            this.dayRecipes(dayHolder).then(value => {
              this.weeks[i].monday = value;
            });
            // Get Tuesday
            dayHolder = weekDoc.data().tuesday;
            this.dayRecipes(dayHolder).then(value => {
              this.weeks[i].tuesday = value;
            });
            // Get Wednesday
            dayHolder = weekDoc.data().wednesday;
            this.dayRecipes(dayHolder).then(value => {
              this.weeks[i].wednesday = value;
            });
            // Get Thursday
            dayHolder = weekDoc.data().thursday;
            this.dayRecipes(dayHolder).then(value => {
              this.weeks[i].thursday = value;
            });
            // Get Friday
            dayHolder = weekDoc.data().friday;
            this.dayRecipes(dayHolder).then(value => {
              this.weeks[i].friday = value;
            });
            // Get Saturday
            dayHolder = weekDoc.data().saturday;
            this.dayRecipes(dayHolder).then(value => {
              this.weeks[i].saturday = value;
            });
            i++;
          });
        });
      });
      
   }

  ngOnInit() {
  }

dayRecipes = async(day): Promise<{breakfast: any, lunch: any, dinner: any}> => {
    let recipe;
    let output = {breakfast: [], lunch: [], dinner: []};
    for(let i = 0; i < day.breakfast.length(); i++) {
      recipe = this.recipeRef.doc(day.breakfast[i]).ref.get().then( doc => {
        let r = new Recipe();
        r.id = day.breakfast[i];
        r.picture = doc.data().picture;
        r.time = doc.data().time;
        r.title = doc.data().title;
        return r;
      });
      let result = await recipe;
      output.breakfast.push(recipe);
    }
    for(let i = 0; i < day.lunch.length(); i++) {
      recipe = this.recipeRef.doc(day.lunch[i]).ref.get().then( doc => {
        let r = new Recipe();
        r.id = day.breakfast[i];
        r.picture = doc.data().picture;
        r.time = doc.data().time;
        r.title = doc.data().title;
        return r;
      });
      let result = await recipe;
      output.lunch.push(recipe);
    }
    for(let i = 0; i < day.dinner.length(); i++) {
      recipe = this.recipeRef.doc(day.dinner[i]).ref.get().then( doc => {
        let r = new Recipe();
        r.id = day.dinner[i];
        r.picture = doc.data().picture;
        r.time = doc.data().time;
        r.title = doc.data().title;
        return r;
      });
      let result = await recipe;
      output.dinner.push(recipe);
    }
    
    return output;

    

  }
  

  runGenerator() {
    const generateMeals = firebase.functions().httpsCallable('generateMeals');
    console.log(generateMeals({userId: this.user.id}));
  }

}
