const mongoose = require('mongoose')

const UserBase = require('./userBase.model')
const { capitalize } = require('../../helpers/models.helper')

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    set: capitalize
  },
  country: {
    type: String,
    required: [true, 'Country is required'],
    trim: true,
    set: capitalize
  },
  photo: {
    type: String,
    //default: '../../images/defaultCity.png'
  }
})

const City = UserBase.discriminator(
  'city',  //¿CitySchema?
  citySchema
)

module.exports = City