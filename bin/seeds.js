require('../config/db.config')

const Tourist = require('../models/users/tourist.model')
const City = require('../models/users/city.model')
const Place = require('../models/place.model')
const Like = require('../models/like.model')

const museumsMadrid = require('../data/mocked/museums.madrid.json')
const museumsHandleMadrid = require('../data/mocked/museumsHandle.madrid.json')
const gardensMadrid = require('../data/mocked/gardens.madrid.json')
const gardensHandleMadrid = require('../data/mocked/gardensHandle.madrid.json')
const squaresMadrid = require('../data/mocked/squares.madrid.json')
const squaresHandleMadrid = require('../data/mocked/squaresHandle.madrid.json')
const buildingsMadrid = require('../data/mocked/buildings.madrid.json')
const buildingsHandleMadrid = require('../data/mocked/buildingsHandle.madrid.json')
const worshipMadrid = require('../data/mocked/worship.madrid.json')
const worshipHandleMadrid = require('../data/mocked/worshipHandle.madrid.json')
const monumentsMadrid = require('../data/mocked/monuments.madrid.json')
const monumentsHandleMadrid = require('../data/mocked/monumentsHandle.madrid.json')

function createCitiesExceptMadrid() {
  const citiesExceptMadrid= [
    { 
      name: 'Barcelona',
      country: 'Spain'
    },
    { 
      name: 'Berlin',
      country: 'Germany'
    },
    {
      name: 'Paris',
      country: 'France'
    },
    { 
      name: 'Salamanca',
      country: 'Spain'
    }
  ]  
  
  let DDBBcitiesExceptMadrid = []

  for (let i = 0; i < citiesExceptMadrid.length; i++) {
    const newCity = new City({
      name: citiesExceptMadrid[i].name,
      country: citiesExceptMadrid[i].country,
      email: `${citiesExceptMadrid[i].name}@routrist.com`,
      password: "123456789",
      shield: `https://res.cloudinary.com/dewymafth/image/upload/v1583169321/cities/${citiesExceptMadrid[i].name}.png`,
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
      cityRate: museumsHandleMadrid[i].cityRate,
      schedule: museumsMadrid[i].organization.schedule,
      location: {
        latitude: museumsMadrid[i].location['latitude'],
        longitude: museumsMadrid[i].location['longitude']
      },
      description: museumsMadrid[i].organization['organizacion-desc']
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

function createGardensMadrid(cityMadrid) {
  let DDBBGardens = []

  for (let i = 0; i < gardensMadrid.length; i++) {
    const newGarden = new Place({
      name: gardensMadrid[i].title,
      city: cityMadrid._id,
      photo: `https://res.cloudinary.com/dewymafth/image/upload/v1583169321/seeds/madridGardens/${gardensHandleMadrid[i].photo}`,
      category: 'garden',
      cityRate: gardensHandleMadrid[i].cityRate,
      schedule: gardensMadrid[i].organization.schedule,
      location: {
        latitude: gardensMadrid[i].location['latitude'],
        longitude: gardensMadrid[i].location['longitude']
      },
      description: gardensMadrid[i].organization['organizacion-desc']
    })

    DDBBGardens.push(
      newGarden.save()
    )
  }

  Promise.all(DDBBGardens)
    .then(gardens => {
      console.log(`${gardens.length} gardens have been created`)
    })
    .catch(error => console.log(error))
}

function createSquaresMadrid(cityMadrid) {
  let DDBBSquares = []

  for (let i = 0; i < squaresMadrid.length; i++) {
    const newSquare = new Place({
      name: squaresMadrid[i].title,
      city: cityMadrid._id,
      photo: `https://res.cloudinary.com/dewymafth/image/upload/v1583169321/seeds/madridSquares/${squaresHandleMadrid[i].photo}`,
      category: 'square',
      cityRate: squaresHandleMadrid[i].cityRate,
      schedule: squaresMadrid[i].organization.schedule,
      location: {
        latitude: squaresMadrid[i].location['latitude'],
        longitude: squaresMadrid[i].location['longitude']
      },
      description: squaresMadrid[i].organization['organizacion-desc']
    })

    DDBBSquares.push(
      newSquare.save()
    )
  }

  Promise.all(DDBBSquares)
    .then(squares => {
      console.log(`${squares.length} squares have been created`)
    })
    .catch(error => console.log(error))
}

function createBuildingsMadrid(cityMadrid) {
  let DDBBBuildings = []

  for (let i = 0; i < buildingsMadrid.length; i++) {
    const newBuilding = new Place({
      name: buildingsMadrid[i].title,
      city: cityMadrid._id,
      photo: `https://res.cloudinary.com/dewymafth/image/upload/v1583169321/seeds/madridBuildings/${buildingsHandleMadrid[i].photo}`,
      category: 'building',
      cityRate: buildingsHandleMadrid[i].cityRate,
      schedule: buildingsMadrid[i].organization.schedule,
      location: {
        latitude: buildingsMadrid[i].location['latitude'],
        longitude: buildingsMadrid[i].location['longitude']
      },
      description: buildingsMadrid[i].organization['organizacion-desc']
    })

    DDBBBuildings.push(
      newBuilding.save()
    )
  }

  Promise.all(DDBBBuildings)
    .then(buildings => {
      console.log(`${buildings.length} buildings have been created`)
    })
    .catch(error => console.log(error))
}

function createWorshipMadrid(cityMadrid) {
  let DDBBWorship = []

  for (let i = 0; i < worshipMadrid.length; i++) {
    const newWorship = new Place({
      name: worshipMadrid[i].title,
      city: cityMadrid._id,
      photo: `https://res.cloudinary.com/dewymafth/image/upload/v1583169321/seeds/madridWorship/${worshipHandleMadrid[i].photo}`,
      category: 'worship',
      cityRate: worshipHandleMadrid[i].cityRate,
      schedule: worshipMadrid[i].organization.schedule,
      location: {
        latitude: worshipMadrid[i].location['latitude'],
        longitude: worshipMadrid[i].location['longitude']
      },
      description: worshipMadrid[i].organization['organizacion-desc']
    })

    DDBBWorship.push(
      newWorship.save()
    )
  }

  Promise.all(DDBBWorship)
    .then(worship => {
      console.log(`${worship.length} worship have been created`)
    })
    .catch(error => console.log(error))
}

function createMonumentsMadrid(cityMadrid) {
  let DDBBMonuments = []

  for (let i = 0; i < monumentsMadrid.length; i++) {
    const newMonument = new Place({
      name: monumentsMadrid[i].title,
      city: cityMadrid._id,
      photo: `https://res.cloudinary.com/dewymafth/image/upload/v1583169321/seeds/madridMonuments/${monumentsHandleMadrid[i].photo}`,
      category: 'monument',
      cityRate: monumentsHandleMadrid[i].cityRate,
      schedule: monumentsMadrid[i].organization.schedule,
      location: {
        latitude: monumentsMadrid[i].location['latitude'],
        longitude: monumentsMadrid[i].location['longitude']
      },
      description: monumentsMadrid[i].organization['organizacion-desc']
    })

    DDBBMonuments.push(
      newMonument.save()
    )
  }

  Promise.all(DDBBMonuments)
    .then(monuments => {
      console.log(`${monuments.length} monuments have been created`)
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
            shield: 'https://res.cloudinary.com/dewymafth/image/upload/v1583169321/cities/madrid.png',
            validated: true
        })

        return madrid.save()
      })
        .then(cityMadrid => {
          console.log(`${cityMadrid.name} city has been created`)
          createMuseumsMadrid(cityMadrid)
          createGardensMadrid(cityMadrid)
          createSquaresMadrid(cityMadrid)
          createBuildingsMadrid(cityMadrid)
          createWorshipMadrid(cityMadrid)
          createMonumentsMadrid(cityMadrid)
          createUserTest()
          createCitiesExceptMadrid()
        })
        .catch(error => console.log(error))
  })
  .catch(error => console.log(error))