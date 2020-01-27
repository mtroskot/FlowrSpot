import React from 'react';
import { TouchableOpacity } from 'react-native';
import { shallow } from 'enzyme';
import CardItem from 'src/components/CardItem';

describe('CardItem wrapper', () => {
  it('renders correctly, user not authenticated, no IconButton  ', () => {
    const props = {
      id: 'id',
      title: 'title',
      subTitle: 'subTitle',
      additionalInfo: 'additionalInfo',
      image: 'image',
      isFavorite: false,
      onItemPress: jest.fn(),
      onIconPress: jest.fn(),
      isAuthenticated: false,
      updatingItemId: null
    };

    const wrapper = shallow(<CardItem {...props} />);
    expect(wrapper.first().type()).toEqual(TouchableOpacity);
    expect(wrapper.find('TouchableOpacity')).toHaveLength(1);
    expect(wrapper.find('ImageBackground')).toHaveLength(1);
    expect(
      wrapper
        .find('ImageBackground')
        .first()
        .prop('source').uri
    ).toEqual(`https:${props.image}`);
    expect(wrapper.find('View')).toHaveLength(3);
    expect(wrapper.find('Text')).toHaveLength(3);
    expect(
      wrapper
        .find('Text')
        .at(0)
        .props().children
    ).toEqual(props.title);
    expect(
      wrapper
        .find('Text')
        .at(1)
        .props().children
    ).toEqual(props.subTitle);
    expect(
      wrapper
        .find('Text')
        .at(2)
        .props().children
    ).toEqual([props.additionalInfo, ' sightings']);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly,user authenticated,id same as updatingItemId loader rendered in place of IconButton', () => {
    const props = {
      id: 'id',
      title: 'title',
      subTitle: 'subTitle',
      additionalInfo: 'additionalInfo',
      image: 'image',
      isFavorite: false,
      onItemPress: jest.fn(),
      onIconPress: jest.fn(),
      isAuthenticated: true,
      updatingItemId: 'id'
    };

    const wrapper = shallow(<CardItem {...props} />);
    expect(wrapper.first().type()).toEqual(TouchableOpacity);
    expect(wrapper.find('TouchableOpacity')).toHaveLength(1);
    expect(wrapper.find('ImageBackground')).toHaveLength(1);
    expect(
      wrapper
        .find('ImageBackground')
        .first()
        .prop('source').uri
    ).toEqual(`https:${props.image}`);
    expect(wrapper.find('Memo(Loader)')).toHaveLength(1);
    expect(wrapper.find('View')).toHaveLength(3);
    expect(wrapper.find('Text')).toHaveLength(3);
    expect(
      wrapper
        .find('Text')
        .at(0)
        .props().children
    ).toEqual(props.title);
    expect(
      wrapper
        .find('Text')
        .at(1)
        .props().children
    ).toEqual(props.subTitle);
    expect(
      wrapper
        .find('Text')
        .at(2)
        .props().children
    ).toEqual([props.additionalInfo, ' sightings']);
    expect(wrapper).toMatchSnapshot();
  });

  it(
    'renders correctly,user authenticated,id same as updatingItemId IconButton rendered' + ' item marked as favorite',
    () => {
      const props = {
        id: 'id',
        title: 'title',
        subTitle: 'subTitle',
        additionalInfo: 'additionalInfo',
        image: 'image',
        isFavorite: true,
        onItemPress: jest.fn(),
        onIconPress: jest.fn(),
        isAuthenticated: true,
        updatingItemId: null
      };

      const wrapper = shallow(<CardItem {...props} />);
      expect(wrapper.first().type()).toEqual(TouchableOpacity);
      expect(wrapper.find('TouchableOpacity')).toHaveLength(1);
      expect(wrapper.find('ImageBackground')).toHaveLength(1);
      expect(
        wrapper
          .find('ImageBackground')
          .first()
          .prop('source').uri
      ).toEqual(`https:${props.image}`);
      expect(wrapper.find('Memo(IconButton)')).toHaveLength(1);
      expect(
        wrapper
          .find('Memo(IconButton)')
          .first()
          .prop('imageStyle')[1].tintColor
      ).toEqual('#ffc20d');
      expect(wrapper.find('View')).toHaveLength(3);
      expect(wrapper.find('Text')).toHaveLength(3);
      expect(
        wrapper
          .find('Text')
          .at(0)
          .props().children
      ).toEqual(props.title);
      expect(
        wrapper
          .find('Text')
          .at(1)
          .props().children
      ).toEqual(props.subTitle);
      expect(
        wrapper
          .find('Text')
          .at(2)
          .props().children
      ).toEqual([props.additionalInfo, ' sightings']);
      expect(wrapper).toMatchSnapshot();
    }
  );
});

describe('interaction', () => {
  const props = {
    id: 'id',
    title: 'title',
    subTitle: 'subTitle',
    additionalInfo: 'additionalInfo',
    image: 'image',
    isFavorite: true,
    onItemPress: jest.fn(),
    onIconPress: jest.fn(),
    isAuthenticated: true,
    updatingItemId: null
  };
  afterEach(() => {
    jest.clearAllMocks();
  });
  const wrapper = shallow(<CardItem {...props} />);
  it('pressing TouchableOpacity, should call the onPress callback', () => {
    wrapper
      .find('TouchableOpacity')
      .first()
      .prop('onPress')();
    expect(props.onItemPress).toHaveBeenCalledTimes(1);
    expect(props.onIconPress).toHaveBeenCalledTimes(0);
  });
  it('pressing IconButton, should call the onPress callback', () => {
    wrapper
      .find('Memo(IconButton)')
      .first()
      .prop('onPress')();
    expect(props.onItemPress).toHaveBeenCalledTimes(0);
    expect(props.onIconPress).toHaveBeenCalledTimes(1);
  });
});
