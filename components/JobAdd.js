import 'react-native-gesture-handler';
import React, { useState } from 'react';

import { 
  StyleSheet, 
  Button, 
  View,
  TextInput,
  Text,
  ViewStyle,
  TextStyle,
  TextInputProps, } from 'react-native';


import { Formik } from 'formik';



const Jobs = (props) => {

  const [job, setJob ] = useState([])

  return (
    <>

    <Formik
    initialValues={{
      companyName: '',
      jobTitle: '',
      dateApplied: '',
    }}
    onSubmit={values => {

      console.log('SUBMITTED VALUES:', values)
    
      setJob(values);
    }



    }>

    {({ handleChange, handleBlur, handleSubmit, values }) => (
    <View>
      <Text>Company to Work At</Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={handleChange('companyName')}
        onBlur={handleBlur('companyName')}
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

<Text>{job.companyName}</Text>
</>

)


  // const [ job, setJob ] = useState([
  //   {
  //     company: '',
  //     title:'',
  //     dateApplied: '',
  //     submitted: false,
  //   }
  // ]);

  // const onCompanyTextChange = (event) => {
  //   console.log('this is text from TextInput:', event)
  //   setJob()
  // }

  // const onTitleTextChange = (event) => {
  //   // console.log('this is text from TextInput:', text)
  // }

  // const onDateTextChange = (event) => {
  //   // console.log('this is text from TextInput:', text)
  // }

  // const handleTextInputSubmit = (event) => {

  //   event.preventDefault();

  //   let input = event.nativeEvent.text;

  //   setJob(input);
  
  // }


  // return (
  //   <>
  //   <TextInput
  //     style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
  //     placeholder='company'
  //     onSubmitEditing={handleTextInputSubmit}
  //   />

  //   <TextInput
  //     style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
  //     placeholder='job title'
  //     onChangeText={onTitleTextChange}
  //   />

  //   <TextInput
  //     style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
  //     placeholder='date applied'
  //     onChangeText={onDateTextChange}
  //   />

  //   <Text>These are your jobs</Text>
  //   <Text>ENTERED JOB:</Text>

  //   <Text>{job}</Text>

  //   </>
  // )
  
};

export default Jobs;