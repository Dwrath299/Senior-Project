import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Recipe } from '../../classes/recipe';
import { User } from '../../classes/user';
import { Router } from '@angular/router';
import { Review} from '../../classes/review';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

    recipe: Recipe;
    private recipeRef: AngularFirestoreCollection<Recipe>;

    private userRef: AngularFirestoreCollection<User>;

    private reviewRef: AngularFirestoreCollection<Review>;

    userHasRecipe: boolean;

    publicReviews: Array<Review>;
    privateReview: [{UserId: String, rating: number}];

    isCreator: boolean;

    starList: boolean[] = [true,true,true,true,true];
    rating: number;
    ngOnInit() {
  }

  constructor(private db: AngularFirestore, private router: Router) {
      // Check to see if this user has this recipe already
      this.userHasRecipe = true;
      this.userRef = db.collection('users');
      this.userRef.doc(localStorage.getItem('userId')).ref.get().then(doc => {
           let listOfRecipes = doc.data().recipes;
           if(listOfRecipes.indexOf(localStorage.getItem('recipeId')) > -1) {
               this.userHasRecipe = true;
           } else {
               this.userHasRecipe = false;
           }
      });
      
      this.recipe = new Recipe();
      this.reviewRef = db.collection('reviews');
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
                item.privateReview = doc2.data().privateReview;
                item.averageReview = doc2.data().averageReview;
                this.setStar(item.averageReview.average - 1);
                item.type = doc2.data().type;
                item.tags = doc2.data().tags;
                this.recipe = item;

                if (this.recipe.creator === localStorage.getItem('userId')) {
                    this.isCreator = true;
                }
            });
     }
  }
  setStar(data:any) {
      this.rating = data+1;
      console.log(data);
      for (let i = 0; i <= 4; i ++){
        if(i <= data) {
            this.starList[i] = false;
        } else {
            this.starList[i] = true;
        }
      }
  }

  editButton() {
      localStorage.setItem('recipeId', this.recipe.id.toString());
      this.router.navigate(['/addRecipe']);
  }


}
