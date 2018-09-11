const express = require("express");

const Wedding = require("../models/wedding-model.js");

const router = express.Router();


router.get("/my-wedding", (req, res, next) => {
  // if you're not login
  if (!req.user) {
    req.flash("error", "You must be logged in to see your wedding.");
    res.redirect("/login");
    return;
  }

  // Find weddings owned by the logged in user
  Wedding.find({ guestList: { $eq: req.user._id } })
    .sort({ createdAt: -1 }) // use ".sort()" to order results (-1 for reverse)
    .then(weddingResults => {
      res.locals.weddingArray = weddingResults;
      res.render("wedding-views/wedding-list.hbs");
    })
    .catch(err => next(err));
});


router.get("/wedding/add", (req, res, next) => {
  if (!req.user) {
    res.flash("error", "You must be logged in to add a wedding.");
    req.redirect("/login");
  }
  else{
    res.render("wedding-views/wedding-form.hbs");
  }
});

router.post("/process-wedding", (req, res, next) => {
  const { name, description, pictureUrl } = req.body;
  const guestList = req.user._id;

  Wedding.create({ name, description, pictureUrl, guestList })
    .then(roomDoc => {
      req.flash("success", "Wedding created successfully!");
      res.redirect("/my-wedding");
    })
    .catch(err => next(err));
});


module.exports = router;