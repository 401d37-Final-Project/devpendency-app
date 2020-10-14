import React, { useRef, useState } from 'react';
import { Animated, Dimensions, View, StyleSheet, PanResponder, Text, Button, TouchableOpacity } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';
import {Picker} from '@react-native-community/picker';

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


export default function Sketch() {
  let pathRef = useRef([[]]).current;
  const [path, setPath] = useState(examplePath);
  const [color, setColor] = useState('black')
  const [strokeWidth, setStrokeWidth] = useState(5)

  const updatePath = points => {
    setPath(points);
  }
  console.log(pathRef)

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: () => {
        console.log('onPanResponderGrant');
      },
      onPanResponderStart: () => {
        console.log('onPanResponderStart');
      },
      onPanResponderMove: (event, gestureState) => { 
        // console.log('gestureState', gestureState)
        const point = {
          x: gestureState.moveX,
          y: gestureState.moveY
          // x: event.nativeEvent.locationX,
          // y: event.nativeEvent.locationY,
        };


        pathRef[pathRef.length-1].push(point);

        updatePath([...pathRef]);
      },
      onPanResponderRelease: () => {
        console.log('onPanResponderRelease')
        pathRef.push([]);
        updatePath([...pathRef]);
        console.log('pathref', pathRef)
      }
    })
  ).current;


  let { width, height } = Dimensions.get('window');
  width *= .8
  height *= .8
  
  const uberPoints = path.map(points => {
    return points.map(p => `${p.x},${p.y}`).join(' ');
  });

  return (
    <>
      <View style={{flex:1, flexDirection: 'row'}}>
      <Picker
        selectedValue={color}
        style={{ height: 50, width: 100}}
        onValueChange={(itemValue) => 
          setColor(itemValue)
        }
      >
        <Picker.Item label="Black" value="black" />
        <Picker.Item label="Red" value="red" />
        <Picker.Item label="Green" value="red" />
        <Picker.Item label="Blue" value="blue" />
        <Picker.Item label="Yellow" value="yellow" />
      </Picker>
      <Picker
        selectedValue={strokeWidth}
        style={{ height:50, width: 110}}
        onValueChange={(itemValue) => 
          setStrokeWidth(itemValue)
        }
      >
        <Picker.Item label='Size: 1' value='1' />
        <Picker.Item label='Size: 2' value='2' />
        <Picker.Item label='Size: 3' value='3' />
        <Picker.Item label='Size: 4' value='4' />
        <Picker.Item label='Size: 5' value='5' />
        <Picker.Item label='Size: 6' value='6' />
        <Picker.Item label='Size: 7' value='7' />
        <Picker.Item label='Size: 8' value='8' />
        <Picker.Item label='Size: 9' value='9' />
        <Picker.Item label='Size: 10' value='10' />
      </Picker>
      <TouchableOpacity style={{ height:50, width: 110 }} onPress={() => {
          console.log('pathRef before clear', pathRef)
          console.log('path before clear', path)
          updatePath(examplePath)
          pathRef = [[]]
          console.log('path after clear', path)
          console.log('pathRef after clear', pathRef)
      }}>
        <Text>Clear</Text>
      </TouchableOpacity>
      
      </View>
      
        
      <View style={styles.container} {...panResponder.panHandlers}>
      <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`}>

          {uberPoints.map(points => (
              <Polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
              />
            )) 
          }
          
      </Svg>   
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 15,
    alignItems: 'center',
    justifyContent: 'center',
  }
});