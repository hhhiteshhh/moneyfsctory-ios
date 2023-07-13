import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../assets/colors';
import {useTailwind} from 'tailwind-rn';
import Selected from '../assets/icons/selected.svg';
import Unselected from '../assets/icons/unselected.svg';
import Exchange from '../assets/icons/exchange.svg';
import ExchangeSelected from '../assets/icons/exchangeSelected.svg';
import 'intl';
import 'intl/locale-data/jsonp/en';
const PlanCard = ({
  title,
  color,
  index,
  id,
  price,
  exchange,
  type,
  description,
}) => {
  const tw = useTailwind();
  var formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  });

  return (
    <LinearGradient
      start={{x: 0, y: 4.5}}
      end={{x: 1.3, y: 0}}
      colors={
        index === id
          ? [Colors.planCardColor2, Colors.planCardColor1]
          : [Colors.bgcolor1, Colors.bgcolor1]
      }
      style={[tw('rounded-md mt-3 p-5')]}>
      <View style={[tw('flex flex-row items-center justify-between'), {}]}>
        <View style={[tw('w-28 rounded-full p-2'), {backgroundColor: color}]}>
          <Text
            style={[
              tw('text-center font-semibold'),
              {color: Colors.black, fontSize: 18, lineHeight: 25},
            ]}>
            {title}
          </Text>
        </View>
        {index === id ? <Selected /> : <Unselected />}
      </View>
      <View style={[tw('flex items-start justify-start flex-row'), {}]}>
        <View
          style={[
            tw(''),
            {
              width: '60%',
            },
          ]}>
          <Text
            style={[
              tw('font-bold flex items-start justify-start flex-row'),
              {fontSize: 23, lineHeight: 35, color: Colors.white},
            ]}>
            {formatter.format(price ? price : 0)}
            <Text style={[tw('font-normal'), {fontSize: 14}]}>
              /
              {type === 'Monthly'
                ? 'Month'
                : type === 'Quarterly'
                ? 'Quarter'
                : 'Year'}{' '}
            </Text>
            <Text
              style={[
                tw('font-bold flex items-start justify-start flex-row'),
                {fontSize: 23, lineHeight: 35, color: Colors.white},
              ]}>
              +18%
              <Text style={[tw('font-normal'), {fontSize: 14}]}>/GST</Text>
            </Text>
          </Text>
        </View>
        <View
          style={[
            tw('w-[40%] pl-2'),
            {borderLeftWidth: 1, borderColor: Colors.yellow},
          ]}>
          {description.map((item, index) => (
            <View key={index} style={[tw('flex my-1 flex-row items-start')]}>
              <View
                style={[
                  tw('h-2 w-2 rounded-full'),
                  {backgroundColor: Colors.dullwhite},
                ]}
              />
              <Text
                style={[
                  tw('ml-1 -mt-[6px] font-normal'),
                  {fontSize: 12, lineHeight: 18, color: Colors.white},
                ]}>
                {item}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <View style={[tw('mt-2 flex items-center justify-start flex-row'), {}]}>
        {index === id ? <ExchangeSelected /> : <Exchange />}
        <View style={[tw('flex items-start justify-start ml-2'), {}]}>
          <Text
            style={[
              tw('font-normal'),
              {fontSize: 14, lineHeight: 21, color: Colors.white},
            ]}>
            Exchanges
          </Text>
          <Text
            style={[
              tw('font-bold'),
              {fontSize: 14, lineHeight: 21, color: Colors.white},
            ]}>
            {exchange}
          </Text>
        </View>
      </View>
    </LinearGradient>
  );
};

export default PlanCard;

const styles = StyleSheet.create({});
