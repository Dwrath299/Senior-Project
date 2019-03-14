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
  ingredientList: any;

  constructor(private db: AngularFirestore, private router: Router) { 
    this.user = new User();
    this.user.id = localStorage.getItem('userId');
    this.userRef = db.collection('users');
    this.shoppingListRef = db.collection('shoppingLists');
    this.userRef.doc(this.user.id).ref.get().then( doc => {
      let shoppingListIDs = doc.data().shoppingLists;
      for (let i = 0; i < shoppingListIDs.length; i++) {
        let listID = shoppingListIDs[i];
        this.shoppingListRef.doc(listID).ref.get().then( listDoc => {
          this.ingredientList = listDoc.data();

        });
      }

    });
  }

  ngOnInit() {
  }

}
