const inquirer = require("inquirer");
const API = require("./apiServices");
const api = new API;
var axios = require("axios").default;
var response;
var drinksTable;
var searchTable = [];
async function getTop5() {
  var options = {
    method: 'GET',
    url: 'https://the-cocktail-db.p.rapidapi.com/popular.php',
    headers: {
      'x-rapidapi-key': '1fb5bf74ddmsh5f6ba0a2a786e4bp19be3ejsn84732bde066a',
      'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com'
    }
  };
  return await axios.request(options).then(function(results){
    var drinksTable = results.data.drinks;
    var drinkIds = [];
      var drinks = [];
      var drinkNames = [];
      for(var i = 0; i < 5; i++) {
          var drinkObj = {
              drinkId: drinksTable[i].idDrink,
              drinkName: drinksTable[i].strDrink
          }
          drinkIds.push(drinksTable[i].idDrink);
          drinkNames.push(drinksTable[i].strDrink);
          drinks.push(drinkObj);
      }
 
      var counter = 0;
      drinkNames.forEach(function(drink) {
        counter++;
        console.log(counter + ") " + drink);
      });
      console.log(drinkIds);
      return filterByDrinkId(drinkIds).then(function(response) {
        return response;
      });
  })
  
}
async function searchIngredientName(ingredientName) {
  var options = {
  method: 'GET',
  url: 'https://the-cocktail-db.p.rapidapi.com/search.php',
  params: {i: ingredientName},
  headers: {
    'x-rapidapi-key': '1fb5bf74ddmsh5f6ba0a2a786e4bp19be3ejsn84732bde066a',
    'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com'
  }
  };
  await axios.request(options).then(function (response) {
  return searchTable = response.data;
  });
  return searchTable;
  }

  // filterByIngredient();
  async function filterByIngredient(ingredientName) {
    searchTable = [];
    var options = {
      method: 'GET',
      url: 'https://the-cocktail-db.p.rapidapi.com/filter.php',
      params: {i: ingredientName},
      headers: {
        'x-rapidapi-key': '1fb5bf74ddmsh5f6ba0a2a786e4bp19be3ejsn84732bde066a',
        'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com'
      }
    };
    await axios.request(options).then(function (response) {
      console.log(response.data.drinks);
      var drinkObj = response.data.drinks;
      for(var i = 0; i < response.data.drinks.length; i++) {
        console.log(response.data.drinks[i].strDrink);
        var drinkDetails = {
          id: drinkObj[i].idDrink,
          name: drinkObj[i].strDrink,
          image: drinkObj[i].strDrinkThumb
        }
        // console.log(drinkDetails);
        // console.log("THIS IS THE DRINKDETAILS IN THE FOR LOOP")
        searchTable.push(drinkDetails);
      }
      // console.log(searchTable);
      // console.log("THIS IS THE SEARCHTABLE BEFORE THE END OF FILTERBYINGREDIENT")
      return searchTable;
    });
    // console.log(searchTable);
    // console.log("THIS IS THE SEARCHTABLE AT THE END OF FILTERBYINGREDIENT")
    return searchTable;
  }

  async function filterByDrinkName(drinkName) {
var options = {
  method: 'GET',
  url: 'https://www.thecocktaildb.com/api/json/v1/1/search.php',
  params: {s: drinkName},
  headers: {
    'x-rapidapi-key': '2fd9fe7e66msh451a62629ec6d5cp148f77jsnc954c105156a',
    'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com'
  }
};
var drinks = []
await axios.request(options).then(function (response) {
  console.log(response.data);
  var drinkObj = response.data.drinks;
  console.log(drinkObj);
  console.log("REMEMBER REMEMBER THE 5TH OF NOVEMBER");

  for(var i = 0; i < drinkObj.length; i++) {

  var drinkDetails = {
    id: drinkObj[i].idDrink,
    name: drinkObj[i].strDrink,
    instructions: drinkObj[i].strInstructions,
    ingredients: [],
    measurements: []
  }
  
  for(propt in drinkObj[i]) {
    // console.log(drinkObj[i][propt]);
    // console.log(drinkObj[i][propt]);
    // console.log("THIS IS THE DRINKOBJ IN THE FOR LOOP");
    if(propt.includes("strDrinkThumb")) {
      // console.log(drinkObj[i][propt]);
      // console.log("THIS IS THE DRINK IMAGE IN THE FOR LOOP")
      drinkDetails.image = drinkObj[i][propt]
    }
    if(propt.includes("strIngredient")) {
      // console.log(drinkObj[i][propt]);
      // console.log("BEFORE THE IF STATEMENT!!!!!!!!!!!!");
      if(drinkObj[i][propt] != null && drinkObj[i][propt]) {
        console.log(drinkObj[i][propt]);
        console.log("THIS IS THE DRINK INGREDIENT IN THE FOR LOOP")
        drinkDetails.ingredients.push(drinkObj[i][propt])
      }
    }
    if(propt.includes("strMeasure")) {
      if(drinkObj[i][propt] != null) {
        // console.log(drinkObj[i][propt]);
        // console.log("THIS IS THE DRINK MEASUREMENTS IN THE FOR LOOP")
        drinkDetails.measurements.push(drinkObj[i][propt]);
      }
    }
  }
  drinks.push(drinkDetails);
}
  // console.log(drinks);
  // console.log("THIS IS THE DRINKS IN THE FOR LOOP APICALLTEST");
  return drinks;
});

// console.log(drinks);
// console.log("THIS IS THE DRINKS ARRAY");
return drinks;
}


