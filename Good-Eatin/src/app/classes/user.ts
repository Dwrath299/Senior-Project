
export class User {
    id: string;
    name: string;
    picture: string;
    friends: Array<string>;
    recipes: Array<string>;
    weeks: Array<string>;

    constructor() {
        console.log('user Created');
        this.id = '';
        this.name = '';
        this.picture = '';
        this.friends = [];
        this.recipes = [];
        this.weeks = [];

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
