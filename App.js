import React, {useCallback, useEffect} from 'react';
import {View, Text, useColorScheme} from 'react-native';
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/HomeScreen';

const App = () => {
  const appearance = useColorScheme();
  // const setAppTheme = useCallback(async () => {
  //   const IS_FIRST = await get('IS_FIRST');
  //   if (IS_FIRST === null) {
  //     save('Theme', appearance);
  //     save('IsDefault', true);
  //     save('IS_FIRST', true);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // useEffect(() => {
  //   setAppTheme();
  // }, [setAppTheme]);
  const RootStack = createNativeStackNavigator();
  return (
    <NavigationContainer
      theme={appearance === 'dark' ? DarkTheme : DefaultTheme}>
      <RootStack.Navigator>
        <RootStack.Screen name={'HomeScreen'} component={HomeScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
