import {Recipe} from './recipe';

export class Week {
    startDate: Date;
    sunday: {dinner: Recipe[], lunch: Recipe[], breakfast: Recipe[]};
    monday: {dinner: Recipe[], lunch: Recipe[], breakfast: Recipe[]};
    tuesday: {dinner: Recipe[], lunch: Recipe[], breakfast: Recipe[]};
    wednesday: {dinner: Recipe[], lunch: Recipe[], breakfast: Recipe[]};
    thursday: {dinner: Recipe[], lunch: Recipe[], breakfast: Recipe[]};
    friday: {dinner: Recipe[], lunch: Recipe[], breakfast: Recipe[]};
    saturday: {dinner: Recipe[], lunch: Recipe[], breakfast: Recipe[]};

    constructor() {
        this.startDate = new Date();
        this.sunday = null;
        this.monday = null;
        this.tuesday = null;
        this.wednesday = null;
        this.thursday = null;
        this.friday = null;
        this.saturday = null;
    }
}
