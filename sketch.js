// Code borrowed from https://snack.expo.io/@mtkopone/draw-gesture-path and adapted for multi-line drawings

import React, { useRef, useState } from 'react';
import { Dimensions, PanResponder, View, StyleSheet } from 'react-native';
import Svg, { Polyline } from 'react-native-svg';

const examplePath = [];

const GesturePath = ({ path, color }) => {
  const { width, height } = Dimensions.get('window');
  let lines;
  let lineList;
  if (path.length) {
    lines = path.map((line) => {
      const points = line.map((p) => `${p.x},${p.y}`).join(' ');
      return points;
    });
    lineList = lines.map((line) => {
      return (
        <Polyline points={line} fill="none" stroke={color} strokeWidth="1" />
      );
    });
  }

  return (
    <Svg height="100%" width="100%" viewBox={`0 0 ${width} ${height}`}>
      {lineList}
    </Svg>
  );
};

// const GestureRecorder = ({ onPathChanged, path }) => {
//   const pathRef = useRef([]);

//   const panResponder = useRef(
//     PanResponder.create({
//       onMoveShouldSetPanResponder: () => true,
//       onPanResponderGrant: () => {
//         pathRef.current = [];
//       },
//       onPanResponderMove: (event) => {
//         pathRef.current.push({
//           x: event.nativeEvent.locationX,
//           y: event.nativeEvent.locationY,
//         });
//         // Uncomment the next line to draw the path as the user is performing the touch. (A new array must be created so setState recognises the change and re-renders the App)
//         let paths = [];
//         paths = path.concat(paths);
//         paths.push([...pathRef.current]);
//         onPathChanged(paths);
//       },
//       onPanResponderRelease: () => {
//         let paths = [];
//         paths = path.concat(paths);
//         paths.push([...pathRef.current]);
//         onPathChanged(paths);
//       },
//     })
//   ).current;

//   return <View style={StyleSheet.absoluteFill} {...panResponder.panHandlers} />;
// };

const Sketch = () => {
  const [path, setPath] = useState(examplePath);
  const GestureRecorder = () => {
    const pathRef = useRef([]);

    const panResponder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          pathRef.current = [];
        },
        onPanResponderMove: (event) => {
          pathRef.current.push({
            x: event.nativeEvent.locationX,
            y: event.nativeEvent.locationY,
          });
          // Uncomment the next line to draw the path as the user is performing the touch. (A new array must be created so setState recognises the change and re-renders the )
          let paths = [];
          paths = path.concat(paths);
          paths.push([...pathRef.current]);
          setPath(paths);
        },
        onPanResponderRelease: () => {
          let paths = [];
          paths = path.concat(paths);
          paths.push([...pathRef.current]);
          setPath(paths);
        },
      })
    ).current;

    return (
      <View style={StyleSheet.absoluteFill} {...panResponder.panHandlers} />
    );
  };
  
  return (
    <View style={StyleSheet.absoluteFill}>
      <GesturePath path={path} color="green" />
      <GestureRecorder />
    </View>
  );
};

export default Sketch;
