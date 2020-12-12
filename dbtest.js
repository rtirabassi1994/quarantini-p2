const connection = require("./config/connection");

class DB {
    getByName(likedDrink) {
        const query = "SELECT * FROM cocktails WHERE drinkName = ?;";
        connection.query(query,[likedDrink], (err, results) => {
            if(err) throw err;
            else {
                if(results.length <= 0) {
                    console.log("No such drink in database");
                }
                else {
                    this.addLike(results);
                    results[0].numOfLikes += 1;
                }
            }
        });
    }

    addLike(drinkRow) {
        const query = "UPDATE cocktails SET numOfLikes = ? WHERE id = ?;";
        drinkRow[0].numOfLikes += 1;
        connection.query(query, [drinkRow[0].numOfLikes, drinkRow[0].id], (err, results) => {
            if(err) throw err;
            else {
                console.log("Liked!");
            }
        });
    }

    async saveDrink(drinkObj) {
        console.log(drinkObj.length);
        for(var i = 0; i < drinkObj.length; i++) {
            const query = "INSERT INTO savedDrinks(drinkName, apiDrinkId) VALUES(?,?);";
            await connection.query(query,[drinkObj[i].name, drinkObj[i].id], function(err, results) {
                if(err) throw err;
                else {
                    console.log(results);
                }
                
            });
        }

    }

    async showSaved() {
        return new Promise(function(resolve, reject) {
            var drinkIds;
            const query = "SELECT apiDrinkId FROM savedDrinks;";
            connection.query(query,function(err, result) {
                if(err) throw err;
                else {
                    if(result) {
                        drinkIds = result.map((ids) => ids.apiDrinkId);
                        resolve(drinkIds);
                    }
                }
            });
        }).then(function(response) {
            return response;
        }).catch(function(err) {
            console.log(err);
        });

    }

    async createUser(user) {
        const query = "INSERT INTO users(userName) VALUES (?);";
        connection.query(query, [user.userName], function(err, res) {
            if(err) throw err;
            else {
                console.log(res.insertId);
                console.log(user.password);
                const passQuery = "INSERT INTO passwords(password,usersId) VALUES (?, ?);";
                connection.query(passQuery, [user.password, res.insertId], function(err, result) {
                    console.log(result);
                })
            }
        });
    }
    

    async deleteDrink(drinkId) {
        console.log(drinkId);
        console.log("THIS IS THE DRINKOBJ IN DBTEST")
        const query = "DELETE FROM savedDrinks WHERE apiDrinkId = ?;";
        connection.query(query, [drinkId], function(err, results) {
            console.log(results);
        });
    }

    async checkIfDrinkExists(drinkId) {
        return new Promise(function(resolve, reject) {
            const query = "SELECT COUNT(apiDrinkId) AS apiDrinkId FROM savedDrinks WHERE apiDrinkId = ?;";
            return connection.query(query, [drinkId], function(err, results) {
                // console.log(results[0].apiDrinkId);
                resolve(results[0]);
            });
        })
        // console.log(drinkId);
        // console.log("THIS IS THE DRINKID IN DBTEST")

    }


}

module.exports = DB;