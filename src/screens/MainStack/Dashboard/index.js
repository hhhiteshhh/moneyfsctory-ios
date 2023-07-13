import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import Header from '../../../components/Header';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../../../assets/colors';
import MyStatusBar from '../../../components/MyStatusBar';
import {useRecoilState, useRecoilValue} from 'recoil';
import {userDataAtom} from '../../../atoms/userDataAtom';
import 'intl';
import 'intl/locale-data/jsonp/en';
import GetApi from '../../../hooks/GetApi';
import apis from '../../../consts/apis';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {SvgUri} from 'react-native-svg';
import {MONEY_FACTORY_IMAGE} from '../../../consts/apis';
import MyQuantCardForDashboard from '../../../components/MyQuantCardForDashboard';
import {useNavigation} from '@react-navigation/native';
import Modal from 'react-native-modal';
import Close from '../../../assets/icons/close.svg';
import ViewDetails from '../../../assets/icons/view.svg';
import LinearGradient from 'react-native-linear-gradient';
import Play from '../../../assets/icons/play.svg';
import Pause from '../../../assets/icons/pause.svg';
import ExitAll from '../../../assets/icons/exitAll.svg';
import Exit from '../../../assets/icons/exit.svg';
import {trendingQuantsAtom} from '../../../atoms/trendingQuantsAtom';
import OpenOrderCard from '../../../components/OpenOrderCard';

const windowHeight = Dimensions.get('window').height;

