import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../assets/colors';
import {useTailwind} from 'tailwind-rn';
import {SvgUri} from 'react-native-svg';
import {MONEY_FACTORY_IMAGE} from '../consts/apis';
import MoreWhite from '../assets/icons/more_vert.svg';

const MyQuantCardForDashboard = ({ele, setQuantSelected, setDetailsModal}) => {
  const tw = useTailwind();
  const [loading, setLoading] = useState(true);

  const onError = e => {
    setLoading(false);
  };
  const onLoad = () => {
    setLoading(false);
  };
  const calcTotalPnl = quants => {
    let total = 0;
    quants.stocksignals.map(ele => {
      total += ele?.pldata?.pl;
      //   calc(ele.subscribed_price, ele.ltp);
    });

    return isNaN(total) ? 0 : Number(total).toFixed(2);
  };
  const checkNaN = value => {
    if (isNaN(value)) {
      return true;
    } else {
      return false;
    }
  };
  const checkNegativeNo = value => {
    if (value < 0) {
      return true;
    } else {
      return false;
    }
  };
  return (
    <View
      style={[
        tw(
          'flex mx-5 flex-row items-center justify-between rounded-md p-3 my-1',
        ),
        {backgroundColor: Colors.black},
      ]}>
      <View style={[tw('flex flex-row items-center justify-center'), {}]}>
        <View
          style={[
            tw('relative rounded-full justify-center items-center flex'),
            styles.logo,
          ]}>
          <View style={[tw('h-16 w-16 items-center justify-center')]}>
            <SvgUri
              width="100%"
              height="100%"
              uri={`${MONEY_FACTORY_IMAGE}/${ele?.quant?.quant?.imgUrl}`}
              onError={onError}
              onLoad={onLoad}
            />
            {loading && (
              <ActivityIndicator size="large" color={Colors.primary} />
            )}
          </View>
          <View
            style={[
              tw('absolute bottom-0 right-0 rounded-full w-3 h-3'),
              styles.activeButton,
            ]}
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              setQuantSelected(ele);
              setDetailsModal(true);
            }}>
            <Text
              style={[
                tw('ml-3 font-bold'),
                {fontSize: 18, lineHeight: 23, color: Colors.white},
              ]}>
              {ele?.quant?.quant?.name}
            </Text>
          </TouchableOpacity>
          <View style={[tw('flex flex-row items-center')]}>
            <Text
              style={[
                tw('ml-3 pt-1'),
                {
                  fontSize: 14,
                  lineHeight: 18,
                  color: Colors.dullwhite,
                },
              ]}>
              P&L :
            </Text>
            <Text
              style={[
                tw('ml-3 pt-1 font-bold'),
                {
                  fontSize: 14,
                  lineHeight: 18,
                  color: checkNegativeNo(calcTotalPnl(ele))
                    ? Colors.red
                    : Colors.primary,
                },
              ]}>
              {checkNegativeNo(calcTotalPnl(ele))
                ? `- ₹ ${-1 * calcTotalPnl(ele)}`
                : !checkNaN(calcTotalPnl(ele))
                ? `₹ ${calcTotalPnl(ele)}`
                : '---'}
            </Text>
          </View>
        </View>
      </View>
      <MoreWhite />
    </View>
  );
};

export default MyQuantCardForDashboard;

const styles = StyleSheet.create({
  logo: {backgroundColor: Colors.lightBlack, width: 60, height: 60},
  activeButton: {backgroundColor: Colors.primary},
});
