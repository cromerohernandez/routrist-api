function setCriteria (query) {
  const criteria = {...query}
  const notCriteria = ['sort', 'sortValue']
  notCriteria.forEach(v => delete criteria[v])
  return criteria
}

function setSort (query) {
  const sortField = query.sort
  const sortValue = query.sortValue
  const sort = {}
  sort[sortField] = sortValue
  return sort
}

module.exports = {
  setCriteria,
  setSort
}