export const getValesFromArray = (data, searchArray, searchKey, neededKey) => {
  const result = []
  if (data && data.length) {
    data.forEach(item => {
      const findItem = searchArray.find(elem => elem[searchKey] === item)
      if (findItem) {
        result.push(findItem[neededKey])
      } else {
        result.push(item)
      }
    })
  }

  return result
}

export const getActiveUsersCount = (data, currentParticipant) => {
  let result = 0

  if (data && data.users && data.users.length && currentParticipant) {
    const currentPartisipantItem = data.users.find(item => item.participant_id === currentParticipant)
    result = currentPartisipantItem ? currentPartisipantItem.users || 0 : 0
  }

  return result
}
