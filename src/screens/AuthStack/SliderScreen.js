import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import first from '../../assets/images/on_bording_1.jpg';
import second from '../../assets/images/on_bording_2.jpg';
import third from '../../assets/images/on_bording_3.jpg';
import ArrowRight from '../../assets/icons/right.svg';
import ArrowLeft from '../../assets/icons/left.svg';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../../assets/colors';
import MyStatusBar from '../../components/MyStatusBar';
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
export default function SliderScreen() {
  const navigation = useNavigation();
  const tw = useTailwind();
  const [index, setIndex] = useState(0);
  const setUserAsOld = async () => {
    try {
      await AsyncStorage.setItem('oldUser', 'true');
      navigation.replace('SignIn');
    } catch (e) {
      // saving error
    }
  };
  const setImage = id => {
    if (id === 2) {
      setUserAsOld();
    } else {
      setIndex(id + 1);
    }
  };
  const setImageBack = id => {
    setIndex(id - 1);
  };
  return (
    <SafeAreaView style={[tw('flex h-full'), {backgroundColor: Colors.eerie}]}>
      <MyStatusBar />
      {index === 0 && (
        <>
          <Image style={styles.image} source={first} />
          <Text style={[tw('font-bold px-5 mt-5'), styles.text]}>
            Ready to 10x your chances of making a profit?
          </Text>
        </>
      )}
      {index === 1 && (
        <>
          <Image style={styles.image} source={second} />
          <Text style={[tw('font-bold px-5 mt-5'), styles.text]}>
            Welcome to MoneyFactory! Let's start your journey of building
            exponential wealth.
          </Text>
        </>
      )}
      {index === 2 && (
        <>
          <Image style={styles.image} source={third} />
          <Text style={[tw('font-bold px-5 mt-5'), styles.text]}>
            Where can I get some?
          </Text>
        </>
      )}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={setUserAsOld}>
          <Text style={[tw('font-bold ml-5'), styles.skip]}>Skip</Text>
        </TouchableOpacity>
        <View style={[tw('flex flex-row')]}>
          {index !== 0 && (
            <TouchableOpacity
              onPress={() => {
                setImageBack(index);
              }}>
              <View
                style={[
                  tw('rounded-md flex items-center justify-center mr-5'),
                  styles.back,
                ]}>
                <ArrowLeft />
              </View>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              setImage(index);
            }}>
            <View
              style={[
                tw('rounded-md flex items-center justify-center mr-5'),
                styles.next,
              ]}>
              <ArrowRight />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  image: {height: '75%', width: windowWidth},
  text: {
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
    color: Colors.primary,
    fontSize: 16,
    lineHeight: 24,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 20,
    width: windowWidth,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 10,
    paddingRight: 10,
  },
  skip: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.yellow,
  },
  next: {width: 30, height: 30, backgroundColor: Colors.primary},
  back: {width: 30, height: 30, backgroundColor: Colors.primary2},
});
