var express = require("express");
var path = require("path");
var router = express.Router();
var nodemailer = require("nodemailer");
var apiCall = require("./api/apiCallTest");
const API = require("./api/apiServices");
const api = new API;
const DB = require("../dbtest");
const { constants } = require("buffer");
const { response } = require("express");
const db = new DB;
var savedDrinksHtml;

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
      user: 'quarantiniresponse',
      pass: 'Quarantini528491'
  }
});

router.get("/", function(req, res) {
  apiCall.featuredDrinks().then(function(featuredDrinks) {
    console.log("FEATURED DRINKS");
    res.status(200).render("index", {featuredDrinks});
  });

});
router.get("/top5", function(req, res) {
  apiCall.getTop5().then(function(top5Drinks) {
    for(var i = 0; i < top5Drinks.length; i++) {
      top5Drinks[i].top5 = true;
    }
    console.log(top5Drinks);
    console.log("TOP5DRINKS IN TOP5 ROUTE");
    res.status(200).render("index", {top5Drinks});
  });
});

  router.get("/api/ingredients/:filterKeyword", function(req, res) {
    var ingredientName = req.params.filterKeyword;
    apiCall.filterByIngredient(ingredientName).then(function(drinks) {
      console.log(drinks);
      console.log("THIS IS THE DRINKS FROM API/INGREDIENTS ROUTE");
      res.status(200).render("index", {searchByIngredient: drinks});
    });
  });
  
  router.get("/api/cocktails/:filterKeyword", function(req, res) {
    var drinkName = req.params.filterKeyword;
    var searchByDrinkName = [];
    apiCall.filterByDrinkName(drinkName).then(function(drink) {
      searchByDrinkName = drink;
      console.log({searchByDrinkName});
      res.status(200).render("index", {searchByDrinkName});
    });
  });
  
  router.get("/api/shots/:filterKeyword", function(req, res) {
    var ingredientName = req.params.filterKeyword;
    var searchByIngredient = {};
    apiCall.filterByIngredient(ingredientName).then(function(response) {
      searchByIngredient = response;
      console.log(searchByIngredient);
      res.status(200).render("index", {searchByIngredient});
    });
  });
 
  router.get("/api/punch_partyDrink/:filterKeyword", function(req, res) {
    var ingredientName = req.params.filterKeyword;
    var searchByIngredient = {};
    apiCall.filterByIngredient(ingredientName).then(function(response) {
      searchByIngredient = response;
      res.status(200).render("index", {searchByIngredient});
    });
  });

  router.post("/api/drinks/create", function(req, res) {
    const drinkId = req.body.drinkId;
    console.log(drinkId);
    apiCall.filterByDrinkId([drinkId]).then(function(drinkObj) {
      console.log(drinkObj);
      db.saveDrink(drinkObj).then(function() {
        res.status(200).render("");
      });
    });
  });

  router.get("/db/savedDrinks",function(req, res) {
    console.log(res);
    db.showSaved()
    .then(function(drinkIds) {
      console.log(drinkIds);
          apiCall.filterByDrinkId(drinkIds).then(function(savedDrinkDetails) {
            if(savedDrinkDetails.length <= 0) {
              res.render("index", {noResults: true})
            }
            else {
              console.log(savedDrinkDetails.length);
              console.log({savedDrinkDetails});
              savedDrinkDetails.top5 = false;
              res.status(200).render("index",{savedDrinkDetails}, function(err, html) {
                console.log(html);
                savedDrinksHtml = html;
                res.render("index",{savedDrinkDetails})
              });
            }

          });
    });
  });
  
  router.get("/drinkDetails/:drinkId", function(req, res) {
    var drinkIds = [];
    console.log(req.params.drinkId);
    drinkIds.push(req.params.drinkId);
    if(drinkIds) {
    apiCall.filterByDrinkId(drinkIds).then(function(drinkDetails) {
      console.log(drinkDetails);
      res.status(200).render("index", {drinkDetails});
    });
  }
  });

  router.get("/login", function(req, res) {
    res.render("index", {login: true});
  });

  router.get("/createAccount", function(req, res) {
    res.render("index", {login: true});
  });

  router.get("/createAccount/:userName/:password", function(req, res) {
    var user = {
      userName: req.params.userName,
      password: req.params.password
    }
    db.createUser(user);
  });

  router.get("/email", function(req, res) {
    console.log("hello");
    res.render("index", {email: true});
  });

  router.get("/email/:userEmail", function(req, res) {
    console.log(req.params.userEmail);
    var mailOptions = {
      from: "quarantiniresponse@gmail.com",
      to: req.params.userEmail,
      subject: "Your saved drinks from Quaran-Tini!",
      text: "That was easy!",
      html: savedDrinksHtml
    };

    transporter.sendMail(mailOptions, function(err, info) {
      if (err) {
        console.log(err)
      }
      else {
        console.log("Email sent: " + info.response);
        res.render("index");
      }
    });

  });


  router.get("/test", function(req, res, next) {
    console.log(req)
    next();
  })

  router.get("/test",function(req, res) {
  });

  router.get("/search/drinkDetails/:drinkName",function(req,res) {
    // console.log(req.params.drinkName);
    var drinkName = req.params.drinkName;
    // console.log(drinkName);
    apiCall.filterByDrinkName(drinkName)
    .then(function(drinkObj) {
      // console.log(drinkObj[0]);
      var drinkDetails = [drinkObj[0]]
      // console.log({drinkDetails});
      res.render("index", {drinkDetails})
    });
  });

  router.post("/api/drinks/delete", function(req, res) {
    console.log(req.body.drinkId);
    console.log("THIS IS THE REQ.BODY");
    db.deleteDrink(req.body.drinkId).then(function() {
      res.render("");
    })
  });


module.exports = router;