import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Provider } from 'react-redux';
import AppContainer from 'src/navigation';
import { NavigationService } from 'src/services';
import store from 'src/store';

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <AppContainer ref={ref => NavigationService.setTopLevelNavigator(ref)} />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
