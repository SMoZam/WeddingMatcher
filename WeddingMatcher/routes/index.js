const express = require('express');

const User = require("../models/user-model.js");
const fileUploader = require("../config/file-uploader.js");

const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});


router.get("/user/:userId", (req, res, next) => {
  const { userId } = req.params;

  User.findById(userId)
  .then(userDoc => {
    res.locals.userItem = userDoc;
    res.render("profil-page.hbs");
  })
  // "next()" means show the error page
  .catch(err => next(err));
});


router.get("/settings", (req, res, next) => {
  if (!req.user) {
    req.flash("error", "You have to be logged to visit User Settings! 😤")
    res.redirect("/login");
  }
  res.render("settings-page.hbs");
});

router.post("/process-settings", fileUploader.single("avatarUpload"), (req, res, next) => {
  const { firstName, lastName, description, email, birthday } = req.body;

let avatar;
  if(req.file) {
  avatar = req.file.secure_url;
}

  User.findByIdAndUpdate(
    req.user._id, // get the logged in user's ID using Passport's "req.user"
    { $set: { firstName, lastName, description, avatar, email, birthday } },
    { runValidators: true, new: true },
  )
  .then(userDoc => {
    // save a flash message to display in the HOME page
    req.flash("success", "settings saved!");
    res.redirect(`user/${req.user._id}`);
  })
});


module.exports = router;
