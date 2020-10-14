import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
// import Ionicons from 'react-native-vector-icons/Ionicons';


import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';
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
    text: '#000',
  },
  fonts: configureFonts(fontConfig),
};

export default function App() {

  const HomeScreen = ({ navigation }) => {
    return (
      // <>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>

      
      <Text>Welcome, Developer to </Text>
      <Image 
        source={require('./assets/logo_dark.png')}
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


</View>
        // </>

    );
  };




  return (

    <PaperProvider theme={theme}>
      <NavigationContainer theme={theme}>
        <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    // Icon selection for tab based navigator
                    if (route.name === 'Home') {
                      iconName = focused
                        ? 'md-home'
                        : 'ios-home';
                    } else if (route.name === 'Napkin') {
                      iconName = focused ? 'ios-list-box' : 'ios-list';
                    } else if (route.name === 'Bookmarks') {
                      iconName = focused ? 'ios-list-box' : 'md-book';
                    } else if (route.name === 'Job Tracker') {
                      iconName = focused ? 'ios-list-box' : 'md-document';
                    } else if (route.name === 'About the Devs') {
                      iconName = focused ? 'ios-list-box' : 'ios-person';
                    }
        
                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                  },
                })}
                tabBarOptions={{
                  activeTintColor: '#F9665E',
                  inactiveTintColor: '#000',
                }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            
          />
          <Tab.Screen name="Napkin" component={Devnap} />
          <Tab.Screen name="Bookmarks" component={Bookmarks} />
          <Tab.Screen name="Job Tracker" component={JobAdd} />
          <Tab.Screen name="About the Devs" component={AboutUs} />
          
      

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
