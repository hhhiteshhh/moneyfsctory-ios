import {StyleSheet, Text} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../assets/colors';
import {useTailwind} from 'tailwind-rn';

const Button = ({title}) => {
  const tw = useTailwind();

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1.3, y: 0}}
      colors={[Colors.primary, Colors.color1]}
      style={[tw('rounded-md mt-3')]}>
      <Text style={[tw('py-3 text-center font-semibold'), styles.buttonText]}>
        {title}
      </Text>
    </LinearGradient>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonText: {color: Colors.white, fontSize: 16, lineHeight: 22},
});
