
export class Review {
    recipeId: number;
    stars: number;
    description: string;
    isPublic: boolean;
    author: string;
    constructor() {
        this.stars = 1;
        this.description = '';
        this.isPublic = true;
        this.author = '';
    }


}
