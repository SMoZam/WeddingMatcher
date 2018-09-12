const mongoose = require("mongoose");

const passport = require("passport");

const router = require("../routes/auth-router");

const Schema = mongoose.Schema;

const weddingSchema = new Schema({

    name: { type: String, required: true },
    description: { type: String, required: true },
    pictureUrl: { type: String, required: true },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
        // required: true,
    },
    guestList: [{
        type: Schema.Types.ObjectId,
        ref: "User",
        // required: true,
    }],
}, {
    timestamps: true
});



weddingSchema.virtual("isOwned").get(function() {
    return this.owner === req.user;
})



const Wedding = mongoose.model("Wedding", weddingSchema);

module.exports = Wedding;