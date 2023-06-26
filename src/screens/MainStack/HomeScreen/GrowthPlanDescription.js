import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../../../assets/colors';
import BackIcon from '../../../assets/icons/back.svg';
import Button from '../../../components/Button';
import Image1 from '../../../assets/images/1.svg';
import Image2 from '../../../assets/images/2.svg';
import Image3 from '../../../assets/images/3.svg';
import Image4 from '../../../assets/images/4.svg';
import MyStatusBar from '../../../components/MyStatusBar';
import {useNavigation} from '@react-navigation/native';
import Header from '../../../components/Header';
const GrowthPlanDescription = () => {
  const tw = useTailwind();
  const navigation = useNavigation();
  const navigateToDiscover = () => {
    navigation.navigate('Home', {screen: 'GrowthPlan'});
  };

  return (
    <SafeAreaView style={[tw('h-full w-full relative'), styles.container]}>
      <View style={[tw('h-full relative'), styles.container]}>
        <MyStatusBar padding={0} />
        <View style={[tw('mb-3'), {}]}>
          <Header title={`Growth Plan`} back={true} />
        </View>
        <ScrollView
          style={[tw('mt-5 px-5')]}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <Text
            style={[
              tw('text-center font-extrabold'),
              {fontSize: 20, lineHeight: 28, color: Colors.primary},
            ]}>
            How it works?{' '}
          </Text>
          <Text
            style={[
              tw('text-center mt-2'),
              {fontSize: 14, lineHeight: 24, color: Colors.white},
            ]}>
            Investing isn't just for big budgets. With our Starter Plan you can
            start with as little as Rs 100 per day.{'\n'}
            {'\n'}
            Put your money in high-performing quants and safely switch from one
            to the other with the least possible risk.
          </Text>
          <View style={[tw('items-center justify-center mt-5')]}>
            <Image1 />
          </View>
          <Text
            style={[
              tw('text-center px-5 mt-5 font-bold'),
              {fontSize: 16, lineHeight: 24, color: Colors.yellow},
            ]}>
            Link your brokerage account
          </Text>
          <Text
            style={[
              tw('text-center  px-7 font-medium'),
              {fontSize: 16, lineHeight: 24, color: Colors.white},
            ]}>
            MoneyFactory doesn't own or keep any of your money, we just help
            facilitate the right transactions.
          </Text>

          <View style={[tw('items-center justify-center mt-5')]}>
            <Image2 />
          </View>
          <Text
            style={[
              tw('text-center px-5 mt-5 font-bold'),
              {fontSize: 16, lineHeight: 24, color: Colors.yellow},
            ]}>
            Subscribe to a quant
          </Text>
          <Text
            style={[
              tw('text-center  px-7 font-medium'),
              {fontSize: 16, lineHeight: 24, color: Colors.white},
            ]}>
            Select a quant based on your investing preferences and subscribe to
            it.
          </Text>

          <View style={[tw('items-center justify-center mt-5')]}>
            <Image3 />
          </View>
          <Text
            style={[
              tw('text-center px-5 mt-5 font-bold'),
              {fontSize: 16, lineHeight: 24, color: Colors.yellow},
            ]}>
            Select your stocks
          </Text>
          <Text
            style={[
              tw('text-center  px-7 font-medium'),
              {fontSize: 16, lineHeight: 24, color: Colors.white},
            ]}>
            Choose a stock from the quant and then add your first Rs 100 to
            subscribe.
          </Text>

          <View style={[tw('items-center justify-center mt-5')]}>
            <Image4 />
          </View>
          <Text
            style={[
              tw('text-center px-5 mt-5 font-bold'),
              {fontSize: 16, lineHeight: 24, color: Colors.yellow},
            ]}>
            Watch your money grow
          </Text>
          <Text
            style={[
              tw('text-center  px-7 font-medium'),
              {fontSize: 16, lineHeight: 24, color: Colors.white},
            ]}>
            Let MoneyFactory send you regular updates on when to buy and sell
            your stocks.
          </Text>
          <View style={{height: 100}} />
        </ScrollView>
        <TouchableOpacity
          // activeOpacity={1}
          style={[tw('mt-3 text-center absolute w-full bottom-0 left-5 z-50')]}
          onPress={navigateToDiscover}>
          <Button title="Get Started" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GrowthPlanDescription;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.eerie,
  },
  header: {color: Colors.white, fontSize: 24, lineHeight: 33, marginLeft: 20},
});
