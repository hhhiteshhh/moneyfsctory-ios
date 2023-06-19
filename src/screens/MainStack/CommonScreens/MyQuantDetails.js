import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../../../assets/colors';
import BackIcon from '../../../assets/icons/back.svg';
import Filter from '../../../assets/icons/filter.svg';
import NoImage from '../../../assets/icons/image2vector.svg';
import More from '../../../assets/icons/moreVertYellow.svg';
import Deploy from '../../../assets/icons/deployedBlue.svg';
import Capital from '../../../assets/icons/capitalBlue.svg';
import Mode from '../../../assets/icons/modeBlue.svg';
import Investment from '../../../assets/icons/Total Investment.svg';
import Value from '../../../assets/icons/Today Value.svg';
import Up from '../../../assets/icons/up.svg';
import LinearGradient from 'react-native-linear-gradient';
import {SvgUri} from 'react-native-svg';
import {MONEY_FACTORY_IMAGE} from '../../../consts/apis';
import 'intl';
import 'intl/locale-data/jsonp/en';
import BrokerLogo from '../../../assets/icons/Logo.svg';
import AngleBroking from '../../../assets/icons/_angleBroking.svg';
import Fyres from '../../../assets/icons/_fyres.svg';
import Paisa from '../../../assets/icons/paisa.svg';
import MyStatusBar from '../../../components/MyStatusBar';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Header from '../../../components/Header';

