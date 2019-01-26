import { Friend } from './friend';
import { Recipe } from './recipe';
import { Week } from './week';

export class User {
    id: string;
    name: string;
    picture: string;
    friends: Array<Friend>;
    recipes: Array<Recipe>;
    weeks: Array<Week>;

    constructor() {
        console.log('user Created');
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getPicture() {
        return this.picture;
    }

    getFriends() {
        return this.friends;
    }

    getRecipes() {
        return this.recipes;
    }

    getWeeks() {
        return this.weeks;
    }
    isLoggedIn() {
        if (this.id) {
            return true;
        } else {
            return false;
        }
    }
}
