import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../classes/recipe';


@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  recipe: Recipe;
  ingredientCount: number;
  instructionCount: number;

  constructor() {
      this.recipe = new Recipe();
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
        ingredientInput.name = 'ingredient[]';
        ingredientInput.title = '1';

        const amountInput = document.createElement('input');
        amountInput.type = 'text';
        amountInput.name = 'amount[]';
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
        instructionInput.name = 'instruction[]';
        container.appendChild(instructionInput);
        container.appendChild(document.createElement('br'));
        this.instructionCount++;
      } else {
          // Message
      }

  }

  createRecipe() {
      this.recipe.title = 'cool';

  }

}
