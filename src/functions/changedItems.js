export const changedItems = (items) => {
  const changedItems = items.filter((item) => item.hasBeenChanged)

  return changedItems
}
