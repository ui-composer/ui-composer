import React, { useCallback, useRef } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';
import { FeedList } from '@features/feed';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

import { fonts } from '@ui-composer/react';

function App() {
  const scrollViewRef = useRef<null | ScrollView>(null);
  const [fontsLoaded] = useFonts(fonts);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar style="auto" />
      <SafeAreaView>
        <ScrollView
          ref={ref => {
            scrollViewRef.current = ref;
          }}
          contentInsetAdjustmentBehavior="automatic"
          onLayout={onLayoutRootView}
        >
          <FeedList />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

export default App;
