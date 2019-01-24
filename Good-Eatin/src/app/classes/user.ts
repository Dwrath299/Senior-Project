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

    constructor(id: string, name: string, picture: string, friends: Array<Friend>,
                recipes: Array<Recipe>, weeks: Array<Week>) {
        this.id = id;
        this.name = name;
        this.picture = picture;
        this.friends = friends;
        this.recipes = recipes;
        this.weeks = weeks;
    }
}
