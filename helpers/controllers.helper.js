function setCriteria (query) {
  const criteria = {...query}
  const notCriteria = ['sort', 'sortDirection', 'name']
  notCriteria.forEach(v => delete criteria[v])
  return criteria
}

function addSearch (name, criteria) {
  if (name) {
    return {...criteria, name: { $regex: name, $options: 'i' }}
  } else {
    return criteria
  }
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
  addSearch,
  setSort
}