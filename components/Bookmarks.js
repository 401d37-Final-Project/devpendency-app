import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, Button, Linking } from 'react-native';


const Bookmarks = () => {
  return (
    <>
      <Text style={{ color: 'blue' }}
        onPress={() => Linking.openURL('http://google.com')}>
        Google
      </Text>
      <Text style={{ color: 'red' }}
        onPress={() => Linking.openURL('https://reactnative.dev/')}>
        React Native
      </Text>
      <Text style={{ color: 'gray' }}
        onPress={() => Linking.openURL('https://learntocodewith.me/posts/technical-interview/')}>
        Technical Interview Prep
      </Text>
      <Text style={{ color: 'purple' }}
        onPress={() => Linking.openURL('https://stackoverflow.com/')}>
        Stack Overflow
      </Text>
    </>
  )
};

export default Bookmarks;