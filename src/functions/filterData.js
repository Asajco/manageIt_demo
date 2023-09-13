export const filteredData = (data, category, name) => {
  const filterByCategory = category
    ? data.filter((item) => item.category == category)
    : data
  const filterByName = name
    ? filterByCategory.filter((item) =>
        item.name.toLowerCase().includes(name.toLowerCase()),
      )
    : filterByCategory

  return filterByName
}