const MyQuantDetails = ({route}) => {
  const tw = useTailwind();
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };
  const data = route?.params?.data;
  const [open, setOpen] = useState([]);
  const card = ['RELIANCE', 'TATA', 'ICICI'];
  let LogoTemp = ['', Paisa, AngleBroking, Fyres, '', '', BrokerLogo];
  let BrokerName = [
    '',
    '5 Paisa',
    'AngelONE',
    'Fyers',
    '',
    '',
    'MF Virtual Cash',
  ];
  const [loading, setLoading] = useState(true);
  const onError = e => {
    setLoading(false);
  };
  const onLoad = () => {
    setLoading(false);
  };
  let Logo = LogoTemp[data?.quant?.broker]
    ? LogoTemp[data?.quant?.broker]
    : NoImage;
  const handleShowDetails = id => {
    const currentIndex = open.indexOf(id);
    const newChecked = [...open];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setOpen(newChecked);
  };
  var formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  });

  const calcTotalPnl = () => {
    let total = 0;
    data.stocksignals.map(ele => {
      total += ele?.pldata?.pl;
    });
    return Number(total).toFixed(2);
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

  const profitPercentage = () => {
    let capital = data.quant.quant.price * data.quant.quantity;
    let totalPnl = calcTotalPnl();
    let percent = (totalPnl / capital) * 100;
    percent = Math.round(percent * 100) / 100;
    return percent;
  };
  return (
    <SafeAreaView style={[tw('h-full w-full'), styles.container]}>
      <View style={[tw('h-full'), styles.container]}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0.5, y: 0}}
          colors={[Colors.card1, Colors.card2]}
          style={tw('pb-')}>
          <MyStatusBar padding={20} transparent />
          <View style={[tw('mb-3'), {}]}>
            <Header title={`${data?.quant?.quant?.name} Details`} back={true} />
          </View>
        </LinearGradient>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0.5, y: 0}}
            colors={[Colors.card1, Colors.card2]}
            style={tw('px-5 pb-5')}>
            <View
              style={[tw('flex flex-row items-center justify-between'), {}]}>
              <View
                style={[tw('flex flex-row items-center justify-center'), {}]}>
                <View
                  style={[
                    tw(
                      'relative rounded-full justify-center items-center flex',
                    ),
                    styles.logo,
                  ]}>
                  <View style={[tw('h-16 w-16 items-center justify-center')]}>
                    <SvgUri
                      width="100%"
                      height="100%"
                      uri={`${MONEY_FACTORY_IMAGE}/${data?.quant?.quant?.imgUrl}`}
                      onError={onError}
                      onLoad={onLoad}
                    />
                    {loading && (
                      <ActivityIndicator size="large" color={Colors.primary} />
                    )}
                  </View>
                  <View
                    style={[
                      tw('absolute bottom-0 right-2 rounded-full w-3 h-3'),
                      styles.activeButton,
                    ]}
                  />
                </View>

                <Text
                  style={[
                    tw('ml-3 font-bold'),
                    {fontSize: 18, lineHeight: 23, color: Colors.white},
                  ]}>
                  {data?.quant?.quant?.name}
                </Text>
              </View>
              <More />
            </View>
            <View style={styles.hr} />
            <View style={[tw('mt-4 flex flex-row justify-between w-[90%]')]}>
              <View style={tw('flex items-start justify-start')}>
                <View style={[tw(''), {}]}>
                  <View
                    style={[tw('flex flex-row items-start justify-start'), {}]}>
                    <Deploy />
                    <Text style={[tw('ml-2'), styles.iconText]}>
                      Deployed on
                    </Text>
                  </View>
                  <Text
                    style={[tw('pl-8 font-semibold -mt-1'), styles.iconText2]}>
                    {data?.quant?.createdDate}
                  </Text>
                </View>
                <View style={[tw('mt-4'), {}]}>
                  <View
                    style={[tw('flex flex-row items-start justify-start'), {}]}>
                    <Mode />
                    <Text style={[tw('ml-2'), styles.iconText]}>Mode</Text>
                  </View>
                  <Text
                    style={[tw('pl-8 font-semibold -mt-1'), styles.iconText2]}>
                    {data?.quant?.mode}
                  </Text>
                </View>
                <View style={[tw('mt-4'), {}]}>
                  <View
                    style={[tw('flex flex-row items-start justify-start'), {}]}>
                    <Value />
                    <Text style={[tw('ml-2'), styles.iconText]}>
                      Today's Value
                    </Text>
                  </View>
                  <Text
                    style={[tw('pl-8 font-semibold -mt-1'), styles.iconText2]}>
                    --/--
                  </Text>
                </View>
              </View>
              <View style={tw('flex items-start justify-start')}>
                <View style={[tw(''), {}]}>
                  <View
                    style={[tw('flex flex-row items-start justify-start'), {}]}>
                    <Capital />
                    <Text style={[tw('ml-2'), styles.iconText]}>Capital</Text>
                  </View>
                  <Text
                    style={[tw('pl-8 font-semibold -mt-1'), styles.iconText2]}>
                    {formatter.format(
                      data?.quant?.quantity * data?.quant?.quant?.price,
                    )}
                  </Text>
                </View>
                <View style={[tw('mt-4'), {}]}>
                  <View
                    style={[tw('flex flex-row items-start justify-start'), {}]}>
                    <Logo />
                    <Text style={[tw('ml-2'), styles.iconText2]}>
                      {BrokerName[data?.quant?.broker]
                        ? BrokerName[data?.quant?.broker]
                        : 'broker'}
                    </Text>
                  </View>
                  <Text
                    style={[tw('pl-9 font-semibold'), styles.iconText2]}></Text>
                </View>
                <View style={[tw('mt-1'), {}]}>
                  <View
                    style={[tw('flex flex-row items-start justify-start'), {}]}>
                    <Investment />
                    <Text style={[tw('ml-2'), styles.iconText]}>
                      Total Investments
                    </Text>
                  </View>
                  <Text
                    style={[tw('pl-8 font-semibold -mt-1'), styles.iconText2]}>
                    --/--
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>
          <View
            style={[
              tw('flex items-center flex-row justify-between p-5'),
              styles.icon,
            ]}>
            <Text style={[tw(''), {...styles.text, color: Colors.basegray}]}>
              Total PNL & ROI%
            </Text>
            <Text
              style={[
                tw('font-semibold'),
                {
                  ...styles.text,
                  color: checkNegativeNo(calcTotalPnl())
                    ? Colors.red
                    : Colors.primary,
                },
              ]}>
              {checkNegativeNo(calcTotalPnl())
                ? `- ₹ ${-1 * calcTotalPnl()}`
                : !checkNaN(calcTotalPnl())
                ? `₹ ${calcTotalPnl()}`
                : '---'}
            </Text>
            <Text
              style={[
                tw('font-semibold'),
                {...styles.text, color: Colors.white},
              ]}>
              {data
                ? !checkNaN(profitPercentage())
                  ? `${profitPercentage()}%`
                  : '---'
                : ''}
            </Text>
          </View>
          {/* <View
          style={[
            tw('flex items-center flex-row justify-between px-5 py-3'),
            {},
          ]}>
          <Text
            style={[
              tw('font-medium'),
              {...styles.text, color: Colors.basegray},
            ]}>
            Multiplier
          </Text>
          <Text
            style={[
              tw('font-semibold'),
              {...styles.text, color: Colors.white},
            ]}>
            1x
          </Text>
        </View> */}

          {data?.stocksignals?.map((item, index) => (
            <View style={[tw('p-5 my-2'), styles.stockCard]} key={index}>
              <TouchableOpacity
                onPress={() => {
                  handleShowDetails(index);
                }}>
                <View
                  style={[tw('flex items-center flex-row justify-between')]}>
                  <Text
                    style={[
                      tw('font-semibold'),
                      {...styles.text, color: Colors.white},
                    ]}>
                    {item?.symbol}
                  </Text>
                  <More />
                </View>
              </TouchableOpacity>
              {open.indexOf(index) !== -1 && (
                <>
                  <View style={styles.hr} />
                  <View
                    style={[tw('mt-4 flex flex-row justify-between w-[70%]')]}>
                    <View style={tw('flex items-start justify-start')}>
                      <View style={[tw(''), {}]}>
                        <Text style={[tw('py-2'), styles.iconText3]}>
                          Price
                        </Text>
                        <Text style={[tw('font-semibold'), styles.iconText2]}>
                          {item.signal == 1
                            ? formatter.format(
                                Number(item?.price?.entry_price).toFixed(2),
                              )
                            : formatter.format(
                                Number(item?.price?.exit_price).toFixed(2),
                              )}
                        </Text>
                      </View>
                      <View style={[tw(''), {}]}>
                        <Text style={[tw('py-2'), styles.iconText3]}>
                          Quantity
                        </Text>
                        <Text style={[tw('font-semibold'), styles.iconText2]}>
                          {item?.qty}
                        </Text>
                      </View>
                      <View style={[tw(''), {}]}>
                        <Text style={[tw('py-2'), styles.iconText3]}>
                          Current Value
                        </Text>
                        <Text style={[tw('font-semibold'), styles.iconText2]}>
                          {formatter.format(
                            Number(item?.data?.currentvalue).toFixed(2),
                          )}
                        </Text>
                      </View>
                    </View>
                    <View style={tw('flex items-start justify-start')}>
                      <View style={[tw(''), {}]}>
                        <Text style={[tw('py-2'), styles.iconText3]}>LTP</Text>
                        <Text style={[tw('font-semibold'), styles.iconText2]}>
                          {item.ltp
                            ? formatter.format(Number(item.ltp).toFixed(2))
                            : '---'}
                        </Text>
                      </View>
                      <View style={[tw(''), {}]}>
                        <Text style={[tw('py-2'), styles.iconText3]}>P&L</Text>
                        <Text
                          style={[
                            tw('font-semibold'),
                            {...styles.iconText2, color: Colors.primary},
                          ]}>
                          {formatter.format(
                            Number(item?.pldata?.pl).toFixed(2),
                          )}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={[tw('absolute bottom-6 right-6 '), {}]}
                    onPress={() => {
                      handleShowDetails(index);
                    }}>
                    <Up />
                  </TouchableOpacity>
                </>
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default MyQuantDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.eerie,
  },
  header: {color: Colors.white, fontSize: 20, lineHeight: 28},
  logo: {backgroundColor: Colors.black, width: 60, height: 60},
  activeButton: {backgroundColor: Colors.primary},
  hr: {
    height: 1,
    backgroundColor: Colors.basegray2,
    marginTop: 15,
  },
  icon: {backgroundColor: Colors.lightBlack},
  iconText: {color: Colors.basegray, fontSize: 12, lineHeight: 16},
  iconText2: {color: Colors.white, fontSize: 14, lineHeight: 19},
  iconText3: {color: Colors.basegray, fontSize: 14, lineHeight: 19},
  stockCard: {backgroundColor: Colors.lightBlack},
  text: {fontSize: 16, lineHeight: 22},
});
