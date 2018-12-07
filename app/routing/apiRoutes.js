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
  app.get("./api/friends", function (req, res) {
    res.json(friendData);
  });

  app.post('./api/friends', function(req, res) {
    var thisUser = req.body;
    var differences = [];

    if (friendData.length > 1) {
        friendData.forEach(function(user) {
            var totalDifference = 0;

            for (var i = 0; i < thisUser.answers.length; i++) {
                var otherAnswer = user.answers[i];
                var thisAnswer = thisUser.answers[i];
                var difference = +otherAnswer - +thisAnswer;
                totalDifference += Math.abs(difference);
            }

            differences.push(totalDifference);
        });

        var minimumDifference = Math.min.apply(null, differences);

        var bestMatch = [];

        for (var i = 0; i < differences.length; i++) {
            if (differences[i] === minimumDifference) {
                bestMatch.push(friendData[i]);
            }
        }

        res.json(bestMatch);
    } else {
        res.json(friendData);
    }

    friendData.push(thisUser);
  });
}