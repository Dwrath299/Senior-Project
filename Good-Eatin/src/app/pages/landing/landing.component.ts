import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

    imageUrls: string[];
    height: string;

  constructor() {
      this.height = '100%';
      this.imageUrls = ['https://firebasestorage.googleapis.com/v0/b/meal-plan-generator'
                    +   '-745c7.appspot.com/o/sitePics%2Fgrocery1.jpg?alt=media&token=b6af0afe-ae34-41f1-a350-24774cb82cb8'];
      this.imageUrls.push('https://firebasestorage.googleapis.com/v0/b/meal-plan-generator'
                    +   '-745c7.appspot.com/o/sitePics%2Fadd1.jpg?alt=media&token=229744fc-49f6-4232-9a12-c8eaf72f52a6');
      this.imageUrls.push('https://firebasestorage.googleapis.com/v0/b/meal-plan-generator'
                    +   '-745c7.appspot.com/o/sitePics%2Fmeal1.jpg?alt=media&token=e70fd305-b538-45b6-8580-4b9a00432b19');
  }

  ngOnInit() {
  }

}
