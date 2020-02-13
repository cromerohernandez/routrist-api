function capitalize (str) {
  if (typeof str !== 'string') str = '';
  return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}

module.exports = {
  capitalize
}