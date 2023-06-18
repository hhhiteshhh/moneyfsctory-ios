import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../../../assets/colors';
import RadioUnselected from '../../../assets/icons/radiounselected.svg';
import RadioSelected from '../../../assets/icons/radioselected.svg';
import LinearGradient from 'react-native-linear-gradient';
import Play from '../../../assets/icons/play.svg';
import Like from '../../../assets/icons/like.svg';
import Add from '../../../assets/icons/add.svg';
import Dislike from '../../../assets/icons/dislike.svg';
import Button from '../../../components/Button';
import Annualised from '../../../assets/icons/annualised.svg';
import Drawdown from '../../../assets/icons/drawdown.svg';
import Ratio from '../../../assets/icons/ratio.svg';
import Modal from 'react-native-modal';
import Slider from '@ptomasroos/react-native-multi-slider';
import Close from '../../../assets/icons/close.svg';
import Index from '../../../assets/icons/Positional Future.svg';
import Position from '../../../assets/icons/positional.svg';
import {SvgUri} from 'react-native-svg';
import apis, {MONEY_FACTORY_IMAGE} from '../../../consts/apis';
import 'intl';
import 'intl/locale-data/jsonp/en';
import GetApi from '../../../hooks/GetApi';
import PostApi from '../../../hooks/PostApi';
import MyStatusBar from '../../../components/MyStatusBar';
import {useNavigation} from '@react-navigation/native';
import {userDataAtom} from '../../../atoms/userDataAtom';
import {useRecoilValue} from 'recoil';
import Header from '../../../components/Header';
import CustomMarker from '../../../components/CustomMarker';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const QuantDetails = ({route, orders}) => {
  const tw = useTailwind();
  const navigation = useNavigation();
  const user = useRecoilValue(userDataAtom);

  var formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  });
  const quantData = route?.params?.data;
  const [deploy, setDeploy] = useState('Assisted');
  const [subscribe, setSubscribe] = useState(false);
  const [userSelectedBroker, setBroker] = useState(10);
  const [brokerName, setBrokerName] = useState('');
  const [multiplier, setMultiplier] = useState([1]);
  const [brokerList, setBrokerList] = useState({
    Stimulated: [
      {
        status: 'active',
        _id: 6,
        name: 'MF Virtual Cash',
        description: 'Money Factory Virtual Cash for simulated deployment',
        imgURL: 'moneyFactory',
      },
    ],
  });
  const [showDeployModal, setShowDeployModal] = useState(false);
  const navigateToMyQuants = () => {
    navigation.replace('MyQuants');
  };
  const [indexFutures, setIndexFutures] = useState([]);
  const [positionalFutures, setPositionalFutures] = useState([]);
  const [stocks, setStocks] = useState([]);
  const [selectedList, setSelectedList] = useState([
    // 'Automatic',
    'Assisted',
    'Stimulated',
  ]);
  useEffect(() => {
    let temp1 = [];
    let temp2 = [];
    let temp3 = [];
    quantData?.subCategories?.map(category => {
      temp1.push(category?.subCategoryName);
    });
    quantData?.functionality?.map(functionality => {
      temp2.push(functionality?.functionalityId?.name);
    });
    quantData?.stocks?.map(stock => {
      temp3.push(stock?.name);
    });
    setIndexFutures(temp1);
    setPositionalFutures(temp2);
    setStocks(temp3);
  }, [quantData]);
  const handleSubscribed = async () => {
    if (!subscribe) {
      try {
        setLoading(true);
        const options = {
          quantId: quantData?._id,
          userId: user?.data.id,
        };

        let result = await PostApi(apis.subscribedAQuant, options);
        if (result.status === 200) {
          setLoading(false);
          alert("'Successfully subscribed'");
          // alert()
          // ToastAndroid.show('Successfully subscribed', ToastAndroid.SHORT);
          setSubscribe(true);
        } else {
          setLoading(false);
          alert(result.data.msg);
          // ToastAndroid.show(result.data.msg, ToastAndroid.SHORT);
        }
      } catch (error) {
        setLoading(false);
        alert(error.response.data.msg);
        // ToastAndroid.show(error.response.data.msg, ToastAndroid.SHORT);
      }
    }
  };
  const [loading, setLoading] = useState(true);
  const onError = e => {
    setLoading(false);
  };
  const onLoad = () => {
    setLoading(false);
  };
  async function fetchBrokers() {
    let result = await GetApi(apis.brokers);
    if (result.status === 200) {
      setBrokerList(prev => ({...prev, Automatic: result.data}));

      // setBrokers(result.data);
      // setBrokerList(result.data);
    }
    let result2 = await GetApi(`${apis.subscribedQuants}/${user?.data.id}`);
    if (result2.status === 200) {
      result2.data.subQts.forEach(ele => {
        if (quantData._id == ele.quant._id) {
          setSubscribe(true);
        }
      });
    }
    let result3 = await GetApi(`${apis.savedBroker}/${user?.data.id}`);
    let temp = [{_id: 'guest', name: 'Link new broker'}];
    if (result3.status === 200) {
      for (var key in result3.data.brokers) {
        temp.push({_id: key, name: key});
      }
      // setAssistedBrokerList(temp);
      setBrokerList(prev => ({...prev, Assisted: temp}));
      setBroker(10);
      setBrokerName(temp[0]._id);
    }
  }
  useEffect(() => {
    fetchBrokers();
  }, []);

  const renderLoader = () => {
    if (loading) {
      return (
        <View style={[styles.containerLoader, styles.horizontal]}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      );
    }
  };
  const handleDeployment = async () => {
    if (subscribe) {
      try {
        setLoading(true);
        console.log(multiplier[0]);
        const options = {
          quantId: quantData._id,
          userId: user?.data.id,
          mode: deploy,
          quantity: multiplier[0],
          broker: userSelectedBroker,
          brokerName: brokerName,
        };

        const sigoptions = {
          quantId: quantData._id,
          userId: user?.data.id,
          brokerId: 1,
          subscribedPrice: quantData.price * multiplier[0],
        };
        let result = await PostApi(apis.deployQuants, options);
        console.log(result);
        if (result.status === 200) {
          let result2 = await PostApi(apis.createSignal, sigoptions);
          if (result2.status === 200) {
            setShowDeployModal(false);
            setLoading(false);
            alert('Successfully deployed');
            // ToastAndroid.show('Successfully deployed', ToastAndroid.SHORT);
            setTimeout(() => {
              navigateToMyQuants();
            }, 2000);
          } else {
            setLoading(false);
            alert(result2.data.msg);
            // ToastAndroid.show(result2.data.msg, ToastAndroid.SHORT);
          }
        } else {
          setLoading(false);
          alert(result.data.msg);
          // ToastAndroid.show(result.data.msg, ToastAndroid.SHORT);
          setShowDeployModal(false);
        }
      } catch (e) {
        setLoading(false);
        alert(e.response.data.msg);
        // ToastAndroid.show(e.response.data.msg, ToastAndroid.SHORT);
        setShowDeployModal(false);
      }
    } else {
      alert('Please subscribe the quant first.');
      setLoading(false);
    }
  };
  const sliderOneValuesChange = values => setMultiplier(values);

  return (
    <SafeAreaView style={[tw('h-full w-full'), styles.container]}>
      <View style={[tw('h-full '), styles.container]}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 0.5, y: 0}}
          colors={[Colors.card1, Colors.card2]}>
          <MyStatusBar padding={0} transparent />
          <View style={[tw('my-3'), {}]}>
            <Header
              title={quantData?.categories?.[0]?.categoryId?.name}
              back={true}
            />
          </View>
        </LinearGradient>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 0.5, y: 0}}
            colors={[Colors.card1, Colors.card2]}
            style={[{width: '100%', height: 300}]}>
            <View style={[tw('flex flex-row w-full items-start px-5 mt-7')]}>
              <View style={[tw('h-24 w-24 items-center justify-center')]}>
                <SvgUri
                  width="100%"
                  height="100%"
                  uri={`${MONEY_FACTORY_IMAGE}/${quantData.imgUrl}`}
                  onError={onError}
                  onLoad={onLoad}
                />
                {loading && (
                  <ActivityIndicator size="large" color={Colors.primary} />
                )}
              </View>
              <View style={tw('ml-5 flex-1')}>
                <View
                  style={[tw('flex flex-row items-center justify-between')]}>
                  <Text style={[tw('font-bold'), styles.detailsHeader]}>
                    {quantData?.name}
                  </Text>
                  <Text
                    style={[
                      tw('font-semibold px-2 py-1'),
                      {
                        color: Colors.white,
                        backgroundColor:
                          quantData?.risk === 'Low'
                            ? Colors.primary
                            : quantData?.risk === 'Medium'
                            ? Colors.orange
                            : 'red',
                        zIndex: 999,
                        fontSize: 12,
                      },
                    ]}>
                    {quantData?.risk}
                  </Text>
                </View>
                <View>
                  <Text style={[tw('font-bold mt-2'), styles.name]}>
                    {quantData?.categories?.[0]?.categoryId?.name}
                  </Text>
                </View>
                <View>
                  <Text style={[tw('font-bold mt-3'), styles.price]}>
                    {formatter.format(quantData?.price ? quantData?.price : 0)}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={tw(
                ' mt-7 flex flex-row items-start justify-between px-5',
              )}>
              <View style={[tw('flex flex-row items-start w-[49%] mr-7')]}>
                <Position />
                <Text style={[tw('font-medium ml-3'), styles.iconLabel]}>
                  {indexFutures.join(', ')}
                </Text>
              </View>
              <View style={[tw('flex flex-row items-start w-[40%] ')]}>
                <Index />
                <Text style={[tw('font-medium ml-3 mr-5'), styles.iconLabel]}>
                  {positionalFutures.join(', ')}
                </Text>
              </View>
            </View>
          </LinearGradient>
          <View
            style={[
              tw('flex flex-row items-center justify-between px-5 py-3'),
              styles.card,
            ]}>
            <View style={tw('flex items-center')}>
              <Play />
              <Text style={styles.iconText}>Play</Text>
            </View>
            <View style={tw('flex items-center')}>
              <Add />
              <Text style={styles.iconText}>Add</Text>
            </View>
            <View style={tw('flex items-center')}>
              <Like />
              <Text style={styles.iconText}>Like</Text>
            </View>
            <View style={tw('flex items-center')}>
              <Dislike />
              <Text style={styles.iconText}>Dislike</Text>
            </View>
          </View>
          <View
            style={[
              tw('flex items-center w-full justify-between flex-row px-5 mt-2'),
            ]}>
            <TouchableOpacity style={{width: '45%'}} onPress={handleSubscribed}>
              <Button title={subscribe ? 'Subscribed' : 'Subscribe Now'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{width: '45%'}}
              onPress={() => {
                setShowDeployModal(true);
              }}>
              <View style={[tw('rounded-md mt-3'), styles.deployButton]}>
                <Text style={[tw('py-3 text-center'), styles.iconLabel]}>
                  Deploy
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            style={[tw('px-5 mt-5')]}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            fadingEdgeLength={20}>
            <View
              style={[
                tw('flex items-start pl-2 pr-5 py-3 rounded-md mr-1 w-[123px]'),
                styles.card,
              ]}>
              <Annualised />
              <Text style={[tw('py-2 font-semibold'), styles.return]}>
                Annualised Return
              </Text>
              <Text style={[tw('font-bold'), styles.data]}>41%</Text>
            </View>
            <View
              style={[
                tw(
                  'flex items-start pl-2 pr-5 py-3 rounded-md ml-1 mr-1 w-[123px]',
                ),
                styles.card,
              ]}>
              <Drawdown />
              <Text style={[tw('py-2 font-semibold'), styles.return]}>
                Max {'         '}Drawdown
              </Text>
              <Text style={[tw('font-bold'), styles.data]}>20.2%</Text>
            </View>
            <View
              style={[
                tw('flex items-start pl-2 pr-5 py-3 rounded-md ml-1 w-[123px]'),
                styles.card,
              ]}>
              <Ratio />
              <Text style={[tw('py-2 font-semibold'), styles.return]}>
                Sharp{'         '} Ratio
              </Text>
              <Text style={[tw('font-bold'), styles.data]}>0.83%</Text>
            </View>
            <View style={{width: 50}} />
          </ScrollView>
          <View
            style={[
              tw('w-full p-5 mt-5 flex flex-row justify-between'),
              styles.card,
            ]}>
            <View>
              <View style={[tw(''), {}]}>
                <Text style={[tw(' font-bold'), styles.list]}>
                  {`\u2022`} Start Date
                </Text>
                <Text style={[tw('pl-2'), styles.list2]}>
                  {quantData?.startdate}
                </Text>
              </View>
              <View style={[tw('mt-3'), {}]}>
                <Text style={[tw(' font-bold'), styles.list]}>
                  {`\u2022`} Risk Rating
                </Text>
                <Text style={[tw('pl-2'), styles.list2]}>
                  {quantData?.risk}
                </Text>
              </View>
            </View>
            <View>
              <View style={[tw(''), {}]}>
                <Text style={[tw(' font-bold'), styles.list]}>
                  {`\u2022`} Created by
                </Text>
                <Text style={[tw('pl-2'), styles.list2]}>
                  {quantData?.createdBy}
                </Text>
              </View>
              <View style={[tw('mt-3'), {}]}>
                <Text style={[tw(' font-bold'), styles.list]}>
                  {`\u2022`} Trading Frequency
                </Text>
                <Text style={[tw('pl-2'), styles.list2]}>
                  {quantData?.trading_frequency}
                </Text>
              </View>
            </View>
          </View>
          <View style={tw('px-5')}>
            <Text style={[tw('font-bold mt-5'), styles.data]}>Category</Text>
            <Text style={[tw('font-medium mt-2'), styles.description]}>
              {quantData?.categories?.[0]?.categoryId?.name}
            </Text>
            <Text style={[tw('font-bold mt-5'), styles.data]}>Description</Text>
            <Text style={[tw('mt-1 '), styles.description2]}>
              {quantData?.description}
            </Text>
            <View style={styles.hr} />
            <Text style={[tw('font-bold mt-5'), styles.data]}>Stocks</Text>
          </View>
          <ScrollView
            // horizontal
            style={[tw('px-5')]}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            fadingEdgeLength={20}>
            {stocks?.map((stock, index) => (
              <View
                key={index}
                style={[
                  tw('my-2'),
                  {borderBottomWidth: 1, borderBottomColor: Colors.basegray2},
                ]}>
                <TouchableOpacity
                  onPress={() => {
                    // handleShowDetails(index);
                  }}>
                  <View
                    style={[
                      tw('flex items-center flex-row justify-start pb-2'),
                    ]}>
                    <Text
                      style={[
                        tw('font-semibold ml-2'),
                        {fontSize: 16, lineHeight: 22, color: Colors.white},
                      ]}>
                      {stock}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ))}
            <View style={{width: 50}} />
          </ScrollView>
          <View style={{height: 10}} />
        </ScrollView>
        <Modal
          isVisible={showDeployModal}
          style={styles.modal}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          animationInTiming={500}
          animationOutTiming={500}
          onBackdropPress={() => {
            setShowDeployModal(false);
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1.5, y: 0}}
            style={{borderRadius: 6}}
            colors={[Colors.card1, Colors.card2]}>
            <ScrollView
              style={{
                height: windowHeight * 0.9,
                padding: 20,
              }}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}>
              <View style={tw('flex flex-row items-center justify-between')}>
                <Text style={[tw('font-semibold'), styles.header]}>
                  Deploy Quants
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setShowDeployModal(false);
                  }}>
                  <Close />
                </TouchableOpacity>
              </View>
              <View style={styles.hr}></View>
              <Text style={[tw('mt-5 font-semibold'), styles.data]}>
                Select Mode
              </Text>
              {selectedList?.map((listItem, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={[tw('flex items-center flex-row -ml-2 mt-3')]}
                    onPress={() => {
                      setDeploy(listItem);
                      // handleBrokerList(listItem);
                      // setBroker('');
                    }}>
                    {deploy === listItem ? (
                      <TouchableOpacity
                        onPress={() => {
                          setDeploy(listItem);
                        }}>
                        <RadioSelected />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          setDeploy(listItem);
                        }}>
                        <RadioUnselected />
                      </TouchableOpacity>
                    )}
                    <Text
                      style={[
                        {
                          marginLeft: 6,
                          fontSize: 14,
                          lineHeight: 19,
                          color:
                            deploy === listItem
                              ? Colors.white
                              : Colors.basegray,
                        },
                      ]}>
                      {listItem}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              <View style={tw('mt-5')}>
                <View style={tw('flex items-center justify-between flex-row')}>
                  <Text style={[tw('font-semibold'), styles.data]}>
                    Multiplier
                  </Text>
                  <Text style={styles.iconLabel}>{multiplier[0]}x</Text>
                </View>
                <View style={[tw('ml-3')]}>
                  <Slider
                    min={1}
                    max={10}
                    values={multiplier}
                    sliderLength={windowWidth - 80}
                    onValuesChange={sliderOneValuesChange}
                    customMarker={CustomMarker}
                    selectedStyle={{
                      backgroundColor: Colors.yellow,
                    }}
                    unselectedStyle={{
                      backgroundColor: Colors.yellow,
                      opacity: 0.3,
                    }}
                  />
                </View>
                <View style={tw('flex items-center justify-between flex-row')}>
                  <Text style={styles.name}>1x</Text>
                  <Text style={styles.name}>10x</Text>
                </View>
              </View>
              <Text style={[tw('mt-5 font-semibold'), styles.data]}>
                Broker
              </Text>
              {brokerList &&
                deploy &&
                brokerList[deploy]?.map((broker, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[tw('flex items-center flex-row -ml-2 mt-3')]}
                    onPress={() => {
                      if (typeof broker?._id == 'number') {
                        setBroker(broker?._id);
                        setBrokerName('');
                      } else {
                        setBroker(10);
                        setBrokerName(broker?._id);
                      }
                      // setBroker(broker?._id);
                      // handleBroker(broker?._id);
                    }}>
                    {broker?._id === brokerName ? (
                      <TouchableOpacity
                        onPress={() => {
                          if (typeof broker?._id == 'number') {
                            setBroker(broker?._id);
                            setBrokerName('');
                          } else {
                            setBroker(10);
                            setBrokerName(broker?._id);
                          }
                        }}>
                        <RadioSelected />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          if (typeof broker?._id == 'number') {
                            setBroker(broker?._id);
                            setBrokerName('');
                          } else {
                            setBroker(10);
                            setBrokerName(broker?._id);
                          }
                        }}>
                        <RadioUnselected />
                      </TouchableOpacity>
                    )}
                    <Text
                      style={[
                        {
                          marginLeft: 6,
                          fontSize: 14,
                          lineHeight: 19,
                          color:
                            userSelectedBroker === 10
                              ? broker?._id === brokerName
                                ? Colors.white
                                : Colors.basegray
                              : userSelectedBroker === broker?._id
                              ? Colors.white
                              : Colors.basegray,
                        },
                      ]}>
                      {broker?.name}
                    </Text>
                  </TouchableOpacity>
                ))}

              <View
                style={[
                  tw('flex items-center justify-between flex-row px-5 mt-2'),
                  {width: '100%'},
                ]}>
                <TouchableOpacity
                  style={{width: '45%'}}
                  onPress={() => {
                    setBroker(10);
                    setMultiplier(1);
                    setShowDeployModal(false);
                  }}>
                  <View
                    style={[
                      tw('rounded-md mt-3 border '),
                      {
                        backgroundColor: Colors.primary3,
                        borderColor: Colors.yellow,
                      },
                    ]}>
                    <Text style={[tw('py-3 text-center'), styles.iconLabel]}>
                      Clear
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{width: '45%'}}
                  onPress={handleDeployment}>
                  <Button title="Deploy" />
                </TouchableOpacity>
              </View>
              <View style={{height: 100}} />
            </ScrollView>
          </LinearGradient>
        </Modal>
      </View>
      {renderLoader()}
    </SafeAreaView>
  );
};

