import React from 'react';
import {View, StatusBar} from 'react-native';
import {Colors} from '../assets/colors';
function MyStatusBar(props) {
  return (
    <View
      style={{
        backgroundColor: props.transparent ? 'transparent' : Colors.eerie,
        paddingBottom: props.padding ? props.padding : 0,
      }}>
      <StatusBar
        translucent
        backgroundColor={Colors.eerie}
        barStyle="light-content"
        {...props}
      />
    </View>
  );
}

export default MyStatusBar;
