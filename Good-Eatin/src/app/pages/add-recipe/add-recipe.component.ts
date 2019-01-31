import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../classes/recipe';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  recipe: Recipe;
  constructor() { this.recipe = new Recipe(); }

  ngOnInit() {
  }

  addIngredient() {
      console.log('Im here');
    const container = document.getElementById('ingredient-container');
    const input1 = document.createElement('input');
    input1.type = 'text';
    input1.name = 'ingredient[]';
    input1.addEventListener('change', this.addIngredient);
    container.appendChild(input1);
    const input2 = document.createElement('input');
    input2.type = 'text';
    input2.name = 'amount[]';
    container.appendChild(input2);
                // Append a line break
    container.appendChild(document.createElement('br'));
  }

  addInstruction() {
    const container = document.getElementById('instruction-container');
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'instruction[]';
    input.addEventListener('change', this.addInstruction);
    container.appendChild(input);

  }

  createRecipe() {
      this.recipe.title = 'cool';

  }

}
