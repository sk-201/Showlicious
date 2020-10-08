const express = require("express");
const router = express.Router();
const Show = require("../models/show");
const middleware = require("../middleware/index");
//index route
router.get("/shows", function (req, res) {
    Show.find({}, function (err, show) {
        if (err) {
            console.log("ERROR");
        } else {
            res.render("shows/index", { show: show });
        }
    })
});
//New route
router.get("/shows/new", middleware.islogged, function (req, res) {
    res.render("shows/new");
});
//Create route    
router.post("/shows", middleware.islogged, function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.desc;
    var user = {
        id: req.user._id,
        username: req.user.username
    }

    var newShow = { name: name, image: image, desc: desc, user: user };
    Show.create(newShow, function (err, show) {
        if (err) {
            req.flash("error","Something went Wrong!");
        } else {
            req.flash("success","New Show Created");
            res.redirect("/shows");
        }
    })
})
//Show Route 
router.get("/shows/:id", (req, res) => {
    Show.findById(req.params.id).populate("comment").exec((err, fshow) => {
        if (err) {
            console.log(err);
        } else {
            res.render("shows/show", { show: fshow });
        };
    })
});
//Edit ROute
router.get("/shows/:_id/edit", middleware.checkOwnerShow, (req, res) => {
    Show.findById(req.params._id, (err, fshow) => {
        if (err) {
            console.log(err);
        }
        res.render("shows/edit", { show: fshow });
    })
});

//UPDATE ROUTE
router.put("/shows/:_id", middleware.checkOwnerShow, (req, res) => {
    Show.findByIdAndUpdate(req.params._id, req.body.show, (err, newShow) => {
        if (err) {
            console.log(err);
        }else{
        req.flash("success","Show edited Successfully!");
        res.redirect("/shows/" + req.params._id);
        }
    });
});
//DESTROY ROUTE
router.delete("/shows/:_id", middleware.checkOwnerShow, (req, res) => {
    Show.findByIdAndRemove(req.params._id, (err) => {
        if (err) {
            console.log(err);
        }else{
            req.flash("error","Deleted");
            res.redirect("/shows");
        }      
    });
});
module.exports = router;