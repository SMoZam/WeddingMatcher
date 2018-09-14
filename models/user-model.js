const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({

    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    description: { type: String },
    relatedTo: { type: String },
    avatar: {
        type: String,
        default: "https://media.giphy.com/media/hlMC1niOC58sw/giphy.gif",
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^.+@.+\..+$/,
    },
    // birthday: { type: Date },
    age: { type: Number, min: 18, max: 65 },
    encryptedPassword: { type: String },
    gender: { type: String, required: true },
    status: {
        type: String,
        enum: ["single", "relationship"],
        required: true,
        // default: "normal",
    },
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

userSchema.virtual("isSingle").get(function() {
    return this.status === "single";
});



const User = mongoose.model("User", userSchema);

module.exports = User;