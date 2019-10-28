import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Recipe } from '../../classes/recipe';
import { User } from '../../classes/user';
import { Week } from '../../classes/week';

@Component({
  selector: 'app-edit-week',
  templateUrl: './edit-week.component.html',
  styleUrls: ['./edit-week.component.css']
})
export class EditWeekComponent implements OnInit {

  user: User;
  breakfastRecipeList: Array<Recipe>;
  lunchRecipeList: Array<Recipe>;
  dinnerRecipeList: Array<Recipe>;
  weekRef: AngularFirestoreCollection<Week>;
  recipeRef: AngularFirestoreCollection<Recipe>;
  week: Week;
  weekID: string;
  userRef: AngularFirestoreCollection<User>;
  daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  currentDay: {dinner: Recipe[], lunch: Recipe[], breakfast: Recipe[]};
  day: number;
  constructor(private db: AngularFirestore) { 
    this.breakfastRecipeList = [];
    this.lunchRecipeList = [];
    this.dinnerRecipeList = [];
    this.recipeRef = db.collection('recipes');
    this.weekRef = db.collection('weeks');
    this.userRef = db.collection('users');
    this.week = new Week();
    this.weekID = localStorage.getItem('weekID');
    this.day = +localStorage.getItem('day');
    console.log(this.day + ':' + this.weekID);
    this.getWeek(this.weekID);
    this.user = new User();
    this.user.id = localStorage.getItem('userId');
    this.userRef.doc(this.user.id).ref.get().then(doc => {
      let recipeReferenceList: Array<number>;
      recipeReferenceList = doc.data().recipes;
      for (let i = 0; i < recipeReferenceList.length; i++)  {
          this.recipeRef.doc(recipeReferenceList[i].toString()).ref.get().then(doc2 => {
              const item = new Recipe();
              item.id = recipeReferenceList[i];
              item.picture = doc2.data().picture;
              item.title = doc2.data().title;
              item.tags = doc2.data().tags;
              item.time = doc2.data().time;
              item.meal = doc2.data().meal;
              if(item.meal === "Breakfast") {
                this.breakfastRecipeList.push(item);
              } else if (item.meal === "Lunch") {
                this.lunchRecipeList.push(item);
              } else {
                this.dinnerRecipeList.push(item);
              }
              
          });
      }
    });
    console.log(this.week);
  }

  ngOnInit() {
  }

  // remove recipe
  removeRecipe(day, meal, index) {
    this.weekRef.doc(this.weekID).ref.get().then( weekDoc => {
      let weekRecipeIDs = weekDoc.data().daysOfWeek;
      if(meal === 'breakfast') {
        weekRecipeIDs[day].breakfast.splice(index, 1);
        this.week.daysOfWeek[day].breakfast.splice(index, 1);
      } else if (meal === 'lunch') {
        weekRecipeIDs[day].lunch.splice(index, 1);
        this.week.daysOfWeek[day].lunch.splice(index, 1);
      } else {
        weekRecipeIDs[day].dinner.splice(index, 1);
        this.week.daysOfWeek[day].dinner.splice(index, 1);
      }
      this.weekRef.doc(this.weekID).update({daysOfWeek: weekRecipeIDs});
    });
    
  }

  addRecipe(day, meal, index) {
    console.log(index);
    this.weekRef.doc(this.weekID).ref.get().then( weekDoc => {
      let weekRecipeIDs = weekDoc.data().daysOfWeek;
      if(meal === 'breakfast') {
        weekRecipeIDs[day].breakfast.push(this.breakfastRecipeList[index].id);
        this.week.daysOfWeek[day].breakfast.push(this.breakfastRecipeList[index]);
      } else if (meal === 'lunch') {
        weekRecipeIDs[day].lunch.push(this.lunchRecipeList[index].id);
        this.week.daysOfWeek[day].lunch.push(this.lunchRecipeList[index]);
      } else {
        weekRecipeIDs[day].dinner.push(this.dinnerRecipeList[index].id);
        this.week.daysOfWeek[day].dinner.push(this.dinnerRecipeList[index]);
      }
      this.weekRef.doc(this.weekID).update({daysOfWeek: weekRecipeIDs});
    });
  }



  getCurrentDay(day){
    this.currentDay = this.week.daysOfWeek[day];
  }

  changeDays(left) {
    let i = this.day;
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
    this.day = i;
    this.getCurrentDay(this.day);
  }


  getWeek(weekID) {
    this.weekRef.doc(weekID).ref.get().then( weekDoc => {
      this.week.ID = weekID;
      this.week.startDate = weekDoc.data().startDate;
      let weekRecipeIDs = weekDoc.data().daysOfWeek;
        for (let j = 0; j < weekRecipeIDs.length; j++){
          this.dayRecipes(weekRecipeIDs[j], this.recipeRef).then(value => {
            this.week.daysOfWeek[j] = value;
          });
        }
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
