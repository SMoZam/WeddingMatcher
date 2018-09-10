const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const weddingSchema = new Schema({

    name: { type: String, required: true },
    description: { type: String, required: true },
    pictureURL: { type: String, required: true },
    guestList: [{
        type: Schema.Types.ObjectId,
        ref: "Guest",
        required: true,

    }],



}, {
    timestamps: true
});

const Wedding = mongoose.model("Wedding", weddingSchema);

module.exports = Wedding;