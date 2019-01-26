import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { take, map, tap } from 'rxjs/operators';
import { AngularFireAuth } from 'angularfire2/auth';
import { CanActivate, Router,
         ActivatedRouteSnapshot,
         RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private authService: AuthService) { }
    canActivate() {
        if ( this.authService.isLoggedIn() ) {
            console.log('Im here');
            return true;
        }
        this.router.navigate(['/']);
        return false;
    }
}
