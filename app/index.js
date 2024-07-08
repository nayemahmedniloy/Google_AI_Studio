import React, { useRef, useEffect, useState } from 'react';
import { BackHandler, Platform } from 'react-native';
import { WebView } from 'react-native-webview';

const MyWebView = () => {
  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  const onAndroidBackPress = () => {
    if (canGoBack && webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', onAndroidBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onAndroidBackPress);
      };
    }
  }, [canGoBack]);

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: 'https://aistudio.google.com/app/' }}
      onNavigationStateChange={navState => setCanGoBack(navState.canGoBack)}
    />
  );
};

export default MyWebView;
