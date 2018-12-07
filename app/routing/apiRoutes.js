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
}