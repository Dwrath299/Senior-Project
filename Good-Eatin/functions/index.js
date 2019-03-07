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

        var next_week_start = new Date(now.getFullYear(), now.getMonth(), now.getDate()+(8 - now.getDay()));

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

exports.generateShoppingList = functions.https.onCall((data, context) => {
    var db = admin.firestore();
    var weeks = [{startDate: "", ingredients:[]}, {startDate: "", ingredients:[]}];

    // const recipeRef = db.collection("recipes");
    const userRef = db.collection("users");
    const weekRef = db.collection("weeks");
    const shoopingListRef = db.collection("shoppingLists");
    var dayHolder;
    // Get the userID from the parameters
    const userId = data.userId;
    var test = userRef.doc(userId).get().then(doc => {
        listOfRecipes = doc.data().recipes;
        weeksIDs = doc.data().weeks;
        for (let i = 0; i < weeksIDs.length; i++) {
            let weekID = weeksIDs[i];
            weekRef.doc(weekID).ref.get().then( weekDoc => {
              console.log(weekID);
              weeks[i].startDate = weekDoc.data().startDate;
              // Get Sunday
              dayHolder = weekDoc.data().sunday;
              dayRecipes(dayHolder, recipeRef).then(value => {
                weeks[i].ingredients.push(...value);
              });
              // Get Monday
              dayHolder = weekDoc.data().monday;
              dayRecipes(dayHolder, recipeRef).then(value => {
                weeks[i].ingredients.push(...value);
              });
              // Get Tuesday
              dayHolder = weekDoc.data().tuesday;
              dayRecipes(dayHolder, recipeRef).then(value => {
                weeks[i].ingredients.push(...value);
              });
              // Get Wednesday
              dayHolder = weekDoc.data().wednesday;
              dayRecipes(dayHolder, recipeRef).then(value => {
                weeks[i].ingredients.push(...value);
              });
              // Get Thursday
              dayHolder = weekDoc.data().thursday;
              dayRecipes(dayHolder, recipeRef).then(value => {
                weeks[i].ingredients.push(...value);
              });
              // Get Friday
              dayHolder = weekDoc.data().friday;
              dayRecipes(dayHolder, recipeRef).then(value => {
                weeks[i].ingredients.push(...value);
              });
              // Get Saturday
              dayHolder = weekDoc.data().saturday;
              dayRecipes(dayHolder, recipeRef).then(value => {
                weeks[i].ingredients.push(...value);
              });
              console.log(weeks[i]);
            });
          };
        var shoppingListsRefs = [userId + weeks[0].startDate, userId + weeks[1].startDate]
        // Then upload this list of recipes to a shopping list collection
        shoppingListRef.doc(userId + weeks[0].startDate).set(weeks[0]);
        shoppingListRef.doc(userId + weeks[1].startDate).set(weeks[1]);
        // Update the user's references to the lists.
        userRef.doc(userId).update({shoppingLists: shoppingListsRefs});
        return listOfRecipes;
    
    }).catch(err => {
        console.log(err);
    });
    var result = test;
    return result;
});

var dayRecipes = async function(day, recipeRef) {
  return new Promise(function(resolve, reject) {
      let recipe;
      let output = [];
      for(let i = 0; i < day.breakfast.length; i++) {
        recipe = recipeRef.doc(day.breakfast[i]).ref.get().then( doc => {
          let r = [];
          r = doc.data().ingredients;
          return r;
        });
        let result = await recipe;
        output.push(...result);
      }
      for(let i = 0; i < day.lunch.length; i++) {
        recipe = recipeRef.doc(day.lunch[i]).ref.get().then( doc => {
          let r = [];
          r = doc.data().ingredients;
          return r;
        });
        let result = await recipe;
        output.push(...result);
      }
      for(let i = 0; i < day.dinner.length; i++) {
        console.log(day.dinner[i]);
        recipe = recipeRef.doc(day.dinner[i]).ref.get().then( doc => {
          let r = [];
          r = doc.data().ingredients;
          return r;
        });
        let result = await recipe;
        output.push(...result);
      }
      console.log(output);
      if ( output != null) {
        resolve(output);
      } else {
        reject(Error("It broke"));
      }
    });
  };
  
