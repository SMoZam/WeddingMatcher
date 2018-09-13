const express = require('express');
const bcrypt = require("bcrypt");
const passport = require("passport");

const User = require("../models/user-model.js");

const Wedding = require("../models/wedding-model.js");

const Conversation = require("../models/conversation-model.js");

const ObjectId = require("mongoose").Types.ObjectId;

const router = express.Router();



router.get("/conversations", (req, res, next) => {

    Conversation.find({ "owners": ObjectId(req.user._id) })
        .populate("owners")
        .populate("messages.user")
        .then(conversationResultArray => {
            conversationResultArray.forEach(el => {
                for (var i = 0; i < el.messages.length; i++) {
                    if (String(el.messages[i].user._id) == String(req.user._id)) {
                        el.messages[i].class = "sent";
                    } else {
                        el.messages[i].class = "received";
                    }
                }
            });
            res.locals.fullConversationArray = conversationResultArray;
            res.render("conversations/conversations.hbs")
        })
        .catch(err => next(err))
})




router.post("/add-message/:conversationId/process-message", (req, res, next) => {
    // get the ID from the URL (it's inside of "req.params")
    const { conversationId } = req.params;
    // make variables from the inputs inside "req.body"
    // (we use "req.body" because it's a POST form submission)
    const { text } = req.body;


    // save input variables in our book update
    Conversation.findByIdAndUpdate(
            conversationId, // which document(s)?
            { $push: { messages: { user: ObjectId(req.user._id), text, created: Date.now() } } }, // what changes?
            { runValidators: true } // additional settings
        )
        .then(bookDoc => {
            // redirect if it's successful to avoid duplicating the submission
            res.redirect("/conversations");
        })
        // "next()" means show the error page
        .catch(err => next(err));
});



module.exports = router;