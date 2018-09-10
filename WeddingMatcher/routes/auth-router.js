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
            // req.flash("success", "Sign Up success");
            res.redirect("/");
        })
        .catch(err => next(err))

})



module.exports = router;