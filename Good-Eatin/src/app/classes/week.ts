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
        this.sunday = {dinner: [], lunch: [], breakfast: []};
        this.monday = {dinner: [], lunch: [], breakfast: []};
        this.tuesday = {dinner: [], lunch: [], breakfast: []};
        this.wednesday = {dinner: [], lunch: [], breakfast: []};
        this.thursday = {dinner: [], lunch: [], breakfast: []};
        this.friday = {dinner: [], lunch: [], breakfast: []};
        this.saturday = {dinner: [], lunch: [], breakfast: []};
    }
}
