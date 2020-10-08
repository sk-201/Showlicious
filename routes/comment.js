const express = require("express");
const router = express.Router();
const Show = require("../models/show");
const Comment = require("../models/comment");
const middleware = require("../middleware/index")

//  New Route
router.get("/shows/:id/comments/new", middleware.islogged, (req, res) => {
    Show.findById(req.params.id, (err, show) => {
        if (err) {
            console.log(err);
            res.redirect("/shows");
        } else {
            res.render("comment/new", { show: show });
        }
    })
})
//Create Route  
router.post("/shows/:id/comments", middleware.islogged, function (req, res) {
    Show.findById(req.params.id, (err, show) => {
        if (err) {
            console.log(req.params);
            console.log(err);
            res.redirect("/shows");
        } else {
            Comment.create(req.body.newcomment, function (err, comment) {
                if (err) {
                    console.log("ERROR");
                } else {
                    //adding username and id to comment
                    comment.user.id = req.user._id;
                    comment.user.username = req.user.username;
                    comment.save();
                    show.comment.push(comment);
                    show.save();
                    req.flash("success","Comment Created!");
                    res.redirect("/shows/" + show._id);
                }
            })
        }
    })
});
//EDIT ROUTE
router.get("/shows/:id/comments/:C_id/edit", middleware.checkOwnerComment, (req, res) => {
    Show.findById(req.params.id, (err, fshow) => {
        if (err) {
            console.log(err);
        }
        Comment.findById(req.params.C_id, (err, fcomment) => {
            if (err) {
                console.log(err)
            }
            res.render("comment/edit", { show: fshow, comment: fcomment });
        })
    })
});
//UPDATE ROUTE
router.put("/shows/:id/comments/:C_id", middleware.checkOwnerComment, (req, res) => {
    Comment.findByIdAndUpdate(req.params.C_id, req.body.newcomment, (err, ucomment) => {
        if (err) {
            console.log(err);
        }
        req.flash("success","Comment Updated Successfully!!");
        res.redirect("/shows/" + req.params.id);
    })
});
//DESTROY ROUTE
router.delete("/shows/:id/comments/:C_id", middleware.checkOwnerComment, (req, res) => {
    Comment.findByIdAndRemove(req.params.C_id, (err) => {
        if (err) {
            console.log(err);
        }
        req.flash("error","Deleted");
        res.redirect("/shows/" + req.params.id);
    });
});
module.exports = router;