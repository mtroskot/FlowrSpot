import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaView } from 'react-navigation';
import AppContainer from 'src/services/navigation';
import { NavigationService } from 'src/services';
import store from 'src/store';

const persistor = getPersistor();

export default function App() {
  return (
      <Provider store={store}>
        <SafeAreaView style={styles.container} forceInset={{ top: 'never' }}>
          <PersistGate loading={null} persistor={persistor} bootstrapped={true}>
            <AppContainer ref={ref => NavigationService.setTopLevelNavigator(ref)} />
            <PopupMesssage />
          </PersistGate>
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
