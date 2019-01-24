import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './pages/login/login.component';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {LandingComponent} from './pages/landing/landing.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {CalendarComponent} from './pages/calendar/calendar.component';
import {AddRecipeComponent} from './pages/add-recipe/add-recipe.component';
import {AddFriendComponent} from './pages/add-friend/add-friend.component';
import {EditMealsComponent} from './pages/edit-meals/edit-meals.component';
import {EditWeekComponent} from './pages/edit-week/edit-week.component';
import {ExploreRecipesComponent} from './pages/explore-recipes/explore-recipes.component';
import {ShoppingListComponent} from './pages/shopping-list/shopping-list.component';
import {RegisterComponent} from './pages/register/register.component';
import { AuthGuard } from './services/auth-guard.service';

const routes: Routes = [
    { path: 'login', component: LoginComponent},
    { path: '', component: LandingComponent},
    { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent},
    { path: 'calendar', canActivate: [AuthGuard], component: CalendarComponent},
    { path: 'addRecipe', canActivate: [AuthGuard], component: AddRecipeComponent},
    { path: 'addFriend', canActivate: [AuthGuard], component: AddFriendComponent},
    { path: 'editMeals', canActivate: [AuthGuard], component: EditMealsComponent},
    { path: 'editWeek', canActivate: [AuthGuard], component: EditWeekComponent},
    { path: 'explore', canActivate: [AuthGuard], component: ExploreRecipesComponent},
    { path: 'shoppingList', canActivate: [AuthGuard], component: ShoppingListComponent},
    { path: 'register', component: RegisterComponent},
    { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
