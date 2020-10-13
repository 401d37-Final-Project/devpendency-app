import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, FlatList, Text, TextInput, View, Button, Linking, TouchableOpacity } from 'react-native';
import { Card, ListItem, Paragraph, Icon } from 'react-native-elements';
import { useFormik, Formik, Field, Form } from 'formik';
import { color } from 'react-native-reanimated';


const styles = StyleSheet.create({
  input: {
    margin: 15,
    borderColor: 'black',
    borderWidth: 1,
    width: 500
  },
})

const Bookmarks = (props) => {
  const [bookmark, setBookmarks] = useState([]);
  const bookmarkList = bookmark;

  return (
    <>
      <Formik
        initialValues={{
          key: '',
          name: '',
          url: '',
          description: ''
        }}
        onSubmit={(values, { resetForm }) => {
          console.log('submitted', values)
          setBookmarks([...bookmark, { values }]);
          resetForm({ values: '' })
        }

        }>

        {({ handleChange, handleSubmit, values }) => (
          <View>
            <Text>Bookmark Name</Text>
            <TextInput
              style={styles.input}
              value={values.name}
              onChangeText={handleChange('name')} />
            <Text>Bookmark URL</Text>
            <TextInput
              style={styles.input}
              value={values.url}
              onChangeText={handleChange('url')} />
            <Text>Bookmark Description</Text>
            <TextInput
              style={styles.input}
              value={values.description}
              onChangeText={handleChange('description')} />
            <Button
              onPress={handleSubmit}
              title="Submit"
              color="gray" />
          </View>
        )}
      </Formik>
      <View>
        <Text>FlatList Renders Here</Text>
        <FlatList
          data={bookmark}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TouchableOpacity title={item} style={styles.person} />}
        />
      </View>

    </>
  );
};


export default Bookmarks;

{/* <View>
  {bookmarks.map(item => {
  return <CardListItem item={item} key={item.id} />;
  })}
  </View> */}

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

