import React, { useRef, useState } from 'react';
import { Animated, Dimensions, View, StyleSheet, PanResponder, Button, TouchableOpacity } from 'react-native';
import { Paragraph, Text, Card, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import Svg, { Polyline } from 'react-native-svg';
import {Picker} from '@react-native-community/picker';
import AsyncStorage from '@react-native-community/async-storage'

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

const examplePath = [
  [
    { x: 90, y: 300 },
    { x: 170, y: 45 },
    { x: 250, y: 290 },
    { x: 45, y: 130 },
    { x: 285, y: 130 },
    { x: 90, y: 298 },
  ],
  [
    { x: 95, y: 300 },
    { x: 175, y: 45 },
    { x: 255, y: 290 },
    { x: 50, y: 130 },
    { x: 290, y: 130 },
    { x: 95, y: 298 },
  ],
];


const setObjValue = async (drawing) => {
  const storedKey = new Date();  
  let existingDrawings
  try {
    existingDrawings = await AsyncStorage.getItem('Napkins')
  } catch(e) {
    console.log(e)
  }
  existingDrawings = JSON.parse(existingDrawings)
  try {
    await AsyncStorage.setItem('Napkins', JSON.stringify({...existingDrawings, [storedKey]: drawing }))
  } catch(e) {
    console.log(e)
  }
};

const getObj = async () => {
  try {

  const jsonValue = await AsyncStorage.getItem('Napkins')
  return jsonValue != null ? JSON.parse(jsonValue) : null
  } catch(e) {
    console.log(e)
  }
}

// const testStorageSet = async () => {
//   try {
//     await AsyncStorage.setItem('key', 'test')

//     return 
//   } catch(e) {
//     console.log(e)
//   }
// }

// const testStorageGet = async () => {
//   try {
//     return await AsyncStorage.getItem('key')
//   } catch(e) {
//     console.log(e)
//   }
// }


export default function Sketch() {


  const Sketch = () => {

    let pathRef = useRef([[]]).current;
    const [path, setPath] = useState(examplePath);
    const [color, setColor] = useState('black')
    const [strokeWidth, setStrokeWidth] = useState(5)
  
    const updatePath = points => {
      setPath(points);
    }
  
    const panResponder = useRef(
      PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderGrant: () => {
        },
        onPanResponderStart: () => {
        },
        onPanResponderMove: (event, gestureState) => { 

          const point = {
            x: gestureState.moveX - (width - (width * .95)),
            y: gestureState.moveY - (height - (height * .95)),
          };
  
  
          pathRef[pathRef.length-1].push(point);
  
          updatePath([...pathRef]);
        },
        onPanResponderRelease: () => {

          pathRef.push([]);
          updatePath([...pathRef]);

        }
      })
    ).current;
  
  
    let { width, height } = Dimensions.get('window');
    width *= .95
    height *= .95
    
    const uberPoints = path.map(points => {
      return points.map(p => `${p.x},${p.y}`).join(' ');
    });

    return (

      <>

      <View style={{ flex: 1, flexDirection: 'row' }}>
        <Picker
          selectedValue={color}
          style={styles.dropdown}
          onValueChange={(itemValue) => setColor(itemValue)}>
          <Picker.Item label="Black" value="black" />
          <Picker.Item label="Red" value="red" />
          <Picker.Item label="Green" value="red" />
          <Picker.Item label="Blue" value="blue" />
          <Picker.Item label="Yellow" value="yellow" />
        </Picker>
        <Picker
          selectedValue={strokeWidth}
          style={styles.dropdown}
          onValueChange={(itemValue) => setStrokeWidth(itemValue)}>
          <Picker.Item label="Size: 1" value="1" />
          <Picker.Item label="Size: 2" value="2" />
          <Picker.Item label="Size: 3" value="3" />
          <Picker.Item label="Size: 4" value="4" />
          <Picker.Item label="Size: 5" value="5" />
          <Picker.Item label="Size: 6" value="6" />
          <Picker.Item label="Size: 7" value="7" />
          <Picker.Item label="Size: 8" value="8" />
          <Picker.Item label="Size: 9" value="9" />
          <Picker.Item label="Size: 10" value="10" />
        </Picker>
        <TouchableOpacity
          style={{ height: 50, width: 50 }}
          onPress={() => {
            while (pathRef.length > 1) {
              pathRef.pop();
            }
            while(pathRef[0].length){
              pathRef[0].pop()
            }
            updatePath(examplePath);
          }}>
          <Text style={{ lineHeight: 50, textAlign: 'center' }}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ height: 50, width: 50 }}
          onPress={async () => {
            await setObjValue(path)
            // console.log(testStorageSet())
            while (pathRef.length > 1) {
              pathRef.pop();
            }
            while(pathRef[0].length){
              pathRef[0].pop()
            }
            updatePath(examplePath);
          }}
        >
          <Text style={{ lineHeight: 50, textAlign: 'center' }}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
        style={{ height: 50, width: 50 }}
          onPress={async () => {
            console.log('savedDrawings', await getObj())
            // console.log('savedTest', testStorageGet())
          }}
        >
          <Text style={{ lineHeight: 50, textAlign: 'center' }}>Get</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container} {...panResponder.panHandlers}>
        <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`}>
          {uberPoints.map((points) => (
            <Polyline
              points={points}
              fill="none"
              stroke={color}
              strokeWidth={strokeWidth}
            />
          ))}
        </Svg>
      </View>

    </>

    )


  }



  return (
    <>
    <Stack.Navigator>

      <Stack.Screen 
        name='Dev Napkin Sketch'
        component={Sketch} />

    </Stack.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdown: {
    height: 50, 
    width: 110,
    color: 'white',
  }
});