import React, {useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import CreditCardScreen from './src/screens/CreditCardScreen';
import SplashScreen from 'react-native-splash-screen';

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#252525'}}>
      <CreditCardScreen />
    </SafeAreaView>
  );
};

export default App;