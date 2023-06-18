import React from 'react';
import {View} from 'react-native';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../assets/colors';

function CustomMarker() {
  const tailwind = useTailwind();
  return (
    <View
      style={[
        tailwind('h-5 w-5 rounded-full'),
        {
          backgroundColor: Colors.yellow,
          borderWidth: 2,
          borderColor: Colors.yellow,
        },
      ]}></View>
  );
}

export default CustomMarker;
