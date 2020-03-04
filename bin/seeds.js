require('../config/db.config')

const Tourist = require('../models/users/tourist.model')
const City = require('../models/users/city.model')
const Place = require('../models/place.model')
const Like = require('../models/like.model')

const museumsMadrid = require('../data/mocked/museums.madrid.json')
const museumsHandleMadrid = require('../data/mocked/museumsHandle.madrid.json')

function createCitiesExceptMadrid() {
  const citiesExceptMadrid= ['barcelona', 'bilbao', 'santander', 'sevilla', 'toledo']
  let DDBBcitiesExceptMadrid = []

  for (let i = 0; i < citiesExceptMadrid.length; i++) {
    const newCity = new City({
      name: citiesExceptMadrid[i],
      country: "Spain",
      email: `${citiesExceptMadrid[i]}@routrist.com`,
      password: "123456789",
      photo: `https://res.cloudinary.com/dewymafth/image/upload/v1583169321/cities/${citiesExceptMadrid[i]}.png`,
      validated: true
    })

    DDBBcitiesExceptMadrid.push(
      newCity.save()
    )
  }

  Promise.all(DDBBcitiesExceptMadrid)
    .then(cities => {
      console.log(`${cities.length} cities have been created`)
    })
    .catch(error => console.log(error))
}

function createUserTest() {
  const newUserTest = new Tourist({
      firstName: 'Carlos',
      lastName: 'Romero',
      username: 'cromez',
      email: 'carlos@routrist.com',
      password: '123456789',
      photo: 'https://res.cloudinary.com/dewymafth/image/upload/v1583169321/tourists/carlosTest.jpg',
      validated: true
  })

  newUserTest.save()
    .then(tourist => {
      console.log(`Tourist ${tourist.username} have been created`)
    })
    .catch(error => console.log(error))
}

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

City.findOne({ name: 'Madrid' })
  .then(oldMadrid => {
    const oldMadridId = oldMadrid._id
    Promise.all([
      City.findOneAndDelete({ name: 'Madrid' }),
      Place.deleteMany({ city: oldMadridId})
    ])
      .then(() => {
        const madrid = new City({
            name: "Madrid",
            country: "Spain",
            email: "madrid@routrist.com",
            password: "123456789",
            photo: 'https://res.cloudinary.com/dewymafth/image/upload/v1583169321/cities/madrid.png',
            validated: true
        })

        return madrid.save()
      })
        .then(cityMadrid => {
          console.log(`${cityMadrid.name} city has been created`)
          createMuseumsMadrid(cityMadrid)
          createUserTest()
          createCitiesExceptMadrid()
        })
        .catch(error => console.log(error))
  })
  .catch(error => console.log(error))