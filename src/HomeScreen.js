import RadioButtonRN from 'radio-buttons-react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Colors from '../colors';
import {get, save} from '../storage';

const HomeScreen = () => {
  const [themeValue, setThemeValue] = useState('');
  const [initialValue, setInitialValue] = useState(0);
  const themes = useColorScheme();
  const data = [
    {
      label: 'Light Mode',
      value: 'light',
    },
    {
      label: 'Dark Mode',
      value: 'dark',
    },
    {
      label: 'System Default',
      value: 'default',
    },
  ];

  const themeOperations = theme => {
    switch (theme) {
      case 'dark':
        setTheme(theme, false);
        setInitialValue(2);
        return;
      case 'light':
        setTheme(theme, false);
        setInitialValue(1);
        return;
      case 'default':
        setTheme(themes, true);
        setInitialValue(3);
        return;
    }
  };

  const getAppTheme = useCallback(async () => {
    const theme = await get('Theme');
    const isDefault = await get('IsDefault');
    isDefault ? themeOperations('default') : themeOperations(theme);
  }, []);

  const setTheme = useCallback(async (theme, isDefault) => {
    save('Theme', theme);
    save('IsDefault', isDefault);
    setThemeValue(theme);
  }, []);

  useEffect(() => {
    getAppTheme();
  }, [getAppTheme]);

  const styles = styling(themeValue);

  return (
    <View style={styles.container}>
      <RadioButtonRN
        data={data}
        selectedBtn={e => themeOperations(e?.value)}
        initial={initialValue}
        activeColor={Colors[themeValue]?.activeColor}
        deactiveColor={Colors[themeValue]?.deactiveColor}
        boxActiveBgColor={Colors[themeValue]?.boxActiveColor}
        boxDeactiveBgColor={Colors[themeValue]?.themeColor}
        textColor={Colors[themeValue]?.white}
      />
    </View>
  );
};

export default HomeScreen;

const styling = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: Colors[theme]?.themeColor,
      paddingHorizontal: 20,
    },
    textStyle: {
      color: Colors[theme]?.white,
    },
    textInputStyle: {
      borderColor: Colors[theme]?.gray,
      padding: 10,
      borderWidth: 2,
      borderRadius: 5,
      width: '100%',
      marginTop: 20,
      color: Colors[theme]?.white,
    },
    touchableStyle: {
      backgroundColor: Colors[theme]?.sky,
      padding: 10,
      borderRadius: 6,
      width: '100%',
      height: 57,
      justifyContent: 'center',
      marginTop: 20,
    },
    buttonTextStyle: {
      textAlign: 'center',
      color: Colors[theme]?.commonWhite,
      fontSize: 20,
      fontWeight: '500',
    },
  });

// import { useTheme } from '@react-navigation/native';
// import React from 'react';
// import { Text, View } from 'react-native';

// const HomeScreen = () => {
//   const colors = useTheme().colors;

//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: colors.card,
//       }}>
//       <Text style={{ color: colors.text }}>
//         This is demo of default dark/light theme using navigation.
//       </Text>
//     </View>
//   );
// };

// export default HomeScreen;
