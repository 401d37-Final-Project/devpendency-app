import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import Constants from 'expo-constants';

import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    backgroundColor: 'green',
    marginHorizontal: 20,
  },
  // buttonContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'left',
  //   alignContent: 'center',
  // }
});

const peopleObjects = [
  {
    id: 1,
    name: 'Blake', 
    subtitle: 'Software Developer',
    content: 'Card content 1',
    uri: 'https://picsum.photos/700'
  },
  {
    id: 2,
    name: 'Tia', 
    subtitle: 'Software Developer',
    content: 'Card content 2',
    uri: 'https://picsum.photos/700'
  }, 
  {
    id: 3,
    name: 'Matt', 
    subtitle: 'Software Developer',
    content: 'Card content 3',
    uri: 'https://picsum.photos/700'
  }, 
  {
    id: 4,
    name: 'Stephen', 
    subtitle: 'Software Developer',
    content: 'Card content 4',
    uri: 'https://picsum.photos/700'
  }
];

const gotoGithub = () => {
  console.log('clicked on Github');
}

const RenderCard = props => {
  return (
    <View>
      <Card>
        <Card.Title title={props.people.name} subtitle={props.people.subtitle} />
        <Card.Cover source={{ uri: props.people.uri }} />
          <Paragraph>{props.people.content}</Paragraph>
          <Card.Actions>

            <Icon.Button
              name='github'
              backgroundColor='#2b3137'
              onPress={gotoGithub()}
            >
            </Icon.Button>

            <Icon.Button
              name='linkedin'
              backgroundColor='#0e76a8'
              // onPress={this.gotoLinkedin}
            >
            </Icon.Button>

            </Card.Actions>
      </Card>
    </View>
  );
};

const RenderCardList = () => {
  return (
      peopleObjects.map(people => {
        return <RenderCard people={people} key={people.id} />;
      })
  );
};


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
      
      <RenderCardList />
      
      </ScrollView>
    </SafeAreaView>
  );
}

//Thanks to this guide, it helped out a lot!! https://dev.to/britneys/creating-reusable-react-components-with-map-4823