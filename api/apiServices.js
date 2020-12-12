var apiCall = require("./apiCallTest");

class API {
    async top5Drinks(response) {
      console.log(response.drinks);
      console.log("THIS IS RESPONSE.DRINKS IN APISERVICES");
        var drinksTable = response.drinks;
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
          return drinkIds;
      
    }
}

module.exports = API;