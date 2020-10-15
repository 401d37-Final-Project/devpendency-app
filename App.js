import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { useFonts } from '@expo-google-fonts/inter';
// import Ionicons from 'react-native-vector-icons/Ionicons';


import HomeScreen from './components/HomeScreen.js'
import Bookmarks from './components/Bookmarks.js';
import JobAdd from './components/JobAdd.js';
import Devnap from './components/Sketch.js';
import AboutUs from './components/DevList.js';

const Tab = createBottomTabNavigator();

const fontConfig = {
  default: {
    // regular: {
    //   fontFamily: 'sans-serif',
    //   fontWeight: 'normal',
    // },
    medium: {
      fontFamily: 'exo',
      fontWeight: 'medium',
    },
  },
};

const theme = {
  ...DefaultTheme,
  dark: true,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#F9665E',
    accent: '#EEF1E6',
    background: '#2E373E',
    text: '#fff',
    surface: '#414A4E'
  },
  // fonts: configureFonts(fontConfig),
};

export default function App() {
  let [fontsLoaded] = useFonts({
    'Exo-Medium': require('./assets/fonts/Exo-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {

  return (
    
    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused
                  ? 'md-home'
                  : 'ios-home';
              } else if (route.name === 'Napkin') {
                iconName = focused ? 'ios-brush' : 'md-brush';
              } else if (route.name === 'Bookmarks') {
                iconName = focused ? 'md-bookmark' : 'md-book';
              } else if (route.name === 'Jobs') {
                iconName = focused ? 'ios-document' : 'md-document';
              } else if (route.name === 'About') {
                iconName = focused ? 'md-people' : 'md-people';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#EEF1E6',
            inactiveTintColor: '#414A4E',
            style: {
              paddingVertical: 5,
              backgroundColor: '#F9665E',
            }
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
          />
          <Tab.Screen name="Napkin" component={Devnap} />
          <Tab.Screen name="Bookmarks" component={Bookmarks} />
          <Tab.Screen name="Jobs" component={JobAdd} />
          <Tab.Screen name="About" component={AboutUs} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
    
  );
  };
};


