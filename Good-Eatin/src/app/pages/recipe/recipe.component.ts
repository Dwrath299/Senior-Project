import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Recipe } from '../../classes/recipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

    recipe: Recipe;
    private recipeRef: AngularFirestoreCollection<Recipe>;

    isCreator: boolean;
    ngOnInit() {
  }

  constructor(private db: AngularFirestore, private router: Router) {
      this.recipe = new Recipe();
      this.recipeRef = db.collection('recipes');
      this.isCreator = false;
      // Get the recipe we are trying to view
      if (localStorage.getItem('recipeId') != null) {
        const recipeId = localStorage.getItem('recipeId');
        console.log(recipeId);
        // we need to get the recipe.
        this.recipeRef.doc(recipeId).ref.get().then(doc2 => {
                const item = new Recipe();
                item.id = doc2.data().id;
                item.picture = doc2.data().picture;
                item.title = doc2.data().title;
                item.ingredients = doc2.data().ingredients;
                item.instructions = doc2.data().instructions;
                item.creator = doc2.data().creator;
                item.isPublic = doc2.data().isPublic;
                item.type = doc2.data().type;
                item.tags = doc2.data().tags;
                this.recipe = item;
                if (this.recipe.creator === localStorage.getItem('userId')) {
                    this.isCreator = true;
                }
            });
     }
  }


}
