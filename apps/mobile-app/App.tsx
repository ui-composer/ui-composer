import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Sofia-Regular': require('./assets/fonts/SofiaProRegular.otf'),
    'Sofia-Medium': require('./assets/fonts/SofiaProMedium.otf'),
    'Sofia-Semi-Bold': require('./assets/fonts/SofiaProSemiBold.otf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <>
      <View style={styles.container}>
        <Text>Open up App.tsx to start working on your app!</Text>
      </View>
      <StatusBar style="auto" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
