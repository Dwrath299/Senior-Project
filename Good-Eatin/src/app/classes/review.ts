import {User} from './user';
export class Review {
    stars: number;
    description: string;
    isPublic: boolean;
    author: User;
    constructor(stars: number, description: string, isPublic: boolean, author: User ) {
        this.stars = stars;
        this.description = description;
        this.isPublic = isPublic;
        this.author = author;
    }


}
