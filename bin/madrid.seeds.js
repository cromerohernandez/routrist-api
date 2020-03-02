require('../config/db.config')

const City = require('../models/users/city.model')
const Place = require('../models/place.model')
const Like = require('../models/like.model')

const museumsMadrid = require('../data/mocked/museums.madrid.json')
const museumsHandleMadrid = require('../data/mocked/museumsHandle.madrid.json')

let DDBBMuseums = []

function createMuseumsMadrid(cityMadrid) {
  const createdMuseums = 0

  for (let i = 0; i < 10 /*museumsMadridlength*/; i++) {
    const newMuseum = new Place({
      name: museumsMadrid[i].title,
      city: cityMadrid._id,
      photo: `https://res.cloudinary.com/dewymafth/image/upload/v1583169321/seeds/madridMuseums/${museumsHandleMadrid[i].photo}`,
      category: 'museum',
      cityRate: museumsHandleMadrid[i].cityRate
    })

    newMuseum.save()
      .then(() => createdMuseums++ )
  }
  console.log(`${createdMuseums} museums have been created`)
}

City.findOne({ name: 'Madrid' })
  console.log('aquiiiiiiiiiiiii')
  .then(oldMadrid => {
    const oldMadridId = oldMadrid._id
    Promise.all([
      City.findOneAndDelete({ name: 'Madrid' }),
      Place.deleteMany({ city: oldMadridId})
    ])
      .then(() => {
        const madrid = new City({
          __type: 'city',
          name: 'Madrid',
          country: 'Spain',
          email: 'madrid@routrist.com',
          password: 123456789,
          photo: 'https://res.cloudinary.com/dewymafth/image/upload/v1583169321/cities/madrid.jpg',
          validated: true,
        })

        madrid.save()
          .then(madrid => {
            console.log(`${madrid.name} city has been created`)
            /*Promise.all([
              createMuseumsMadrid(madrid)
            ])
            .then(() => {
              console.log('seeds finished')
            })*/
          })
  })
  .catch(error => console.log(error))