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

  add_ingredient_field() {
      let tempString = '';
      tempString = '<input type="string" class="form-input-ingredient-name" ' +
      ' [(ngModel)]="recipe.ingredients" name="name[]" placeholder="Sugar" required> \n';
      tempString += '<input type="string" class="form-input-ingredient-amount" ' +
      ' [(ngModel)]="recipe.ingredients" name="amount[]" placeholder="1 Cup" required> \n';


  }

  add_instruction_field() {
      let tempString = '';
      tempString = '<input type="string" class="form-input-instruction" ' +
      '[(ngModel)]="recipe.instructions" name="instruction[]" placeholder="Eat chocolate" required>';
      document.getElementById('ingredients').appendChild(tempString);

  }

}
