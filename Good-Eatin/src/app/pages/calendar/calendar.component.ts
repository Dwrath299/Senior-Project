import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Recipe } from '../../classes/recipe';
import { User } from '../../classes/user';
import { Week } from '../../classes/week';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { async } from '@angular/core/testing';
import { resolve } from 'url';
import { NotificationService } from '@progress/kendo-angular-notification';
import { formatDate } from 'tough-cookie';

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
    daysOfWeekDisplay = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  constructor(private notification: NotificationService, private db: AngularFirestore, private router: Router) {
      // The Current Week
      this.weeks = [new Week()];
      // Next Week
      this.weeks.push(new Week());
  
      


      this.userRef = db.collection('users');
      this.recipeRef = db.collection('recipes');
      this.weekRef = db.collection('weeks');
      localStorage.removeItem('recipeId');
      localStorage.removeItem('weekID',);
      localStorage.removeItem('day');
      this.user = new User();
      this.user.id = localStorage.getItem('userId');
      this.getCalendar();
      
      
   }

  ngOnInit() {
  }

getCalendar() {
  this.userRef.doc(this.user.id).ref.get().then( doc => {
    this.user.friends = doc.data().friends;
    this.user.picture = doc.data().picture;
    this.user.recipes = doc.data().recipes;
    this.user.weeks = doc.data().weeks;
    let i = 0;
    for (let i = 0; i < this.user.weeks.length; i++) {
      let weekID = this.user.weeks[i];
      this.weekRef.doc(weekID).ref.get().then( weekDoc => {
        this.weeks[i].ID = weekID;
        this.weeks[i].startDate = weekDoc.data().startDate;
        let weekRecipeIDs = weekDoc.data().daysOfWeek;
        for (let j = 0; j < weekRecipeIDs.length; j++){
          this.dayRecipes(weekRecipeIDs[j], this.recipeRef).then(value => {
            this.weeks[i].daysOfWeek[j] = value;
          });
        }
        
      });
    };
  });

}

recipeClick(id: string) {
    localStorage.setItem('recipeId', id);
    this.router.navigate(['/recipe']);
}

dayRecipes = function(day, recipeRef) {
  return new Promise<{breakfast: any[], lunch: any[], dinner: any[]}>(async function(resolve, reject) {
    let recipe;
    let output = {breakfast: [], lunch: [], dinner: []};
    for(let i = 0; i < day.breakfast.length; i++) {
      recipe = recipeRef.doc(day.breakfast[i]).ref.get().then( doc => {
        let r = new Recipe();
        r.id = day.breakfast[i];
        r.picture = doc.data().picture;
        r.time = doc.data().time;
        r.title = doc.data().title;
        return r;
      });
      let result = await recipe;
      output.breakfast.push(result);
    }
    for(let i = 0; i < day.lunch.length; i++) {
      recipe = recipeRef.doc(day.lunch[i]).ref.get().then( doc => {
        let r = new Recipe();
        r.id = day.breakfast[i];
        r.picture = doc.data().picture;
        r.time = doc.data().time;
        r.title = doc.data().title;
        return r;
      });
      let result = await recipe;
      output.lunch.push(result);
    }
    for(let i = 0; i < day.dinner.length; i++) {
      
      recipe = recipeRef.doc(day.dinner[i]).ref.get().then( doc => {
        let r = new Recipe();
        r.id = day.dinner[i];
        r.picture = doc.data().picture;
        r.time = doc.data().time;
        r.title = doc.data().title;
        return r;
      });
      let result = await recipe;
      output.dinner.push(result);
    }
  
    if ( output != null) {
      resolve(output);
    } else {
      reject(Error("It broke"));
    }
  });
}

  

  runGenerator() {
    const generateMeals = firebase.functions().httpsCallable('generateMeals');
    const generateShoppingList = firebase.functions().httpsCallable('generateShoppingList');
    generateMeals({userId: this.user.id});
    // Makes a message to the user.
    this.notification.show({
      content: 'Currently Generating Meals!',
      hideAfter: 800,
      position: { horizontal: 'center', vertical: 'top' },
      animation: { type: 'fade', duration: 400 },
      type: { style: 'success', icon: true },
    });
    setTimeout(() => {
      this.getCalendar();
    },1000);
    // Generate the shopping list.
    generateShoppingList({userId: this.user.id});
    
  }

  format(date): String {
    const tempDate = new Date(date);
    return tempDate.toLocaleDateString();
  }

  sendToEditWeekPage(weekID, day){
    localStorage.setItem('weekID', weekID);
    localStorage.setItem('day', day);

  }

}
