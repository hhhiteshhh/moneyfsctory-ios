import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  SafeAreaView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import BackIcon from '../../assets/icons/back.svg';
import forgotPassword from '../../assets/images/forgotPassword.png';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../../assets/colors';
import Button from '../../components/Button';
import Whatsapp from '../../assets/icons/whatsapp.svg';
import EmailVerified from '../../assets/icons/email_verified.svg';
import REGEX from '../../consts/regularExpression';
import MyStatusBar from '../../components/MyStatusBar';
import GetApi from '../../hooks/GetApi';
import apis from '../../consts/apis';
import PostApi from '../../hooks/PostApi';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default function ForgotPassword({navigation}) {
  const tw = useTailwind();
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [formValues, setFormValues] = useState({phone: '', email: ''});
  const [loading, setLoading] = useState(false);

  const goBack = () => {
    navigation.goBack();
  };
  const checkEmail = email => {
    if (email) {
      let result = REGEX.email.test(email);
      if (result) {
        return true;
      } else {
        return false;
      }
    }
  };
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

  const handleSubmit = async () => {
    if (phone) {
      try {
        let result = await GetApi(`${apis.getUserEmail}/${phone}`);
        if (result.status === 200) {
          setFormValues({phone: phone, email: result.data.user.email});
        }
      } catch (error) {
        alert(error.response.data.msg);
      }
    }
    if (email) {
      try {
        let result = await GetApi(`${apis.getUserPhone}/${email}`);
        if (result.status === 200) {
          setFormValues({phone: result.data.phone, email: email});
        }
      } catch (error) {
        alert(error.response.data.msg);
      }
    }
  };

  useEffect(() => {
    if (formValues.email && formValues.phone) {
      sendOtp();
    }
  }, [formValues]);

  const navigateToOTP = formValues => {
    navigation.navigate('OTPFP', formValues);
  };
  const sendOtp = async () => {
    try {
      setLoading(true);
      let response = await PostApi(apis.sendOTP, formValues);

      if (response.status === 200) {
        setLoading(false);
        alert('OTP sent');
        navigateToOTP(formValues);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);

      if (error.response.status === 400) {
        alert(error.response.data.message);
      } else {
        alert(error.response.data.message);
      }
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : ''}
      style={{flex: 1}}
      keyboardVerticalOffset={0}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView
          style={[tw('h-full px-5'), styles.container]}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          <SafeAreaView>
            <MyStatusBar padding={20} />
            <TouchableOpacity onPress={goBack}>
              <BackIcon style={[tw('mt-3')]} />
            </TouchableOpacity>
            <Text style={[tw('mt-3 font-bold '), styles.header]}>
              Forgot Password
            </Text>
            <Text style={[tw('mt-3 font-light'), styles.subHeader]}>
              Please enter your registered email/mobile to reset your password.{' '}
            </Text>
            <View style={tw('flex items-center justify-center')}>
              <Image
                source={forgotPassword}
                style={[tw('mt-3'), styles.image]}
                resizeMode="contain"
              />
            </View>
            <View style={tw('mt-3')}>
              <View style={styles.inputContainer}>
                <Text style={styles.prefix}>+91</Text>
                <TextInput
                  keyboardType="number-pad"
                  placeholder="Phone Number"
                  placeholderTextColor={Colors.basegray}
                  style={styles.phoneInput}
                  maxLength={10}
                  onChangeText={text => {
                    setPhone(text);
                    setPhoneError(
                      checkPhone(text) ? '' : 'Invalid Phone Number',
                    );

                    // handleMobileNumber(text);
                  }}
                  value={phone}
                />
              </View>
              <Whatsapp style={tw(`absolute top-3 right-4`)} />
              {phoneError && phone && (
                <Text style={styles.error}>{phoneError}</Text>
              )}
            </View>
            <View style={tw('mt-3')}>
              <View style={[tw('flex flex-row items-center mx-auto')]}>
                <View style={[tw('w-[30%]'), styles.hr]}></View>
                <Text style={[tw('mx-8 font-semibold'), styles.or]}>Or</Text>
                <View style={[tw('w-[30%]'), styles.hr]}></View>
              </View>
            </View>
            <View style={tw('mt-3')}>
              <TextInput
                placeholder="Email Address"
                placeholderTextColor={Colors.basegray}
                style={styles.input}
                onChangeText={text => {
                  setEmail(text);
                  setEmailError(checkEmail(text) ? '' : 'Invalid Email');
                }}
                value={email}
              />
              {email && !emailError && (
                <EmailVerified style={tw(`absolute top-3 right-4`)} />
              )}

              {emailError && email && (
                <Text style={styles.error}>{emailError}</Text>
              )}
            </View>

            <TouchableOpacity
              onPress={() => {
                // navigateToOTP();
                handleSubmit();
              }}>
              <Button title="Reset Password" />
            </TouchableOpacity>
            {renderLoader()}
          </SafeAreaView>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

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
  header: {color: Colors.white, fontSize: 24, lineHeight: 33},
  subHeader: {color: Colors.basegray, fontSize: 16, lineHeight: 22},
  image: {width: windowWidth, height: 150},
  input: {
    height: 50,
    fontSize: 14,
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 20,
    borderColor: Colors.basegray2,
    color: Colors.white,
  },
  hr: {
    borderBottomWidth: 2,
    borderColor: Colors.basegray2,
  },
  or: {fontSize: 12, lineHeight: 16, color: Colors.dullwhite},
  prefix: {
    paddingHorizontal: 10,
    fontWeight: 'bold',
    color: Colors.white,
  },
  inputContainer: {
    flex: 1,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 6,
    borderColor: Colors.basegray2,
  },
  phoneInput: {
    height: 50,
    fontSize: 14,
    color: Colors.white,
    flex: 1,
    marginRight: 40,
  },
  error: {color: 'red', fontSize: 14, marginLeft: 2, marginTop: 2},
});
