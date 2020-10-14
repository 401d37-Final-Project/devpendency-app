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
    paddingLeft: 10,
    borderColor: 'black',
    borderWidth: 1,
    width: 275,
  },
  // baseText: {
  //   fontFamily: "Cochin",
  // },
  heading: {
    textAlign: 'center',
    marginBottom: 15,
  },
  description: {
    marginTop: 15,
    textAlign: 'center',
  },
  delete: {
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
    marginTop: 10,
    maxWidth: '90%',
    elevation: 8,
  }
});

// const theme = {
//   ...DefaultTheme,
//   dark: true,
//   roundness: 5,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: '#F9665E',
//     accent: '#EEF1E6',
//     background: '#2E373E',
//     text: '#fff',
//     surface: '#A2A2A2'
//   },
// };

const Bookmarks = (props) => {

  const Bookmark = () => {

    const [bookmark, setBookmarks] = useState([]);
    const bookmarkList = bookmark;

  const renderItem = ({ item }) => {

    const handleClick = () => {
      Linking.openURL(`${item.values.url}`);
    }
    return (
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
    )
  }
  return (
    <>
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

            <View style={{justifyContent: 'center', alignItems: 'center'}}>
   
              <TextInput
                style={styles.input}
                placeholder={'Bookmark URL'}
                value={values.url}
                onChangeText={handleChange('url')} />
      
              <TextInput
                style={styles.input}
                placeholder={'Bookmark Name'}
                value={values.name}
                onChangeText={handleChange('name')} />
          
              <TextInput
                style={styles.input}
                placeholder={'Bookmark Description'}
                value={values.description}
                onChangeText={handleChange('description')} />
              <Button
                mode="outlined"
                onPress={handleSubmit}
                >
                Submit
            </Button>
            </View>

          )}
        </Formik>
      </Card>
      </View>

      <FlatList
        style={{ marginVertical: 10 }}
        data={bookmarkList.sort((a, b) => a.name - b.name)}
        keyExtractor={(value, index) => index.toString()}
        renderItem={renderItem}
      />

    </>
  );
  }

  return (
    <>
    <Stack.Navigator>

      <Stack.Screen 
        name='Add a New Bookmark'
        component={Bookmark} />

    </Stack.Navigator>
    </>
  );

};


export default Bookmarks;


// alphabetize results
// add a delete button
// style the page
// nav on the bottom of the screen at all times
// 





