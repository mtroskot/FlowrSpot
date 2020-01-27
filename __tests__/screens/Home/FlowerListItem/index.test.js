import React from 'react';
import { View } from 'react-native';
import { shallow } from 'enzyme';
import FlowerListItem from 'src/screens/Home/FlowerListItem';

describe('FlowerListItem wrapper', () => {
  it('renders correctly, favoriteFlowerList empty', () => {
    const props = {
      item: {
        id: 'id',
        name: 'name',
        latin_name: 'latin_name',
        sightings: 'sightings',
        profile_picture: 'profile_picture'
      },
      index: 0,
      arrayLength: 10,
      onFlowerPress: jest.fn(),
      onFavoritePress: jest.fn(),
      onUnfavoritePress: jest.fn(),
      isAuthenticated: false,
      updatingItemId: null,
      favoriteFlowerList: []
    };

    const wrapper = shallow(<FlowerListItem {...props} />);
    expect(wrapper.first().type()).toEqual(View);
    expect(wrapper.find('View')).toHaveLength(1);
    expect(wrapper.find('Memo(CardItem)')).toHaveLength(1);
    expect(
      wrapper
        .find('Memo(CardItem)')
        .first()
        .prop('id')
    ).toEqual(props.item.id);
    expect(
      wrapper
        .find('Memo(CardItem)')
        .first()
        .prop('title')
    ).toEqual(props.item.name);
    expect(
      wrapper
        .find('Memo(CardItem)')
        .first()
        .prop('subTitle')
    ).toEqual(props.item.latin_name);
    expect(
      wrapper
        .find('Memo(CardItem)')
        .first()
        .prop('additionalInfo')
    ).toEqual(props.item.sightings);
    expect(
      wrapper
        .find('Memo(CardItem)')
        .first()
        .prop('image')
    ).toEqual(props.item.profile_picture);
    expect(
      JSON.stringify(
        wrapper
          .find('Memo(CardItem)')
          .first()
          .prop('onIconPress')
      )
    ).toEqual(JSON.stringify(() => props.onUnfavoritePress));
    expect(
      wrapper
        .find('Memo(CardItem)')
        .first()
        .prop('isFavorite')
    ).toEqual(false);
    expect(
      wrapper
        .find('Memo(CardItem)')
        .first()
        .prop('isAuthenticated')
    ).toEqual(props.isAuthenticated);
    expect(
      wrapper
        .find('Memo(CardItem)')
        .first()
        .prop('updatingItemId')
    ).toEqual(props.updatingItemId);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly, favoriteFlowerList contains item id', () => {
    const props = {
      item: {
        id: 'id',
        name: 'name',
        latin_name: 'latin_name',
        sightings: 'sightings',
        profile_picture: 'profile_picture'
      },
      index: 0,
      arrayLength: 10,
      onFlowerPress: jest.fn(),
      onFavoritePress: jest.fn(),
      onUnfavoritePress: jest.fn(),
      isAuthenticated: false,
      updatingItemId: null,
      favoriteFlowerList: [{ flowerId: 'id' }]
    };

    const wrapper = shallow(<FlowerListItem {...props} />);
    expect(wrapper.first().type()).toEqual(View);
    expect(wrapper.find('View')).toHaveLength(1);
    expect(wrapper.find('Memo(CardItem)')).toHaveLength(1);
    expect(
      wrapper
        .find('Memo(CardItem)')
        .first()
        .prop('id')
    ).toEqual(props.item.id);
    expect(
      wrapper
        .find('Memo(CardItem)')
        .first()
        .prop('title')
    ).toEqual(props.item.name);
    expect(
      wrapper
        .find('Memo(CardItem)')
        .first()
        .prop('subTitle')
    ).toEqual(props.item.latin_name);
    expect(
      wrapper
        .find('Memo(CardItem)')
        .first()
        .prop('additionalInfo')
    ).toEqual(props.item.sightings);
    expect(
      wrapper
        .find('Memo(CardItem)')
        .first()
        .prop('image')
    ).toEqual(props.item.profile_picture);
    expect(
      JSON.stringify(
        wrapper
          .find('Memo(CardItem)')
          .first()
          .prop('onIconPress')
      )
    ).toEqual(JSON.stringify(() => props.onFavoritePress));
    expect(
      wrapper
        .find('Memo(CardItem)')
        .first()
        .prop('isFavorite')
    ).toEqual(true);
    expect(
      wrapper
        .find('Memo(CardItem)')
        .first()
        .prop('isAuthenticated')
    ).toEqual(props.isAuthenticated);
    expect(
      wrapper
        .find('Memo(CardItem)')
        .first()
        .prop('updatingItemId')
    ).toEqual(props.updatingItemId);
    expect(wrapper).toMatchSnapshot();
  });
});
