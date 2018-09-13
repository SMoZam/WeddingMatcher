const mongoose = require('mongoose');

const User = require("../models/user-model.js");
const Wedding = require("../models/wedding-model.js");
const Conversation = require("../models/conversation-model.js");

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
        firstName: "Clémence",
        lastName: "Waters",
        avatar: "https://res.cloudinary.com/paulette/image/upload/v1536842356/women-3.jpg",
        email: "clemence@wedding.com",
        encryptedPassword: bcrypt.hashSync("clemence", 10),
        decription: "Auxerunt haec vulgi sordidioris audaciam, quod cum ingravesceret penuria commeatuum, famis et furoris inpulsu Eubuli cuiusdam inter suos clari domum ambitiosam ignibus subditis inflammavit rectoremque ut sibi iudicio imperiali addictum calcibus incessens et pugnis conculcans seminecem laniatu miserando discerpsit. post cuius lacrimosum interitum in unius exitio quisque imaginem periculi sui considerans documento recenti similia formidabat.",
        gender: "female",
        status: "relationship",
    },
    {
        firstName: "Asel",
        lastName: "Moran",
        avatar: "https://res.cloudinary.com/paulette/image/upload/v1536842355/women-5.jpg",
        email: "asel@wedding.com",
        encryptedPassword: bcrypt.hashSync("asel", 10),
        decription: "Auxerunt haec vulgi sordidioris audaciam, quod cum ingravesceret penuria commeatuum, famis et furoris inpulsu Eubuli cuiusdam inter suos clari domum ambitiosam ignibus subditis inflammavit rectoremque ut sibi iudicio imperiali addictum calcibus incessens et pugnis conculcans seminecem laniatu miserando discerpsit. post cuius lacrimosum interitum in unius exitio quisque imaginem periculi sui considerans documento recenti similia formidabat.",
        gender: "female",
        status: "relationship",
    },
    {
        firstName: "Guillaume",
        lastName: "Munoz",
        avatar: "https://res.cloudinary.com/paulette/image/upload/v1536842356/men-5.jpg",
        email: "guillaume@wedding.com",
        encryptedPassword: bcrypt.hashSync("guillaume", 10),
        decription: "Auxerunt haec vulgi sordidioris audaciam, quod cum ingravesceret penuria commeatuum, famis et furoris inpulsu Eubuli cuiusdam inter suos clari domum ambitiosam ignibus subditis inflammavit rectoremque ut sibi iudicio imperiali addictum calcibus incessens et pugnis conculcans seminecem laniatu miserando discerpsit. post cuius lacrimosum interitum in unius exitio quisque imaginem periculi sui considerans documento recenti similia formidabat.",
        gender: "male",
        status: "relationship",
    },
    {
        firstName: "Janie",
        lastName: "Santos",
        avatar: "https://res.cloudinary.com/paulette/image/upload/v1536842356/women-4.jpg",
        email: "janie@wedding.com",
        encryptedPassword: bcrypt.hashSync("janie", 10),
        decription: "Auxerunt haec vulgi sordidioris audaciam, quod cum ingravesceret penuria commeatuum, famis et furoris inpulsu Eubuli cuiusdam inter suos clari domum ambitiosam ignibus subditis inflammavit rectoremque ut sibi iudicio imperiali addictum calcibus incessens et pugnis conculcans seminecem laniatu miserando discerpsit. post cuius lacrimosum interitum in unius exitio quisque imaginem periculi sui considerans documento recenti similia formidabat.",
        gender: "female",
        status: "single",
    },
    {
        firstName: "Georgia",
        lastName: "Santiago",
        avatar: "https://res.cloudinary.com/paulette/image/upload/v1536842356/women-2.jpg",
        email: "georgia@wedding.com",
        encryptedPassword: bcrypt.hashSync("georgia", 10),
        decription: "Auxerunt haec vulgi sordidioris audaciam, quod cum ingravesceret penuria commeatuum, famis et furoris inpulsu Eubuli cuiusdam inter suos clari domum ambitiosam ignibus subditis inflammavit rectoremque ut sibi iudicio imperiali addictum calcibus incessens et pugnis conculcans seminecem laniatu miserando discerpsit. post cuius lacrimosum interitum in unius exitio quisque imaginem periculi sui considerans documento recenti similia formidabat.",
        gender: "female",
        status: "single",
    }, {

        firstName: "Beatrice",
        lastName: "Benson",
        avatar: "https://res.cloudinary.com/paulette/image/upload/v1536842355/women-6.jpg",
        email: "beatrice@wedding.com",
        encryptedPassword: bcrypt.hashSync("beatrice", 10),
        decription: "Auxerunt haec vulgi sordidioris audaciam, quod cum ingravesceret penuria commeatuum, famis et furoris inpulsu Eubuli cuiusdam inter suos clari domum ambitiosam ignibus subditis inflammavit rectoremque ut sibi iudicio imperiali addictum calcibus incessens et pugnis conculcans seminecem laniatu miserando discerpsit. post cuius lacrimosum interitum in unius exitio quisque imaginem periculi sui considerans documento recenti similia formidabat.",
        gender: "female",
        status: "single",
    },
    {
        firstName: "Lucile",
        lastName: "Barnes",
        avatar: "https://res.cloudinary.com/paulette/image/upload/v1536842356/women-1.jpg",
        email: "lucile@wedding.com",
        encryptedPassword: bcrypt.hashSync("lucile", 10),
        decription: "Auxerunt haec vulgi sordidioris audaciam, quod cum ingravesceret penuria commeatuum, famis et furoris inpulsu Eubuli cuiusdam inter suos clari domum ambitiosam ignibus subditis inflammavit rectoremque ut sibi iudicio imperiali addictum calcibus incessens et pugnis conculcans seminecem laniatu miserando discerpsit. post cuius lacrimosum interitum in unius exitio quisque imaginem periculi sui considerans documento recenti similia formidabat.",
        gender: "female",
        status: "single",
    },
    {
        firstName: "Marlon",
        lastName: "Armstrong",
        avatar: "https://res.cloudinary.com/paulette/image/upload/v1536842356/men-6.jpg",
        email: "marlon@wedding.com",
        encryptedPassword: bcrypt.hashSync("marlon", 10),
        decription: "Auxerunt haec vulgi sordidioris audaciam, quod cum ingravesceret penuria commeatuum, famis et furoris inpulsu Eubuli cuiusdam inter suos clari domum ambitiosam ignibus subditis inflammavit rectoremque ut sibi iudicio imperiali addictum calcibus incessens et pugnis conculcans seminecem laniatu miserando discerpsit. post cuius lacrimosum interitum in unius exitio quisque imaginem periculi sui considerans documento recenti similia formidabat.",
        gender: "male",
        status: "single",
    },
    {
        firstName: "Tommy",
        lastName: "Chavez",
        avatar: "https://res.cloudinary.com/paulette/image/upload/v1536842355/men-3.jpg",
        email: "tommy@wedding.com",
        encryptedPassword: bcrypt.hashSync("tommy", 10),
        decription: "Auxerunt haec vulgi sordidioris audaciam, quod cum ingravesceret penuria commeatuum, famis et furoris inpulsu Eubuli cuiusdam inter suos clari domum ambitiosam ignibus subditis inflammavit rectoremque ut sibi iudicio imperiali addictum calcibus incessens et pugnis conculcans seminecem laniatu miserando discerpsit. post cuius lacrimosum interitum in unius exitio quisque imaginem periculi sui considerans documento recenti similia formidabat.",
        gender: "male",
        status: "single",
    },
    {
        firstName: "Jay",
        lastName: "Fuller",
        avatar: "https://res.cloudinary.com/paulette/image/upload/v1536842355/men-1.jpg",
        email: "jay@wedding.com",
        encryptedPassword: bcrypt.hashSync("jay", 10),
        decription: "Auxerunt haec vulgi sordidioris audaciam, quod cum ingravesceret penuria commeatuum, famis et furoris inpulsu Eubuli cuiusdam inter suos clari domum ambitiosam ignibus subditis inflammavit rectoremque ut sibi iudicio imperiali addictum calcibus incessens et pugnis conculcans seminecem laniatu miserando discerpsit. post cuius lacrimosum interitum in unius exitio quisque imaginem periculi sui considerans documento recenti similia formidabat.",
        gender: "male",
        status: "single",
    },
    {
        firstName: "Tommy",
        lastName: "Chavez",
        avatar: "https://res.cloudinary.com/paulette/image/upload/v1536842355/men-4.jpg",
        email: "tommy@wedding.com",
        encryptedPassword: bcrypt.hashSync("tommy", 10),
        decription: "Auxerunt haec vulgi sordidioris audaciam, quod cum ingravesceret penuria commeatuum, famis et furoris inpulsu Eubuli cuiusdam inter suos clari domum ambitiosam ignibus subditis inflammavit rectoremque ut sibi iudicio imperiali addictum calcibus incessens et pugnis conculcans seminecem laniatu miserando discerpsit. post cuius lacrimosum interitum in unius exitio quisque imaginem periculi sui considerans documento recenti similia formidabat.",
        gender: "male",
        status: "single",
    },
    {
        firstName: "Mickeal",
        lastName: "Waters",
        avatar: "https://res.cloudinary.com/paulette/image/upload/v1536842355/men-2.jpg",
        email: "mickael@wedding.com",
        encryptedPassword: bcrypt.hashSync("mickael", 10),
        decription: "Auxerunt haec vulgi sordidioris audaciam, quod cum ingravesceret penuria commeatuum, famis et furoris inpulsu Eubuli cuiusdam inter suos clari domum ambitiosam ignibus subditis inflammavit rectoremque ut sibi iudicio imperiali addictum calcibus incessens et pugnis conculcans seminecem laniatu miserando discerpsit. post cuius lacrimosum interitum in unius exitio quisque imaginem periculi sui considerans documento recenti similia formidabat.",
        gender: "male",
        status: "single",
    },
    {
        firstName: "Alberto",
        lastName: "Reid",
        avatar: "https://res.cloudinary.com/paulette/image/upload/v1536842917/men-7.jpg",
        email: "alberto@wedding.com",
        encryptedPassword: bcrypt.hashSync("alberto", 10),
        decription: "Auxerunt haec vulgi sordidioris audaciam, quod cum ingravesceret penuria commeatuum, famis et furoris inpulsu Eubuli cuiusdam inter suos clari domum ambitiosam ignibus subditis inflammavit rectoremque ut sibi iudicio imperiali addictum calcibus incessens et pugnis conculcans seminecem laniatu miserando discerpsit. post cuius lacrimosum interitum in unius exitio quisque imaginem periculi sui considerans documento recenti similia formidabat.",
        gender: "male",
        status: "single",
    },
];

