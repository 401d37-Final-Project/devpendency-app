import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, SafeAreaView, ScrollView, StatusBar, FlatList, Container, TextInput, View, Linking, TouchableOpacity } from 'react-native';
import { ListItem, Paragraph, Icon } from 'react-native-elements';
import { useFormik, Formik, Field, Form } from 'formik';
import { Button, Text, Card, IconButton, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';

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
    flex: 2,
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
    flexDirection: 'column',
    padding: 20,
    marginTop: 10,
    maxWidth: '80%',
    elevation: 8,
  },
  button: {
    // width: 200,
  },
  left: {
    flex: 6,
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
  },
  right: {
    flex: 1,
    alignSelf: 'flex-end',
  },
});



const setObjValue = async (bookmark) => {

  let merged
  try {
    merged = await AsyncStorage.mergeItem('Bookmarks', JSON.stringify(bookmark));
  } catch (e) {
    console.log(e)
  }

  if (!merged) {
    try {
      merged = await AsyncStorage.setItem('Bookmarks', JSON.stringify(bookmark));
    } catch (e) {
      console.log(e)
    }
  }
}

const getObj = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('Bookmarks')
    return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch (e) {
    console.log(e)
  }
}

const Bookmarks = (props) => {

  const Bookmark = () => {


    const [bookmark, setBookmarks] = useState([]);
    const bookmarkList = bookmark;
    console.log('Bookmark List', bookmarkList)


    useEffect(() => {
      const fetchData = async () => {
        const list = await getObj();
        if (list) {
          console.log(list)
          setBookmarks(list);
        } else {
          return Promise.resolve();
        }
      }
      fetchData();
    }, [])

    const deleteItem = async (url) => {

      const newList = await bookmarkList.filter(item => {
        if (item.values.url !== url)
          return item;
      })
      setBookmarks(newList);
      setObjValue(newList);
    }


    const renderItem = ({ item }) => {

      const handleClick = () => {
        Linking.openURL(`${item.values.url}`);
      }


     
    return (
      <View style={styles.basic}>
        <Card style={styles.cards}>
          <TouchableOpacity style={styles.left}
            keyExtractor={(item) => item.id}
            item={item}>
            <Button
              style={styles.button}
              mode="contained" 
              onPress={handleClick}>
              {item.values.name}
            </Button>
          </TouchableOpacity>
          <Text style={styles.description}>
            {item.values.description}
          </Text>
          <TouchableOpacity style={styles.right}>
              <IconButton
                icon="delete"
                size={20}
                onPress={() => deleteItem(item.values.url)} />
          </TouchableOpacity>
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
            const newBookmarks = [...bookmark, { values }]
            setBookmarks(newBookmarks);
            resetForm({ values: '' })
            setObjValue(newBookmarks)
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
                mode="contained"
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
        data={bookmarkList}
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
          name='Add a new Bookmark'
          component={Bookmark} />


      </Stack.Navigator>
    </>
  );
}



export default Bookmarks;







