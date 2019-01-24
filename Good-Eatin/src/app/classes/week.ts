import { Meal } from './meal';
export class Week {
    startDate: string;
    meals: Array<Meal>;
    constructor(startDate: string, meals: Array<Meal>) {
        this.startDate = startDate;
        this.meals = meals;
    }
}
