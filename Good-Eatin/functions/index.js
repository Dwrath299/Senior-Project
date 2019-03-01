const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const cors = require('cors')({
    origin: true,
  });

exports.generateMeals = functions.https.onRequest((req, res) => {
   
    var db = admin.firestore();
    const recipeRef = db.collection("recipes");
    const userRef = db.collection("users");
    const weekRef = db.collection("weeks");
    // The usable list of recipes with private rating next to each.
    var listOfRecipes;
    // Get the userID from the parameters
    var userId = req.get("userId");
    console.log(userId);
    userRef.doc(userId).get().then(doc2 => {
        var listOfRecipeRefs = doc2.data().recipes;
        return true;
    }).catch(error => {
        return error;
    });
     // Go through each recipe to get the 
     listOfRecipeRefs.forEach(recipeString => {
        recipeRef.doc(recipeString).get().then(doc => {
            var privateReviews = doc.data().privateReviews;
            // Creating a weighted list from the private review.
            for (var i = 0; i < privateReviews.get(userId); i++) {
                listOfRecipes.add(recipeString);
            }
            return true;
            
        }).catch(error => {
            return error;
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
    

    return cors(req, res, () => { let success = true });

});
