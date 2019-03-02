import { stringify } from '@angular/compiler/src/util';

export class Week {
    startDate: Date;
    sunday: {dinner: String[], lunch: String[], breakfast: String[]};
    monday: {dinner: String[], lunch: String[], breakfast: String[]};
    tuesday: {dinner: String[], lunch: String[], breakfast: String[]};
    wednesday: {dinner: String[], lunch: String[], breakfast: String[]};
    thursday: {dinner: String[], lunch: String[], breakfast: String[]};
    friday: {dinner: String[], lunch: String[], breakfast: String[]};
    saturday: {dinner: String[], lunch: String[], breakfast: String[]};

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
