import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Recipe } from '../../classes/recipe';
import { User } from '../../classes/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-meals',
  templateUrl: './edit-meals.component.html',
  styleUrls: ['./edit-meals.component.css']
})
export class EditMealsComponent implements OnInit {

    userId = localStorage.getItem('userId').toString();
    recipeList: Array<Recipe>;

    recipeReferenceList: Array<String>;

    userRef: AngularFirestoreCollection<User>;
    recipeRef: AngularFirestoreCollection<Recipe>;
  constructor(private db: AngularFirestore, private router: Router) {
      this.recipeList = [];
      this.userRef = db.collection('users');
      this.recipeRef = db.collection('recipes');
      console.log(this.userId);
      this.userRef.doc(this.userId).ref.get().then(doc => {
        this.recipeReferenceList = doc.data().recipes;
        // tslint:disable-next-line:prefer-const
        // tslint:disable-next-line:forin
        for (let i = 0; i < this.recipeReferenceList.length; i++)  {
            this.recipeRef.doc(this.recipeReferenceList[i].toString()).ref.get().then(doc2 => {
                const item = new Recipe();
                item.id = doc2.data().id;
                item.picture = doc2.data().picture;
                item.title = doc2.data().title;
                item.tags = doc2.data().tags;
                this.recipeList.push(item);
            });
        }
      });

  }

  ngOnInit() {
  }

  recipeClick(id: string) {
      localStorage.setItem('recipeId', id);
      this.router.navigate(['/recipe']);
  }

}
