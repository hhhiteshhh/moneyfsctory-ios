import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../assets/colors';
import Icon from '../assets/icons/info.svg';
import {SvgUri} from 'react-native-svg';
import {MONEY_FACTORY_IMAGE} from '../consts/apis';
import 'intl';
import 'intl/locale-data/jsonp/en';

const QuantCard = ({
  price,
  name,
  Image,
  severity,
  navigation,
  bank = '',
  data,
}) => {
  const tw = useTailwind();
  const [loading, setLoading] = useState(true);
  const onError = e => {
    setLoading(false);
  };
  const onLoad = () => {
    setLoading(false);
  };
  var formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  });
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('QuantDetails', {data: data});
      }}
      style={[
        tw(`p-3 mb-3 relative`),
        {...styles.container, width: bank ? '100%' : 172},
      ]}>
      <Text
        style={[
          tw('absolute top-3 left-0 px-2 py-1 font-semibold'),
          {
            color: Colors.white,
            backgroundColor:
              severity === 'Low'
                ? Colors.primary
                : severity === 'Medium'
                ? Colors.orange
                : 'red',
            zIndex: 999,
            fontSize: 12,
          },
        ]}>
        {severity}
      </Text>
      <View style={[tw('flex items-center my-2')]}>
        <View style={[tw('h-24 w-24 items-center justify-center')]}>
          <SvgUri
            width="100%"
            height="100%"
            uri={`${MONEY_FACTORY_IMAGE}/${Image}`}
            onError={onError}
            onLoad={onLoad}
          />
          {loading && <ActivityIndicator size="large" color={Colors.primary} />}
        </View>

        <View style={[tw('flex items-start w-full mt-1')]}>
          <View>
            <Text style={[tw('font-bold'), styles.cardText]}>{name}</Text>
          </View>
          <View
            style={[
              tw('flex flex-row w-full items-center justify-between mt-1'),
            ]}>
            <Text style={[tw('font-bold'), styles.cardPrice]}>
              {' '}
              {formatter.format(price ? price : 0)}
            </Text>
            {/* <Icon /> */}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default QuantCard;

const styles = StyleSheet.create({
  container: {
    // width: 172,
    height: 178,
    backgroundColor: Colors.black2,
    marginRight: 15,
    borderRadius: 6,
  },
  cardText: {fontSize: 14, color: Colors.white, lineHeight: 19},
  cardPrice: {fontSize: 16, lineHeight: 22, color: Colors.primary},
});
