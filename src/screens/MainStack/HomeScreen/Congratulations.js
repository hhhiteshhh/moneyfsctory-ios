import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../../../assets/colors';
import CongratulationsImage from '../../../assets/images/congratulations.svg';
import MyStatusBar from '../../../components/MyStatusBar';
import Header from '../../../components/Header';
const Congratulations = ({navigation, orders}) => {
  const tw = useTailwind();
  const goBackToHome = () => {
    navigation.navigate('Home');
  };
  const navigateToNotifications = () => {
    navigation.navigate('Notifications');
  };
  return (
    <SafeAreaView style={[tw('h-full w-full px-5'), styles.container]}>
      <View style={[tw('h-full '), styles.container]}>
        <MyStatusBar padding={0} />
        <View style={[tw('my-3'), {}]}>
          <Header title={'Virtual Portfolio'} back={false} />
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <View style={[tw('mt-6 px-5 flex items-center justify-center'), {}]}>
            <CongratulationsImage />
            <Text
              style={[
                tw('font-extrabold mt-12 text-center px-12'),
                {fontSize: 20, lineHeight: 32, color: Colors.primary},
              ]}>
              CONGRATULATION! YOUR QUANTS DEPLOY SUCCESSFULLY
            </Text>
            <Text
              style={[
                tw('mt-3 text-center px-12'),
                {fontSize: 16, lineHeight: 25, color: Colors.white},
              ]}>
              AI-powered investment strategies to maximise your profits and help
              you find the right opportunities up to 10 cr.
            </Text>
            <View
              style={[
                tw('flex items-center justify-center flex-row mt-5 mx-auto'),
              ]}>
              <TouchableOpacity
                style={[
                  tw('w-28 mr-2 rounded-md'),
                  {borderWidth: 1, borderColor: Colors.primary},
                ]}
                onPress={goBackToHome}>
                <View>
                  <Text style={[tw('text-center py-2'), {color: Colors.white}]}>
                    Home
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  tw('w-28 rounded-md'),
                  {
                    borderWidth: 1,
                    borderColor: Colors.primary,
                    backgroundColor: Colors.primary,
                  },
                ]}>
                <View>
                  <Text style={[tw('text-center py-2'), {color: Colors.white}]}>
                    Get Started
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{height: 20}} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Congratulations;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.eerie,
  },
  header: {color: Colors.white, fontSize: 20, lineHeight: 28},
  subHeader: {color: Colors.white, fontSize: 18, lineHeight: 25},
});
