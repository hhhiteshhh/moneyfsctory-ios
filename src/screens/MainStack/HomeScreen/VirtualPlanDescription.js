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
import Image1 from '../../../assets/images/5.svg';
import Image2 from '../../../assets/images/6.svg';
import Image3 from '../../../assets/images/3.svg';
import Image4 from '../../../assets/images/7.svg';
import MyStatusBar from '../../../components/MyStatusBar';
import {useNavigation} from '@react-navigation/native';

const VirtualInvestor = () => {
  const tw = useTailwind();
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };

  const navigateToVirtualPortFolio = () => {
    // navigation.navigate('VirtualPortFolio');
    navigation.navigate('Home', {screen: 'VirtualPortFolio'});
  };

  return (
    <SafeAreaView style={[tw('h-full w-full relative'), styles.container]}>
      <View style={[tw('h-full px-5 relative'), styles.container]}>
        <MyStatusBar padding={0} />
        <View style={[tw('mt-3 flex flex-row items-center')]}>
          <TouchableOpacity onPress={goBack}>
            <BackIcon />
          </TouchableOpacity>
          <Text style={[tw('font-bold'), styles.header]}>Virtual Investor</Text>
        </View>
        <ScrollView
          style={[tw('mt-5')]}
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
            Become an investing pro before you even put in a single rupee with
            our Virtual Investor mode.
          </Text>
          <View style={[tw('items-center justify-center mt-5')]}>
            <Image1 />
          </View>
          <Text
            style={[
              tw('text-center px-5 mt-5 font-bold'),
              {fontSize: 16, lineHeight: 24, color: Colors.yellow},
            ]}>
            Select your portfolio value
          </Text>
          <Text
            style={[
              tw('text-center  px-7 font-medium'),
              {fontSize: 16, lineHeight: 24, color: Colors.white},
            ]}>
            How much would you like to invest based on your goals, risk
            appetite, and current capacity.
          </Text>

          <View style={[tw('items-center justify-center mt-5')]}>
            <Image2 />
          </View>
          <Text
            style={[
              tw('text-center px-5 mt-5 font-bold'),
              {fontSize: 16, lineHeight: 24, color: Colors.yellow},
            ]}>
            Choose your quant
          </Text>
          <Text
            style={[
              tw('text-center  px-7 font-medium'),
              {fontSize: 16, lineHeight: 24, color: Colors.white},
            ]}>
            A quant is a portfolio of high-performing stocks, chosen by our
            AI-powered algorithm.
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
            Choose a stock from the quant and deploy your a set virtual amount
            you would like to invest in it.
          </Text>

          <View style={[tw('items-center justify-center mt-5')]}>
            <Image4 />
          </View>
          <Text
            style={[
              tw('text-center px-5 mt-5 font-bold'),
              {fontSize: 16, lineHeight: 24, color: Colors.yellow},
            ]}>
            Get updates and alerts
          </Text>
          <Text
            style={[
              tw('text-center  px-7 font-medium'),
              {fontSize: 16, lineHeight: 24, color: Colors.white},
            ]}>
            Once deployed MoneyFactory will share alerts on price drops and
            increases, prompting you to sell/buy at just the right time.
          </Text>
          <View style={{height: 100}} />
        </ScrollView>
        <TouchableOpacity
          // activeOpacity={1}
          style={[tw('mt-3 text-center absolute w-full bottom-0 left-5 z-50')]}
          onPress={navigateToVirtualPortFolio}>
          <Button title="Get Started" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default VirtualInvestor;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.eerie,
  },
  header: {color: Colors.white, fontSize: 24, lineHeight: 33, marginLeft: 20},
});
