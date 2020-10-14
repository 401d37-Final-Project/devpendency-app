import 'react-native-gesture-handler';
import React, { useState, useRef } from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StyleSheet, Button, View, TextInput,Text, FlatList, TouchableOpacity, StatusBar } from 'react-native';

import { Card, IconButton } from 'react-native-paper';

import { Formik } from 'formik';

const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  jobButton: {
    marginTop:20,
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
});

const Jobs = () => {

  const [job, setJob ] = useState([]);

  const activeJobForDetails = useRef('')


  const JobDeets = ({navigation}) => {

    console.log('NAVIGATION PROP', navigation)

    console.log('STATE', job)

    console.log('active job useRef', activeJobForDetails)

    const activeJob = job.filter(job => job.values.jobID === activeJobForDetails.current)

    console.log('ACTIVE JOB', activeJob)

    return (
      <>
      <Card>
        <Text>{activeJob[0].values.companyName}</Text>
        <Text>{activeJob[0].values.jobTitle}</Text>
        <Text>{activeJob[0].values.jobID}</Text>
        <Text>{activeJob[0].values.dateApplied}</Text>
        <Text>{activeJob[0].values.addtlNotes}</Text>
        <IconButton
          title='Edit Notes'
          icon='delete'
          onPress={() => console.log('pressed!')} />

      </Card>
        </>
    )
  };


  const JobTrackHomeScreen = ({navigation}) => {

    const deleteItem = async (id) => {

      const newJobList = await job.filter(item => {
        if (item.values.jobID !== id)
          return item;
      })
      setJob(newJobList)
    }



    const renderItem = ({item}) => {

      function handleJobDeetsPress() {
        navigation.navigate('Back to Job List');
        activeJobForDetails.current= item.values.jobID;
      }
  
  
      return (
        <>
        <Card>

          <TouchableOpacity
            style={styles.jobButton}
            keyExtractor={(item) => item.id}
            item={item}>

            <Text>{item.values.companyName}</Text>
            <Text>{item.values.jobTitle}</Text>
            <Text>{item.values.dateApplied}</Text>

            <Button
              title='More Details'
              onPress={handleJobDeetsPress}
            />

            <IconButton 
              title='Delete'
              icon='delete'
              mode='outlined'
              onPress={() => deleteItem(item.values.jobID)}/>
    
          </TouchableOpacity>
        
        </Card>
      </>
  
      )
  
    }


    return (
      <>
  
      <Formik
        initialValues={{
          companyName: '',
          jobTitle: '',
          jobID: '',
          dateApplied: '',
          addtlNotes: '',
        }}
    
        onSubmit={ (values, {resetForm}) => {

          setJob([...job, {values}]);
          resetForm({values: ''})
          
        }}>
  
      {({ handleChange, handleSubmit, values }) => (
      <View>
        <Text>Company</Text>
        <TextInput
          style={{ height: 30, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={handleChange('companyName')}
          value={values.companyName}
          />

        <Text>Job Title</Text>
        <TextInput
          style={{ height: 30, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={handleChange('jobTitle')}
          value={values.jobTitle}
          />
        
        <Text>Job ID (required) </Text>
        <TextInput
          style={{ height: 30, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={handleChange('jobID')}
          value={values.jobID}
          />

        <Text>Date Applied</Text>
        <TextInput
          style={{ height: 30, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={handleChange('dateApplied')}
          value={values.dateApplied}
          />

        <Text>Additional Notes</Text>
        <TextInput
          style={{ height: 60, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={handleChange('addtlNotes')}
          value={values.addtlNotes}
          multiline={true}
          />
  
        <Button 
          onPress={handleSubmit} 
          title="Add Job" 
          style={{ height: 60, marginTop: 10, borderColor: 'gray', borderWidth: 1 }}
          />
      </View>
    )}
  </Formik>
  
  <FlatList
    keyExtractor={(value, index) => index.toString()}
    data={job}
    renderItem={renderItem}
     />
  
  </>
  
  )


  }


return (

  <Stack.Navigator>

    <Stack.Screen
      name='Job Track Home'
      component={JobTrackHomeScreen} />
    <Stack.Screen 
      name="Back to Job List" 
      component={JobDeets} />

  </Stack.Navigator>

)
  
};

export default Jobs;