const weddingData = [{
        name: "Charles & Clémence's Wedding",
        owner: "5b97b365b8202216232632a2",
        guestList: ["5b97b365b8202216232632a3", "5b97b365b8202216232632a4"],
        date: "Le samedi 25 août 2019",
        description: "Ergo ego senator inimicus, si ita vultis, homini, amicus esse, sicut semper fui, rei publicae debeo. Quid? si ipsas inimicitias, depono rei publicae causa, quis me tandem iure reprehendet, praesertim cum ego omnium meorum consiliorum atque factorum exempla semper ex summorum hominum consiliis atque factis mihi censuerim petenda. <br />Iam virtutem ex consuetudine vitae sermonisque nostri interpretemur nec eam, ut quidam docti, verborum magnificentia metiamur virosque bonos eos, qui habentur, numeremus, Paulos, Catones, Galos, Scipiones, Philos; his communis vita contenta est; eos autem omittamus, qui omnino nusquam reperiuntur.",
        pictureUrl: "https://res.cloudinary.com/paulette/image/upload/v1536772907/mariage-1.jpg",
    },
    {
        name: "Gaël & Asel's Wedding",
        owner: "5b97b365b8202216232632a3",
        date: "Le samedi 10 juillet 2019",
        guestList: ["5b97b365b8202216232632a4", "5b97b365b8202216232632a2"],
        description: "Ergo ego senator inimicus, si ita vultis, homini, amicus esse, sicut semper fui, rei publicae debeo. Quid? si ipsas inimicitias, depono rei publicae causa, quis me tandem iure reprehendet, praesertim cum ego omnium meorum consiliorum atque factorum exempla semper ex summorum hominum consiliis atque factis mihi censuerim petenda. <br />Iam virtutem ex consuetudine vitae sermonisque nostri interpretemur nec eam, ut quidam docti, verborum magnificentia metiamur virosque bonos eos, qui habentur, numeremus, Paulos, Catones, Galos, Scipiones, Philos; his communis vita contenta est; eos autem omittamus, qui omnino nusquam reperiuntur.",
        pictureUrl: "https://res.cloudinary.com/paulette/image/upload/v1536772907/maraige-2.jpg",
    },
    {
        name: "Btissam & Guillaume's Wedding",
        owner: "5b97b365b8202216232632a4",
        date: "Le samedi 22 juillet 2019",
        guestList: ["5b97b365b8202216232632a2", "5b97b365b8202216232632a3"],
        description: "Ergo ego senator inimicus, si ita vultis, homini, amicus esse, sicut semper fui, rei publicae debeo. Quid? si ipsas inimicitias, depono rei publicae causa, quis me tandem iure reprehendet, praesertim cum ego omnium meorum consiliorum atque factorum exempla semper ex summorum hominum consiliis atque factis mihi censuerim petenda. <br />Iam virtutem ex consuetudine vitae sermonisque nostri interpretemur nec eam, ut quidam docti, verborum magnificentia metiamur virosque bonos eos, qui habentur, numeremus, Paulos, Catones, Galos, Scipiones, Philos; his communis vita contenta est; eos autem omittamus, qui omnino nusquam reperiuntur.",
        pictureUrl: "https://res.cloudinary.com/paulette/image/upload/v1536772907/mariage-3.jpg",
    }
];


