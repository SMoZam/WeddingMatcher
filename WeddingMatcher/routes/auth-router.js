const express = require('express');
const bcrypt = require("bcrypt");
const passport = require("passport");

const User = require("../models/user-model.js");

const Wedding = require("../models/wedding-model.js");

const ObjectId = require("mongoose").Types.ObjectId;

const router = express.Router();



router.post("/process-signup", (req, res, next) => {
    const { firstName, lastName, birthday, gender, email, originalPassword } = req.body;
    const encryptedPassword = bcrypt.hashSync(originalPassword, 10);
    User.create({ firstName, lastName, birthday, gender, email, encryptedPassword })
        .then(userDoc => {
            req.flash("success", "Sign Up success");
            res.redirect("/");
        })
        .catch(err => next(err))
})



router.get("/login", (req, res, next) => {
    res.render("auth-views/login-form.hbs")
})




router.post("/process-login", (req, res, next) => {
    const { email, originalPassword } = req.body;
    User.findOne({ email: { $eq: email } })
        .then(userDoc => {
            if (!userDoc) {
                // saving a flash message to display in the LOGIN page
                req.flash("error", "Wrong email");
                res.redirect("/login");
                return;
            }
            const { encryptedPassword } = userDoc;
            if (!bcrypt.compareSync(originalPassword, encryptedPassword)) {
                req.flash("error", "Wrong password");
                res.redirect("/login");
                return;
            }
            req.logIn(userDoc, () => {
                req.flash("success", "Sign Up success");
                res.redirect("/logged-home");
            })
        })
        .catch(err => next(err))
})




router.get("/logout", (req, res, next) => {
    // "req.logOut()" is a Passport method that removes the user ID from session
    req.logOut();
    req.flash("sucess", "Logged out successfully!");
    res.redirect("/");
})




router.get("/logged-home", (req, res, next) => {
    // res.render("logged-home-page.hbs");
    Wedding.find({ $or: [{ guestList: ObjectId(req.user._id) }, { owner: ObjectId(req.user._id) }] })
        .sort({ createdAt: -1 }) // use ".sort()" to order results (-1 for reverse)
        .then(weddingResults => {
            const createdWeddings = [];
            const myWeddings = [];
            for (var i = 0; i < weddingResults.length; i++) {
                if (String(weddingResults[i].owner) == String(req.user._id)) {
                    createdWeddings.push(weddingResults[i]);
                } else {

                    weddingResults[i].guestList.forEach(el => {
                        if (String(el) == String(req.user._id)) {
                            myWeddings.push(weddingResults[i]);
                        }
                    })
                }
            }
            res.locals.weddingArray = createdWeddings;
            res.locals.weddingListArray = myWeddings;
            res.render("logged-home-page.hbs");
        })
        .catch(err => next(err));

})




module.exports = router;