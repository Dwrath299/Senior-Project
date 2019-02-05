import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../classes/recipe';
import { NgForm } from '@angular/forms';
import { FileUpload, UploadService } from '../../services/upload.service';


@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  recipe: Recipe;
  file: FileUpload;
  progress: {percentage: number};
  ingredientCount: number;
  instructionCount: number;

  constructor(private upload: UploadService) {
      this.recipe = new Recipe();
      this.file = new FileUpload(null);
      this.ingredientCount = 2;
      this.instructionCount = 2;
    }


  ngOnInit() {
  }

  addIngredient() {
    if (this.ingredientCount < 20) {
        const container = document.getElementById('ingredient-container');
        const ingredientInput = document.createElement('input');
        ingredientInput.type = 'text';
        ingredientInput.setAttribute('ng-model', 'recipe.ingredient[$index]');
        ingredientInput.title = '1';

        const amountInput = document.createElement('input');
        amountInput.type = 'text';
        amountInput.setAttribute('ng-model', 'recipe.amount[$index]');
        container.appendChild(ingredientInput);
        container.appendChild(amountInput);
                    // Append a line break
        container.appendChild(document.createElement('br'));
        this.ingredientCount++;
    } else {
        // Message
    }
  }

  addInstruction() {
      if (this.instructionCount < 20) {
        const container = document.getElementById('instruction-container');
        const instructionInput = document.createElement('input');
        instructionInput.type = 'text';
        instructionInput.setAttribute('ng-model', 'recipe.instruction[$index]');
        container.appendChild(instructionInput);
        container.appendChild(document.createElement('br'));
        this.instructionCount++;
      } else {
          // Message
      }

  }

  createRecipe(form: NgForm) {
    this.file.name = this.recipe.title;
    this.recipe.creator = localStorage.getItem('userId');
    this.upload.pushFileToStorage(this.file, this.progress, 'recipe', this.recipe);

  }

}
