import {Ingredient} from './ingredient';
import { Review } from './review';
import { User } from './user';

export class Recipe {
    id: number;
    title: string;
    picture: string;
    ingredients: [
        {name: string, amount: string}
    ];
    instructions: [
        {step: number, text: string}
    ];
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
                    this.ingredients = [
                        { name: '', amount: ''}
                    ];
                    this.instructions = [
                        { step: 1, text: ''}
                    ];
                    this.publicReviews = [];
                    this.privateReviews = [];
                    this.type = '';
                    this.tags = [];
                    this.creator = '';
                    this.isPublic = true;

                }

  }
