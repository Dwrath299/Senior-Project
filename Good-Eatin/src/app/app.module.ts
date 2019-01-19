import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AddFriendComponent } from './pages/add-friend/add-friend.component';
import { AddRecipeComponent } from './pages/add-recipe/add-recipe.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { EditWeekComponent } from './pages/edit-week/edit-week.component';
import { ShoppingListComponent } from './pages/shopping-list/shopping-list.component';
import { EditMealsComponent } from './pages/edit-meals/edit-meals.component';
import { ExploreRecipesComponent } from './pages/explore-recipes/explore-recipes.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
// Firebase Modules
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    AddFriendComponent,
    AddRecipeComponent,
    CalendarComponent,
    EditWeekComponent,
    ShoppingListComponent,
    EditMealsComponent,
    ExploreRecipesComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), // Main Angular fire module
    AngularFireDatabaseModule  // Firebase database module
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
