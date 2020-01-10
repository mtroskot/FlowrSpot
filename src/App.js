import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import AppContainer from 'src/navigation';
import { NavigationService } from 'src/services';
import store from 'src/store';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container} forceInset={{ top: 'never' }}>
        <AppContainer ref={ref => NavigationService.setTopLevelNavigator(ref)} />
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
});
