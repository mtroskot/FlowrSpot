import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PopupMessage } from 'src/components';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import AppContainer from 'src/navigation';
import { NavigationService } from 'src/services';
import store, { getPersistor } from 'src/store';

const persistor = getPersistor();

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <PersistGate loading={null} persistor={persistor} bootstrapped={true}>
          <AppContainer ref={ref => NavigationService.setTopLevelNavigator(ref)} />
        </PersistGate>
        <PopupMessage />
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
