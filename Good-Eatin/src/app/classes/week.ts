import { stringify } from '@angular/compiler/src/util';

export class Week {
    startDate: Date;
    sunday: Map<string, number[]>;
    monday:Map<string, number[]>;
    tuesday:Map<string, number[]>;
    wednesday:Map<string, number[]>;
    thursday:Map<string, number[]>;
    friday:Map<string, number[]>;
    saturday:Map<string, number[]>;

    constructor() {
        this.startDate = new Date();
        this.sunday = new Map<string, number[]>();
        this.monday = new Map<string, number[]>();
        this.tuesday = new Map<string, number[]>();
        this.wednesday = new Map<string, number[]>();
        this.thursday = new Map<string, number[]>();
        this.friday = new Map<string, number[]>();
        this.saturday = new Map<string, number[]>();
    }
}
