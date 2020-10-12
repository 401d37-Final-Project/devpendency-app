import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, Button } from 'react-native';
import Bookmarks from './components/Bookmarks';
import Jobs from './components/Jobs';
import Devnap from './components/Devnap';

const Stack = createStackNavigator();

export default function App() {

  const HomeScreen = ({ navigation }) => {
    return (
      <>
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
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Devnap" component={Devnap} />
        <Stack.Screen name="Bookmarks" component={Bookmarks} />
        <Stack.Screen name="Jobs" component={Jobs} />
      </Stack.Navigator>
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
});
