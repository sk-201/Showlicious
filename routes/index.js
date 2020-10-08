const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
//HOmepage
router.get("/", function (req, res) {
  res.render("Homepage");
});
//Sign UP route
router.get("/register", (req, res) => {
  res.render("register");
})
//Handling User Info
router.post("/register", (req, res) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        req.flash("error", err.message);
        res.redirect('/register');
      }
      passport.authenticate("local")(req, res, () => {
        req.flash("success","Welcome to Showlicious");
        res.redirect("/shows");
      });
    }
  );
});
//LogIn route
router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", passport.authenticate("local", {
  successRedirect: "/shows",
  failureRedirect: "/login"
}), (req, res) => {

})
//Logout ROute 
router.get("/logout", (req, res) => {
  req.logout();
  req.flash("success","Logged You Out!");
 
  res.redirect("/shows");
})

module.exports = router;