async function featuredDrinks() {
  var options = {
    method: 'GET',
    url: 'https://www.thecocktaildb.com/api/json/v1/1/random.php',
    headers: {
      'x-rapidapi-key': '2fd9fe7e66msh451a62629ec6d5cp148f77jsnc954c105156a',
      'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com'
    }
  };
  var featuredDrinksArray = [];
  for(var i = 0; i < 5; i++) {
    await axios.request(options).then(function (response) {
      featuredDrinksArray.push(response.data.drinks[0]);
    });
  }

  return featuredDrinksArray;
}
  function like(response) {
      var drinksTable = response.data.drinks;
      var drinks = [];
      var drinkNames = [];
      for(var i = 0; i < drinksTable.length; i++) {
          var drinkObj = {
              drinkId: drinksTable[i].idDrink,
              drinkName: drinksTable[i].strDrink
          }
          drinkNames.push(drinksTable[i].strDrink);
          drinks.push(drinkObj);
      }
      questions.likedDrinks[0].choices = drinkNames;
      inquirer.prompt(questions.likedDrinks).then(function(answer) {
        db.getByName(answer.likeDrink);
      });
  }


  async function filterByDrinkId(drinkIds) {
    console.log(drinkIds);
    console.log("THESE ARE THE DRINKIDS LOGGED IN FILTERBYDRINKID FUNCTION")
    var options = {
      method: 'GET',
      url: 'https://the-cocktail-db.p.rapidapi.com/lookup.php',
      headers: {
        'x-rapidapi-key': '1fb5bf74ddmsh5f6ba0a2a786e4bp19be3ejsn84732bde066a',
        'x-rapidapi-host': 'the-cocktail-db.p.rapidapi.com'
      }
    };
    var promises =[];
    for(var j = 0; j < drinkIds.length; j++) {
      options.params = {i: drinkIds[j]};
      promises.push(axios.request(options));
    }
  
    return await Promise.all(promises).then(function(response) {
    const drinks = response.map((res) => res.data.drinks[0]);
      var drinkDetails = [];
      drinks.forEach((drink) => {
        var currentDrink = {
          id: drink.idDrink,
          name: drink.strDrink,
          image: drink.strDrinkThumb,
          instructions: drink.strInstructions,
          ingredients: [],
          measurements: []
        };
        for(var propt in drink) {
          if(propt.includes("strIngredient")){
            if(drink[propt]) {
              currentDrink.ingredients.push(drink[propt]);
            }
          }
          else if(propt.includes("strMeasure")){
            if(drink[propt]) {
              currentDrink.measurements.push(drink[propt]);
            }
          }
        }
        drinkDetails.push(currentDrink);
      });
      return drinkDetails;
    }).catch(function(err) {
      console.log(err);
    })
  }

module.exports = {getTop5, searchIngredientName, filterByIngredient, filterByDrinkName, featuredDrinks,filterByDrinkId };