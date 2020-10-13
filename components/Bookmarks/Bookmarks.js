import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar, FlatList, Text, Container, TextInput, View, Button, Linking, TouchableOpacity } from 'react-native';
import { Card, ListItem, Paragraph, Icon } from 'react-native-elements';
import { useFormik, Formik, Field, Form } from 'formik';
import { color } from 'react-native-reanimated';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  input: {
    margin: 15,
    borderColor: 'black',
    borderWidth: 1,
    width: 275
  },
  baseText: {
    fontFamily: "Cochin",
  },
  heading: {
    fontFamily: "Cochin",
    textAlign: 'center',
    marginBottom: 30
  },
  description: {
    fontFamily: "Cochin",
    marginTop: 20,
    textAlign: 'center',
  },
  delete: {
    fontFamily: "Cochin",
    textAlign: 'right',
  }

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
        <Card>
          <TouchableOpacity
            keyExtractor={(item) => item.id}
            item={item}>
            <Button

              title={item.values.name}
              onPress={handleClick}
            />
          </TouchableOpacity>
          <Text style={styles.description}>
            {item.values.description}
          </Text>
          <Text style={styles.delete}>
            Delete
          </Text>
        </Card>
      </>
    )
  }
  return (
    <>
      <Card>
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
              <Text style={styles.heading} >Add a new Bookmark</Text>
              <Text style={styles.baseText}>Bookmark URL</Text>
              <TextInput
                style={styles.input}
                value={values.url}
                onChangeText={handleChange('url')} />
              <Text style={styles.baseText}>Bookmark Name</Text>
              <TextInput
                style={styles.input}
                value={values.name}
                onChangeText={handleChange('name')} />
              <Text style={styles.baseText}>Bookmark Description</Text>
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
      </Card>

      <FlatList
        style={{ marginTop: 40 }}
        data={bookmarkList}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />

    </>
  );

};


export default Bookmarks;





