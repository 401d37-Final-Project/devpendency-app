import React from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, TouchableOpacity, Linking, Alert, Image, WebView } from 'react-native';
import { Paragraph, Text, Card, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Constants from 'expo-constants';

import Icon from 'react-native-vector-icons/FontAwesome';

import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  basic: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  cards: {
    flex: 1,
    padding: 20,
    marginTop: 10,
    marginBottom: 30,
    maxWidth: '85%',
    elevation: 8,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

// const theme = {
//   ...DefaultTheme,
//   dark: true,
//   roundness: 5,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: '#EEF1E6',
//     accent: '#F9665E',
//     background: '#A2A2A2',
//     text: '#2E373E',
//   },
// };

const peopleObjects = [
  {
    id: 1,
    name: 'Blake', 
    subtitle: 'Software Developer',
    content: 'Blake is a full-stack developer and a huge nerd for learning new technologies. A veteran of the U.S. Army and experienced in international collaboration he always strives to create a better quality of life for everyone through code.',
    uri: require('../assets/images/blake.jpg'),
    githubURL: 'https://github.com/blakerom',
    linkedinURL: 'https://www.linkedin.com/in/blakeromero'
  },
  {
    id: 2,
    name: 'Tia', 
    subtitle: 'Software Developer',
    content: 'Curious and self-motivated full-stack software developer with a diverse background of work experience, always looking for new things to Google.',
    uri: require('../assets/images/tia.jpg'),
    githubURL: 'https://www.linkedin.com/in/tia-low',
    linkedinURL: 'https://www.linkedin.com/in/tia-low/'
  }, 
  {
    id: 3,
    name: 'Matt', 
    subtitle: 'Software Developer',
    content: 'Tech-loving software developer based in the greater Seattle area with a background in customer service and hospitality and a passion for problem-solving.',
    uri: require('../assets/images/matt.jpg'),
    githubURL: 'https://github.com/herrigesmt',
    linkedinURL: 'https://www.linkedin.com/in/herrigesmt'
  }, 
  {
    id: 4,
    name: 'Stephen', 
    subtitle: 'Software Developer',
    content: 'Steve is a music obsessed full stack software developer from Seattle. If he’s not performing, discovering, or discussing music, he’s likely either asleep or in the mountains.',
    uri: require('../assets/images/steve.png'),
    githubURL: 'https://github.com/SBALDOCK',
    linkedinURL: 'https://www.linkedin.com/in/stephentbaldock/'
  }
];

const gotoGithub = (url) => {
  Linking.openURL(url).catch(err =>
    Alert.alert(`Could not find ${url}. Make sure you include an \'http://\' or \'https://\'`)
  );
};

const gotoLinkedin = (url) => {
  Linking.openURL(url).catch(err =>
    Alert.alert(`Could not find ${url}. Make sure you include an \'http://\' or \'https://\'`)
  );
};

const RenderDevCard = props => {
  return (
    <View style={styles.basic}>
      <Card style={styles.cards}>
        <Card.Title title={props.people.name} subtitle={props.people.subtitle} />
        <Image
        source={props.people.uri}
        style={{height: 250, width: 250}}
        />
          <Paragraph>{props.people.content}</Paragraph>

          <Card.Actions>

            <TouchableOpacity onPress={() => gotoGithub(props.people.githubURL)}>
            <Icon
              name='github'
              size={25}
              color='#2b3137'
              style={{height:25,width:25}}/>
            </TouchableOpacity>

            <TouchableOpacity style={{marginHorizontal: 5}} onPress={() => gotoLinkedin(props.people.linkedinURL)}>
            <Icon
              name='linkedin'
              size={25}
              color='#0e76a8'
              style={{height:25,width:25}}/>
            </TouchableOpacity>

          </Card.Actions>
      </Card>
    </View>
  );
};

const DevCardList = () => {
  return (
      peopleObjects.map(people => {
        return <RenderDevCard people={people} key={people.id} />;
      })
  );
};

export default function DevList() {

  const Dev = () => {

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>

        <DevCardList />
        
        </ScrollView>
      </SafeAreaView>
    );

  }

  return (
    <>
    <Stack.Navigator>

      <Stack.Screen 
        name='Meet the Devs'
        component={Dev} />

    </Stack.Navigator>
    </>
  );
}

//Thanks to this guide, it helped out a lot!! https://dev.to/britneys/creating-reusable-react-components-with-map-4823
