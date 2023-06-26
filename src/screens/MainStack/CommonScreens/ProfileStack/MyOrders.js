import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../../../../assets/colors';
import OrderCard from '../../../../components/OrderCard';
import GetApi from '../../../../hooks/GetApi';
import apis from '../../../../consts/apis';
import MyStatusBar from '../../../../components/MyStatusBar';
import {useRecoilValue} from 'recoil';
import {userDataAtom} from '../../../../atoms/userDataAtom';
const windowHeight = Dimensions.get('window').height;

const MyOrders = () => {
  const tw = useTailwind();
  const user = useRecoilValue(userDataAtom);

  const [orders, setOrders] = useState([]);

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
  async function fetchMyOrders() {
    setLoading(true);
    let result = await GetApi(`${apis.orders}/${user?.id}`);
    if (result.status === 200) {
      setOrders(result.data);
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchMyOrders();
  }, []);

  return (
    <SafeAreaView style={[tw('h-full w-full'), styles.container]}>
      <View style={[tw('h-full'), styles.container]}>
        <MyStatusBar padding={20} />
        <View style={[tw('mb-3'), {}]}>
          <Header title={`My Order Book`} back={true} />
        </View>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={[tw('px-5')]}>
          <Text style={[tw('font-medium mt-3'), styles.subheader]}>
            Order History
          </Text>
          {orders.map((order, index) => {
            return <OrderCard data={order} key={index} index={index} />;
          })}
          <View style={{height: 100}} />
        </ScrollView>
      </View>
      {renderLoader()}
    </SafeAreaView>
  );
};

export default MyOrders;

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
  container: {
    backgroundColor: Colors.eerie,
  },
  header: {color: Colors.white, fontSize: 20, lineHeight: 28},
  subheader: {color: Colors.dullwhite, fontSize: 15, lineHeight: 18},
});
