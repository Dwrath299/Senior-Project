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
    publicReviews:[{userId: string, rating: number}];
    averageReview: {average: number, count: number};
    privateReview: [{userId: string, rating: number}];
    type: string;
    meal: string;
    tags: Array<string>;
    creator: string;
    time: number;
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
                    this.meal = 'dinner';
                    this.averageReview = {average: 0, count: 0};
                    this.type = '';
                    this.tags = [];
                    this.creator = '';
                    this.time = 30;
                    this.isPublic = true;

                }

  }
