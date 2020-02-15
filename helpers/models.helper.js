const bcrypt = require('bcrypt')

const SALT_WORK_FACTOR = 10


function calculateTouristsRate (placeLikes) {
  return Math.floor((placeLikes.filter(like => like.state).length * 5) / placeLikes.length)
}

function capitalize (str) {
  if (typeof str !== 'string') str = '';
  return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}

function checkPassword (password, user) {
  return bcrypt.compare(password, user.password)
}

function hashPassword (next, user) {
  if (user.isModified('password')) {
    bcrypt.genSalt(SALT_WORK_FACTOR)
    .then(salt => {
      return bcrypt.hash(user.password, salt)
        .then(hash => {
          user.password = hash
          next()
        })
    })
    .catch(error => next(error))
  } else {
    next()
  }
}

function generateRandomToken () {
  const randomString = () => Math.random().toString(36).substring(2, 13)
  return randomString() + randomString() + randomString() + randomString()
}

module.exports = {
  calculateTouristsRate,
  capitalize,
  checkPassword,
  hashPassword,
  generateRandomToken  
}