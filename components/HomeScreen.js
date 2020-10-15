import 'react-native-gesture-handler';
import React from 'react';

import { StyleSheet, Image, View, Text, SafeAreaView, ScrollView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Card, Paragraph } from 'react-native-paper';


const styles = StyleSheet.create({
  logo: {
    height: 250,
    width: 250,
  },
  heroIcon: {
  },
  homeIcons: {
    height: 150,
    width: 150,
  },
  cards: {
    flex: 1,
    flexWrap: 'wrap', 
    padding: 15,
    marginTop: 5,
    marginHorizontal: 10,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 250,
    maxHeight: 250,
    elevation: 8,
  },
  text: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Exo-Medium',
  }
});


const HomeScreen = () => {
  return (

    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
    <View style={{flex: 1}}>

    <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={require('../assets/images/logo_dark.png')}
        style={styles.logo} />
    </View>

    <View style={{justifyContent: 'space-evenly',
    alignItems: 'center'}}>
        <Card
          style={styles.cards}>

          <Ionicons
            name={'md-brush'}
            size={80}
            color={'black'}
            style={styles.heroIcon}/>
            <Paragraph style={styles.text}>Quick idea for your next app? Sketch it out on the Dev Napkin and save it for future reference.</Paragraph>
        </Card>
    </View>

    <View
      style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
        <Card
          style={styles.cards}>
          <Ionicons
            name={'md-book'}
            size={80}
            color={'black'}
            style={styles.heroIcon}/>
          <Paragraph style={styles.text}>Need to keep track of all your resources? Save them here and link directly to the browser. </Paragraph>
        </Card>

        <Card
          style={styles.cards}>
          <Ionicons
            name={'md-document'}
            size={80}
            color={'black'}
            style={styles.heroIcon}/>
          <Paragraph style={styles.text}>A Dev is always on the lookout for new opportunities! Track your job app's here. </Paragraph>
        </Card>

    </View>

    </View>

    </ScrollView>
    </SafeAreaView>

  );
};

export default HomeScreen;