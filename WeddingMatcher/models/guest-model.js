const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const guestSchema = new Schema({

    firstName: { type: String, required: true },
    firstName: { type: String, required: true },
    description: { type: String },
    pictureURL: { type: String },
    email: { type: String, required: true },
    birthday: { type: Date },
    encryptedPassword: { type: String },
    gender: { type: String, required: true },
    messages: [{
        type: Schema.Types.ObjectId,
        ref: "Message",
        required: true,

    }],
    role: {
        type: String,
        enum: ["normal", "admin"],
        required: true,
        default: "normal",
    },
    weddings: [{
        type: Schema.Types.ObjectId,
        ref: "Wedding",
        required: true,

    }],
    createdWeddings: [{
        type: Schema.Types.ObjectId,
        ref: "Wedding",
        required: true,

    }],

}, {
    timestamps: true
});

userSchema.virtual("isAdmin").get(function() {
    return this.role === "admin" && this.createdWeddings === "?";
});


const Guest = mongoose.model("Guest", guestSchema);

module.exports = Guest;