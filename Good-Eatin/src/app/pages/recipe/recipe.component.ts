import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Recipe } from '../../classes/recipe';
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

    private reviewRef: AngularFirestoreCollection<Review>;

    publicReviews: Array<Review>;
    privateReview: Review;

    isCreator: boolean;
    ngOnInit() {
  }

  constructor(private db: AngularFirestore, private router: Router) {
      this.publicReviews = new Array<Review>();
      this.privateReview = new Review();
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
                item.publicReviews = doc2.data().publicReviews;
                item.type = doc2.data().type;
                item.tags = doc2.data().tags;
                this.recipe = item;
                if (this.recipe.privateReview !== '') {
                    this.reviewRef.doc(this.recipe.privateReview).ref.get().then(doc => {
                        this.privateReview.author = doc.data().author;
                        this.privateReview.stars = doc.data().stars;
                    });
                }
                for (let i = 0; i < this.recipe.publicReviews.length; i++) {
                    this.reviewRef.doc(this.recipe.publicReviews[i]).ref.get().then(doc => {
                        const tempReview = new Review();
                        tempReview.author = doc.data().author;
                        tempReview.stars = doc.data().stars;
                        tempReview.description = doc.data().description;
                        this.publicReviews.push(tempReview);
                    });
                }

                if (this.recipe.creator === localStorage.getItem('userId')) {
                    this.isCreator = true;
                }
            });
            localStorage.removeItem('recipeId');
     }
  }

  editButton() {
      localStorage.setItem('recipeId', this.recipe.id.toString());
      this.router.navigate(['/addRecipe']);
  }


}
