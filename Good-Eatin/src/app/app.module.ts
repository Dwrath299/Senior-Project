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
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LandingComponent } from './pages/landing/landing.component';
import { RegisterComponent } from './pages/register/register.component';
import { AuthGuard } from './services/auth-guard.service';
import { UploadService } from './services/upload.service';
import 'zone.js';
import 'zone.js/dist/long-stack-trace-zone.js';

// SLidehsow
import {SlideshowModule} from 'ng-simple-slideshow';


// Tags
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';

// Toasts
import { NotificationModule } from '@progress/kendo-angular-notification';






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
    FooterComponent,
    PageNotFoundComponent,
    LandingComponent,
    RegisterComponent,
    RecipeComponent,
    ReviewsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), // Main Angular fire module
    AngularFireDatabaseModule,  // Firebase database module
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    TagInputModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SlideshowModule,  
    NotificationModule
  ],
  providers: [AuthGuard, UploadService],
  bootstrap: [AppComponent]
})

export class AppModule { }
