const getFlowers = page => ({
  url: `flowers?page=${page}`,
  options: {
    method: 'GET'
  }
});

const searchFlowers = (searchInput, cancelToken) => ({
  url: `flowers/search?query=${searchInput}`,
  options: {
    method: 'GET',
    cancelToken
  }
});

const getFavoriteFlowers = (authToken, page = 1) => ({
  url: `flowers/favorites?page=${page}`,
  options: {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  }
});

const favoriteFlower = (flowerId, authToken) => ({
  url: `flowers/${flowerId}/favorites`,
  options: {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  }
});

const unfavoriteFlower = (flowerId, favoriteId, authToken) => ({
  url: `flowers/${flowerId}/favorites/${favoriteId}`,
  options: {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  }
});

export default {
  getFlowers,
  searchFlowers,
  getFavoriteFlowers,
  favoriteFlower,
  unfavoriteFlower
};
