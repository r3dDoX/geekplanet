export function recursivelyMapSubCategories(category, categories) {
  return Object.assign({}, category, {
    subCategories: categories
      .filter(subCategory => subCategory.parentCategory === category._id)
      .map(subCategory => recursivelyMapSubCategories(subCategory, categories)),
  });
}

export function recursivelyMapIds(category) {
  return [
    category._id,
    ...category.subCategories.flatMap(recursivelyMapIds),
  ];
}

export function recursivelyMapIdsIfNotPresent(presentCategories, category) {
  const arr = [];

  if (!presentCategories.some(presentCategory => presentCategory._id === category._id)) {
    arr.push(category);
  }

  return arr.concat(category.subCategories.flatMap(
    subCategory => recursivelyMapIdsIfNotPresent(presentCategories, subCategory),
  ));
}

export function flattenGroupedCategories(category) {
  return [
    category,
    ...category.subCategories.flatMap(flattenGroupedCategories),
  ];
}
