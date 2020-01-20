import PropTypes from 'prop-types';

export const flowerPropTypes = PropTypes.exact({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  latin_name: PropTypes.string.isRequired,
  sightings: PropTypes.number.isRequired,
  profile_picture: PropTypes.string.isRequired,
  favorite: PropTypes.bool.isRequired
});
