import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import BackIcon from '../../assets/icons/back.svg';
import otpImage from '../../assets/images/otp.png';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../../assets/colors';
import Button from '../../components/Button';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import MyStatusBar from '../../components/MyStatusBar';
import REGEX from '../../consts/regularExpression';
import apis from '../../consts/apis';
import PostApi from '../../hooks/PostApi';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function OTPScreen({navigation, route}) {
  const tw = useTailwind();
  const params = route.params;
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const goBack = () => {
    navigation.goBack();
  };

  const [hash, setHash] = useState('');
  useEffect(() => {
    let temp2 = [];
    let temp = params.phone?.slice(0, -2);
    temp?.split('')?.map(item => {
      temp2.push('*');
    });
    setHash(temp2.join(''));
  }, [params]);
  const [OTPError, setOTPError] = useState('');
  const checkPhone = phone => {
    if (phone) {
      let result = REGEX.phone.test(phone);
      if (result) {
        return true;
      } else {
        return false;
      }
    }
  };
  const navigateToSignIn = () => {
    navigation.navigate('SignIn');
  };
  const handleOTP = async () => {
    try {
      setLoading(true);
      let response = await PostApi(apis.confirmOTP, {...params, otp: otp});
      if (response.status === 200) {
        setLoading(false);
        alert('Account created successfully!');
        navigateToSignIn();
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      alert(error.response.data.message);
    }
  };

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
    <ScrollView
      style={[tw('h-full px-5'), styles.container]}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <SafeAreaView>
        <MyStatusBar padding={20} />
        <View style={[tw('flex flex-row items-center flex-1')]}>
          <TouchableOpacity onPress={goBack}>
            <BackIcon />
          </TouchableOpacity>
          <Text style={[tw(' font-bold ml-3'), styles.header]}>
            OTP Verification
          </Text>
        </View>
        <Text style={[tw('mt-3 font-light'), styles.subHeader]}>
          We have sent the verification code to your mobile number/ Whatsapp
          number +91 {hash}
          {params.phone?.slice(-2)}
        </Text>
        <Image
          source={otpImage}
          style={[tw('mt-8'), {width: windowWidth, height: 150}]}
          resizeMode="contain"
          // resizeMethod="scale"
        />

        <OTPInputView
          style={[tw('mx-auto mt-5'), {width: '80%', height: 80}]}
          pinCount={6}
          code={otp}
          onCodeChanged={code => {
            setOtp(code);
            setOTPError(checkPhone(code) ? '' : 'Invalid OTP');
          }}
          autoFocusOnLoad={false}
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {
            setOtp(code);
            // setShowModal(false);
          }}
        />
        {OTPError && otp && <Text style={styles.error}>{OTPError}</Text>}
        <TouchableOpacity
          onPress={() => {
            handleOTP();
          }}
          disabled={otp.length !== 6 || OTPError}>
          <Button title="Submit" />
        </TouchableOpacity>
        <View
          style={[tw('flex flex-row items-center justify-center w-full py-3')]}>
          <Text
            style={{
              color: Colors.basegray,
              fontSize: 16,
              lineHeight: 22,
            }}>
            Didn't receive the code?
          </Text>
          <TouchableOpacity
          // onPress={navigateToSignUp}
          >
            <Text
              style={[
                tw('font-bold pl-2'),
                {
                  color: Colors.primary,
                  fontSize: 16,
                  lineHeight: 22,
                },
              ]}>
              Resend OTP
            </Text>
          </TouchableOpacity>
        </View>
        {renderLoader()}
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.eerie,
  },
  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 1,
  },
  underlineStyleHighLighted: {
    borderColor: Colors.primary,
  },
  header: {color: Colors.white, fontSize: 24, lineHeight: 33},
  subHeader: {color: Colors.basegray, fontSize: 16, lineHeight: 26},
  error: {color: 'red', fontSize: 14, marginLeft: 2, marginTop: 2},
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
});
