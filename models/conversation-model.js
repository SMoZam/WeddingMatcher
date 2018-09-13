const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const conversationSchema = new Schema({

    pictureUrl: { type: String },

    owners: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        // required: true,
    }],
    messages: [{
        user: { type: Schema.Types.ObjectId, ref: "User" },
        text: { type: String, maxlength: 200 },
        class: { type: String },
        created: { type: Date },
    }, ]

}, {
    timestamps: true
});



const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;