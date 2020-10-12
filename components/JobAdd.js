import 'react-native-gesture-handler';
import React, { useState } from 'react';

import { 
  StyleSheet, 
  Button, 
  View,
  TextInput,
  Text,
 } from 'react-native';


import { Formik } from 'formik';



const Jobs = (props) => {

  const [job, setJob ] = useState([]);

  let jobList = job;

  console.log('jobList------- ', job);

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

<Text>JOB WILL GO HERE</Text>
</>

)

  
};

export default Jobs;