import React, { useState } from 'react';
import { FlatList, ImageBackground, Text, View } from 'react-native';
import { CardItem, KeyboardAvoidAndDismissView, SearchBar } from 'src/components';
import homeBackground from 'src/assets/images/background/home-background.png';
import styles from 'src/screens/Home/styles';
import { dimensions } from 'src/styles';

const { rem } = dimensions;
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Balloon Flower',
    subTitle: 'Platycodon grandiflorus',
    additionalInfo: '127 sightings'
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Balloon Flower',
    subTitle: 'Platycodon grandiflorus',
    additionalInfo: '127 sightings'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Balloon Flower',
    subTitle: 'Platycodon grandiflorus',
    additionalInfo: '127 sightings'
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571231e29d72',
    title: 'Balloon Flower',
    subTitle: 'Platycodon grandiflorus',
    additionalInfo: '127 sightings'
  },
  {
    id: '58694a0f-3dasd1-471f-bd96-145571e29d72',
    title: 'Balloon Flower',
    subTitle: 'Platycodon grandiflorus',
    additionalInfo: '127 sightings'
  },
  {
    id: '58694a0f-3ddsa1-471f-bd96-145571231e29d72',
    title: 'Balloon Flower',
    subTitle: 'Platycodon grandiflorus',
    additionalInfo: '127 sightings'
  },
  {
    id: '58694a0asdf-3da1-471f-bd96-145571231e29d72',
    title: 'Balloon Flower',
    subTitle: 'Platycodon grandiflorus',
    additionalInfo: '127 sightings'
  }
];

const Home = () => {
  const [searchInput, setSearchInput] = useState('');

  const handleInput = value => {
    setSearchInput(value);
  };

  const onFavoritePress = id => {
    console.log(id);
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidAndDismissView>
        <ImageBackground source={homeBackground} style={styles.imageContainer}>
          <Text style={styles.headerTitle}>Discover flowers around you</Text>
          <Text style={styles.headerSubTitle}>Explore between more than 8.427 sightings</Text>
          <SearchBar
            handleInput={handleInput}
            searchInput={searchInput}
            placeholder="Looking for something specific?"
            viewStyle={styles.searchBarView}
          />
        </ImageBackground>
      </KeyboardAvoidAndDismissView>
      <FlatList
        bounces={false}
        data={DATA}
        numColumns={2}
        renderItem={({ item, index }) => {
          const { id, title, subTitle, additionalInfo } = item;
          const marginWidth = 12;
          const marginLeftWidth = index % 2 === 0 ? marginWidth * rem : (marginWidth / 2) * rem;
          const marginRightWidth =
            index === DATA.length - 1 && index % 2 === 0
              ? marginWidth * 2 * rem
              : index % 2 === 0
              ? (marginWidth / 2) * rem
              : marginWidth * rem;
          const marginBottomWidth = index === DATA.length - 1 ? marginWidth * rem : 0;
          return (
            <View
              style={[
                styles.listItemWrapper,
                {
                  marginLeft: marginLeftWidth,
                  marginRight: marginRightWidth,
                  marginBottom: marginBottomWidth
                }
              ]}>
              <CardItem {...{ id, title, subTitle, additionalInfo, onFavoritePress, isFavorite: false }} />
            </View>
          );
        }}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

Home.propTypes = {};

export default React.memo(Home);
