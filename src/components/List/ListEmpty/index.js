import React from 'react';
import { Error404, Loader } from 'src/components';
import PropTypes from 'prop-types';

const ListEmpty = ({ error, text }) => {
  if (error) {
    return <Error404 />;
  }
  return <Loader text={text} />;
};

ListEmpty.propTypes = {
  error: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
};

export default React.memo(ListEmpty);
