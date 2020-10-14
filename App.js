import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './components/HomeScreen.js'
import Bookmarks from './components/Bookmarks.js';
import JobAdd from './components/JobAdd.js';
import Devnap from './components/Sketch.js';
import AboutUs from './components/DevList.js';

const Tab = createBottomTabNavigator();

export default function App() {

  return (

    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen}/>
        <Tab.Screen name="Devnap" component={Devnap} />
        <Tab.Screen name="Bookmarks" component={Bookmarks} />
        <Tab.Screen name="Job App Track" component={JobAdd} />
        <Tab.Screen name="Dev List" component={AboutUs} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


