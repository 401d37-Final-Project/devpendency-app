import 'react-native-gesture-handler';
import React, { useState, useRef } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StyleSheet, View, TextInput, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import { Title, Button, IconButton, Paragraph, Text, Card, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';


import { Formik } from 'formik';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  input: {
    margin: 15,
    paddingLeft: 10,
    borderColor: 'black',
    borderWidth: 1,
    width: 275,
  },
  jobButton: {
    marginTop: 20,
    alignItems: "center",
    padding: 10,
    color: '#F9665E',
  },
  basic: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  cards: {
    flex: 1,
    padding: 20,
    marginTop: 20,

    maxWidth: '80%',
    elevation: 8,
  }
});

const Jobs = () => {

  const [job, setJob] = useState([]);

  const activeJobForDetails = useRef('')


  const JobDeets = ({ navigation }) => {

    console.log('NAVIGATION PROP', navigation)

    console.log('STATE', job)

    console.log('active job useRef', activeJobForDetails)

    const activeJob = job.filter(job => job.values.jobID === activeJobForDetails.current)

    console.log('ACTIVE JOB', activeJob)

    return (
      <View style={styles.basic}>
        <Card style={styles.cards}>
          <Text>{activeJob[0].values.companyName}</Text>
          <Text>{activeJob[0].values.jobTitle}</Text>
          <Text>{activeJob[0].values.jobID}</Text>
          <Text>{activeJob[0].values.dateApplied}</Text>
          <Text>{activeJob[0].values.addtlNotes}</Text>
          <IconButton
            title='Edit Notes'
            icon='file-document-edit-outline'
            onPress={() => console.log('pressed!')} />

        </Card>
      </View>
    )
  };


  const JobTrackHomeScreen = ({ navigation }) => {

    const deleteItem = async (id) => {

      const newJobList = await job.filter(item => {
        if (item.values.jobID !== id)
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

              <Text>{item.values.companyName}</Text>
              <Text>{item.values.jobTitle}</Text>
              <Text>{item.values.dateApplied}</Text>

              <IconButton
                title='More Details'
                icon='arrow-expand'
                onPress={handleJobDeetsPress}
              />

              <IconButton
                title='Delete'
                icon='delete'
                onPress={() => deleteItem(item.values.jobID)} />


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
                jobID: '',
                dateApplied: '',
                addtlNotes: '',
              }}

              onSubmit={(values, { resetForm }) => {

                setJob([...job, { values }]);
                resetForm({ values: '' })

              }}>

              {({ handleChange, handleSubmit, values }) => (
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                  {/* <Text style={styles.heading} >Add a Job Application</Text> */}
                  {/* <Text>Company</Text> */}
                  <TextInput
                    style={styles.input}
                    placeholder={'Company'}
                    onChangeText={handleChange('companyName')}
                    value={values.companyName}
                  />


                  <TextInput
                    style={styles.input}
                    placeholder={'Job Title'}
                    onChangeText={handleChange('jobTitle')}
                    value={values.jobTitle}
                  />

                  <TextInput
                    style={styles.input}
                    placeholder={'Job ID (required)'}
                    onChangeText={handleChange('jobID')}
                    value={values.jobID}
                  />

                  <TextInput
                    style={styles.input}
                    placeholder={'Date Applied'}
                    onChangeText={handleChange('dateApplied')}
                    value={values.dateApplied}
                  />

                  <TextInput
                    style={styles.input}
                    placeholder={'Any Additional Notes'}
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