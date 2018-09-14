const mongoose = require('mongoose');

const User = require("../models/user-model.js");
const Wedding = require("../models/wedding-model.js");
const Conversation = require("../models/conversation-model.js");

const bcrypt = require("bcrypt");

mongoose.Promise = Promise;
mongoose
    .connect("mongodb://localhost/weddingmatcher", { useNewUrlParser: true })
    .then(x => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
    })
    .catch(err => {
        console.error('Error connecting to mongo', err)
    });


const userData = [{
        firstName: "Clémence",
        lastName: "Waters",
        age: "30",
        avatar: "https://res.cloudinary.com/paulette/image/upload/v1536842356/women-3.jpg",
        email: "clemence@wedding.com",
        encryptedPassword: bcrypt.hashSync("clemence", 10),
        description: "Auxerunt haec vulgi sordidioris audaciam, quod cum ingravesceret penuria commeatuum, famis et furoris inpulsu Eubuli cuiusdam inter suos clari domum ambitiosam ignibus subditis inflammavit rectoremque ut sibi iudicio imperiali addictum calcibus incessens et pugnis conculcans seminecem laniatu miserando discerpsit. post cuius lacrimosum interitum in unius exitio quisque imaginem periculi sui considerans documento recenti similia formidabat.",
        gender: "female",
        status: "relationship",
    },
    {
        firstName: "Asel",
        lastName: "Moran",
        age: "28",
        avatar: "https://res.cloudinary.com/paulette/image/upload/v1536842355/women-5.jpg",
        email: "asel@wedding.com",
        encryptedPassword: bcrypt.hashSync("asel", 10),
        description: "Auxerunt haec vulgi sordidioris audaciam, quod cum ingravesceret penuria commeatuum, famis et furoris inpulsu Eubuli cuiusdam inter suos clari domum ambitiosam ignibus subditis inflammavit rectoremque ut sibi iudicio imperiali addictum calcibus incessens et pugnis conculcans seminecem laniatu miserando discerpsit. post cuius lacrimosum interitum in unius exitio quisque imaginem periculi sui considerans documento recenti similia formidabat.",
        gender: "female",
        status: "relationship",
    },
    {
        firstName: "Guillaume",
        lastName: "Munoz",
        age: "29",
        avatar: "https://res.cloudinary.com/paulette/image/upload/v1536842356/men-5.jpg",
        email: "guillaume@wedding.com",
        encryptedPassword: bcrypt.hashSync("guillaume", 10),
        description: "Auxerunt haec vulgi sordidioris audaciam, quod cum ingravesceret penuria commeatuum, famis et furoris inpulsu Eubuli cuiusdam inter suos clari domum ambitiosam ignibus subditis inflammavit rectoremque ut sibi iudicio imperiali addictum calcibus incessens et pugnis conculcans seminecem laniatu miserando discerpsit. post cuius lacrimosum interitum in unius exitio quisque imaginem periculi sui considerans documento recenti similia formidabat.",
        gender: "male",
        status: "relationship",
    },
    {
        firstName: "Janie",
        lastName: "Santos",
        age: "35",
        relatedTo: "Sister's bride",
        avatar: "https://res.cloudinary.com/paulette/image/upload/v1536842356/women-4.jpg",
        email: "janie@wedding.com",
        encryptedPassword: bcrypt.hashSync("janie", 10),
        description: "Auxerunt haec vulgi sordidioris audaciam, quod cum ingravesceret penuria commeatuum, famis et furoris inpulsu Eubuli cuiusdam inter suos clari domum ambitiosam ignibus subditis inflammavit rectoremque ut sibi iudicio imperiali addictum calcibus incessens et pugnis conculcans seminecem laniatu miserando discerpsit. post cuius lacrimosum interitum in unius exitio quisque imaginem periculi sui considerans documento recenti similia formidabat.",
        gender: "female",
        status: "single",
    },
    {
        firstName: "Georgia",
        lastName: "Santiago",
        age: "27",
        relatedTo: "groom's brother",
        avatar: "https://res.cloudinary.com/paulette/image/upload/v1536842356/women-2.jpg",
        email: "georgia@wedding.com",
        encryptedPassword: bcrypt.hashSync("georgia", 10),
        description: "Auxerunt haec vulgi sordidioris audaciam, quod cum ingravesceret penuria commeatuum, famis et furoris inpulsu Eubuli cuiusdam inter suos clari domum ambitiosam ignibus subditis inflammavit rectoremque ut sibi iudicio imperiali addictum calcibus incessens et pugnis conculcans seminecem laniatu miserando discerpsit. post cuius lacrimosum interitum in unius exitio quisque imaginem periculi sui considerans documento recenti similia formidabat.",
        gender: "female",
        status: "single",
    }, {

        firstName: "Beatrice",
        lastName: "Benson",
        age: "31",
        relatedTo: "ex girlfriend",
        avatar: "https://res.cloudinary.com/paulette/image/upload/v1536842355/women-6.jpg",
        email: "beatrice@wedding.com",
        encryptedPassword: bcrypt.hashSync("beatrice", 10),
        description: "Auxerunt haec vulgi sordidioris audaciam, quod cum ingravesceret penuria commeatuum, famis et furoris inpulsu Eubuli cuiusdam inter suos clari domum ambitiosam ignibus subditis inflammavit rectoremque ut sibi iudicio imperiali addictum calcibus incessens et pugnis conculcans seminecem laniatu miserando discerpsit. post cuius lacrimosum interitum in unius exitio quisque imaginem periculi sui considerans documento recenti similia formidabat.",
        gender: "female",
        status: "single",
    },
    {
        firstName: "Lucile",
        lastName: "Barnes",
        relatedTo: "Groom's high school teacher",
        age: "36",
        avatar: "https://res.cloudinary.com/paulette/image/upload/v1536842356/women-1.jpg",
        email: "lucile@wedding.com",
        encryptedPassword: bcrypt.hashSync("lucile", 10),
        description: "Auxerunt haec vulgi sordidioris audaciam, quod cum ingravesceret penuria commeatuum, famis et furoris inpulsu Eubuli cuiusdam inter suos clari domum ambitiosam ignibus subditis inflammavit rectoremque ut sibi iudicio imperiali addictum calcibus incessens et pugnis conculcans seminecem laniatu miserando discerpsit. post cuius lacrimosum interitum in unius exitio quisque imaginem periculi sui considerans documento recenti similia formidabat.",
        gender: "female",
        status: "single",
    },
    {
        firstName: "Marlon",
        lastName: "Armstrong",
        relatedTo: "best friend",
        age: "28",
        avatar: "https://res.cloudinary.com/paulette/image/upload/v1536842356/men-6.jpg",
        email: "marlon@wedding.com",
        encryptedPassword: bcrypt.hashSync("marlon", 10),
        description: "Auxerunt haec vulgi sordidioris audaciam, quod cum ingravesceret penuria commeatuum, famis et furoris inpulsu Eubuli cuiusdam inter suos clari domum ambitiosam ignibus subditis inflammavit rectoremque ut sibi iudicio imperiali addictum calcibus incessens et pugnis conculcans seminecem laniatu miserando discerpsit. post cuius lacrimosum interitum in unius exitio quisque imaginem periculi sui considerans documento recenti similia formidabat.",
        gender: "male",
        status: "single",
    },
    {
        firstName: "Tommy",
        lastName: "Chavez",
        age: "32",
        relatedTo: "friend",
        avatar: "https://res.cloudinary.com/paulette/image/upload/v1536842355/men-3.jpg",
        email: "tommy@wedding.com",
        encryptedPassword: bcrypt.hashSync("tommy", 10),
        description: "Auxerunt haec vulgi sordidioris audaciam, quod cum ingravesceret penuria commeatuum, famis et furoris inpulsu Eubuli cuiusdam inter suos clari domum ambitiosam ignibus subditis inflammavit rectoremque ut sibi iudicio imperiali addictum calcibus incessens et pugnis conculcans seminecem laniatu miserando discerpsit. post cuius lacrimosum interitum in unius exitio quisque imaginem periculi sui considerans documento recenti similia formidabat.",
        gender: "male",
        status: "single",
    },
    {
        firstName: "Jay",
        lastName: "Fuller",
        relatedTo: "groom friend",
        age: "36",
        avatar: "https://res.cloudinary.com/paulette/image/upload/v1536842355/men-1.jpg",
        email: "jay@wedding.com",
        encryptedPassword: bcrypt.hashSync("jay", 10),
        description: "Auxerunt haec vulgi sordidioris audaciam, quod cum ingravesceret penuria commeatuum, famis et furoris inpulsu Eubuli cuiusdam inter suos clari domum ambitiosam ignibus subditis inflammavit rectoremque ut sibi iudicio imperiali addictum calcibus incessens et pugnis conculcans seminecem laniatu miserando discerpsit. post cuius lacrimosum interitum in unius exitio quisque imaginem periculi sui considerans documento recenti similia formidabat.",
        gender: "male",
        status: "single",
    },
    {
        firstName: "Tom",
        lastName: "Martin",
        age: "29",
        relatedTo: "groom cousin",
        avatar: "https://res.cloudinary.com/paulette/image/upload/v1536842355/men-4.jpg",
        email: "tom@wedding.com",
        encryptedPassword: bcrypt.hashSync("tom", 10),
        description: "Auxerunt haec vulgi sordidioris audaciam, quod cum ingravesceret penuria commeatuum, famis et furoris inpulsu Eubuli cuiusdam inter suos clari domum ambitiosam ignibus subditis inflammavit rectoremque ut sibi iudicio imperiali addictum calcibus incessens et pugnis conculcans seminecem laniatu miserando discerpsit. post cuius lacrimosum interitum in unius exitio quisque imaginem periculi sui considerans documento recenti similia formidabat.",
        gender: "male",
        status: "single",
    },
    {
        firstName: "Mickeal",
        lastName: "Waters",
        relatedTo: "Bride's Cousin",
        age: "33",
        avatar: "https://res.cloudinary.com/paulette/image/upload/v1536842355/men-2.jpg",
        email: "mickael@wedding.com",
        encryptedPassword: bcrypt.hashSync("mickael", 10),
        description: "Auxerunt haec vulgi sordidioris audaciam, quod cum ingravesceret penuria commeatuum, famis et furoris inpulsu Eubuli cuiusdam inter suos clari domum ambitiosam ignibus subditis inflammavit rectoremque ut sibi iudicio imperiali addictum calcibus incessens et pugnis conculcans seminecem laniatu miserando discerpsit. post cuius lacrimosum interitum in unius exitio quisque imaginem periculi sui considerans documento recenti similia formidabat.",
        gender: "male",
        status: "single",
    },
    {
        firstName: "Alberto",
        lastName: "Reid",
        relatedTo: "friend",
        age: "29",
        avatar: "https://res.cloudinary.com/paulette/image/upload/v1536842917/men-7.jpg",
        email: "alberto@wedding.com",
        encryptedPassword: bcrypt.hashSync("alberto", 10),
        description: "Auxerunt haec vulgi sordidioris audaciam, quod cum ingravesceret penuria commeatuum, famis et furoris inpulsu Eubuli cuiusdam inter suos clari domum ambitiosam ignibus subditis inflammavit rectoremque ut sibi iudicio imperiali addictum calcibus incessens et pugnis conculcans seminecem laniatu miserando discerpsit. post cuius lacrimosum interitum in unius exitio quisque imaginem periculi sui considerans documento recenti similia formidabat.",
        gender: "male",
        status: "single",
    },
];

