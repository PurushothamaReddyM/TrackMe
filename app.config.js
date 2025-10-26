/** @type {import('@expo/config').ExpoConfig} */
export default {
  name: 'TrackMe',
  slug: 'trackme',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/images/icon.png',
  scheme: 'trackme',
  userInterfaceStyle: 'automatic',
  entryPoint: 'node_modules/expo-router/entry',

  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.anonymous.trackme',
    infoPlist: {
      NSLocationWhenInUseUsageDescription:
        'TrackMe needs your location to display your position on the map.',
      NSLocationAlwaysAndWhenInUseUsageDescription:
        'TrackMe needs your location to monitor geofences in the background.',
    },
  },

  android: {
    package: 'com.anonymous.trackme',
    permissions: [
      'ACCESS_FINE_LOCATION',
      'ACCESS_COARSE_LOCATION',
      'ACCESS_BACKGROUND_LOCATION',
    ],
    adaptiveIcon: {
      foregroundImage: './assets/images/android-icon-foreground.png',
      backgroundColor: '#E6F4FE',
    },
  },

  web: {
    favicon: './assets/images/favicon.png',
  },

  extra: {
    eas: {
      projectId: '9e4928b1-2a75-4453-bf2b-055bc9ed8601',
    },
  },

  plugins: [
    'expo-router',
    [
      'expo-splash-screen',
      {
        image: './assets/images/splash-icon.png',
        resizeMode: 'contain',
        backgroundColor: '#ffffff',
      },
    ],
  ],

  experiments: {
    typedRoutes: true,
    reactCompiler: true,
  },
};
