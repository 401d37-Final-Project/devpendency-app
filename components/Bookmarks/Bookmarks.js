import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, FlatList, Text, TextInput, View, Button, Linking, TouchableOpacity } from 'react-native';
import { Card, ListItem, Paragraph, Icon } from 'react-native-elements';
import { useFormik, Formik, Field, Form } from 'formik';
import { color } from 'react-native-reanimated';

const Stack = createStackNavigator();

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



  const renderItem = ({ item }) => {

    const handleClick = () => {
      Linking.openURL(`${item.values.url}`);
    }

    return (
      <>
        <TouchableOpacity
          keyExtractor={(item) => item.id}
          item={item}>
          <Button title={item.values.name} onPress={handleClick}></Button>
        </TouchableOpacity>
        <Text>{item.values.description}</Text>
      </>
    )
  }
  return (
    <>
      <Formik
        initialValues={{
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
            <Text>Bookmark URL</Text>
            <TextInput
              style={styles.input}
              value={values.url}
              onChangeText={handleChange('url')} />
            <Text>Bookmark Name</Text>
            <TextInput
              style={styles.input}
              value={values.name}
              onChangeText={handleChange('name')} />
            <Text>Bookmark Description</Text>
            <TextInput
              style={styles.input}
              value={values.description}
              onChangeText={handleChange('description')} />
            <Button
              onPress={handleSubmit}
              title="submit"
              color="gray" />

          </View>
        )}
      </Formik>

      <FlatList
        data={bookmarkList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

    </>
  );

};


export default Bookmarks;





