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

exports.generateMeals = functions.https.onCall((data, context) => {
   
    var db = admin.firestore();
    // const recipeRef = db.collection("recipes");
    const userRef = db.collection("users");
    const weekRef = db.collection("weeks");

    // Get the userID from the parameters
    const userId = data.userId;
    var test = userRef.doc(userId).get().then(doc => {
        listOfRecipes = doc.data().recipes;
        weeks = doc.data().weeks;
        var week = {startDate: "", 
            sunday: {dinner: [], lunch: [], breakfast: []}, 
            monday: {dinner: [], lunch: [], breakfast: []}, 
            tuesday: {dinner: [], lunch: [], breakfast: []}, 
            wednesday: {dinner: [], lunch: [], breakfast: []}, 
            thursday: {dinner: [], lunch: [], breakfast: []}, 
            friday: {dinner: [], lunch: [], breakfast: []}, 
            saturday: {dinner: [], lunch: [], breakfast: []}
        };

        // Now select at random from the weighted list. For each day of the week.
        // Currenlt only supporting dinner, but easily can add other meals.
        var temp = [listOfRecipes[Math.floor((Math.random() * listOfRecipes.length))]];
        week.sunday.dinner = temp;
        temp = [listOfRecipes[Math.floor((Math.random() * listOfRecipes.length))]];
        week.monday.dinner = temp;
        temp = [listOfRecipes[Math.floor((Math.random() * listOfRecipes.length))]];
        week.tuesday.dinner = temp;
        temp = [listOfRecipes[Math.floor((Math.random() * listOfRecipes.length))]];
        week.wednesday.dinner = temp;
        temp = [listOfRecipes[Math.floor((Math.random() * listOfRecipes.length))]];
        week.thursday.dinner = temp;
        temp = [listOfRecipes[Math.floor((Math.random() * listOfRecipes.length))]];
        week.friday.dinner = temp;
        temp = [listOfRecipes[Math.floor((Math.random() * listOfRecipes.length))]];
        week.saturday.dinner = temp;
        console.log(Math.floor((Math.random() * listOfRecipes.length)));
        var now = new Date();
        var week_start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
   
        
        week.startDate = week_start.toISOString();

        var weekRefs = [userId + week.startDate];
        // Write to database
        // This will overwrite any existing week data        
        console.log(week);                  
        weekRef.doc(userId + week.startDate).set(week);

        temp = [listOfRecipes[Math.floor((Math.random() * listOfRecipes.length))]];
        week.sunday.dinner = temp;
        temp = [listOfRecipes[Math.floor((Math.random() * listOfRecipes.length))]];
        week.monday.dinner = temp;
        temp = [listOfRecipes[Math.floor((Math.random() * listOfRecipes.length))]];
        week.tuesday.dinner = temp;
        temp = [listOfRecipes[Math.floor((Math.random() * listOfRecipes.length))]];
        week.wednesday.dinner = temp;
        temp = [listOfRecipes[Math.floor((Math.random() * listOfRecipes.length))]];
        week.thursday.dinner = temp;
        temp = [listOfRecipes[Math.floor((Math.random() * listOfRecipes.length))]];
        week.friday.dinner = temp;
        temp = [listOfRecipes[Math.floor((Math.random() * listOfRecipes.length))]];
        week.saturday.dinner = temp;

        var next_week_start = new Date();
        week_start.setDate(next_week_start.getDate() + (0 + 7 - next_week_start.getDay()) % 7);

        week.startDate = next_week_start.toISOString();

        weekRefs[1] = (userId + week.startDate);
        // Write to database
        // This will overwrite any existing week data                           
        weekRef.doc(userId + week.startDate).set(week);

        // update the weeks in the user document.
        userRef.doc(userId).update({weeks: weekRefs});

        return listOfRecipes;
    
    }).catch(err => {
        console.log(err);
    });
    var result = test;
    return result;


});



