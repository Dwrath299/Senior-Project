import {Recipe} from './recipe';
export class Meal {
    recipes: Array<Recipe>;

    constructor(private array: Array<Recipe>) {
        this.recipes = array;
    }

    getMeal() {
        return this.recipes;
    }
}
