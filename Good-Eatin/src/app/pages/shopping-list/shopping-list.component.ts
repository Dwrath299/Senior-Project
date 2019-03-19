import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import { User } from '../../classes/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  user: User;
  userRef: AngularFirestoreCollection<User>;
  shoppingListRef: AngularFirestoreCollection<any>;
  dateSelect : any;
  ingredientList;
  shoppingListIDs;
  week1: boolean;

  constructor(private db: AngularFirestore, private router: Router) { 
    this.user = new User();
    this.week1 = true;
    this.ingredientList = [{startDate: "", ingredients: []}, {startDate: "", ingredients: []}];
    this.user.id = localStorage.getItem('userId');
    this.userRef = db.collection('users');
    this.shoppingListRef = db.collection('shoppingLists');
    this.userRef.doc(this.user.id).ref.get().then( doc => {
      this.shoppingListIDs = doc.data().shoppingLists;
      // Get each of the weeks for the shopping
      for (let i = 0; i < this.shoppingListIDs.length; i++) {
        let listID = this.shoppingListIDs[i];
        this.shoppingListRef.doc(listID).ref.get().then( listDoc => {
          this.ingredientList[i].startDate = listDoc.data().startDate;
          this.ingredientList[i].ingredients = listDoc.data().ingredients;
          this.dateSelect = this.ingredientList[0].startDate;
          console.log(this.ingredientList);
        });
      }
      

    });
  }

  format(date): String {
    const tempDate = new Date(date);
    return tempDate.toLocaleDateString();
  }

  checkBox(weekIndex, ingredientIndex) {
    const value = this.ingredientList[weekIndex].ingredients[ingredientIndex].checked;
    if (value) {
      this.ingredientList[weekIndex].ingredients[ingredientIndex].checked = false;
    } else {
      this.ingredientList[weekIndex].ingredients[ingredientIndex].checked = true;
    }
    // Update it in the database
    this.shoppingListRef.doc(this.shoppingListIDs[weekIndex]).ref.update({
      ingredients: this.ingredientList[weekIndex].ingredients
    });
  }

  switch() {
    if(this.week1) {
      this.week1 = false;
    } else {
      this.week1 = true;
    }
  }

  ngOnInit() {
  }

}
