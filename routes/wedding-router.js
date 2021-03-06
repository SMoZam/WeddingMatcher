const express = require("express");

const Wedding = require("../models/wedding-model.js");

const ObjectId = require("mongoose").Types.ObjectId;

const router = express.Router();


router.get("/my-wedding", (req, res, next) => {
    // if you're not login
    if (!req.user) {
        req.flash("error", "You must be logged in to see your wedding.");
        res.redirect("/login");
        return;
    }
    // Find weddings owned by the logged in user
    Wedding.find({ owner: { $eq: req.user._id } })
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
    } else {
        res.render("wedding-views/wedding-form.hbs");
    }
});



router.post("/process-wedding", (req, res, next) => {
    const { name, date, description, pictureUrl } = req.body;
    const owner = req.user._id;

    Wedding.create({ name, date, description, pictureUrl, owner })
        .then(roomDoc => {
            req.flash("success", "Wedding created successfully!");
            res.redirect("/my-wedding");
        })
        .catch(err => next(err));
});


router.get("/weddings", (req, res, next) => {
    // if you're not login
    if (!req.user) {
        req.flash("error", "You must be logged in to see your wedding.");
        res.redirect("/login");
        return;
    }
    Wedding.find({ "guestList": (req.user._id) })
        .then(result => {
            res.locals.weddingListArray = result;
            res.render("wedding-views/wedding-list.hbs");

        })
        .catch(err => next(err));
})


router.get("/wedding/:weddingId", (req, res, next) => {
    const { weddingId } = req.params;
  
    Wedding.findById(weddingId)
    .populate("guestList")
    .then(weddingDoc => {
      res.locals.weddingItem = weddingDoc;
      res.render("wedding-views/wedding-details.hbs");
    })
    .catch(err => next(err));
  });



module.exports = router;