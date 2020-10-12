import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, Button } from 'react-native';

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

export default HomeScreen;