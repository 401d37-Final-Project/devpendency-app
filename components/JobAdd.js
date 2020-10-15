import 'react-native-gesture-handler';
import React, { useState, useRef } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StyleSheet, View, TextInput, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { Title, Button, IconButton, Paragraph, Text, Card, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';


import { Formik } from 'formik';
import * as Yup from 'yup';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  input: {
    margin: 15,
    paddingLeft: 10,
    borderColor: '#A2A2A2',
    borderWidth: 1,
    width: 275,
    color: '#EEF1E6'
  },
  jobButton: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 20,
    alignItems: "center",
    padding: 10,
    color: '#F9665E',
  },
  basic: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  cards: {
    flex: 1,
    padding: 20,
    marginTop: 20,
    maxWidth: '80%',
    elevation: 8,
  },
  text: {
    flex: 3,
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
  },
  expand: {
    flex: 1,
    alignItems: 'flex-end',
  },
  delete: {
    flex: 0,
    alignItems: 'flex-end',
  },
});

const Jobs = () => {

  const [job, setJob] = useState([]);

  const activeJobForDetails = useRef('')


  const JobDeets = ({ navigation }) => {

    const activeJob = job.filter(job => job.values.jobID === activeJobForDetails.current)

    return (
      <View style={styles.basic}>
        <Card style={styles.cards}>
          <Text>{activeJob[0].values.companyName}</Text>
          <Text>{activeJob[0].values.jobTitle}</Text>
          <Text>{activeJob[0].values.jobPostURL}</Text>
          <Text>{activeJob[0].values.jobID}</Text>
          <Text>{activeJob[0].values.dateApplied}</Text>
          <Text>{activeJob[0].values.addtlNotes}</Text>
        </Card>
      </View>
    )
  };


  const JobTrackHomeScreen = ({ navigation }) => {

    const deleteItem = async (id) => {

      const newJobList = await job.filter(item => {
        if (item.values.jobPostURL !== id)
          return item;
      })
      setJob(newJobList)
    }



    const renderItem = ({ item }) => {

      function handleJobDeetsPress() {
        navigation.navigate('Back to Job List');
        activeJobForDetails.current = item.values.jobID;
      }


      return (
        <View style={styles.basic}>
          <Card style={styles.cards}>

            <TouchableOpacity
              style={styles.jobButton}
              keyExtractor={(item) => item.id}
              item={item}>

              <Text style={styles.text}>{item.values.companyName}</Text>
              <Text style={styles.text}>{item.values.jobTitle}</Text>
              <Text style={styles.text}>{item.values.dateApplied}</Text>

              <TouchableOpacity style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
              <IconButton
                style={styles.expand}
                title='More Details'
                icon='arrow-expand'
                onPress={handleJobDeetsPress}
                />

              <IconButton
                style={styles.delete}
                title='Delete'
                icon='delete'
                onPress={() => deleteItem(item.values.jobPostURL)} />

              </TouchableOpacity>

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
                companyName: '',
                jobTitle: '',
                jobPostURL: '',
                jobID: '',
                dateApplied: '',
                addtlNotes: '',
              }}

              validationSchema={Yup.object().shape({
                companyName: Yup.string().required('Company name is required'),
                jobPostURL: Yup.string().required('Job post URL is required'),
              })}

              validateOnMount

              onSubmit={(values, { resetForm }) => {

                setJob([...job, { values }]);
                resetForm({ values: '' })

              }}>

              {({ handleChange, handleSubmit, values }) => (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
 
                  <TextInput
                    style={styles.input}
                    placeholder={'Company *'}
                    placeholderTextColor={'#A2A2A2'}
                    onChangeText={handleChange('companyName')}
                    value={values.companyName}
                  />


                  <TextInput
                    style={styles.input}
                    placeholder={'Job Title'}
                    placeholderTextColor={'#A2A2A2'}
                    onChangeText={handleChange('jobTitle')}
                    value={values.jobTitle}
                  />

                  <TextInput
                    style={styles.input}
                    placeholder={'Job Post URL *'}
                    onChangeText={handleChange('jobPostURL')}
                    value={values.jobPostURL}
                  />

                  <TextInput
                    style={styles.input}
                    placeholder={'Job ID (required)'}
                    placeholderTextColor={'#A2A2A2'}
                    onChangeText={handleChange('jobID')}
                    value={values.jobID}
                  />

                  <TextInput
                    style={styles.input}
                    placeholder={'Date Applied'}
                    placeholderTextColor={'#A2A2A2'}
                    onChangeText={handleChange('dateApplied')}
                    value={values.dateApplied}
                  />

                  <TextInput
                    style={styles.input}
                    placeholder={'Any Additional Notes'}
                    placeholderTextColor={'#A2A2A2'}
                    onChangeText={handleChange('addtlNotes')}
                    value={values.addtlNotes}
                    multiline={true}
                  />

                  <Button
                    onPress={handleSubmit}
                    mode="contained"
                    style={{ color: '#F9665E' }}
                  >Add Job</Button>
                </View>
              )}
            </Formik>
          </Card>
        </View>


        <FlatList
          style={{ marginVertical: 10 }}
          keyExtractor={(value, index) => index.toString()}
          data={job}
          renderItem={renderItem}
        />

      </>

    );


  }


  return (

    <Stack.Navigator>

      <Stack.Screen
        name='Track Job Applications'
        component={JobTrackHomeScreen} />
      <Stack.Screen
        name="Back to Job List"
        component={JobDeets} />

    </Stack.Navigator>

  )

};

export default Jobs;