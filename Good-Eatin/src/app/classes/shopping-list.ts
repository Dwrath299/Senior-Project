import { Ingredient } from './ingredient';
export class ShoppingList {
    ingredientList: Map<Ingredient, boolean>;

    constructor( ingredients: Array<Ingredient>) {
        ingredients.forEach( (ingredient) => {
            this.ingredientList.set(ingredient, false);
        });
    }
}
