const Comment = require("../models/comment");
const Show = require("../models/show");
const middleware = {

}
middleware.checkOwnerShow = function (req, res, next) {
    if (req.isAuthenticated()) {
        Show.findById(req.params._id, (err, fshow) => {
            if (err) {
                console.log(err);
                req.flash("error"," Show Not Found");
            }
            if (fshow.user.id.equals(req.user._id)) {
                next();
            } else{
                req.flash("error","Access Denied");
                res.redirect("back");
            }  
            })
    } else{
        req.flash("error","You need to LogIn first");   
        res.redirect("back");
    }
    }
middleware.islogged = function (req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error","You need to LogIn first!");
    res.redirect("/login");
}
middleware.checkOwnerComment = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.C_id, (err, fcomment) => {
            if (err) {
                req.flash("error","Not found");
            }
            if (fcomment.user.id.equals(req.user._id)) {
                next();
            } else{
            req.flash("error","Access Denied");
                res.redirect("back");
            }    
            })
    } else{
        req.flash("error","You need to LogIn first!");
        res.redirect("back");
    }
    }
module.exports = middleware;