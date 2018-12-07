// DEPENDENCIES
// ===============================================================================
var path = require("path");

// LOAD DATA
// ===============================================================================
var friendData = require("../data/friends");

// ROUTING
// ===============================================================================

module.exports = function (app) {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // ---------------------------------------------------------------------------
  app.get("/api/friends", function (req, res) {
    res.json(friendData);
  })

  app.post("/api/friends", function(req, res) {
    var userInput = req.body;
      var userResponse = userInput.scores;
      var match = {
        name: "",
        photo: "",
        difference: 500
      };

      for (var i = 0; i < friendData.length; i++) {
        var totalDifference = 0;
        for (var j = 0; j < userResponse.length; j++) {
          totalDifference += Math.abs(friendData[i].scores[j] - userResponse[j]);
          
          if (totalDifference <= match.difference){
              match.name = friendData[i].name;
              match.photo = friendData[i].photo;
              match.difference = totalDifference;
          }
        }
      }

      friendData.push(userInput);
      res.json(match);

    });
  };