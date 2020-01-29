import React from 'react';
import { ImageBackground } from 'react-native';
import { shallow } from 'enzyme';
import FlowerListHeader from 'src/screens/Home/FlowerList/ListHeader';

describe('FlowerListHeader wrapper', () => {
  it('renders correctly, searchInput empty', () => {
    const props = {
      headerTitle: 'headerTitle',
      headerSubtitle: 'headerSubtitle',
      searchInput: '',
      placeholder: 'placeholder',
      handleInput: jest.fn(),
      clearInput: jest.fn()
    };

    const wrapper = shallow(<FlowerListHeader {...props} />);
    expect(wrapper.first().type()).toEqual(ImageBackground);
    expect(wrapper.find('ImageBackground')).toHaveLength(1);
    expect(wrapper.find('Text')).toHaveLength(2);
    expect(wrapper.find('View')).toHaveLength(1);
    expect(wrapper.find('Memo(SearchBar)')).toHaveLength(1);
    expect(
      wrapper
        .find('Text')
        .at(0)
        .props().children
    ).toEqual(props.headerTitle);
    expect(
      wrapper
        .find('Text')
        .at(1)
        .props().children
    ).toEqual(props.headerSubtitle);
    expect(
      wrapper
        .find('Memo(SearchBar)')
        .first()
        .prop('searchInput')
    ).toEqual(props.searchInput);
    expect(
      wrapper
        .find('Memo(SearchBar)')
        .first()
        .prop('handleInput')
    ).toEqual(props.handleInput);
    expect(
      wrapper
        .find('Memo(SearchBar)')
        .first()
        .prop('clearInput')
    ).toEqual(props.clearInput);
    expect(
      wrapper
        .find('Memo(SearchBar)')
        .first()
        .prop('placeholder')
    ).toEqual(props.placeholder);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly, searchInput not empty', () => {
    const props = {
      headerTitle: 'headerTitle',
      headerSubtitle: 'headerSubtitle',
      searchInput: 'searchInput',
      placeholder: 'placeholder',
      handleInput: jest.fn(),
      clearInput: jest.fn()
    };

    const wrapper = shallow(<FlowerListHeader {...props} />);
    expect(wrapper.first().type()).toEqual(ImageBackground);
    expect(wrapper.find('ImageBackground')).toHaveLength(1);
    expect(wrapper.find('Text')).toHaveLength(2);
    expect(wrapper.find('View')).toHaveLength(1);
    expect(wrapper.find('Memo(SearchBar)')).toHaveLength(1);
    expect(
      wrapper
        .find('Text')
        .at(0)
        .props().children
    ).toEqual(props.headerTitle);
    expect(
      wrapper
        .find('Text')
        .at(1)
        .props().children
    ).toEqual(props.headerSubtitle);
    expect(
      wrapper
        .find('Memo(SearchBar)')
        .first()
        .prop('searchInput')
    ).toEqual(props.searchInput);
    expect(
      wrapper
        .find('Memo(SearchBar)')
        .first()
        .prop('handleInput')
    ).toEqual(props.handleInput);
    expect(
      wrapper
        .find('Memo(SearchBar)')
        .first()
        .prop('clearInput')
    ).toEqual(props.clearInput);
    expect(
      wrapper
        .find('Memo(SearchBar)')
        .first()
        .prop('placeholder')
    ).toEqual(props.placeholder);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('interaction', () => {
  const props = {
    headerTitle: 'headerTitle',
    headerSubtitle: 'headerSubtitle',
    searchInput: '',
    placeholder: 'placeholder',
    handleInput: jest.fn(),
    clearInput: jest.fn()
  };

  const wrapper = shallow(<FlowerListHeader {...props} />);
  it('calling clearInput,handleInput, should trigger callbacks', () => {
    wrapper
      .find('Memo(SearchBar)')
      .first()
      .prop('handleInput')();
    wrapper
      .find('Memo(SearchBar)')
      .first()
      .prop('clearInput')();
    expect(props.handleInput).toHaveBeenCalledTimes(1);
    expect(props.clearInput).toHaveBeenCalledTimes(1);
  });
});
