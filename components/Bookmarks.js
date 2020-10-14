import 'react-native-gesture-handler';
import React, { useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar, FlatList, Container, TextInput, View, Linking, TouchableOpacity } from 'react-native';
import { ListItem, Paragraph, Icon } from 'react-native-elements';
import { useFormik, Formik, Field, Form } from 'formik';
import { Button, Text, Card, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

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
  },
  basic: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  cards: {
    flex: 1,
    padding: 20,
    marginTop: 50,
    maxWidth: '90%',
    elevation: 8,
    backgroundColor: '#A2A2A2',
  }

})

const theme = {
  ...DefaultTheme,
  dark: true,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: '#F9665E',
    accent: '#EEF1E6',
    background: '#2E373E',
    text: '#fff',
    surface: '#A2A2A2'
  },
};

const Bookmarks = (props) => {

  const [bookmark, setBookmarks] = useState([]);
  const bookmarkList = bookmark;



  const renderItem = ({ item }) => {

    const handleClick = () => {
      Linking.openURL(`${item.values.url}`);
    }
    return (
      <PaperProvider theme={theme}>
        <View style={styles.basic}>
      <Card style={styles.cards}>
          <TouchableOpacity
            keyExtractor={(item) => item.id}
            item={item}>
            <Button
              mode="outlined" onPress={handleClick}>
              {item.values.name}
            </Button>
          </TouchableOpacity>
          <Text style={styles.description}>
            {item.values.description}
          </Text>
          <Text style={styles.delete}>
            Delete
        </Text>
        </Card>
        </View>
      </PaperProvider>
    )
  }
  return (
    <PaperProvider theme={theme}>
      <View style={styles.basic}>
      <Card style={styles.cards}>
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
                mode="outlined"
                onPress={handleSubmit}
                color="gray">
                Submit
            </Button>
            </View>

          )}
        </Formik>
      </Card>
      </View>

      <FlatList
        style={{ marginTop: 40 }}
        data={bookmarkList.sort((a, b) => a.name - b.name)}
        keyExtractor={(value, index) => index.toString()}
        renderItem={renderItem}
      />

    </PaperProvider>
  );

};


export default Bookmarks;


// alphabetize results
// add a delete button
// style the page
// nav on the bottom of the screen at all times
// 





