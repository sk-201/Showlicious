const bodyParser = require("body-parser"),
    express = require("express"),
    app = express(),
    flash= require("connect-flash"),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    Show = require("./models/show"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    dotenv= require("dotenv");
dotenv.config();    
showsRoutes = require("./routes/shows")
commentRoutes = require("./routes/comment")
indexRoutes = require("./routes/index")
const port = process.env.PORT || 3000;
const url = process.env.MONGODB_URL;
mongoose.connect(url, { urlencoded: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => { console.log(err) });
//App Config

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(flash());
//Passport Config
app.use(require("express-session")(
    {
        secret: " ONE PIECE ",
        resave: false,
        saveUninitialized: false
    }
));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser()); //encrypt
passport.deserializeUser(User.deserializeUser()); //decrypt
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success= req.flash("success");
    next();
});
app.use(showsRoutes);
app.use(commentRoutes);
app.use(indexRoutes);
app.listen(port, () => {
    console.log("Server started at port 3000!");
}); 