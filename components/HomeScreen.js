import 'react-native-gesture-handler';
import React from 'react';

import { StyleSheet, Image } from 'react-native';


const styles = StyleSheet.create({
  logo: {
    height: 250,
    width: 250,
  }
});


const HomeScreen = () => {
  return (
    <>

    <Image 
      source={require('../assets/logo.png')}
      style={styles.logo}/>

    </>

  );
};

export default HomeScreen;