const conversationData = [{
        owners: ["5b97b365b8202216232632a2", "5b97b365b8202216232632a3"],
        messages: [{
            user: "5b97b365b8202216232632a2",
            text: "Hello I'm Owner1"
        }, {
            user: "5b97b365b8202216232632a3",
            text: "Hi I'm Owner2"
        }],
        pictureUrl: "https://media.giphy.com/media/wG1i2KJyB3zlC/giphy.gif",
    },
    {
        owners: ["5b97b365b8202216232632a4", "5b97b365b8202216232632a2"],
        messages: [{
            user: "5b97b365b8202216232632a2",
            text: "Hello I'm Owner1"
        }, {
            user: "5b97b365b8202216232632a4",
            text: "Hi I'm Owner3"
        }],
        pictureUrl: "https://media.giphy.com/media/wG1i2KJyB3zlC/giphy.gif",
    },
    {
        owners: ["5b97b365b8202216232632a3", "5b97b365b8202216232632a4"],
        messages: [{
            user: "5b97b365b8202216232632a4",
            text: "Hello I'm Owner3"
        }, {
            user: "5b97b365b8202216232632a3",
            text: "Hi I'm Owner2"
        }],
        pictureUrl: "https://media.giphy.com/media/wG1i2KJyB3zlC/giphy.gif",
    }
];



// User.create(userData)
//     .then(userResults => {
//         console.log(`created ${userResults.length}`);
//     })
//     .catch(err => next(err));
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

Conversation.create(conversationData)
    .then(userResults => {
        console.log(`created ${userResults.length}`);
    })
    .catch(err => next(err));