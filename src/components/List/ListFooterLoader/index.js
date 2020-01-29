import React from 'react';
import { ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

const ListFooterLoader = ({ flatListLoading, listLength }) => {
  if (flatListLoading && listLength > 0) {
    return <ActivityIndicator size={'large'} />;
  }
  return null;
};

ListFooterLoader.propTypes = {
  flatListLoading: PropTypes.bool.isRequired,
  listLength: PropTypes.number.isRequired
};

export default React.memo(ListFooterLoader);
