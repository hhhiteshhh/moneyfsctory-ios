import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../assets/colors';

const HomePlanCard = ({SvgImage, title, action}) => {
  const tw = useTailwind();

  return (
    <TouchableOpacity
      style={[
        tw(
          'flex w-[49%] flex-col rounded-md items-center justify-center px-7 my-1 py-4',
        ),
        styles.card,
      ]}
      onPress={action}>
      <View
        style={[
          tw('rounded-full flex items-center justify-center w-16 h-16'),
          styles.imageBackground,
        ]}>
        <SvgImage />
      </View>
      <Text style={[tw('font-bold text-center mt-2'), styles.title]}>
        {title.split(' ')[0]}
        {'\n'}
        {title.split(' ')[1]}
      </Text>
    </TouchableOpacity>
  );
};

export default HomePlanCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.bgcolor1,
  },
  imageBackground: {
    backgroundColor: Colors.lightBlack,
  },
  title: {
    fontSize: 14,
    lineHeight: 18,
    color: Colors.white,
  },
});