// User.create(userData)
//     .then(userResults => {
//         console.log(`created ${userResults.length}`);
//     })
//     .catch(err => console.log(err));

// var usersIds = [];


// User.find({}, { _id: 1 })
//     .then(usersArray => {
//         usersIds = usersArray;

//     })
//     .catch(err => console.log(err));

// console.log(usersIds)




const conversationData = [{
        owners: ["5b9b76a708be2455ddf99995", "5b9b76a708be2455ddf99997"],
        messages: [{
            user: "5b9b76a708be2455ddf99995",
            text: "Hello I'm Janie! "
        }, {
            user: "5b9b76a708be2455ddf99997",
            text: "Hi I'm Beatrice "
        }],
        pictureUrl: "https://media.giphy.com/media/wG1i2KJyB3zlC/giphy.gif",
    },
    {
        owners: ["5b9b76a708be2455ddf99995", "5b9b76a708be2455ddf99996"],
        messages: [{
            user: "5b9b76a708be2455ddf99995",
            text: "Hello I'm Janie!"
        }, {
            user: "5b9b76a708be2455ddf99996",
            text: "Hi I'm Georgia"
        }],
        pictureUrl: "https://media.giphy.com/media/wG1i2KJyB3zlC/giphy.gif",
    },
    {
        owners: ["5b9b76a708be2455ddf99995", "5b9b76a708be2455ddf99999"],
        messages: [{
            user: "5b9b76a708be2455ddf99995",
            text: "Hello I'm Janie!"
        }, {
            user: "5b9b76a708be2455ddf99999",
            text: "Hi I'm Marlon"
        }],
        pictureUrl: "https://media.giphy.com/media/wG1i2KJyB3zlC/giphy.gif",
    }
];

