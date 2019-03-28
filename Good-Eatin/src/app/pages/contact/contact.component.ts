import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { NotificationService } from '@progress/kendo-angular-notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  message = {
    firstName: "",
    lastName: "",
    email: "", 
    text: ""
  };

  constructor(private notification: NotificationService, private router: Router) { }

  ngOnInit() {
  }

  sendMessage() {
    const sendContactEmail = firebase.functions().httpsCallable('generateShoppingList');
    sendContactEmail({message: this.message});
    this.notification.show({
      content: 'Successfully Sent Message!',
      hideAfter: 800,
      position: { horizontal: 'center', vertical: 'top' },
      animation: { type: 'fade', duration: 400 },
      type: { style: 'success', icon: true },
    });
    setTimeout(() => {
      this.router.navigate(['/']);
    },500);
    
  }

}
