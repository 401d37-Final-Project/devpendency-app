// Code borrowed from https://snack.expo.io/@mtkopone/draw-gesture-path and adapted for multi-line drawings

import React, { useRef, useState } from 'react';
import { Dimensions, PanResponder, View, StyleSheet } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';

const examplePath = [];

export default function Sketch () {
  const [path, setPath] = useState(examplePath);
  const pathRef = useRef([[]]).current;
  

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        console.log('onPanResponderGrant')
      },
      onPanResponderMove: (event) => {
       const point = {
          x: event.nativeEvent.locationX,
          y: event.nativeEvent.locationY,
        };
        // Uncomment the next line to draw the path as the user is performing the touch. (A new array must be created so setState recognises the change and re-renders the )
        pathRef[pathRef.length-1].push(point)
        
        setPath([...pathRef]);
      },
      onPanResponderRelease: () => {
        console.log('onPanResponderRelease')
        pathRef.push([])
        setPath([...pathRef]);
      },
    })
  ).current;

  const color = "green";
  const { width, height } = Dimensions.get('window');
  
  const uberPoints = path.map(points => {
    return points.map(p => `${p.x},${p.y}`).join(' ')
  })

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`}>
        {uberPoints.map(points => (
          <Polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="1"
          />
        ))
        }
      
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})


