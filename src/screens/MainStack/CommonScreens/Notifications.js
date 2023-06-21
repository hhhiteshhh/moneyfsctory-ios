import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../../assets/colors';
import {useTailwind} from 'tailwind-rn';
import BackIcon from '../../../assets/icons/back.svg';
import Share from '../../../assets/images/share.svg';
import 'intl';
import 'intl/locale-data/jsonp/en';
import Mode from '../../../assets/icons/modeBlue.svg';
import Paisa from '../../../assets/icons/paisa.svg';
import Button from '../../../components/Button';
import apis from '../../../consts/apis';
import GetApi from '../../../hooks/GetApi';
import BrokerLogo from '../../../assets/icons/Logo.svg';
import AngleBroking from '../../../assets/icons/_angleBroking.svg';
import Fyres from '../../../assets/icons/_fyres.svg';
import NoImage from '../../../assets/icons/image2vector.svg';
import SmallcaseGateway from 'react-native-smallcase-gateway';
import PostApi from '../../../hooks/PostApi';
import Zeus from '../../../assets/images/zeus.svg';
import MyStatusBar from '../../../components/MyStatusBar';
import {useNavigation} from '@react-navigation/native';
import {userDataAtom} from '../../../atoms/userDataAtom';
import {useRecoilValue} from 'recoil';

