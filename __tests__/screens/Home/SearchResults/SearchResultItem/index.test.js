import React from 'react';
import { TouchableOpacity } from 'react-native';
import { shallow } from 'enzyme';
import SearchResultItem from 'src/screens/Home/SearchResults/SearchResultItem';

describe('SearchResultItem wrapper', () => {
  it('renders correctly', () => {
    const props = {
      id: 'id',
      name: 'name',
      latin_name: 'latin_name',
      profile_picture: 'profile_picture',
      onResultPress: jest.fn()
    };

    const wrapper = shallow(<SearchResultItem {...props} />);
    expect(wrapper.first().type()).toEqual(TouchableOpacity);
    expect(wrapper.find('TouchableOpacity')).toHaveLength(1);
    expect(wrapper.find('View')).toHaveLength(2);
    expect(wrapper.find('Image')).toHaveLength(1);
    expect(
      wrapper
        .find('Image')
        .at(0)
        .prop('source').uri
    ).toEqual(`https:${props.profile_picture}`);
    expect(wrapper.find('Text')).toHaveLength(2);
    expect(
      wrapper
        .find('Text')
        .at(0)
        .props().children
    ).toEqual(props.name);
    expect(
      wrapper
        .find('Text')
        .at(1)
        .props().children
    ).toEqual(props.latin_name);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('interaction', () => {
  const props = {
    id: 'id',
    name: 'name',
    latin_name: 'latin_name',
    profile_picture: 'profile_picture',
    onResultPress: jest.fn()
  };

  const wrapper = shallow(<SearchResultItem {...props} />);
  it('pressing TouchableOpacity, should call the onPress callback', () => {
    wrapper
      .find('TouchableOpacity')
      .first()
      .prop('onPress')();
    expect(props.onResultPress).toHaveBeenCalledTimes(1);
  });
});