const Dashboard = () => {
  const tw = useTailwind();
  const user = useRecoilValue(userDataAtom);
  const navigation = useNavigation();
  const [holding, setHolding] = useState({});
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [quants, setQuants] = useState([]);
  const [quantSelected, setQuantSelected] = useState();
  const [detailsModal, setDetailsModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [trendingQuants, setTrendingQuants] =
    useRecoilState(trendingQuantsAtom);
  const navigateToMyQuantDetails = () => {
    setDetailsModal(false);
    setTimeout(() => {
      navigation.navigate('MyQuantDetails', {data: quantSelected});
    }, 170);
  };
  const onError = e => {
    setLoading(false);
  };
  const onLoad = () => {
    setLoading(false);
  };
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchHoldings();
    fetchMyQuants();
    fetchTrendingQuants();
  }, []);

  var formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  });
  async function fetchHoldings() {
    setLoading(true);
    try {
      let result = await GetApi(`${apis.holding}/${user?.id}`);
      if (result.status === 200) {
        setHolding(result.data);
        setLoading(false);
        setRefreshing(false);
      } else {
        setLoading(false);
        setRefreshing(false);
      }
    } catch (error) {
      setLoading(false);
      setRefreshing(false);
      alert('Server Error');
    }
  }

  async function fetchMyQuants() {
    setLoading(true);
    let result = await GetApi(`${apis.myQuants}/${user?.id}`);
    if (result.status === 200) {
      setQuants(result.data);
      // setLoading(false);
    }
  }
  async function fetchTrendingQuants() {
    setLoading(true);
    let result = await GetApi(`${apis.trendingQuants}`);
    let quants = await GetApi(apis.quants);
    if (result.status === 200)
      if (quants.status === 200) {
        // setTrendingQuants(result.data);
        let temp = [];
        result.data.map(trendingQuant => {
          quants.data.map(quant => {
            if (quant._id === trendingQuant._id) {
              temp.push(quant);
            }
          });
        });
        setTrendingQuants(temp);
        setLoading(false);
      } else {
        setLoading(false);
      }
    else {
      setLoading(false);
    }
  }
  async function fetchorders() {
    let result = await GetApi(`${apis.openOrders}/${user?.id}`);
    if (result.status === 200) {
      setOrders(result.data);
    }
  }

  useEffect(() => {
    fetchMyQuants();
    fetchHoldings();
    fetchorders();
    if (trendingQuants?.length > 0) {
    } else {
      fetchTrendingQuants();
    }
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

  return (
    <SafeAreaView style={[tw('h-full w-full'), styles.container]}>
      <MyStatusBar padding={20} />
      <View style={[tw('mb-3')]}>
        <Header title={`Hello ${user.name.split(' ')[0]}!`} back={false} />
      </View>
      <ScrollView
        style={[tw('h-full'), styles.container]}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Colors.primary}
          />
        }>
        <View style={[tw('flex items-start px-5 justify-between')]}>
          <Text
            style={[
              tw('font-medium mb-2'),
              {...styles.card2Subtitle, color: Colors.primary},
            ]}>
            Capital
          </Text>
          <Text
            style={[
              tw('font-medium mb-2'),
              {...styles.card1Referral, color: Colors.white},
            ]}>
            {formatter.format(
              holding?.totalInvestment ? holding?.totalInvestment : 0,
            )}
          </Text>
        </View>
        <View
          style={[tw('flex flex-row items-center px-5 justify-between'), {}]}>
          <View
            style={[
              tw('w-[48%] flex flex-row items-center justify-center'),
              {backgroundColor: Colors.bgcolor1, borderRadius: 6},
            ]}>
            <View style={[tw('p-4')]}>
              <Text
                style={[
                  tw('font-medium'),
                  {...styles.card1Text, color: Colors.white},
                ]}>
                Invested
              </Text>
              <Text
                style={[
                  tw('font-medium text-center'),
                  {
                    ...styles.card1Referral,
                    color: Colors.white,
                    fontSize: 16,
                  },
                ]}>
                {formatter.format(
                  holding?.currentInvestment ? holding?.currentInvestment : 0,
                )}
              </Text>
            </View>
          </View>
          <View
            style={[
              tw('w-[48%] flex flex-row items-center justify-center'),
              {backgroundColor: Colors.bgcolor1, borderRadius: 6},
            ]}>
            <View style={[tw('p-4')]}>
              <Text
                style={[
                  tw('font-medium'),
                  {...styles.card1Text, color: Colors.white},
                ]}>
                Today Profit
              </Text>
              <Text
                style={[
                  tw('font-medium text-center'),
                  {
                    ...styles.card1Referral,
                    color: Colors.primary,
                    fontSize: 16,
                  },
                ]}>
                {formatter.format(
                  holding?.currentPnL ? holding?.currentPnL : 0,
                )}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={[tw('flex mt-5 px-5 flex-row items-center justify-between')]}>
          <Text style={[tw('font-bold mb-2'), styles.subheader]}>
            Active Quants
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MyQuants');
            }}>
            <Text
              style={[
                tw('font-bold mb-2'),
                {fontSize: 16, lineHeight: 22, color: Colors.yellow},
              ]}>
              View All
            </Text>
          </TouchableOpacity>
        </View>

        {loading && quants?.length <= 0 && (
          <SkeletonPlaceholder.Item flexDirection="column" alignItems="center">
            <View style={[tw('flex px-5 w-full')]}>
              <View
                style={[
                  tw(
                    'flex flex-row items-center justify-between w-full h-[85px] rounded-md p-3 my-1',
                  ),
                  {
                    backgroundColor: Colors.bgcolor1,
                    marginBottom: 4,
                    marginTop: 4,
                  },
                ]}></View>
              <View
                style={[
                  tw(
                    'flex flex-row items-center justify-between w-full h-[85px] rounded-md p-3 my-1',
                  ),
                  {
                    backgroundColor: Colors.bgcolor1,
                    marginBottom: 4,
                    marginTop: 4,
                  },
                ]}></View>
              <View
                style={[
                  tw(
                    'flex flex-row items-center justify-between w-full h-[85px] rounded-md p-3 my-1',
                  ),
                  {
                    backgroundColor: Colors.bgcolor1,
                    // marginBottom: 4,
                    marginTop: 4,
                  },
                ]}></View>
            </View>
          </SkeletonPlaceholder.Item>
        )}
        {quants?.activeQuants?.slice(0, 3)?.map((ele, index) => (
          <MyQuantCardForDashboard
            key={index}
            ele={ele}
            setQuantSelected={setQuantSelected}
            setDetailsModal={setDetailsModal}
          />
        ))}
        {!loading && quants?.length <= 0 && (
          <View>
            <Text style={[tw('font-bold mb-2'), styles.subheader]}>
              No Active Quant
            </Text>
          </View>
        )}

        <View style={tw('mt-5 px-5')}>
          <View style={[tw('flex flex-row items-center justify-between')]}>
            <Text style={[tw('font-bold mb-2'), styles.subheader]}>
              Trending Quants
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            {loading && trendingQuants?.length <= 0 && (
              <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('QuantDetails', {data: quant});
                  }}
                  style={[
                    tw('flex items-center justify-center'),
                    {
                      backgroundColor: Colors.bgcolor1,
                      width: 130,
                      height: 126,
                      borderRadius: 6,
                      marginRight: 10,
                    },
                  ]}></TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('QuantDetails', {data: quant});
                  }}
                  style={[
                    tw('flex items-center justify-center'),
                    {
                      backgroundColor: Colors.bgcolor1,
                      width: 130,
                      height: 126,
                      borderRadius: 6,
                      marginRight: 10,
                    },
                  ]}></TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('QuantDetails', {data: quant});
                  }}
                  style={[
                    tw('flex items-center justify-center'),
                    {
                      backgroundColor: Colors.bgcolor1,
                      width: 130,
                      height: 126,
                      borderRadius: 6,
                      marginRight: 10,
                    },
                  ]}></TouchableOpacity>
              </SkeletonPlaceholder.Item>
            )}
            {trendingQuants?.map((quant, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate('QuantDetails', {data: quant});
                }}
                style={[
                  tw('flex items-center justify-center'),
                  {
                    backgroundColor: Colors.bgcolor1,
                    width: 130,
                    height: 126,
                    borderRadius: 6,
                    marginRight: 10,
                  },
                ]}>
                <View style={[tw('h-16 w-16 items-center justify-center')]}>
                  <SvgUri
                    width="100%"
                    height="100%"
                    uri={`${MONEY_FACTORY_IMAGE}/${quant?.imgUrl}`}
                    onError={onError}
                    onLoad={onLoad}
                  />
                  {loading && (
                    <ActivityIndicator size="large" color={Colors.primary} />
                  )}
                </View>
                <Text style={[tw('font-bold'), styles.header]}>
                  {quant?.name}
                </Text>
                <Text
                  style={[
                    tw('font-semibold'),
                    {
                      fontSize: 16,
                      lineHeight: 22,
                      color: Colors.primary,
                    },
                  ]}>
                  ₹{quant.price}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={tw('mt-5 px-5')}>
          <View style={[tw('flex flex-row items-center justify-between')]}>
            <Text style={[tw('font-bold mb-2'), styles.subheader]}>
              Open Orders
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Notifications');
              }}>
              <Text
                style={[
                  tw('font-bold mb-2'),
                  {fontSize: 16, lineHeight: 22, color: Colors.yellow},
                ]}>
                View All
              </Text>
            </TouchableOpacity>
          </View>
          {!loading && orders?.data?.length <= 0 && (
            <View>
              <Text style={[tw('font-bold mb-2'), styles.subheader]}>
                No Open Order
              </Text>
            </View>
          )}
          {orders?.data?.length > 0 && (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}>
              {orders?.data?.map((order, index) => {
                if (index < 5) {
                  return (
                    <OpenOrderCard key={index} data={order} userData={user} />
                  );
                }
              })}
            </ScrollView>
          )}
        </View>

        <Modal
          isVisible={detailsModal}
          style={styles.modal}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          animationInTiming={500}
          animationOutTiming={500}
          onBackdropPress={() => {
            setDetailsModal(false);
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1.5, y: 0}}
            style={{borderRadius: 6, height: 280}}
            colors={[Colors.card1, Colors.card2]}>
            <View>
              <View style={[tw('flex flex-row justify-between py-3 px-5')]}>
                <View
                  style={[tw('flex flex-row justify-center items-center'), {}]}>
                  <View style={[tw('h-16 w-16 items-center justify-center')]}>
                    <SvgUri
                      width="100%"
                      height="100%"
                      uri={`${MONEY_FACTORY_IMAGE}/${quantSelected?.quant?.quant?.imgUrl}`}
                      onError={onError}
                      onLoad={onLoad}
                    />
                    {loading && (
                      <ActivityIndicator size="large" color={Colors.primary} />
                    )}
                  </View>
                  <View style={(tw(''), {marginLeft: 20})}>
                    <Text style={[tw('font-bold'), styles.iconSubText]}>
                      {quantSelected?.quant?.quant?.name}
                    </Text>
                    <Text style={[tw('font-bold'), styles.modalSubText]}>
                      {quantSelected?.quant?.quant?.status}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setDetailsModal(false);
                  }}>
                  <Close />
                </TouchableOpacity>
              </View>
              {/* <View
                style={[
                  tw(
                    'flex flex-row items-center px-5 justify-between px-5 py-3',
                  ),
                ]}>
                <View style={tw('flex items-center')}>
                  <Play />
                  <Text style={styles.iconText2}>Start</Text>
                </View>
                <View style={tw('flex items-center')}>
                  <Pause />
                  <Text style={styles.iconText2}>Pause</Text>
                </View>
                <View style={tw('flex items-center')}>
                  <ExitAll />
                  <Text style={styles.iconText2}>Exit All</Text>
                </View>
                <View style={tw('flex items-center')}>
                  <Exit />
                  <Text style={styles.iconText2}>Exit Selected</Text>
                </View>
              </View> */}
              <View style={styles.hr} />
              <TouchableOpacity
                onPress={navigateToMyQuantDetails}
                style={[
                  tw('py-3 flex flex-row items-center px-5 justify-between'),
                ]}>
                <Text style={[tw('font-bold'), styles.iconSubText]}>
                  View More Details
                </Text>
                <ViewDetails />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Modal>
        <View style={{height: 50}} />
      </ScrollView>
      {renderLoader()}
    </SafeAreaView>
  );
};

export default Dashboard;

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
  subheader: {color: Colors.white, fontSize: 18, lineHeight: 24},
  logo: {backgroundColor: Colors.lightBlack, width: 60, height: 60},
  activeButton: {backgroundColor: Colors.primary},
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
    borderRadius: 6,
  },
  iconSubText: {color: Colors.white, fontSize: 16, lineHeight: 21},
  modalSubText: {color: Colors.primary, fontSize: 20, lineHeight: 27},
  hr: {height: 1, backgroundColor: Colors.basegray2, marginTop: 10},
  iconText2: {color: Colors.text2, marginTop: 5},
  card2Subtitle: {fontSize: 14, lineHeight: 21, color: Colors.white},
  card1Referral: {fontSize: 24, lineHeight: 32, color: Colors.yellow},
  card1Text: {fontSize: 18, lineHeight: 22, color: Colors.white},
  header: {color: Colors.white, fontSize: 20, lineHeight: 28},
});
