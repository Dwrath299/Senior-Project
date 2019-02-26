const functions = require('firebase-functions');
import {Week} from '../src/app/classes/week';

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.generateMeals = functions.https.onRequest((req, res) => {
    var db = admin.database();
    const recipeRef = db.ref("recipes");
    const userRef = db.ref("users");
    const weekRef = db.ref("weeks");
    // The usable list of recipes with private rating next to each.
    var listOfRecipes;
    // Get the userID from the parameters
    var userId = req.get("userId");
    userRef.doc(userId).ref.get().then(doc2 => {
        var listOfRecipeRefs = doc2.data().recipes;
        // Go through each recipe to get the 
        listOfRecipeRefs.forEach(recipeString => {
            recipeRef.doc(recipeString).ref.get().then(doc => {
                var privateReviews = doc.data().privateReviews;
                // Creating a weighted list from the private review.
                for (var i = 0; i < privateReviews.get(userId); i++) {
                    listOfRecipes.add(recipeString);
                }
                
            });
            
        });
    });
    
    
    var week = new Week();
    // Now select at random from the weighted list. For each day of the week.
    // Currenlt only supporting dinner, but easily can add other meals.
    var temp = [listOfRecipes[Math.floor((Math.random() * listOfRecipes.length()) + 1)]];
    week.sunday["dinner"] = temp;
    temp = [listOfRecipes[Math.floor((Math.random() * listOfRecipes.length()) + 1)]];
    week.monday["dinner"] = temp;
    temp = [listOfRecipes[Math.floor((Math.random() * listOfRecipes.length()) + 1)]];
    week.tuesday["dinner"] = temp;
    temp = [listOfRecipes[Math.floor((Math.random() * listOfRecipes.length()) + 1)]];
    week.wednesday["dinner"] = temp;
    temp = [listOfRecipes[Math.floor((Math.random() * listOfRecipes.length()) + 1)]];
    week.thursday["dinner"] = temp;
    temp = [listOfRecipes[Math.floor((Math.random() * listOfRecipes.length()) + 1)]];
    week.friday["dinner"] = temp;
    temp = [listOfRecipes[Math.floor((Math.random() * listOfRecipes.length()) + 1)]];
    week.saturday = temp;

    var sunday = new Date();
    var day = sunday.getDay(); // Get current day number, converting Sun. to 7
    if( day !== 0 )                // Only manipulate the date if it isn't Mon.
        sunday.setHours(-24 * (day - 1));   // Set the hours to day number minus 1
    week.startDate = sunday;
     
    var weekRefs = [userId + week.startDate];
    // Write to database
    // This will overwrite any existing week data                           
    this.weekRef.doc(userId + week.startDate).set(Object.assign({}, week));

    temp = [listOfRecipes[Math.floor((Math.random() * listOfRecipes.length()) + 1)]];
    week.sunday["dinner"] = temp;
    temp = [listOfRecipes[Math.floor((Math.random() * listOfRecipes.length()) + 1)]];
    week.monday["dinner"] = temp;
    temp = [listOfRecipes[Math.floor((Math.random() * listOfRecipes.length()) + 1)]];
    week.tuesday["dinner"] = temp;
    temp = [listOfRecipes[Math.floor((Math.random() * listOfRecipes.length()) + 1)]];
    week.wednesday["dinner"] = temp;
    temp = [listOfRecipes[Math.floor((Math.random() * listOfRecipes.length()) + 1)]];
    week.thursday["dinner"] = temp;
    temp = [listOfRecipes[Math.floor((Math.random() * listOfRecipes.length()) + 1)]];
    week.friday["dinner"] = temp;
    temp = [listOfRecipes[Math.floor((Math.random() * listOfRecipes.length()) + 1)]];
    week.saturday = temp;

    var nextWeek = date.getDate() - (date.getDay() - 1) + 6;
    week.startDate = nextWeek;

    weekRefs.add(userId + week.startDate);
    // Write to database
    // This will overwrite any existing week data                           
    this.weekRef.doc(userId + week.startDate).set(Object.assign({}, week));

    // Add the refs to the user's weeks
    this.userRef.doc(userId).set({weeks: weekRefs});

});
