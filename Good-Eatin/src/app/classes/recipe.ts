import {Ingredient} from './ingredient';
import { Review } from './review';
import { User } from './user';

export class Recipe {
    id: number;
    title: string;
    picture: string;
    ingredients: Array<Ingredient>;
    instructions: Array<string>;
    publicReviews: Array<Review>;
    privateReviews: Array<Review>;
    type: string;
    tags: Array<string>;
    creator: User;
    isPublic: boolean;

    constructor(id: number, title: string, picture: string,
                ingredients: Array<Ingredient>, instructions: Array<string>,
                publicReviews: Array<Review>, privateReviews: Array<Review>,
                type: string, tags: Array<string>, creator: User, isPublic: boolean) {
                    this.id = id;
                    this.title = title;
                    this.picture = picture;
                    this.ingredients = ingredients;
                    this.instructions = instructions;
                    this.publicReviews = publicReviews;
                    this.privateReviews = privateReviews;
                    this.type = type;
                    this.tags = tags;
                    this.creator = creator;
                    this.isPublic = isPublic;

                }

  }