exports.generateShoppingList = functions.https.onCall(async (data, context) => {
    var db = admin.firestore();
    var weeks = [{startDate: "", ingredients: [{name: "", amount: ""}]}, 
                {startDate: "", ingredients: [{name: "", amount: ""}]}];

    // const recipeRef = db.collection("recipes");
    const userRef = db.collection("users");
    const weekRef = db.collection("weeks");
    const shoppingListRef = db.collection("shoppingLists");
    // Get the userID from the parameters
    const userId = data.userId;
    var weeksIDs = await userRef.doc(userId).get().then(async (doc) => {
         return doc.data().weeks;
    
    }).catch(err => {
        console.log(err);
    });
    
    var tempWeek = await weekRef.doc(weeksIDs[0]).get().then(async (weekDoc) => {
      return weekDoc.data();
    }).catch(err => {
      console.log(err);
    });
    var list;
    weeks[0].startDate = tempWeek.startDate;
    list = await dayRecipes(tempWeek.sunday);
    for (var i = 0; i < list.length; i++){
      weeks[0].ingredients.push(list[i]);
    }
    list = await dayRecipes(tempWeek.monday);
    for (i = 0; i < list.length; i++){
      weeks[0].ingredients.push(list[i]);
    }
    list = await dayRecipes(tempWeek.tuesday);
    for (i = 0; i < list.length; i++){
      weeks[0].ingredients.push(list[i]);
    }
    list = await dayRecipes(tempWeek.wednesday);
    for (i = 0; i < list.length; i++){
      weeks[0].ingredients.push(list[i]);
    }
    list = await dayRecipes(tempWeek.thursday);
    for (i = 0; i < list.length; i++){
      weeks[0].ingredients.push(list[i]);
    }
    list = await dayRecipes(tempWeek.friday);
    for (i = 0; i < list.length; i++){
      weeks[0].ingredients.push(list[i]);
    }
    list = await dayRecipes(tempWeek.saturday);
    for (i = 0; i < list.length; i++){
      weeks[0].ingredients.push(list[i]);
    }
    console.log("weeks[0].ingredients" + weeks[0].ingredients);
    tempWeek = await weekRef.doc(weeksIDs[1]).get().then(async (weekDoc) => {
      return weekDoc.data();
    }).catch(err => {
      console.log(err);
    });
    weeks[1].startDate = tempWeek.startDate;
    list = await dayRecipes(tempWeek.sunday);
    for (i = 0; i < list.length; i++){
      weeks[1].ingredients.push(list[i]);
    }
    list = await dayRecipes(tempWeek.monday);
    for (i = 0; i < list.length; i++){
      weeks[1].ingredients.push(list[i]);
    }
    list = await dayRecipes(tempWeek.tuesday);
    for (i = 0; i < list.length; i++){
      weeks[1].ingredients.push(list[i]);
    }
    list = await dayRecipes(tempWeek.wednesday);
    for (i = 0; i < list.length; i++){
      weeks[1].ingredients.push(list[i]);
    }
    list = await dayRecipes(tempWeek.thursday);
    for (i = 0; i < list.length; i++){
      weeks[1].ingredients.push(list[i]);
    }
    list = await dayRecipes(tempWeek.friday);
    for (i = 0; i < list.length; i++){
      weeks[1].ingredients.push(list[i]);
    }
    list = await dayRecipes(tempWeek.saturday);
    for (i = 0; i < list.length; i++){
      weeks[1].ingredients.push(list[i]);
    }
    console.log("weeks[1].ingredients" + weeks[1].ingredients);  
  
  var shoppingListsRefs = [userId + weeks[0].startDate, userId + weeks[1].startDate]
  // Then upload this list of recipes to a shopping list collection
  console.log("weeks: " + weeks);
  shoppingListRef.doc(userId + weeks[0].startDate).set(weeks[0]);
  shoppingListRef.doc(userId + weeks[1].startDate).set(weeks[1]);
  // Update the user's references to the lists.
  userRef.doc(userId).update({shoppingLists: shoppingListsRefs});
  return shoppingListsRefs;

});

async function dayRecipes(day) {
      var output = [];
      var db = admin.firestore();
      var recipeRef = db.collection("recipes");
      var i;
      var result
      var results = [];
      for(i = 0; i < day.breakfast.length; i++) {
        results.push(recipeRef.doc(day.breakfast[i]).get().then( doc => {
          return doc.data().ingredients;
        }).catch(err => {
          console.log(err);
        }));
      }
     
      for(i = 0; i < day.lunch.length; i++) {
        results.push(recipeRef.doc(day.lunch[i]).get().then( doc => {
          return doc.data().ingredients;
        }).catch(err => {
          console.log(err);
        }));
      }
      
      for(i = 0; i < day.dinner.length; i++) {
        results.push(recipeRef.doc(day.dinner[i]).get().then( doc => {
          return doc.data().ingredients;
        }).catch(err => {
          console.log(err);
        }));
      }
      const response = await Promise.all(results);
      response.forEach(array => {
        array.forEach(object => {
          output.push(object);
        });
      });

      
      
      return output;

  }

  
