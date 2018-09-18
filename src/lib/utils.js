import superagent from 'superagent';

const cache = false;

export const renderIf = (test, trueComponent = null, falseComponent = null) =>
  test ? trueComponent : falseComponent;
/**
 * Implements localstorage for cache.
 */
export const fetchData = url => {
  return getCache(url)
    .then(data => data)
    .catch(err => { // eslint-disable-line
      return superagent
        .get(url)
        .then(result => {
          cache && setCache(url, result.body);
          return result.body;
        })
        .catch(console.log);
    })
    .then(data => data);
};
/**
 * Get information from cache.
 */
export const getCache = key => {
  return new Promise((resolve, reject) => {
    let data = cache && localStorage.getItem(key);
    if (data) {
      resolve(JSON.parse(data));
    } else {
      reject('Invalid cache key', key);
    }
  });
};

/**
 * Set information to cache.
 */
export const setCache = (key, value) => {
  // eslint-disable-next-line
  return new Promise((resolve, reject) => {
    let safeValue = typeof value === 'string' ? value : JSON.stringify(value);
    localStorage.setItem(key, safeValue);
    resolve();
  });
};