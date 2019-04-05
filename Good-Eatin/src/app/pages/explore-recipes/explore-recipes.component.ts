import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Recipe } from '../../classes/recipe';
import { User } from '../../classes/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-explore-recipes',
  templateUrl: './explore-recipes.component.html',
  styleUrls: ['../edit-meals/edit-meals.component.css']
})
export class ExploreRecipesComponent implements OnInit {

    recipeRef: AngularFirestoreCollection<Recipe>;
    userRef: AngularFirestoreCollection<User>;
    recipeList: [{key: number, recipe: Recipe, userHas: boolean}];
    fullRecipeList: [{key: number, recipe: Recipe, userHas: boolean}];
  constructor(private db: AngularFirestore, private router: Router) {
      let first = true;

      this.userRef = db.collection('users');
      this.recipeRef = db.collection('recipes', ref => ref.where('isPublic', '==', true));
      this.userRef.doc(localStorage.getItem('userId')).ref.get().then(doc2 => {
        let userRecipeList = doc2.data().recipes;
        let count = 0;
        this.recipeRef.ref.get().then(snapshot => {
          snapshot.forEach(doc => {
            let has = false;
            const item = new Recipe();
            item.id = doc.data().id;
            item.picture = doc.data().picture;
            item.title = doc.data().title;
            item.type = doc.data().type;
            item.meal = doc.data().meal;
            item.tags = doc.data().tags;
            item.time = doc.data().time;
            item.averageReview = doc.data().averageReview;
            if (userRecipeList.indexOf(item.id.toString()) > -1) {
              has = true;
            }
            if (first) {
              this.fullRecipeList = [{key: count++, recipe: item, userHas: has}];
              this.recipeList = [{key: count++, recipe: item, userHas: has}];
              first = false;
            } else {
              this.recipeList.push({key: count++, recipe: item, userHas: has});
              this.fullRecipeList.push({key: count++, recipe: item, userHas: has});
            }
          });

        });
      });
      
  }

  ngOnInit() {
  }

  updateFilter(){
    let tempList = JSON.parse(JSON.stringify( this.fullRecipeList ));;
    const mealFilter = document.getElementById("mealFilter") as HTMLSelectElement;
    const typeFilter = document.getElementById("typeFilter") as HTMLSelectElement;
    const timeFilter = document.getElementById("timeFilter") as HTMLSelectElement;
    const hasFilter = document.getElementById("hasFilter") as HTMLInputElement;
    const has = hasFilter.checked;
    const meal = mealFilter.value;
    const type = typeFilter.value;
    const time = timeFilter.value;
    if(!(meal === "-1")) {
      for(let i = 0; i < tempList.length; i++) {
        if(!(tempList[i].recipe.meal === meal)) {
          tempList.splice(i, 1);
          i--;
        }
      }
    }
    if(!(type === "-1")) {
      for(let i = 0; i < tempList.length; i++) {
        console.log(tempList[i].recipe.type);
        if(!(tempList[i].recipe.type === type)) {
          tempList.splice(i, 1);
          i--;
        }
      }
    }
    if(!(time === "-1")) {
      console.log("time:" + time);
      for(let i = 0; i < tempList.length; i++) {
        if(tempList[i].recipe.time > parseInt(time)) {
          tempList.splice(i, 1);
          i--;
        }
      }
    }
    if(has) {
      for(let i = 0; i < tempList.length; i++) {
        if(tempList[i].userHas) {
          tempList.splice(i, 1);
          i--;
        }
      }
    }
    this.recipeList = JSON.parse(JSON.stringify( tempList ));;
    console.log(this.fullRecipeList);
  }

  clearFilters(){
    this.recipeList = JSON.parse(JSON.stringify( this.fullRecipeList));;
    const mealFilter = document.getElementById("mealFilter") as HTMLSelectElement;
    const typeFilter = document.getElementById("typeFilter") as HTMLSelectElement;
    const timeFilter = document.getElementById("timeFilter") as HTMLSelectElement;
    const hasFilter = document.getElementById("hasFilter") as HTMLInputElement;
    hasFilter.checked = false;
    mealFilter.selectedIndex = 0;
    typeFilter.selectedIndex = 0;
    timeFilter.selectedIndex = 0;
    this.updateFilter();
  }

  recipeClick(id: string) {
      localStorage.setItem('recipeId', id);
      this.router.navigate(['/recipe']);
  }

  addRecipeToGenerator(id, index, e) {
    e.preventDefault();
    // Get the user list of recipes
    this.userRef.doc(localStorage.getItem('userId')).ref.get().then( doc => {
      let recipes = doc.data().recipes;
      recipes.push(id.toString());
      // Update the list of recipes to include the new one.
      this.userRef.doc(localStorage.getItem('userId')).ref.update({
        recipes: recipes
      }).then( doc2 => {
        // Message to user that the recipe was added.
        
          
            this.recipeList[index]['userHas'] = true;
          
        
      });
    });
  }
  removeRecipeFromGenerator(id, index, e) {
    console.log(id);
    e.preventDefault();
      // Get the user list of recipes
      this.userRef.doc(localStorage.getItem('userId')).ref.get().then( doc => {
        let userRecipes = doc.data().recipes;
        for (var i = 0; i < userRecipes.length; i++) {
          if (userRecipes[i] === id.toString()) {
            userRecipes.splice(i, 1);
          }
        }
       
        // Update the list of recipes to include the new one.
        console.log(userRecipes);
        this.userRef.doc(localStorage.getItem('userId')).ref.update({
          recipes: userRecipes
        }).then(doc2 =>{this.recipeList[index]['userHas'] = false;});
    });
    
  }

}
