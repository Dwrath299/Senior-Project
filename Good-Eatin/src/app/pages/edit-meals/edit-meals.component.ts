import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Recipe } from '../../classes/recipe';
import { User } from '../../classes/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-meals',
  templateUrl: './edit-meals.component.html',
  styleUrls: ['./edit-meals.component.css']
})
export class EditMealsComponent implements OnInit {

    userId = localStorage.getItem('userId').toString();
    recipeList: Array<Recipe>;
    fullRecipeList: Array<Recipe>;
    recipeReferenceList: Array<number>;

    userRef: AngularFirestoreCollection<User>;
    recipeRef: AngularFirestoreCollection<Recipe>;
  constructor(private db: AngularFirestore, private router: Router) {
      this.recipeList = [];
      this.fullRecipeList = [];
      this.userRef = db.collection('users');
      this.recipeRef = db.collection('recipes');
      console.log(this.userId);
      this.userRef.doc(this.userId).ref.get().then(doc => {
        this.recipeReferenceList = doc.data().recipes;
        // tslint:disable-next-line:prefer-const
        // tslint:disable-next-line:forin
        for (let i = 0; i < this.recipeReferenceList.length; i++)  {
            this.recipeRef.doc(this.recipeReferenceList[i].toString()).ref.get().then(doc2 => {
                const item = new Recipe();
                item.id = this.recipeReferenceList[i];
                item.picture = doc2.data().picture;
                item.title = doc2.data().title;
                item.tags = doc2.data().tags;
                item.time = doc2.data().time;
                item.type = doc2.data().type;
                item.meal = doc2.data().meal;
                this.recipeList.push(item);
                this.fullRecipeList.push(item);
            });
        }
        console.log(this.fullRecipeList);
      });

  }

  updateFilter(){
    let tempList = this.fullRecipeList.slice(0);
    const mealFilter = document.getElementById("mealFilter") as HTMLSelectElement;
    const typeFilter = document.getElementById("typeFilter") as HTMLSelectElement;
    const timeFilter = document.getElementById("timeFilter") as HTMLSelectElement;
    const meal = mealFilter.value;
    const type = typeFilter.value;
    const time = timeFilter.value;
    if(!(meal === "-1")) {
      for(let i = 0; i < tempList.length; i++) {
        if(!(tempList[i].meal === meal)) {
          tempList.splice(i, 1);
          i--;
        }
      }
    }
    if(!(type === "-1")) {
      for(let i = 0; i < tempList.length; i++) {
        console.log(tempList[i].type);
        if(!(tempList[i].type === type)) {
          tempList.splice(i, 1);
          i--;
        }
      }
    }
    if(!(time === "-1")) {
      console.log("time:" + time);
      for(let i = 0; i < tempList.length; i++) {
        if(tempList[i].time > parseInt(time)) {
          tempList.splice(i, 1);
          i--;
        }
      }
    }
    this.recipeList = tempList.slice(0);
    console.log(this.fullRecipeList);
  }

  clearFilters(){
    this.recipeList = this.fullRecipeList.slice(0);
    const mealFilter = document.getElementById("mealFilter") as HTMLSelectElement;
    const typeFilter = document.getElementById("typeFilter") as HTMLSelectElement;
    const timeFilter = document.getElementById("timeFilter") as HTMLSelectElement;
    mealFilter.selectedIndex = 0;
    typeFilter.selectedIndex = 0;
    timeFilter.selectedIndex = 0;
    this.updateFilter();
  }

  ngOnInit() {
  }

  recipeClick(id: string) {
      localStorage.setItem('recipeId', id);
      this.router.navigate(['/recipe']);
  }
  removeRecipeFromGenerator(id, index) {
    // Get the user list of recipes
    this.userRef.doc(localStorage.getItem('userId')).ref.get().then( doc => {
      let userRecipes = doc.data().recipes;
      userRecipes.splice(index, 1);
     
      // Update the list of recipes to include the new one.
      console.log(userRecipes);
      this.userRef.doc(localStorage.getItem('userId')).ref.update({
        recipes: userRecipes
      }).then(doc2 =>{this.recipeList.splice(index, 1);});
    });
  }

}
