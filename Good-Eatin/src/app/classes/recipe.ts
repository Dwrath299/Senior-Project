import {Ingredient} from './ingredient';
import { Review } from './review';
import { User } from './user';

export class Recipe {
    id: number;
    title: string;
    picture: string;
    ingredients: Array<string>;
    amounts: Array<string>;
    instructions: Array<string>;
    publicReviews: Array<string>;
    privateReviews: Array<string>;
    type: string;
    tags: Array<string>;
    creator: string;
    isPublic: boolean;

    constructor() {
                    this.id = 0;
                    this.title = '';
                    this.picture = '';
                    this.ingredients = [];
                    this.amounts = [];
                    this.instructions = [];
                    this.publicReviews = [];
                    this.privateReviews = [];
                    this.type = '';
                    this.tags = [];
                    this.creator = '';
                    this.isPublic = false;

                }

  }
