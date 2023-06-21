import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../assets/colors';
import {useTailwind} from 'tailwind-rn';
import 'intl';
import 'intl/locale-data/jsonp/en';
import Paisa from '../assets/icons/paisa.svg';
import Button from '../components/Button';
import apis from '../consts/apis';
import GetApi from '../hooks/GetApi';
import BrokerLogo from '../assets/icons/Logo.svg';
import AngleBroking from '../assets/icons/_angleBroking.svg';
import Fyres from '../assets/icons/_fyres.svg';
import NoImage from '../assets/icons/image2vector.svg';
import SmallcaseGateway from 'react-native-smallcase-gateway';
import PostApi from '../hooks/PostApi';
import Zeus from '../assets/images/zeus.svg';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const OpenOrderCard = ({data, userData}) => {
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
  const [quantDetails, setQuantsDetails] = useState([]);
  const [BrokerList, setBrokerList] = useState([]);

  useEffect(() => {
   

    async function fetchBrokerList() {
      let result = await GetApi(`${apis.brokerList}/${userData?.id}`);
      if (result.status === 200) {
        setBrokerList(result.data);
      }
    }
    fetchBrokerList();
    
  }, []);
  useEffect(() => {
    
    async function fetchQuantDetails() {
      let temp = [];
      let result = await GetApi(`${apis.quantDetails}/${data?.quantId}`);
      if (result.status === 200) {
        temp = {
          name: result?.data?.quant?.name,
          image: result?.data?.quant?.imgUrl,
        };
      }
      setQuantsDetails(temp);
    }
    fetchQuantDetails();
    
  }, [data]);

  async function handleOrder(order) {
    

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
        SmallcaseGateway.init(result.data?.authToken)
          .then(initResp => {
            // successfuly initialised gateway session
            SmallcaseGateway.triggerTransaction(result.data?.transaction_id)
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
                            txnResponse.data?.smallcaseAuthToken.split('.')[1],
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
                          
                        } else {
                          
                        }
                      }
                    } catch (error) {
                      
                    }
                  } else {
                    
                  }
                } catch (error) {
                  
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
    

    try {
      let result = await PostApi(`${apis.transaction}`, {
        status: 'error',
        user: data?.user,
        signal_id: data?.signal_id,
        quantId: data?.quantId,
        signal: data?.transaction,
        mode: data?.mode,
        symbol: data?.symbol,
        message: message,
      });
      if (result.status === 200) {
        
      } else {
        
      }
    } catch (error) {
      
    }
  };

  let LogoBroker = LogoTemp[data?.brokerId]
    ? LogoTemp[data?.brokerId]
    : NoImage;
  return (
    <View
      style={[
        tw('rounded-md p-4 mt-3 mr-3'),
        {
          backgroundColor: Colors.bgcolor4,
          width: windowWidth * 0.8,
        },
      ]}>
      <View style={[tw('flex flex-row items-center justify-between'), {}]}>
        <View style={[tw('flex flex-row items-start justify-start'), {}]}>
          <View
            style={[
              tw('relative rounded-full justify-start items-start flex'),
              styles.logo,
            ]}>
            <View style={[tw('h-12 w-12 items-center justify-center')]}>
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
                {fontSize: 14, lineHeight: 23, color: Colors.white},
              ]}>
              {quantDetails?.name}
            </Text>
            <Text
              style={[
                tw('ml-3 font-bold'),
                {fontSize: 12, lineHeight: 23, color: Colors.white},
              ]}>
              ₹ {data?.transaction?.entry_price * data?.quantity}
            </Text>
            <Text
              style={[
                tw('ml-3 mt-2 font-bold'),
                {fontSize: 14, lineHeight: 22, color: Colors.white},
              ]}>
              {data?.symbol}
            </Text>
            <Text
              style={[
                tw('ml-3 font-bold'),
                {fontSize: 16, lineHeight: 27, color: Colors.white},
              ]}>
              ₹ {data?.transaction?.entry_price}
            </Text>
            <Text
              style={[
                tw('ml-3 font-bold'),
                {fontSize: 14, lineHeight: 19, color: Colors.primary},
              ]}>
              {/* + ₹ 81.00 */}
            </Text>
          </View>
        </View>
        <View style={[tw('flex items-end justify-between'), {}]}>
          <View style={[tw('flex flex-row items-start justify-start'), {}]}>
            <LogoBroker />
            <Text style={[tw(''), styles.iconText2]}>
              {BrokerName[data?.brokerId]
                ? BrokerName[data?.brokerId]
                : 'broker'}
            </Text>
          </View>
          <TouchableOpacity
            style={{width: '100%', marginTop: 25, marginLeft: 0}}
            onPress={() => {
              handleOrder(data);
              // navigation.navigate('VirtualQuantDetail');
            }}>
            <Button title="Buy" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OpenOrderCard;

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
  logo: {backgroundColor: Colors.black, width: 50, height: 50},
  iconText: {color: Colors.basegray, fontSize: 12, lineHeight: 16},
  iconText2: {color: Colors.white, fontSize: 14, lineHeight: 19},
  deployButton: {backgroundColor: Colors.primary3},
  iconLabel: {fontSize: 16, lineHeight: 22, color: Colors.white},
});