Conversation.create(conversationData)
    .then(userResults => {
        console.log(`created ${userResults.length}`);
    })
    .catch(err => next(err));







const weddingData = [{
        name: "Charles & Clémence's Wedding",
        // owner: "",
        // guestList: [],
        date: "Le samedi 25 août 2019",
        description: "Ergo ego senator inimicus, si ita vultis, homini, amicus esse, sicut semper fui, rei publicae debeo. Quid? si ipsas inimicitias, depono rei publicae causa, quis me tandem iure reprehendet, praesertim cum ego omnium meorum consiliorum atque factorum exempla semper ex summorum hominum consiliis atque factis mihi censuerim petenda. <br />Iam virtutem ex consuetudine vitae sermonisque nostri interpretemur nec eam, ut quidam docti, verborum magnificentia metiamur virosque bonos eos, qui habentur, numeremus, Paulos, Catones, Galos, Scipiones, Philos; his communis vita contenta est; eos autem omittamus, qui omnino nusquam reperiuntur.",
        pictureUrl: "https://res.cloudinary.com/paulette/image/upload/v1536914188/mariage-1.jpg",
    },
    {
        name: "Gaël & Asel's Wedding",
        // owner: "",
        date: "Le samedi 10 juillet 2019",
        // guestList: [],
        description: "Ergo ego senator inimicus, si ita vultis, homini, amicus esse, sicut semper fui, rei publicae debeo. Quid? si ipsas inimicitias, depono rei publicae causa, quis me tandem iure reprehendet, praesertim cum ego omnium meorum consiliorum atque factorum exempla semper ex summorum hominum consiliis atque factis mihi censuerim petenda. <br />Iam virtutem ex consuetudine vitae sermonisque nostri interpretemur nec eam, ut quidam docti, verborum magnificentia metiamur virosque bonos eos, qui habentur, numeremus, Paulos, Catones, Galos, Scipiones, Philos; his communis vita contenta est; eos autem omittamus, qui omnino nusquam reperiuntur.",
        pictureUrl: "https://res.cloudinary.com/paulette/image/upload/v1536914188/mariage-3.jpg",
    },
    {
        name: "Btissam & Guillaume's Wedding",
        // owner: "",
        date: "Le samedi 22 juillet 2019",
        guestList: [],
        description: "Ergo ego senator inimicus, si ita vultis, homini, amicus esse, sicut semper fui, rei publicae debeo. Quid? si ipsas inimicitias, depono rei publicae causa, quis me tandem iure reprehendet, praesertim cum ego omnium meorum consiliorum atque factorum exempla semper ex summorum hominum consiliis atque factis mihi censuerim petenda. <br />Iam virtutem ex consuetudine vitae sermonisque nostri interpretemur nec eam, ut quidam docti, verborum magnificentia metiamur virosque bonos eos, qui habentur, numeremus, Paulos, Catones, Galos, Scipiones, Philos; his communis vita contenta est; eos autem omittamus, qui omnino nusquam reperiuntur.",
        pictureUrl: "https://res.cloudinary.com/paulette/image/upload/v1536914188/mariage-2.jpg",
    }
];





Wedding.create(weddingData)
    .then(userResults => {
        console.log(`created ${userResults.length}`);
        console.log(usersIds);

    })
    .catch(err => console.log(err));