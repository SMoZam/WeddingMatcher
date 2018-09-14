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

                if (String(el.owners[0]._id) == String(req.user._id)) {
                    el.pictureUrl = el.owners[1].avatar;

                } else {
                    el.pictureUrl = el.owners[0].avatar;
                }


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
            res.redirect(`/conversations/${conversationId}`);
        })
        // "next()" means show the error page
        .catch(err => next(err));
});

router.get("/add-conversation/:interlocutorId", (req, res, next) => {
    // get the ID from the URL (it's inside of "req.params")
    const { interlocutorId } = req.params;


    const conversationData = {
        owners: [ObjectId(req.user._id), ObjectId(interlocutorId)],
    }

    Conversation.find(conversationData)
        .then(result => {
            console.log("this is result");
            console.log(result.length);
            if (result.length == 0) {
                Conversation.create(conversationData)
                    .then(userResults => {
                        console.log(`created ${userResults}`);

                    })
                    .catch(err => next(err));
            }
            res.redirect('/conversations')
        })
        .catch(err => next(err));



});



router.get("/conversations/:conversationId", (req, res, next) => {
    const { conversationId } = req.params;
    Conversation.findById(conversationId)
        .populate("owners")
        .populate("messages.user")
        .then(conversationResultArray => {
            //This is for changing the class of the messages
            //checking the user who created the message 
            //if it's req.user._id then it is a sent message, else it's received
            for (var i = 0; i < conversationResultArray.messages.length; i++) {
                if (String(conversationResultArray.messages[i].user._id) == String(req.user._id)) {
                    conversationResultArray.messages[i].class = "sent";
                } else {
                    conversationResultArray.messages[i].class = "received";
                }
            };

            if (String(conversationResultArray.owners[0]._id) == String(req.user._id)) {
                conversationResultArray.pictureUrl = conversationResultArray.owners[1].avatar;

            } else {
                conversationResultArray.pictureUrl = conversationResultArray.owners[0].avatar;
            }

            res.locals.oneConversationArray = conversationResultArray;
            res.render("conversations/one-conversation.hbs")
        })
        .catch(err => next(err))
})




module.exports = router;