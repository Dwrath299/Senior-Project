const functions = require('firebase-functions');

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
    // Get the recipe list from the paramaters
    var listOfRecipeRefs = req.get("recipeList");
    // Get the userID from the parameters
    var userId = req.get("userId");
    // The usable list of recipes with private rating next to each.
    var listOfRecipes;
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
    // Now select at random from the weighted list. For each day of the week.
    this.weekRef.doc(userId).ref.get()
                        .then(doc => {
                                // This week doesn't exist!
                                if (!doc.exists) {

                                } else {

                                }
                            }

});
