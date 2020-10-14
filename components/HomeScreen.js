import 'react-native-gesture-handler';
import React from 'react';

import { StyleSheet, Image, View, Text } from 'react-native';

import { Card, Paragraph } from 'react-native-paper';


const styles = StyleSheet.create({
  logo: {
    height: 250,
    width: 250,
  },
  homeIcons: {
    height: 150,
    width: 150,
  },
  cards: {
    flex: 1,
    padding: 20,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
    maxWidth: '100%',
    elevation: 8,
  },
  text: {
    fontSize: '1em',
  }
});


const HomeScreen = () => {
  return (

    <>

    <View style={{flex: 1}}>

    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
      <Image
        source={require('../assets/logo_dark.png')}
        style={styles.logo} />
    </View>

    <View
      style={{flex: 1}}>
        <Card
          style={styles.cards}>

          
          <Image 
            source={require('../assets/napkin.png')}
            style={styles.homeIcons}/>
            <Paragraph style={styles.text}>Quick idea for your next app? Sketch it out on the Dev Napkin and save it for future reference.</Paragraph>
        </Card>
    </View>

    <View
      style={{flex:1, flexDirection: 'row'}}>
        <Card
          style={styles.cards}>
          <Image 
            source={require('../assets/bookmark.png')}
            style={styles.homeIcons}/>
          <Paragraph style={styles.text}>Need to keep track of all your bookmarks? Save them here and follow the link to your browser. </Paragraph>
        </Card>

        <Card
          style={styles.cards}>
          <Image 
            source={require('../assets/app.png')}
            style={styles.homeIcons}/>
          <Paragraph style={styles.text}>A Dev is always on the lookout for new opportunities! Track your job apps here. </Paragraph>
        </Card>

    </View>

    </View>

    </>

  );
};

export default HomeScreen;