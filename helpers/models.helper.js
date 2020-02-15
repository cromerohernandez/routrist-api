function capitalize (str) {
  if (typeof str !== 'string') str = '';
  return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}

function generateRandomToken () {
  const randomString = () => Math.random().toString(36).substring(2, 13)
  return randomString() + randomString() + randomString() + randomString()
}

function calculateTouristsRate (placeLikes) {
  return Math.floor((placeLikes.filter(like => like.state).length * 5) / placeLikes.length)
}

module.exports = {
  capitalize,
  generateRandomToken,
  calculateTouristsRate
}