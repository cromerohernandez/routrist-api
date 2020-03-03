require('../config/db.config')

const City = require('../models/users/city.model')
const Place = require('../models/place.model')
const Like = require('../models/like.model')

const museumsMadrid = require('../data/mocked/museums.madrid.json')
const museumsHandleMadrid = require('../data/mocked/museumsHandle.madrid.json')


function createMuseumsMadrid(cityMadrid) {
  let DDBBMuseums = []

  for (let i = 0; i < museumsMadrid.length; i++) {
    const newMuseum = new Place({
      name: museumsMadrid[i].title,
      city: cityMadrid._id,
      photo: `https://res.cloudinary.com/dewymafth/image/upload/v1583169321/seeds/madridMuseums/${museumsHandleMadrid[i].photo}`,
      category: 'museum',
      cityRate: museumsHandleMadrid[i].cityRate
    })

    DDBBMuseums.push(
      newMuseum.save()
    )
  }
  Promise.all(DDBBMuseums)
    .then(museums => {
      console.log(`${museums.length} museums have been created`)
    })
    .catch(error => console.log(error))
}

City.findOne({ name: 'Madridtest' })  /////////////////////////////// CAMBIAR A MADRID!!!!!!
  .then(oldMadrid => {
    const oldMadridId = oldMadrid._id
    Promise.all([
      City.findOneAndDelete({ name: 'Madridtest' }),  /////////////////////////////// CAMBIAR A MADRID!!!!!!
      Place.deleteMany({ city: oldMadridId})
    ])
      .then(() => {
        const madrid = new City({
            name: "Madridtest",
            country: "Spain",
            email: "MadridTEST@routrist.com",
            password: "123456789",
            photo: 'https://res.cloudinary.com/dewymafth/image/upload/v1583169321/cities/madrid.png',
            validated: true
        })

        return madrid.save()
      })
        .then(cityMadrid => {
          console.log(`${cityMadrid.name} has been created`)
          createMuseumsMadrid(cityMadrid)
        })
        .catch(error => console.log(error))
  })
  .catch(error => console.log(error))