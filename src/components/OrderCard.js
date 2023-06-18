import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, {useState} from 'react';
import OrderUp from '../assets/icons/order_up.svg';
import OrderDown from '../assets/icons/order_down.svg';
import Logo from '../assets/images/logo.svg';
import {Colors} from '../assets/colors';
import {useTailwind} from 'tailwind-rn';
import 'intl';
import 'intl/locale-data/jsonp/en';

const Order = ({data, index}) => {
  var price = data?.order_details?.price ? data?.order_details?.price : 0;
  var qty = data?.qty ? data?.qty : 0;
  var value = price * qty;
  const tw = useTailwind();
  const [open, setOpen] = useState([]);
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

  return (
    <View style={[tw('p-4 mt-3 rounded-xl'), styles.card]}>
      <View
        style={[tw('flex flex-row items-center justify-between'), styles.hr]}>
        <View style={tw('flex flex-row items-center mb-3')}>
          <View
            style={[
              tw('rounded-md justify-center items-center flex'),
              styles.logo,
            ]}>
            <Logo />
          </View>
          <Text style={[tw('font-semibold ml-3'), styles.title]}>
            {data.symbol}
          </Text>
        </View>
        <View style={tw('flex flex-row items-center')}>
          <View
            style={[
              tw('w-16 mr-5'),
              {
                backgroundColor:
                  data.order_details.transactiontype === 'SELL'
                    ? Colors.bgcolor3
                    : Colors.ellipses,
                borderRadius: 13,
              },
            ]}>
            <Text
              style={{
                color:
                  data.order_details.transactiontype === 'SELL'
                    ? Colors.red
                    : Colors.primary,
                textAlign: 'center',
                paddingVertical: 3,
              }}>
              {data.order_details.transactiontype === 'SELL' ? 'Exit' : 'Entry'}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => {
              handleShowDetails(index);
            }}>
            {open.indexOf(index) !== -1 ? <OrderUp /> : <OrderDown />}
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={[tw('flex flex-row items-center justify-between w-[70%] mt-2')]}>
        <View>
          <View>
            <Text style={styles.header}>Order ID</Text>
            <Text style={[tw('mt-1 font-extrabold'), styles.value]}>
              {data._id}
            </Text>
          </View>
          {open.indexOf(index) !== -1 && (
            <>
              <View style={[tw('mt-3'), {}]}>
                <Text style={styles.header}>Time</Text>
                <Text style={[tw('mt-1 font-extrabold'), styles.value]}>
                  {data.createDate}
                </Text>
              </View>
              <View style={[tw('mt-3'), {}]}>
                <Text style={styles.header}>Quantity</Text>
                <Text style={[tw('mt-1 font-extrabold'), styles.value]}>
                  {data.order_details.transactiontype === 'SELL'
                    ? `- ${data.qty}`
                    : data.qty}
                </Text>
              </View>
            </>
          )}
        </View>
        <View style={[tw('ml-3')]}>
          <View>
            <Text style={styles.header}>Date</Text>
            <Text style={[tw('mt-1 font-extrabold'), styles.value]}>
              {data?.createDate?.slice(0, 10)}
            </Text>
          </View>
          {open.indexOf(index) !== -1 && (
            <>
              <View style={[tw('mt-3'), {}]}>
                <Text style={styles.header}>Value</Text>
                <Text style={[tw('mt-1 font-extrabold'), styles.value]}>
                  {data?.order_details.transactiontype === 'SELL'
                    ? `- ${formatter.format(value)}`
                    : `${formatter.format(value)}`}
                </Text>
              </View>
              <View style={[tw('mt-3'), {}]}>
                <Text style={styles.header}>Price</Text>
                <Text style={[tw('mt-1 font-extrabold'), styles.value]}>
                  {/* {formatter.format(data.orderPrice)} */}
                  {price === 'undefined'
                    ? formatter.format(0)
                    : formatter.format(price)}
                </Text>
              </View>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  logo: {backgroundColor: Colors.black, width: 60, height: 60},
  card: {
    borderWidth: 0.5,
    borderColor: Colors.bgcolor1,
    backgroundColor: Colors.lightBlack,
    borderBottomWidth: 0,
  },
  title: {fontSize: 14, lineHeight: 18, color: Colors.white},
  hr: {borderBottomWidth: 1, borderBottomColor: Colors.basegray2},
  header: {fontSize: 14, lineHeight: 24, color: Colors.dullwhite},
  value: {fontSize: 16, lineHeight: 22, color: Colors.white},
});
