import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth.Service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    @Input() title: string;
  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
  }


}
