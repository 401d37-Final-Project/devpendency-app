import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';

import { 
  StyleSheet, 
  Button, 
  View,
  TextInput,
  Text,
  SafeAreaView, 
  FlatList, 
  Item,
  TouchableOpacity,
  StatusBar
 } from 'react-native';


import { Formik } from 'formik';



const Jobs = (props) => {

  const [job, setJob ] = useState([]);

  const renderItem = ({item}) => {

    return (

      <TouchableOpacity
      keyExtractor={(item) => item.id}
      item={item}
      onPress={() => console.log('its happening!!!!')}
    >
      <Text>{item.values.companyName}</Text>
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

      console.log('job', job)
    }


    }>

    {({ handleChange, handleSubmit, values }) => (
    <View>
      <Text>Company to Work At</Text>
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

<Text>JOBS ADDED WILL GO BELOW HERE</Text>

<FlatList
  keyExtractor={(item) => item.id}
  data={job}
  renderItem={renderItem} />

</>

)

  
};

export default Jobs;