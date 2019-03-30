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
            daysOfWeek: [{dinner: [], lunch: [], breakfast: []}, 
             {dinner: [], lunch: [], breakfast: []}, 
             {dinner: [], lunch: [], breakfast: []}, 
             {dinner: [], lunch: [], breakfast: []}, 
             {dinner: [], lunch: [], breakfast: []}, 
             {dinner: [], lunch: [], breakfast: []}, 
             {dinner: [], lunch: [], breakfast: []}]
        };

        // Now select at random from the weighted list. For each day of the week.
        // Currenlt only supporting dinner, but easily can add other meals.
        for(var i = 0; i < 7; i++) {
          var temp = [listOfRecipes[Math.floor((Math.random() * listOfRecipes.length))]];
          week.daysOfWeek[i].dinner = temp;
        }
        var now = new Date();
        var week_start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
   
         
        week.startDate = week_start.toISOString();
        console.log(userId + week.startDate);
        var weekRefs = [userId + week.startDate];
        // Write to database
        // This will overwrite any existing week data        
                         
        weekRef.doc(userId + week.startDate).set(week);
        // Do it again for the next week
        for(i = 0; i < 7; i++) {
          temp = [listOfRecipes[Math.floor((Math.random() * listOfRecipes.length))]];
          week.daysOfWeek[i].dinner = temp;
        }


        next_week_start = new Date(now.getFullYear(), now.getMonth(), now.getDate() + (7 - (now.getDay() % 7)));
        week.startDate = next_week_start.toISOString();
        console.log(userId + week.startDate); 
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
    var weeks = [{startDate: "", ingredients: []}, {startDate: "", ingredients: []}];

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
    var result = [];
    console.log(tempWeek);
    for (var i = 0; i < 7; i++) {
      result.push(dayRecipes(tempWeek.daysOfWeek[i]));
    }
    var list = await Promise.all(result);
    console.log("list: " + list);
    console.log("list1: " + list[1]);
    for (i = 0; i < list.length; i++) {
      for (var j = 0; j < list[i].length; j++){
        weeks[0].ingredients.push(list[i][j]);
        console.log("weeks[0].ingredients: " + list[i][j]);
      }
    }

    weeks[0].ingredients.sort();
    weeks[0].startDate = tempWeek.startDate;
    tempWeek = await weekRef.doc(weeksIDs[1]).get().then(async (weekDoc) => {
      return weekDoc.data();
    }).catch(err => {
      console.log(err);
    });
    result = [];
    for (i = 0; i < 7; i++) {
      result.push(dayRecipes(tempWeek.daysOfWeek[i]));
    }
    list = await Promise.all(result);
    for (i = 0; i < list.length; i++) {
      for (j = 0; j < list[i].length; j++){
        weeks[1].ingredients.push(list[i][j]);
      }
    }
    weeks[1].startDate = tempWeek.startDate;
    weeks[1].ingredients.sort();
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
          object.checked = false;
          output.push(object);
        });
      });

      
      
      return output;

  }


  /*const nodemailer = require('nodemailer');
  // Configure the email transport using the default SMTP transport and a GMail account.
  // For Gmail, enable these:
  // 1. https://www.google.com/settings/security/lesssecureapps
  // 2. https://accounts.google.com/DisplayUnlockCaptcha
  // For other types of transports such as Sendgrid see https://nodemailer.com/transports/
  // TODO: Configure the `gmail.email` and `gmail.password` Google Cloud environment variables.
  const gmailEmail = functions.config().gmail.email;
  const gmailPassword = functions.config().gmail.password;
  const mailTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailEmail,
      pass: gmailPassword,
    },
  });
  const APP_NAME = 'Good Eatin Meal Planner';

  exports.sendContactEmail = functions.auth.user().onCreate((message) => {
    // [END onCreateTrigger]
      // [START eventAttributes]
      const text = message.text; // The email of the user.
      const name = message.firstName + ' ' + message.lastName;
      const userID = message.userID; // The display name of the user.
      const email = message.email;
      // [END eventAttributes]
    
      return sendContactEmail(userID, name, text, email);
  });

  async function sendContactEmail(userID, name, text, email) {
    const mailOptions = {
      from: `${APP_NAME} <noreply@firebase.com>`,
      to: 'Dwrath299@gmail.com',
    };
  
    // The user subscribed to the newsletter.
    mailOptions.subject = `Message from a user!`;
    mailOptions.text = 'From UserID: ' + userID + ': ' + 
                      name + '/n' + text + '/n' + ' Return email: ' + email;
    await mailTransport.sendMail(mailOptions);
    console.log('New contact message sent.');
    return null;
  }*/
    


  
