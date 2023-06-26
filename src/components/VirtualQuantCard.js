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
import LinearGradient from 'react-native-linear-gradient';
import EmailVerified from '../assets/icons/selected.svg';
import {SvgUri} from 'react-native-svg';
import {MONEY_FACTORY_IMAGE} from '../consts/apis';
import 'intl';
import 'intl/locale-data/jsonp/en';

const VirtualQuantCard = ({
  price,
  name,
  Image,
  severity,
  checked,
  checkboxHandler,
  index,
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
      onPress={e => {
        checkboxHandler(e, index);
      }}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 3, y: 0}}
        colors={[Colors.card1, Colors.card2]}
        style={[tw('p-3 pb-1 relative'), styles.container]}>
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
              fontSize: 10,
            },
          ]}>
          {severity}
        </Text>
        {checked && (
          <View
            style={[
              tw('absolute top-1 right-0 px-2 py-1 font-semibold'),
              {zIndex: 999},
            ]}>
            <EmailVerified />
          </View>
        )}
        <View style={[tw('flex items-center justify-center my-4')]}>
          <View style={[tw('h-24 w-24 items-center justify-center')]}>
            <SvgUri
              width="100%"
              height="100%"
              uri={`${MONEY_FACTORY_IMAGE}/${Image}`}
              onError={onError}
              onLoad={onLoad}
            />
            {loading && (
              <ActivityIndicator size="large" color={Colors.primary} />
            )}
          </View>

          <View style={[tw('flex items-start w-full mt-4')]}>
            <View>
              <Text style={[tw('font-bold'), styles.cardText]}>{name}</Text>
            </View>
            <Text style={[tw('font-bold mt-1'), styles.cardPrice]}>
              {formatter.format(price ? price : 0)}
            </Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default VirtualQuantCard;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 190,
    borderRadius: 6,
  },
  cardText: {fontSize: 14, color: Colors.white, lineHeight: 19},
  cardPrice: {fontSize: 16, lineHeight: 20, color: Colors.white},
});
