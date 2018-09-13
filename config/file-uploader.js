const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');


cloudinary.config({
  cloud_name: process.env.cloudinary_name,
  api_key: process.env.cloudinary_key,
  api_secret: process.env.cloudinary_secret
});


const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'users-pictures',
  allowedFormats: ['jpg', 'png'],
});


const fileUploader = multer({storage});

module.exports = fileUploader