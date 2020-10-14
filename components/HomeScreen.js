import 'react-native-gesture-handler';
import React from 'react';

import { StyleSheet, Image, View, Text } from 'react-native';


const styles = StyleSheet.create({
  logo: {
    height: 250,
    width: 250,
  }
});


const HomeScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome, Developer to </Text>
      <Image
        source={require('../assets/logo_dark.png')}
        style={styles.logo} />
    </View>

  );
};

export default HomeScreen;