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
            item.tags = doc.data().tags;
            item.time = doc.data().time;
            item.averageReview = doc.data().averageReview;
            if (userRecipeList.indexOf(item.id.toString()) > -1) {
              has = true;
            }
            if (first) {
              this.recipeList = [{key: count++, recipe: item, userHas: has}];
              first = false;
            } else {
              this.recipeList.push({key: count++, recipe: item, userHas: has});
            }
          });

        });
      });
      
  }

  ngOnInit() {
  }

  recipeClick(id: string) {
      localStorage.setItem('recipeId', id);
      this.router.navigate(['/recipe']);
  }

  addRecipeToGenerator(id, index) {
    // Get the user list of recipes
    this.userRef.doc(localStorage.getItem('userId')).ref.get().then( doc => {
      let recipes = doc.data().recipes;
      recipes.push(id.toString());
      // Update the list of recipes to include the new one.
      this.userRef.doc(localStorage.getItem('userId')).ref.update({
        recipes: recipes
      }).then( doc2 => {
        // Message to user that the recipe was added.
        for(let i = 0; i < this.recipeList.length; i++){
          if(i === index) {
            this.recipeList[i]['userHas'] = true;
          }
        }
      });
    });
  }
  removeRecipeFromGenerator(id, index) {
    // Get the user list of recipes
    this.userRef.doc(localStorage.getItem('userId')).ref.get().then( doc => {
      let recipes = doc.data().recipes;
      delete recipes[id];
      // Update the list of recipes to include the new one.
      this.userRef.doc(localStorage.getItem('userId')).ref.update({
        recipes: recipes
      }).then( doc2 => {
        // Message to user that the recipe was added.
        for(let i = 0; i < this.recipeList.length; i++){
          if(i === index) {
            this.recipeList[i]['userHas'] = false;
          }
        }
      });
    });
  }

}
