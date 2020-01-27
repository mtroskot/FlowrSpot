import React from 'react';
import { shallow } from 'enzyme';
import SearchResults from 'src/screens/Home/SearchResults';
import SearchResultItem from 'src/screens/Home/SearchResults/SearchResultItem';

describe('SearchResults wrapper', () => {
  it('renders loading indicator in search results view', () => {
    const props = {
      searchData: {
        searchResults: [],
        message: null
      },
      isSearching: true,
      onResultPress: jest.fn(),
      onClosePress: jest.fn()
    };

    const wrapper = shallow(<SearchResults {...props} />);
    expect(wrapper.first().type()).toEqual(React.Fragment);
    expect(wrapper.find('Fragment')).toHaveLength(1);
    expect(wrapper.find('View')).toHaveLength(2);
    expect(wrapper.find('Memo(Loader)')).toHaveLength(1);
    expect(wrapper.find('Text')).toHaveLength(0);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders message in search results view', () => {
    const props = {
      searchData: {
        searchResults: [],
        message: 'Something went wrong'
      },
      isSearching: false,
      onResultPress: jest.fn(),
      onClosePress: jest.fn()
    };

    const wrapper = shallow(<SearchResults {...props} />);
    expect(wrapper.first().type()).toEqual(React.Fragment);
    expect(wrapper.find('Fragment')).toHaveLength(1);
    expect(wrapper.find('View')).toHaveLength(2);
    expect(wrapper.find('Memo(Loader)')).toHaveLength(0);
    expect(wrapper.find('Text')).toHaveLength(1);
    expect(
      wrapper
        .find('Text')
        .first()
        .props().children
    ).toEqual(props.searchData.message);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders search results', () => {
    const props = {
      searchData: {
        searchResults: [
          { id: 'id1', name: 'name1', latin_name: 'latin_name1', profile_picture: 'profile_picture1' },
          { id: 'id2', name: 'name2', latin_name: 'latin_name2', profile_picture: 'profile_picture2' }
        ],
        message: null
      },
      isSearching: false,
      onResultPress: jest.fn(),
      onClosePress: jest.fn()
    };

    const wrapper = shallow(<SearchResults {...props} />);
    expect(wrapper.first().type()).toEqual(React.Fragment);
    expect(wrapper.find('Fragment')).toHaveLength(1);
    expect(wrapper.find('View')).toHaveLength(3);
    expect(wrapper.find('Memo(Loader)')).toHaveLength(0);
    expect(wrapper.find('Text')).toHaveLength(1);
    expect(
      wrapper
        .find('Text')
        .first()
        .props().children
    ).toEqual('Close');
    expect(wrapper.find('TouchableOpacity')).toHaveLength(1);
    expect(wrapper.find('FlatList')).toHaveLength(1);
    expect(wrapper.find('FlatList').props().data).toEqual(props.searchData.searchResults);
    expect(
      wrapper
        .find('FlatList')
        .props()
        .keyExtractor({ id: 'id' })
    ).toEqual('id');
    const item = props.searchData.searchResults[0];
    expect(
      wrapper
        .find('FlatList')
        .props()
        .renderItem({ item })
    ).toEqual(
      <SearchResultItem
        {...{
          id: item.id,
          name: item.name,
          latin_name: item.latin_name,
          profile_picture: item.profile_picture,
          onResultPress: props.onResultPress
        }}
      />
    );
    expect(wrapper).toMatchSnapshot();
  });
});

describe('interaction', () => {
  const props = {
    searchData: {
      searchResults: [
        { id: 'id1', name: 'name1', latin_name: 'latin_name1', profile_picture: 'profile_picture1' },
        { id: 'id2', name: 'name2', latin_name: 'latin_name2', profile_picture: 'profile_picture2' }
      ],
      message: null
    },
    isSearching: false,
    onResultPress: jest.fn(),
    onClosePress: jest.fn()
  };
  afterEach(() => {
    jest.clearAllMocks();
  });
  const wrapper = shallow(<SearchResults {...props} />);
  const RenderItem = wrapper.find('FlatList').prop('renderItem');
  const renderItemShallowWrapper = shallow(<RenderItem item={props.searchData.searchResults[0]} />);

  it('calling SearchResultItem onResultPress, should call the onResultPress callback', () => {
    renderItemShallowWrapper
      .find('Memo(SearchResultItem)')
      .first()
      .prop('onResultPress')();
    expect(props.onResultPress).toHaveBeenCalledTimes(1);
    expect(props.onClosePress).toHaveBeenCalledTimes(0);
  });
  it('pressing Close buttton, should call the onClosePress callback', () => {
    wrapper
      .find('TouchableOpacity')
      .first()
      .prop('onPress')();
    expect(props.onClosePress).toHaveBeenCalledTimes(1);
    expect(props.onResultPress).toHaveBeenCalledTimes(0);
  });
});
