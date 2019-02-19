import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = {
    name: '',
    email: '',
    password: ''
  };
  error: string;
  constructor(private authService: AuthService, private router: Router) { 
    this.error = '';
  }

  register() {
    this.authService.register(this.user.email, this.user.password, this.user.name)
    .then((res) => {
      this.error = '';
      this.router.navigate(['calendar']);
    })
    .catch((err) => {
      console.log(err);
      this.error = err.message;
    });
  }

  ngOnInit() {
  }

}
