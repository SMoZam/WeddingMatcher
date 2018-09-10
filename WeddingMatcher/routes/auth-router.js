const express = require('express');

const router = express.Router();

const bcrypt = require("bcrypt");

const Guest = require("../models/guest-model.js")

// const passport = require("passport");



router.post("/process-signup", (req, res, next) => {
    const { firstName, lastName, birthday, gender, email, originalPassword } = req.body;

    const encryptedPassword = bcrypt.hashSync(originalPassword, 10);

    Guest.create({ firstName, lastName, birthday, gender, email, encryptedPassword })
        .then(userDoc => {
            req.flash("success", "Sign Up success");
            res.redirect("/");
        })
        .catch(err => next(err))

})


router.post("/process-login", (req, res, next) => {

    const { email, originalPassword } = req.body;

    Guest.findOne({ email: { $eq: email } })
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
                res.redirect("login");
                return;
            }
            res.redirect("/")

        })
        .catch(err => next(err))

})

router.get("/login", (req, res, next) => {

    res.render("auth-views/login-form.hbs")
})



module.exports = router;