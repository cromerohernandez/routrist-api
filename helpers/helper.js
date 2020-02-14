function capitalize (str) {
  if (typeof str !== 'string') str = '';
  return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}

function generateRandomToken () {
  const randomString = () => Math.random().toString(36).substring(2, 13)
  return randomString() + randomString() + randomString() + randomString()
}

module.exports = {
  capitalize,
  generateRandomToken
}