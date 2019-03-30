import {Recipe} from './recipe';

export class Week {
    startDate: Date;
    ID: String;
    daysOfWeek:[{dinner: Recipe[], lunch: Recipe[], breakfast: Recipe[]}, 
        {dinner: Recipe[], lunch: Recipe[], breakfast: Recipe[]}, 
        {dinner: Recipe[], lunch: Recipe[], breakfast: Recipe[]}, 
        {dinner: Recipe[], lunch: Recipe[], breakfast: Recipe[]}, 
        {dinner: Recipe[], lunch: Recipe[], breakfast: Recipe[]}, 
        {dinner: Recipe[], lunch: Recipe[], breakfast: Recipe[]}, 
        {dinner: Recipe[], lunch: Recipe[], breakfast: Recipe[]}];


    constructor() {
        this.ID = "";
        this.startDate = new Date();
        this.daysOfWeek = [{dinner: [], lunch: [], breakfast: []}, 
                           {dinner: [], lunch: [], breakfast: []}, 
                           {dinner: [], lunch: [], breakfast: []}, 
                           {dinner: [], lunch: [], breakfast: []}, 
                           {dinner: [], lunch: [], breakfast: []}, 
                           {dinner: [], lunch: [], breakfast: []}, 
                           {dinner: [], lunch: [], breakfast: []}];

    }
}
