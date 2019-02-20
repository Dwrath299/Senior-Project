import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../classes/recipe';
import { NgForm } from '@angular/forms';
import { FileUpload, UploadService } from '../../services/upload.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { User } from '../../classes/user';


@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  recipe: Recipe;
  file: FileUpload;
  progress: {percentage: number};

  private userRef: AngularFirestoreCollection<User>;

  ingredientCount: number;
  instructionCount: number;

  private recipeRef: AngularFirestoreCollection<Recipe>;
  private recipeCountRef: AngularFirestoreCollection<any>;

  constructor(private upload: UploadService, private db: AngularFirestore, private router: Router) {
      this.recipeRef = db.collection('recipes');
      // Check if we are editing an item.
      if (localStorage.getItem('recipeId') != null) {
        const recipeId = localStorage.getItem('recipeId');
        // We are editing an item, we need to get the recipe.
        this.recipeRef.doc(recipeId).ref.get().then(doc2 => {
                this.recipe = new Recipe();
                this.recipe.id = doc2.data().id;
                this.recipe.picture = doc2.data().picture;
                this.recipe.title = doc2.data().title;
                this.recipe.ingredients = doc2.data().ingredients;
                this.recipe.instructions = doc2.data().instructions;
                this.recipe.isPublic = doc2.data().isPublic;
                this.recipe.type = doc2.data().type;
                this.recipe.tags = doc2.data().tags;
                this.recipe.meal = doc2.data().meal;
                this.recipe.time = doc2.data().time;
                console.log(this.recipe);
            });
      } else {
          this.recipe = new Recipe();
          console.log(this.recipe);
      }
      this.file = new FileUpload(null);
      this.userRef = db.collection('users');
      this.recipeCountRef = db.collection('recipeCount');
      this.ingredientCount = 2;
      this.instructionCount = 2;
    }


  ngOnInit() {
  }


  addFile(e) {
      e.preventDefault();
      const file = e.srcElement.files[0];
      this.file.file = file;
  }

  addIngredient(e) {
      e.preventDefault();
    if (this.ingredientCount < 20) {
        this.recipe.ingredients.push({ name: '', amount: ''});
        this.ingredientCount++;
    } else {
        // Message
    }
  }

  addInstruction(e) {
      e.preventDefault();
      if (this.instructionCount < 20) {
        this.recipe.instructions.push({ step: this.instructionCount, text: ''});
        this.instructionCount++;
      } else {
          // Message
      }

  }

  createRecipe() {
    this.file.name = this.recipe.title;
    this.recipe.creator = localStorage.getItem('userId');
    console.log(this.recipe);

    // If we are editing a recipe, we will update the document rather then create a new one.
    if (localStorage.getItem('recipeId') != null) {
        if (this.file.file != null) {
            this.upload.pushFileToStorage(this.file, this.progress, 'updateRecipe', this.recipe);
        } else {
            this.recipeRef.doc(localStorage.getItem('recipeId')).ref.update({
                picture: this.recipe.picture,
                ingredients: this.recipe.ingredients,
                instructions: this.recipe.instructions,
                title: this.recipe.title,
                type: this.recipe.type,
                meal: this.recipe.meal,
                time: this.recipe.time,
                tags: this.recipe.tags
            });
        }
    } else { // This is creating a recipe
        // Get the ID for the recipe
        this.recipeCountRef.doc('count').ref.get().then(doc => {
        this.recipe.id = doc.data().recipeCount;
        this.recipeCountRef.doc('count').update({
            recipeCount: doc.data().recipeCount + 1
        });
        if (this.file.file != null) { // There is a picture, need to upload to cloud storage.
            console.log('Picture detected');
            this.upload.pushFileToStorage(this.file, this.progress, 'newRecipe', this.recipe);
        } else { // No picture, can add it here
            const userId = localStorage.getItem('userId').toString();
            this.recipeRef.doc(this.recipe.id.toString()).ref.get()
                        .then(doc2 => {
                                // This recipe doesn't exist!
                                if (!doc2.exists) {
                                    // Need to store the recipe
                                    // Store it in cloud firestore
                                    this.recipeRef.doc(this.recipe.id.toString()).set(Object.assign({}, this.recipe));
                                    this.userRef.doc(userId).ref.get()
                                            .then(docSnap => {
                                                if (docSnap.exists) {
                                                    // tslint:disable-next-line:prefer-const
                                                    let userRecipes = docSnap.data().recipes;
                                                    userRecipes.push(this.recipe.id.toString());
                                                    this.userRef.doc(userId).update({
                                                        recipes: userRecipes
                                                    });
                                                } else {
                                                    console.error('Error updating user picture');
                                                }
                                            });
                                    return true;
                                } else {
                                    // This deletes the old recipe and adds it again.
                                    this.recipeRef.doc(this.recipe.id.toString()).delete().then(function() {
                                            this.recipeRef.doc(this.recipe.id.toString()).set(Object.assign({}, this.recipe));
                                    }).catch(function(error) {
                                        console.error('Error removing document: ', error);
                                    });
                                    return false;
                                }

                        });
        }
        });
    }
    

    this.router.navigate(['/calendar']);




  }
}