const windowHeight = Dimensions.get('window').height;
const Notifications = () => {
  const user = useRecoilValue(userDataAtom);
  const navigation = useNavigation();
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

  const tw = useTailwind();
  const goBack = () => {
    navigation.goBack();
  };
  const [orders, setOrders] = useState([]);
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
  const [quantDetails, setQuantsDetails] = useState([]);
  const [BrokerList, setBrokerList] = useState([]);

  useEffect(() => {
    setLoading(true);
    async function fetchorders() {
      let result = await GetApi(`${apis.openOrders}/${user?.id}`);
      if (result.status === 200) {
        setOrders(result.data);
      }
    }

    fetchorders();
    setLoading(false);
  }, []);
  useEffect(() => {
    setLoading(true);

    async function fetchBrokerList() {
      let result = await GetApi(`${apis.brokerList}/${user?.id}`);
      if (result.status === 200) {
        setBrokerList(result.data);
      }
    }
    fetchBrokerList();
    setLoading(false);
  }, []);
  useEffect(() => {
    setLoading(true);

    async function fetchQuantDetails() {
      let temp = [];
      for await (const item of orders?.data) {
        let result = await GetApi(`${apis.quantDetails}/${item?.quantId}`);
        if (result.status === 200) {
          temp.push({
            name: result?.data?.quant?.name,
            image: result?.data?.quant?.imgUrl,
          });
        }
      }
      setQuantsDetails(temp);
    }
    fetchQuantDetails();
    setLoading(false);
  }, [orders]);

  async function handleOrder(order) {
    setLoading(true);

    await SmallcaseGateway.setConfigEnvironment({
      // isLeprechaun: true,
      isAmoEnabled: true,
      gatewayName: 'moneyfactory',
      // `environmentName` should always be PROD, regardless of your environment
      environmentName: SmallcaseGateway.ENV.PROD,
      brokerList: [],
    });
    try {
      const brokerID = BrokerList[order.brokerName]
        ? BrokerList[order.brokerName]
        : '';

      let result = await PostApi(`${apis.createTransaction}`, {
        savedBrokerID: brokerID,
        symbol: order.symbol,
        qty: order.quantity,
        signal: order.transaction ? 'BUY' : 'SELL',
      });
      if (result.status === 200) {
        SmallcaseGateway.init(result.data.authToken)
          .then(initResp => {
            // successfuly initialised gateway session
            SmallcaseGateway.triggerTransaction(result.data.transaction_id)
              .then(async txnResponse => {
                /*
                 * Transaction intent fulfilled.
                 * Response structure & example - https://developers.gateway.smallcase.com/docs/transaction-response
                 */
                try {
                  let response = await PostApi(`${apis.transaction}`, {
                    ...txnResponse,
                    user: order.user,
                    signal_id: order.signal_id,
                    quantId: order.quantId,
                    signal: order.transaction,
                    mode: order.mode,
                  });
                  if (response.status === 200) {
                    try {
                      if (brokerID == '') {
                        const authid = JSON.parse(
                          Buffer.from(
                            txnResponse.data.smallcaseAuthToken.split('.')[1],
                            'base64',
                          ).toString(),
                        );

                        let response2 = await PostApi(`${apis.addbroker}`, {
                          user: order.user,
                          smallcaseAuthId: authid.smallcaseAuthId,
                          name: txnResponse.broker,
                          quantId: order.quantId,
                        });
                        if (response2.status === 200) {
                          setLoading(false);
                        } else {
                          setLoading(false);
                        }
                      }
                    } catch (error) {
                      setLoading(false);
                    }
                  } else {
                    setLoading(false);
                  }
                } catch (error) {
                  setLoading(false);
                }
              })

              .catch(err => {
                /*
                 * Gateway flow ended before transaction intent fulfilment.
                 * Possible errors - https://developers.gateway.smallcase.com/docs/transaction-errors
                 */

                failorder(order, err.userInfo);
              });
          })
          .catch(err => {
            // error initialising gateway session:
            // confirm that `sdkToken` has valid payload and is signed with correct secret
          });
      } else {
      }
    } catch (error) {}
  }

  const failorder = async (data, message) => {
    setLoading(true);

    try {
      let result = await PostApi(`${apis.transaction}`, {
        status: 'error',
        user: data.user,
        signal_id: data.signal_id,
        quantId: data.quantId,
        signal: data.transaction,
        mode: data.mode,
        symbol: data.symbol,
        message: message,
      });
      if (result.status === 200) {
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const [loading, setLoading] = useState(false);
  const renderLoader = () => {
    if (loading) {
      return (
        <View style={[styles.containerLoader, styles.horizontal]}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      );
    }
  };
  return (
    <SafeAreaView style={[tw('h-full w-full'), styles.container]}>
      <View style={[tw('h-full px-5'), styles.container]}>
        <MyStatusBar padding={0} />
        <View
          style={[
            tw('flex flex-row items-center justify-between mt-3 mb-2'),
            {},
          ]}>
          <View style={[tw('flex flex-row items-center flex-1')]}>
            <TouchableOpacity onPress={goBack}>
              <BackIcon />
            </TouchableOpacity>
            <Text style={[tw('font-bold ml-3'), styles.header]}>
              Open Orders{' '}
            </Text>
          </View>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          {orders?.data?.map((order, idx) => {
            let LogoBroker = LogoTemp[order?.brokerId]
              ? LogoTemp[order?.brokerId]
              : NoImage;
            return (
              <View
                key={idx}
                style={[
                  tw('rounded-md p-4 mt-3'),
                  {backgroundColor: Colors.lightBlack},
                ]}>
                <View
                  style={[
                    tw('flex flex-row items-center justify-between'),
                    {},
                  ]}>
                  <View
                    style={[
                      tw('flex flex-row items-center justify-center'),
                      {},
                    ]}>
                    <View
                      style={[
                        tw(
                          'relative rounded-full justify-center items-center flex',
                        ),
                        styles.logo,
                      ]}>
                      <View
                        style={[tw('h-16 w-16 items-center justify-center')]}>
                        <Zeus />
                        {/* <SvgUri
                        width="100%"
                        height="100%"
                        uri={`${MONEY_FACTORY_IMAGE}/${quantDetails?.[idx]?.image}`}
                        onError={onError}
                        onLoad={onLoad}
                      />

                      {loading && (
                        <ActivityIndicator
                          size="large"
                          color={Colors.primary}
                        />
                      )} */}
                      </View>
                      <View
                        style={[
                          tw('absolute bottom-0 right-2 rounded-full w-3 h-3'),
                          styles.activeButton,
                        ]}
                      />
                    </View>
                    <View>
                      <Text
                        style={[
                          tw('ml-3 font-bold'),
                          {fontSize: 18, lineHeight: 23, color: Colors.white},
                        ]}>
                        {quantDetails[idx]?.name}
                      </Text>
                      <Text
                        style={[
                          tw('ml-3 font-bold'),
                          {fontSize: 18, lineHeight: 23, color: Colors.white},
                        ]}></Text>
                    </View>
                  </View>
                  <TouchableOpacity>
                    <Share />
                  </TouchableOpacity>
                </View>
                <View
                  style={[
                    tw(
                      'flex flex-row items-center justify-between pb-5 border-b border-[#333333]',
                    ),
                  ]}>
                  <View style={[tw('mt-6'), {}]}>
                    <View
                      style={[
                        tw('flex flex-row items-start justify-start'),
                        {},
                      ]}>
                      <Mode />
                      <Text style={[tw('ml-2'), styles.iconText]}>Mode</Text>
                    </View>
                    <Text
                      style={[
                        tw('pl-8 font-semibold -mt-1'),
                        styles.iconText2,
                      ]}>
                      {order?.mode}
                    </Text>
                  </View>
                  <View style={[tw('mt-6'), {}]}>
                    <View
                      style={[
                        tw('flex flex-row items-start justify-start'),
                        {},
                      ]}>
                      <LogoBroker />
                      <Text style={[tw(''), styles.iconText2]}>
                        {BrokerName[order?.brokerId]
                          ? BrokerName[order?.brokerId]
                          : 'broker'}
                      </Text>
                    </View>
                  </View>
                </View>

                <View
                  style={[
                    tw('flex flex-row items-start justify-between mt-5'),
                  ]}>
                  <View
                    style={[
                      tw(
                        'w-10 h-10 rounded-lg items-center justify-center overflow-hidden',
                      ),
                      {backgroundColor: '#282828'},
                    ]}>
                    <Text
                      style={[
                        tw('font-bold '),
                        {fontSize: 16, lineHeight: 22, color: Colors.white},
                      ]}>
                      {order?.symbol.substring(0, 2)}
                    </Text>
                  </View>
                  <View style={[tw('flex-1 ml-2')]}>
                    <View
                      style={[
                        tw('flex flex-row items-center justify-between'),
                      ]}>
                      <Text
                        style={[
                          tw('font-bold'),
                          {fontSize: 16, lineHeight: 22, color: Colors.white},
                        ]}>
                        {order?.symbol}
                      </Text>
                      <Text
                        style={[
                          tw('font-bold'),
                          {fontSize: 16, lineHeight: 22, color: Colors.white},
                        ]}>
                        {formatter.format(order?.transaction?.entry_price)}
                      </Text>
                    </View>
                    <View
                      style={[
                        tw('flex flex-row items-center justify-between mt-1'),
                      ]}>
                      <Text
                        style={[
                          tw('font-medium'),
                          {fontSize: 14, lineHeight: 18, color: Colors.text},
                        ]}></Text>
                      <Text
                        style={[
                          tw('font-bold'),
                          {fontSize: 14, lineHeight: 19, color: Colors.primary},
                        ]}>
                        {/* {formatter.format(81)} */}
                      </Text>
                    </View>
                    <View
                      style={[
                        tw('flex flex-row mt-3 items-center justify-between'),
                      ]}>
                      <Text
                        style={[
                          tw('font-medium'),
                          {fontSize: 14, lineHeight: 18, color: Colors.text},
                        ]}>
                        Quantity :{' '}
                        <Text
                          style={[
                            tw('font-medium'),
                            {fontSize: 14, lineHeight: 18, color: Colors.white},
                          ]}>
                          {order?.quantity}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={[tw('mt-3 text-center w-full z-50')]}>
                  <View
                    style={[
                      tw('flex items-center w-full justify-between flex-row'),
                    ]}>
                    <TouchableOpacity
                      style={{width: '48%'}}
                      onPress={() => {
                        // goBack();
                        failorder(order, 'user skipped the call');
                      }}>
                      <View
                        style={[tw('rounded-md mt-3'), styles.deployButton]}>
                        <Text
                          style={[tw('py-3 text-center'), styles.iconLabel]}>
                          Skip
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={{width: '48%'}}
                      onPress={() => {
                        handleOrder(order);
                        // navigation.navigate('VirtualQuantDetail');
                      }}>
                      <Button title="Buy" />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          })}
          {renderLoader()}
        </ScrollView>
      </View>

      {renderLoader()}
    </SafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  containerLoader: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.eerie,
    //
    opacity: 0.5,
    height: windowHeight,
    position: 'absolute',
    width: '100%',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  container: {
    backgroundColor: Colors.eerie,
  },
  header: {color: Colors.white, fontSize: 24, lineHeight: 33, marginLeft: 20},
  activeButton: {backgroundColor: Colors.primary},
  logo: {backgroundColor: Colors.black, width: 60, height: 60},
  iconText: {color: Colors.basegray, fontSize: 12, lineHeight: 16},
  iconText2: {color: Colors.white, fontSize: 14, lineHeight: 19},
  deployButton: {backgroundColor: Colors.primary3},
  iconLabel: {fontSize: 16, lineHeight: 22, color: Colors.white},
});
