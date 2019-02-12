import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { Recipe } from '../../classes/recipe';
import { User } from '../../classes/user';
import { Router } from '@angular/router';


@Component({
  selector: 'app-explore-recipes',
  templateUrl: './explore-recipes.component.html',
  styleUrls: ['../edit-meals/edit-meals.component.css']
})
export class ExploreRecipesComponent implements OnInit {

    recipeRef: AngularFirestoreCollection<Recipe>;
    recipeList: Array<Recipe>;
  constructor(private db: AngularFirestore, private router: Router) {
      this.recipeList = [];
      this.recipeRef = db.collection('recipes', ref => ref.where('isPublic', '==', true));
      this.recipeRef.ref.get().then(snapshot => {
          snapshot.forEach(doc => {
            const item = new Recipe();
            item.id = doc.data().id;
            item.picture = doc.data().picture;
            item.title = doc.data().title;
            item.tags = doc.data().tags;
            this.recipeList.push(item);
          });

      });
  }

  ngOnInit() {
  }

  recipeClick(id: string) {
      localStorage.setItem('recipeId', id);
      this.router.navigate(['/recipe']);
  }

}
