import queryString from 'query-string';
import { recursivelyMapIds, recursivelyMapIdsIfNotPresent } from '../productCategoryHelper';

export function addProducer(producer, query) {
  const queryObject = queryString.parse(query);
  const queryProducers = queryObject.producers ? queryObject.producers.split(',') : [];

  queryObject.producers = queryProducers.concat(producer._id).join(',');

  return queryString.stringify(queryObject);
}

export function removeProducer(producer, query) {
  const queryObject = queryString.parse(query);
  const queryProducers = queryObject.producers ? queryObject.producers.split(',') : [];

  queryObject.producers = queryProducers
    .filter(producerId => producerId !== producer._id)
    .join(',') || undefined;

  return queryString.stringify(queryObject);
}

export function addProductCategory(category, query, productCategories) {
  const queryObject = queryString.parse(query);
  const categories = queryObject.categories ? queryObject.categories.split(',') : [];

  queryObject.categories = categories.concat(
    recursivelyMapIdsIfNotPresent(
      productCategories.filter(actCategory => categories.includes(actCategory._id)),
      category
    ).map(actCategory => actCategory._id)
  ).join(',');

  return queryString.stringify(queryObject);
}

export function removeProductCategory(category, query) {
  const queryObject = queryString.parse(query);
  const categories = queryObject.categories ? queryObject.categories.split(',') : [];

  const idsToRemove = recursivelyMapIds(category);

  queryObject.categories = categories
    .filter(actCategoryId => !idsToRemove.includes(actCategoryId))
    .join(',') || undefined;

  return queryString.stringify(queryObject);
}