export default QuantDetails;

const styles = StyleSheet.create({
  containerLoader: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.eerie,

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
  header: {color: Colors.white, fontSize: 20, lineHeight: 28},
  detailsHeader: {fontSize: 18, lineHeight: 25, color: Colors.white},
  name: {fontSize: 14, lineHeight: 19, color: Colors.white},
  price: {fontSize: 22, lineHeight: 29, color: Colors.primary},
  iconLabel: {fontSize: 16, lineHeight: 18, color: Colors.white},
  card: {backgroundColor: Colors.lightBlack},
  iconText: {color: Colors.text2, marginTop: 5},
  deployButton: {backgroundColor: Colors.primary3},
  return: {fontSize: 14, lineHeight: 19, color: Colors.text},
  data: {fontSize: 18, lineHeight: 24, color: Colors.white},
  errorText: {fontSize: 20, lineHeight: 27, color: Colors.white},
  list: {color: Colors.basegray, fontSize: 14, lineHeight: 19},
  list2: {color: Colors.primary},
  description: {fontSize: 14, lineHeight: 25, color: Colors.orange},
  description2: {fontSize: 14, lineHeight: 25, color: Colors.basegray},
  hr: {height: 1, backgroundColor: Colors.basegray, marginTop: 15},
  stockCard: {
    fontSize: 18,
    lineHeight: 25,
    backgroundColor: Colors.black2,
    color: Colors.white,
  },
  stockCardLogo: {backgroundColor: Colors.white, borderRadius: 10},
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
    borderRadius: 6,
  },
});
