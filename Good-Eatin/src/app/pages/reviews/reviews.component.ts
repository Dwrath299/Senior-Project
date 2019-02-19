import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Recipe } from '../../classes/recipe';
import { User } from '../../classes/user';
import { Router } from '@angular/router';
import { Review} from '../../classes/review';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  private recipeRef: AngularFirestoreCollection<Recipe>;

  private userRef: AngularFirestoreCollection<User>;

  private reviewRef: AngularFirestoreCollection<Review>;

  recipe: Recipe;

  publicReviews: [{review: Review; starList: boolean[], userData: {userPic: string, username: string}}];

  hasAReview: boolean;

  userHasRecipe: boolean;

  user: User;

  newReview: Review;

  starList: boolean[] = [true,true,true,true,true];
  rating: number;

  constructor(private db: AngularFirestore, private router: Router) { 
    this.rating = 4;
    this.user = new User();
    this.reviewRef = db.collection('reviews');
    this.recipeRef = db.collection('recipes');
    this.userRef = db.collection('users');
    this.hasAReview = false;
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
              item.averageReview = doc2.data().averageReview;
              item.type = doc2.data().type;
              item.tags = doc2.data().tags;
              this.recipe = item;
              for (let i = 0; i < this.recipe.publicReviews.length; i++) {
                  this.reviewRef.doc(this.recipe.publicReviews[i].userId).ref.get().then(doc => {
                      const tempReview = new Review();
                      tempReview.author = doc.data().author;
                      if (tempReview.author === localStorage.getItem('userId')) {
                        this.hasAReview = true;
                      } else {
                        this.userRef.doc(localStorage.getItem('userId')).ref.get().then( doc3 => {
                          this.user.picture = doc3.data().picture;
                          this.user.name = doc3.data().name;
                        });
                      }
                      tempReview.stars = doc.data().stars;
                      tempReview.description = doc.data().description;
                      this.userRef.doc(tempReview.author).ref.get().then(  doc3 => {
                        this.publicReviews.push(
                          {review: tempReview, 
                           starList: this.getStars(tempReview.stars), 
                           userData: {userPic: doc3.data().picture, 
                           username: doc3.data().name}
                          });
                      });
                      
                  });
              }
          });
     }
  }

  getStars(stars: number): boolean[] {
    let starList: boolean[] = [true, true, true, true, true];
    for (let i = 0; i <= 4; i ++){
      if(i <= stars) {
          starList[i] = false;
      } else {
          starList[i] = true;
      }
    }
    return starList;
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

  ngOnInit() {
  }

}
