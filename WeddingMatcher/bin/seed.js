const mongoose = require('mongoose');

const User = require("../models/user-model.js");
const Wedding = require("../models/wedding-model.js");

const bcrypt = require("bcrypt");

mongoose.Promise = Promise;
mongoose
    .connect('mongodb://localhost/weddingmatcher', { useNewUrlParser: true })
    .then(x => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch(err => {
        console.error('Error connecting to mongo', err)
    });


const userData = [{
        firstName: "Owner1",
        lastName: "Paillette",
        email: "g1@g.g",
        encryptedPassword: bcrypt.hashSync("g1", 10),
        gender: "male",
    },
    {
        firstName: "Owner2",
        lastName: "Paillette",
        email: "g2@g.g",
        encryptedPassword: bcrypt.hashSync("g2", 10),
        gender: "male",
    },
    {
        firstName: "Owner3",
        lastName: "Paillette",
        email: "g3@g.g",
        encryptedPassword: bcrypt.hashSync("g3", 10),
        gender: "female",
    },
    {
        firstName: "Guest4",
        lastName: "Paillette",
        email: "g4@g.g",
        encryptedPassword: bcrypt.hashSync("g4", 10),
        gender: "female",
    },
    {
        firstName: "Guest5",
        lastName: "Paillette",
        email: "g5@g.g",
        encryptedPassword: bcrypt.hashSync("g5", 10),
        gender: "female",
    }, {
        firstName: "Guest6",
        lastName: "Paillette",
        email: "g6@g.g",
        encryptedPassword: bcrypt.hashSync("g6", 10),
        gender: "male",
    },
    {
        firstName: "Guest7",
        lastName: "Paillette",
        email: "g7@g.g",
        encryptedPassword: bcrypt.hashSync("g7", 10),
        gender: "male",
    },
    {
        firstName: "Guest8",
        lastName: "Paillette",
        email: "g8@g.g",
        encryptedPassword: bcrypt.hashSync("g8", 10),
        gender: "female",
    },
    {
        firstName: "Guest9",
        lastName: "Paillette",
        email: "g9@g.g",
        encryptedPassword: bcrypt.hashSync("g9", 10),
        gender: "female",
    },
    {
        firstName: "Guest10",
        lastName: "Paillette",
        email: "g10@g.g",
        encryptedPassword: bcrypt.hashSync("g10", 10),
        gender: "female",
    }
];

const weddingData = [{
        name: "Wedding1",
        owner: "5b97b365b8202216232632a2",
        guestList: ["5b97b365b8202216232632a3", "5b97b365b8202216232632a4"],
        description: "The best wedding ever",
        pictureUrl: "https://media.giphy.com/media/YggIZgNciu9sA/giphy.gif",
    },
    {
        name: "Wedding2",
        owner: "5b97b365b8202216232632a3",
        guestList: ["5b97b365b8202216232632a4", "5b97b365b8202216232632a2"],
        description: "The worst wedding ever",
        pictureUrl: "https://media.giphy.com/media/xT9DPzMM3AF2sqC5Nu/giphy.gif",
    },
    {
        name: "Wedding3",
        owner: "5b97b365b8202216232632a4",
        guestList: ["5b97b365b8202216232632a2", "5b97b365b8202216232632a3"],
        description: "Just a regular wedding",
        pictureUrl: "https://media.giphy.com/media/wG1i2KJyB3zlC/giphy.gif",
    }
];







User.create(userData)
    .then(userResults => {
        console.log(`created ${userResults.length}`);
    })
    .catch(err => next(err));

// Wedding.create(weddingData)
//     .then(userResults => {
//         console.log(`created ${userResults.length}`);
//     })
//     .catch(err => next(err));