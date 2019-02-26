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

    recipeReferenceList: Array<number>;

    userRef: AngularFirestoreCollection<User>;
    recipeRef: AngularFirestoreCollection<Recipe>;
  constructor(private db: AngularFirestore, private router: Router) {
      this.recipeList = [];
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
                this.recipeList.push(item);
            });
        }
      });

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
