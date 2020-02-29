function setCriteria (query) {
  const criteria = {...query}
  const notCriteria = ['sort', 'sortDirection']
  notCriteria.forEach(v => delete criteria[v])
  return criteria
}

function setSort (query) {
  const sortField = query.sort
  const sortDirection = query.sortDirection
  const sort = {}
  sort[sortField] = sortDirection
  return sort
}

module.exports = {
  setCriteria,
  setSort
}