import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../classes/recipe';
import { NgForm } from '@angular/forms';
import { FileUpload, UploadService } from '../../services/upload.service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  recipe: Recipe;
  file: FileUpload;
  progress: {percentage: number};

  ingredients = [{guid: 1, name: '', amount: ''}];
  instructions = [{guid: 1, text: ''}];
  ingredientCount: number;
  instructionCount: number;

  private recipeRef: AngularFirestoreCollection<Recipe>;
  private recipeCountRef: AngularFirestoreCollection<any>;

  constructor(private upload: UploadService, private db: AngularFirestore, private router: Router) {
      this.recipe = new Recipe();
      this.file = new FileUpload(null);
      this.recipeRef = db.collection('recipes');
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
        this.ingredients.push({guid: this.ingredientCount, name: '', amount: ''});
        this.ingredientCount++;
    } else {
        // Message
    }
  }

  addInstruction(e) {
      e.preventDefault();
      if (this.instructionCount < 20) {
        this.instructions.push({guid: this.instructionCount, text: ''});
        this.instructionCount++;
      } else {
          // Message
      }

  }

  createRecipe() {
    for (let i = 0; i < this.ingredients.length; i++) {
        this.recipe.ingredients.push(this.ingredients[i].name);
        this.recipe.amounts.push(this.ingredients[i].amount);
    }
    for (let i = 0; i < this.instructions.length; i++) {
        this.recipe.instructions.push(this.instructions[i].text);
    }
    this.file.name = this.recipe.title;
    this.recipe.creator = localStorage.getItem('userId');
    console.log(this.recipe);
    // Get the ID for the recipe
    this.recipeCountRef.doc('count').ref.get().then(doc => {
    this.recipe.id = doc.data().recipeCount;
    this.recipeCountRef.doc('count').update({
        recipeCount: doc.data().recipeCount + 1
    });
    console.log(this.file.file);
    if (this.file.file != null) { // There is a picture, need to upload to cloud storage.
        console.log('Picture detected');
        this.upload.pushFileToStorage(this.file, this.progress, 'recipe', this.recipe);
    } else { // No picture, can add it here
        this.recipeRef.doc(this.recipe.id.toString()).ref.get()
                    .then(doc2 => {
                            // This recipe doesn't exist!
                            if (!doc2.exists) {
                                // Need to store the recipe
                                // Store it in cloud firestore
                                this.recipeRef.doc(this.recipe.id.toString()).set(Object.assign({}, this.recipe));
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
    this.router.navigate(['/calendar']);




  }
}
