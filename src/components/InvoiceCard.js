import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import InvoiceIcon from '../assets/icons/invoice.svg';
import Rupees from '../assets/icons/rupees.svg';
import Calendar from '../assets/icons/calender.svg';
import Status from '../assets/icons/status.svg';
import Download from '../assets/icons/download.svg';
import {useTailwind} from 'tailwind-rn';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {Colors} from '../assets/colors';
const Invoice = ({data}) => {
  const tw = useTailwind();
  var formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  });
  return (
    <View>
      <View
        style={[
          tw(
            'p-4 flex flex-row items-center justify-between mt-3 rounded-xl rounded-b-none pb-6',
          ),
          styles.card,
        ]}>
        <View>
          <View style={tw('flex flex-row items-start')}>
            <View>
              <InvoiceIcon />
            </View>
            <View style={[tw('ml-3')]}>
              <Text style={[tw(''), styles.header]}>Invoice Number</Text>
              <Text style={[tw('mt-1 font-extrabold'), styles.value]}>
                {data.external_payment_id}
              </Text>
            </View>
          </View>
          <View style={tw('flex flex-row items-start mt-4')}>
            <View>
              <Rupees />
            </View>
            <View style={[tw('ml-3')]}>
              <Text style={[tw(''), styles.header]}>Invoice Amount</Text>
              <Text style={[tw('mt-1 font-extrabold'), styles.value]}>
                {formatter.format(data.amount ? data.amount : 0)}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <View style={tw('flex flex-row items-start')}>
            <View>
              <Calendar />
            </View>
            <View style={[tw('ml-3')]}>
              <Text style={[tw(''), styles.header]}>Invoice Date</Text>
              <Text style={[tw('mt-1 font-extrabold'), styles.value]}>
                {data.date.slice(0, 10)}
              </Text>
            </View>
          </View>
          <View style={tw('flex flex-row items-start mt-4')}>
            <View>
              <Status />
            </View>
            <View style={[tw('ml-3')]}>
              <Text style={[tw(''), styles.header]}>Invoice Status</Text>
              <Text style={[tw('mt-1 font-extrabold'), styles.value]}>
                {data.status}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={[
          tw('flex flex-row items-center justify-between p-4 rounded-xl -mt-3'),
          styles.download,
        ]}>
        <Text style={[tw('font-medium'), styles.value2]}>Download</Text>
        <Download />
      </TouchableOpacity>
    </View>
  );
};

export default Invoice;

const styles = StyleSheet.create({
  card: {
    borderWidth: 0.5,
    borderColor: Colors.bgcolor1,
    backgroundColor: Colors.lightBlack,
    borderBottomWidth: 0,
  },
  header: {fontSize: 12, lineHeight: 16, color: Colors.dullwhite},
  value: {fontSize: 10, lineHeight: 14, color: Colors.white},
  value2: {fontSize: 16, lineHeight: 18, color: Colors.white},
  download: {
    backgroundColor: Colors.bgcolor2,
    zIndex: 999,
    borderWidth: 0.5,
    borderColor: Colors.lightBlack,
  },
});
