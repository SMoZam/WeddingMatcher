const express = require('express');
const bcrypt = require("bcrypt");
const passport = require("passport");

const User = require("../models/user-model.js")

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
                req.flash("success", "You're logged in");
                // console.log(userDoc.email)
                res.redirect("/logged-home")
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
    res.render("logged-home-page.hbs");
})



module.exports = router;