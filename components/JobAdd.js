import 'react-native-gesture-handler';
import React, { useState } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import { StyleSheet, Button, View, TextInput,Text, FlatList, TouchableOpacity, StatusBar } from 'react-native';

import { Formik } from 'formik';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  jobButton: {
    marginTop:20,
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
});

const Jobs = () => {

  const JobDeets = ({navigation}) => {

    console.log('NAVIGATION PROP', navigation)

    return (
      <>
      <Text>Now we're in Job Deets! Neat!</Text>
      <Button
        title="Back to Job List"
        onPress={() => 
        navigation.goBack('JobTrackHomeScreen')} />
        </>

    )
  };



  const [job, setJob ] = useState([]);





  const JobTrackHomeScreen = ({navigation}) => {


    const renderItem = ({item}) => {

      console.log('---', item);
  
  
      return (
  
        <TouchableOpacity
        style={styles.jobButton}
        keyExtractor={(item) => item.id}
        item={item}
        onPress={() => {
          console.log('its happening!!!');
          navigation.navigate('Job Details')
        }}
  
      >
        <Text>{item.values.companyName}</Text>
        <Text>{item.values.jobTitle}</Text>
        <Text>{item.values.dateApplied}</Text>
  
      </TouchableOpacity>
  
  
      )
  
    }


    return (
      <>
  
      <Formik
      initialValues={{
        companyName: '',
        jobTitle: '',
        dateApplied: '',
      }}
  
      onSubmit={ (values, {resetForm}) => {
  
        console.log('SUBMITTED VALUES:', values)
      
        setJob([...job, {values}]);
        resetForm({values: ''})
      }
  
  
      }>
  
      {({ handleChange, handleSubmit, values }) => (
      <View>
        <Text>Company</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={handleChange('companyName')}
          value={values.companyName}
          />
        <Text>Job Title</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={handleChange('jobTitle')}
          value={values.jobTitle}
          />
        <Text>Date Applied</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={handleChange('dateApplied')}
          value={values.dateApplied}
          />
  
        <Button onPress={handleSubmit} title="Add Job to Track" />
      </View>
    )}
  </Formik>
  
  <FlatList
    keyExtractor={(item) => item.id}
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
    name="Job Details" 
    component={JobDeets} />
</Stack.Navigator>

)
  
};

export default Jobs;