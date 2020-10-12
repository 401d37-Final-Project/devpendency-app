import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, TextInput, View, Button, Linking } from 'react-native';
import { Card, ListItem, Paragraph, Icon } from 'react-native-elements';
import { useFormik, Formik, Field, Form } from 'formik';



const bookmarks = [
  {
    id: 1,
    name: 'Google',
    URL: 'http://google.com',
    Description: 'Search for an answer to that nagging coding problem you can\'t solve.',
  },
  {
    id: 2,
    name: 'React Native',
    URL: 'https://reactnative.div/',
    Description: 'Learn how to build an attractive app in React Native',
  },
  {
    id: 3,
    name: 'Technical Interview Prep',
    URL: 'https://learntocodewith.me/posts/technical-interview/',
    Description: 'Study up on your technical interview questions',
  },
  {
    id: 4,
    name: 'CSS Tricks',
    URL: 'https://css-tricks.com/',
    Description: 'Keep up on your front-end skills'
  }
]

const styles = StyleSheet.create({
  input: {
    margin: 15,
    borderColor: 'black',
    borderWidth: 1,
    width: 500
  }
})


const Bookmarks = () => {

  return (
    <>
      <Formik>
        <View>
          <Text>Bookmark Name</Text>
          <TextInput style={styles.input} />
          <Text>Bookmark URL</Text>
          <TextInput style={styles.input} />
          <Text>Bookmark Description</Text>
          <TextInput style={styles.input} />
          <Button title="Submit" />
        </View>
      </Formik>


      <View>
        {bookmarks.map(item => {
          return <CardListItem item={item} key={item.id} />;
        })}
      </View>
    </>
  );
};

const CardListItem = props => {
  return (
    <>
      <Button title={props.item.name} onPress={() => { Linking.openURL(`${props.item.URL}`) }} />
      <Text>
        {props.item.Description}
      </Text>
    </>
  );
};


export default Bookmarks;



