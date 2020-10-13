import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import Bookmarks from './components/Bookmarks';
import JobAdd from './components/JobAdd';
import Devnap from './components/Devnap';

const Tab = createBottomTabNavigator();

export default function App() {

  const HomeScreen = ({ navigation }) => {
    return (
      <>

      <Image 
        source={require('./assets/logo.png')}
        style={styles.logo}/>



        <Button
          title="Go to Devnap"
          onPress={() =>
            navigation.navigate('Devnap', { name: 'Steve' })
          }
        />
        <Button
          title="Go to Bookmarks"
          onPress={() =>
            navigation.navigate('Bookmarks', { name: 'Steve' })
          }
        />
        <Button
          title="These are your jobs"
          onPress={() =>
            navigation.navigate('Jobs', { name: 'Steve' })
          }
        />



      </>
    );
  };




  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Tab.Screen name="Devnap" component={Devnap} />
        <Tab.Screen name="Bookmarks" component={Bookmarks} />
        <Tab.Screen name="Jobs" component={JobAdd} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    height: 60,
    width: 60,
  },
  logo: {
    height: 200,
    width: 200,
  }
});
