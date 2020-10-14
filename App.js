import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
import Bookmarks from './components/Bookmarks.js';
import JobAdd from './components/JobAdd.js';
import Devnap from './components/Sketch.js';
import AboutUs from './components/DevList.js';

const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  dark: true,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#F9665E',
    accent: '#EEF1E6',
    background: '#2E373E',
    text: '#000',
  },
};

export default function App() {

  const HomeScreen = ({ navigation }) => {
    return (
      <>


      <Text>Welcome Developer!</Text>
      <Image 
        source={require('./assets/logo.png')}
        style={styles.logo}/>


        {/* <Button
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
        /> */}



        </>

    );
  };




  return (

    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
          />
          <Tab.Screen name="Devnap" component={Devnap} />
          <Tab.Screen name="Bookmarks" component={Bookmarks} />
          <Tab.Screen name="Job App Track" component={JobAdd} />
          <Tab.Screen name="Dev List" component={AboutUs} />
          
      

        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 250,
    width: 250,
  }
});
