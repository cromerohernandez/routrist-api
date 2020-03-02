const cloudinary = require('cloudinary')
const cloudinaryStorage = require('multer-storage-cloudinary')
const multer = require('multer')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})

let storage = (folderCloud) => cloudinaryStorage({
  cloudinary: cloudinary,
  folder: folderCloud,
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const uploadCloudCity = (cityPhoto) => {
  let storageCity = storage('cities')
  return multer({ storage: storageCity }).single(cityPhoto)
}

const uploadCloudTourist = (touristPhoto) => {
  let storageTourist = storage('tourists')
  return multer({ storage: storageTourist }).single(touristPhoto)
}

const uploadCloudPlace = (placePhoto) => {
  let storagePlace = storage('places')
  return multer({ storage: storagePlace }).single(placePhoto)
}

module.exports = {
  uploadCloudCity,
  uploadCloudTourist,
  uploadCloudPlace
}