import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Recipe } from '../../classes/recipe';
import { Week } from '../../classes/week';

@Component({
  selector: 'app-edit-week',
  templateUrl: './edit-week.component.html',
  styleUrls: ['./edit-week.component.css']
})
export class EditWeekComponent implements OnInit {

  weekRef: AngularFirestoreCollection<Week>;
  recipeRef: AngularFirestoreCollection<Recipe>;
  week: Week;
  weekID: string;
  daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  currentDay: {dinner: Recipe[], lunch: Recipe[], breakfast: Recipe[]};
  day: string;
  constructor(private db: AngularFirestore) { 
    this.recipeRef = db.collection('recipes');
    this.weekRef = db.collection('weeks');
    this.week = new Week();
    this.weekID = localStorage.getItem('weekID');
    this.day = localStorage.getItem('day');
    this.getWeek(this.weekID);
  }

  ngOnInit() {
  }

  getCurrentDay(day){
    // Once again, I don't know why I thought making each a different variable was a good idea.
    switch(day){
      case 'sunday': {
        this.currentDay = this.week.sunday;
      }
      case 'monday': {
        this.currentDay = this.week.monday;
      }
      case 'tuesday': {
        this.currentDay = this.week.tuesday;
      }
      case 'wednesday': {
        this.currentDay = this.week.wednesday;
      }
      case 'thursday': {
        this.currentDay = this.week.thursday;
      }
      case 'friday': {
        this.currentDay = this.week.friday;
      }
      case 'saturday': {
        this.currentDay = this.week.saturday;
      }
    }
  }

  changeDays(left) {
    let i = this.daysOfWeek.indexOf(this.day);
    if (left) {
      i -= 1;
    } else {
      i += 1;
    }
    if(i > 6) {
      i = 1;
    } else if (i < 0) {
      i = 6;
    }
    this.day = this.daysOfWeek[i];
    this.getCurrentDay(this.day);
  }


  getWeek(weekID) {
    let dayHolder;
    this.weekRef.doc(weekID).ref.get().then( weekDoc => {
      this.week.ID = weekID;
      this.week.startDate = weekDoc.data().startDate;
      // Get Sunday
      dayHolder = weekDoc.data().sunday;
      this.dayRecipes(dayHolder, this.recipeRef).then(value => {
        this.week.sunday = value;
      });
      // Get Monday
      dayHolder = weekDoc.data().monday;
      this.dayRecipes(dayHolder, this.recipeRef).then(value => {
        this.week.monday = value;
      });
      // Get Tuesday
      dayHolder = weekDoc.data().tuesday;
      this.dayRecipes(dayHolder, this.recipeRef).then(value => {
        
        this.week.tuesday = value;
      });
      // Get Wednesday
      dayHolder = weekDoc.data().wednesday;
      this.dayRecipes(dayHolder, this.recipeRef).then(value => {
        this.week.wednesday = value;
      });
      // Get Thursday
      dayHolder = weekDoc.data().thursday;
      this.dayRecipes(dayHolder, this.recipeRef).then(value => {
        this.week.thursday = value;
      });
      // Get Friday
      dayHolder = weekDoc.data().friday;
      this.dayRecipes(dayHolder, this.recipeRef).then(value => {
        this.week.friday = value;
      });
      // Get Saturday
      dayHolder = weekDoc.data().saturday;
      this.dayRecipes(dayHolder, this.recipeRef).then(value => {
        this.week.saturday = value;
      });
  });

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
}
