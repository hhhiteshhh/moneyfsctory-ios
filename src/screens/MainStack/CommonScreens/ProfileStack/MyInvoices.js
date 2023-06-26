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
import InvoiceCard from '../../../../components/InvoiceCard';
import MyStatusBar from '../../../../components/MyStatusBar';
import {useRecoilValue} from 'recoil';
import {userDataAtom} from '../../../../atoms/userDataAtom';
import GetApi from '../../../../hooks/GetApi';
import apis from '../../../../consts/apis';

const windowHeight = Dimensions.get('window').height;

const MyInvoices = () => {
  const user = useRecoilValue(userDataAtom);
  const tw = useTailwind();

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

  useEffect(() => {
    fetchCash();
  }, [user.id]);
  async function fetchCash() {
    setLoading(true);
    let result = await GetApi(`${apis.invoices}/${user.data.email}`);
    if (result.status === 200) {
      setTransactions(result.data);
      setLoading(false);
    }
  }

  const [transactions, setTransactions] = useState([]);

  return (
    <SafeAreaView style={[tw('h-full w-full'), styles.container]}>
      <View style={[tw('h-full px-5'), styles.container]}>
        <MyStatusBar padding={20} />
        <View style={[tw('mb-3'), {}]}>
          <Header title={`My Invoices`} back={true} />
        </View>

        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={[tw('px-5')]}>
          <Text style={[tw('font-medium mt-3'), styles.subheader]}>
            Payment Settings
          </Text>
          {transactions.map((invoice, index) => {
            return <InvoiceCard data={invoice} key={index} />;
          })}
          <View style={{height: 100}} />
        </ScrollView>
      </View>
      {renderLoader()}
    </SafeAreaView>
  );
};

export default MyInvoices;

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
