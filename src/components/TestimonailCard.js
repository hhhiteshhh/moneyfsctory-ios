import {StyleSheet, Text, View, Dimensions, Image} from 'react-native';
import React from 'react';
import TestimonialIcon from '../assets/icons/testimonial.svg';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../assets/colors';
import {MONEY_FACTORY_IMAGE} from '../consts/apis';
const TestimonailCard = ({data}) => {
  const tw = useTailwind();
  const windowWidth = Dimensions.get('window').width;

  return (
    <View
      style={[
        tw('p-4 rounded-md mr-3'),
        {
          width: windowWidth * 0.8,
          backgroundColor: Colors.bgcolor1,
        },
      ]}>
      <TestimonialIcon />
      <Text
        style={[
          tw('my-3 font-medium'),
          {fontSize: 14, lineHeight: 19, color: Colors.white},
        ]}
        numberOfLines={3}
        ellipsizeMode={'tail'}>
        {data.testimonial}
      </Text>

      <View style={[tw('flex flex-row items-center'), {}]}>
        <Image
          source={{
            uri: `${MONEY_FACTORY_IMAGE}/${data?.image}`,
          }}
          style={{width: 46, height: 46, borderRadius: 30}}
          resizeMode="contain"
        />
        <View style={[tw('ml-3'), {}]}>
          <Text
            style={[
              tw('font-medium'),
              {fontSize: 14, lineHeight: 19, color: Colors.white},
            ]}>
            {data.name}
          </Text>
          <Text
            style={[
              tw('font-medium'),
              {fontSize: 14, lineHeight: 19, color: Colors.dullwhite},
            ]}>
            {data.subDetails}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default TestimonailCard;

const styles = StyleSheet.create({});
