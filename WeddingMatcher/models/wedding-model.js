const mongoose = require("mongoose");

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

const Wedding = mongoose.model("Wedding", weddingSchema);

module.exports = Wedding;