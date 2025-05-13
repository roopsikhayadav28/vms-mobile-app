import  MaterialIcons  from '@expo/vector-icons/MaterialIcons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import {Lato_700Bold, Lato_400Regular} from '@expo-google-fonts/lato'

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  // load fonts
  const [fontsLoaded] = Font.useFonts({
    Lato_400Regular,
    Lato_700Bold
  })
  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load icons
        await Font.loadAsync({
          ...MaterialIcons.font,
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete && fontsLoaded;
}
