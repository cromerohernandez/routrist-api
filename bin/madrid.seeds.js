require('../config/db.config')

const City = require('../models/users/city.model')
const Place = require('../models/place.model')
const Like = require('../models/like.model')

City.findOne({ name: 'Toledo' })   //////////////////////////////// CAMBIAR A MADRID !!!!!!
  .then(oldMadrid => {
    const oldMadridId = oldMadrid._id
    Promise.all([
      City.findOneAndDelete({ name: 'Toledo' }),
      Place.deleteMany({ city: oldMadridId})
    ])
      .then(() => {
        const madrid = new City({
          __type: 'city',
          name: 'Toledo',   //////////////////////////////// CAMBIAR A MADRID !!!!!!
          country: 'Spain',
          email: 'toledo@routrist.com',   //////////////////////////////// CAMBIAR A MADRID !!!!!!
          password: 123456789,
          photo: 'photo',   //////////////////////////////// DEFINIR FOTO !!!!!!
          validated: true,
        })

        madrid.save()
          .then(madrid => {
            console.log(`${madrid.name} city has been created`)

          })
          .catch(console.error) 
      })
      .catch(console.error)
  })
  .catch(console.error)