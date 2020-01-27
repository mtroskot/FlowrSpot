import PropTypes from 'prop-types';

export const flowerPropTypes = PropTypes.exact({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  latin_name: PropTypes.string.isRequired,
  sightings: PropTypes.number.isRequired,
  profile_picture: PropTypes.string.isRequired,
  favorite: PropTypes.bool.isRequired
});

export const userPropTypes = PropTypes.exact({
  id: PropTypes.number,
  email: PropTypes.string,
  authToken: PropTypes.string,
  firstName: PropTypes.number,
  lastName: PropTypes.string
});

export const popupMessagePropTypes = PropTypes.exact({
  message: PropTypes.string,
  position: PropTypes.oneOf(['bottom', 'top'])
});

export const favoriteFlowerListPropTypes = PropTypes.arrayOf(
  PropTypes.exact({
    flowerId: PropTypes.number.isRequired,
    favoriteId: PropTypes.number.isRequired
  })
);
