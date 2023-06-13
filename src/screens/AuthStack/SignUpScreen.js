import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import BackIcon from '../../assets/icons/back.svg';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../../assets/colors';
import Button from '../../components/Button';
import EmailVerified from '../../assets/icons/email_verified.svg';
import Whatsapp from '../../assets/icons/whatsapp.svg';
import Agreement from '../../assets/icons/agreement.svg';
import PasswordShow from '../../assets/icons/password_show.svg';
import PasswordHide from '../../assets/icons/password_hide.svg';
import REGEX from '../../consts/regularExpression';
import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import Close from '../../assets/icons/close.svg';
import MyStatusBar from '../../components/MyStatusBar';
import Info from '../../assets/icons/info.svg';
import PostApi from '../../hooks/PostApi';
import apis from '../../consts/apis';
const windowHeight = Dimensions.get('window').height;

export default function SignUp({navigation}) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [nameError, setNameError] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNameIcon, setShowNameIcon] = useState(false);
  const [showEmailIcon, setShowEmailIcon] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(true);
  const [loading, setLoading] = useState(false);

  const tw = useTailwind();

  const goBack = () => {
    navigation.goBack();
  };
  const navigateToOTP = formValues => {
    navigation.navigate('OTP', formValues);
  };
  const navigateToSignIn = () => {
    navigation.navigate('SignIn');
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
  const checkName = name => {
    if (name) {
      let result = REGEX.name.test(name);
      if (result) {
        return true;
      } else {
        return false;
      }
    }
  };

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      alert('Password Mismatch');
    } else {
      if (
        emailError ||
        nameError ||
        phoneError ||
        !email ||
        !password ||
        !phone ||
        !confirmPassword ||
        !name
      ) {
        return;
      } else {
        try {
          setLoading(true);
          let formValues = {
            email: email,
            last_name: '',
            name: name,
            password: password,
            phone: phone,
            referralCode: referralCode,
          };
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
            <View style={[tw('flex flex-row items-center flex-1')]}>
              <TouchableOpacity onPress={goBack}>
                <BackIcon />
              </TouchableOpacity>
              <Text style={[tw(' font-bold ml-3'), styles.header]}>
                Sign Up
              </Text>
            </View>
            <Text style={[tw('mt-3 font-light'), styles.subHeader]}>
              Create an account and enjoy service!
            </Text>
            <View style={tw('mt-3')}>
              <TextInput
                placeholder="Full Name"
                placeholderTextColor={Colors.basegray}
                style={styles.input}
                onChangeText={text => {
                  setNameError('');
                  setShowNameIcon(false);
                  setName(text);
                }}
                onBlur={() => {
                  setNameError(checkName(name) ? '' : 'Invalid Name');
                  setShowNameIcon(checkName(name));
                  // setShowEmaiIcon(checkEmail(email));
                }}
                value={name}
              />
              {name && !nameError && showNameIcon && (
                <EmailVerified style={tw(`absolute top-3 right-4`)} />
              )}
              {nameError && name && (
                <Text style={styles.error}>{nameError}</Text>
              )}
              <View style={tw('mt-3 relative')}>
                <View style={styles.inputContainer}>
                  <Text style={styles.prefix}>+91</Text>
                  <TextInput
                    keyboardType="number-pad"
                    placeholder="Phone Number"
                    placeholderTextColor={Colors.basegray}
                    style={styles.phoneInput}
                    maxLength={10}
                    onChangeText={text => {
                      setPhoneError('');
                      setPhone(text);
                    }}
                    onBlur={() => {
                      setPhoneError(
                        checkPhone(phone) ? '' : 'Invalid Phone Number',
                      );
                    }}
                    value={phone}
                  />
                </View>
                <Whatsapp style={tw(`absolute top-3 right-4`)} />
                {phoneError && phone && (
                  <Text style={styles.error}>{phoneError}</Text>
                )}
              </View>
              <View style={tw('relative')}>
                <TextInput
                  placeholder="Email address"
                  placeholderTextColor={Colors.basegray}
                  style={[tw('mt-3'), styles.input]}
                  onChangeText={text => {
                    setEmailError('');
                    setShowEmailIcon(false);
                    setEmail(text);
                  }}
                  onBlur={() => {
                    setEmailError(checkEmail(email) ? '' : 'Invalid Email');
                    setShowEmailIcon(checkEmail(email));
                  }}
                  value={email}
                />
                {email && !emailError && showEmailIcon && (
                  <EmailVerified style={tw(`absolute top-6 right-4`)} />
                )}
                {emailError && email && (
                  <Text style={styles.error}>{emailError}</Text>
                )}
              </View>
              <View style={tw('relative')}>
                <TextInput
                  secureTextEntry={!showPassword}
                  placeholder="Password"
                  placeholderTextColor="gray"
                  style={[tw('mt-3'), styles.input]}
                  onChangeText={text => {
                    setPassword(text);
                  }}
                  value={password}
                />
                <TouchableOpacity
                  onPress={() => {
                    setShowPassword(!showPassword);
                  }}
                  style={tw(`absolute top-6 right-4`)}>
                  {showPassword ? <PasswordHide /> : <PasswordShow />}
                </TouchableOpacity>
              </View>
              <TextInput
                secureTextEntry={!showPassword}
                placeholder="Confirm Password"
                placeholderTextColor="gray"
                style={[tw('mt-3'), styles.input]}
                onChangeText={text => {
                  setConfirmPassword(text);
                  // handleMobileNumber(text);
                }}
                value={confirmPassword}
              />

              <View style={tw('mt-3')}>
                <View style={[tw('flex flex-row items-center mx-auto')]}>
                  <View style={[tw('w-[25%]'), styles.hr]}></View>
                  <Text style={[tw('mx-4 font-semibold'), styles.or]}>
                    Have a Referral Code?
                  </Text>
                  <View style={[tw('w-[25%]'), styles.hr]}></View>
                </View>
              </View>
              <View style={tw('relative')}>
                <TextInput
                  placeholder="Referral Code"
                  placeholderTextColor="gray"
                  style={[tw('mt-3'), styles.input]}
                  onChangeText={text => {
                    setReferralCode(text);
                  }}
                  value={referralCode}
                />
                <TouchableOpacity
                  onPress={() => {}}
                  style={tw(`absolute top-6 right-4`)}>
                  <Info />
                </TouchableOpacity>
              </View>
            </View>
            <View style={tw('flex flex-row items-start mt-3')}>
              <Agreement />
              <Text style={[tw('mx-3'), styles.agreement]}>
                By clicking Agree & Join, you agree to the MoneyFactory
                <Text style={styles.links}>
                  {' '}
                  User Agreement Privacy Policy{' '}
                </Text>
                and<Text style={styles.links}> Cookie Policy.</Text>
              </Text>
            </View>
            <TouchableOpacity
              disabled={
                emailError ||
                nameError ||
                phoneError ||
                !email ||
                !password ||
                !phone ||
                !confirmPassword ||
                !name
              }
              onPress={() => {
                handleSubmit();
              }}>
              <Button title="Next" />
            </TouchableOpacity>
            <View
              style={[
                tw('flex flex-row items-center justify-center w-full py-3'),
              ]}>
              <Text style={styles.subHeader}>Already have an account?</Text>
              <TouchableOpacity onPress={navigateToSignIn}>
                <Text style={[tw('font-bold pl-2'), styles.signin]}>
                  Sign In
                </Text>
              </TouchableOpacity>
            </View>

            <Modal
              isVisible={showPhoneModal}
              style={styles.modal}
              animationIn={'slideInUp'}
              animationOut={'slideOutDown'}
              animationInTiming={500}
              animationOutTiming={500}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 3, y: 0}}
                colors={[Colors.card1, Colors.card2]}
                style={[tw('p-3 pb-1 relative'), styles.container]}>
                <View style={[tw('flex flex-row items-center justify-end')]}>
                  <TouchableOpacity
                    onPress={() => {
                      setShowPhoneModal(false);
                    }}>
                    <Close />
                  </TouchableOpacity>
                </View>
                <Text style={[tw('mt-3 px-5 font-light'), styles.subHeader]}>
                  Please enter your Whatsapp phone number to receive OTP.
                </Text>

                <TouchableOpacity
                  style={[tw('my-5 px-5')]}
                  onPress={() => {
                    setShowPhoneModal(false);
                  }}>
                  <Button title="OK" />
                </TouchableOpacity>
              </LinearGradient>
            </Modal>
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
  input: {
    height: 50,
    fontSize: 14,
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 20,
    borderColor: Colors.basegray2,
    color: Colors.white,
  },
  agreement: {color: Colors.dullwhite, fontSize: 12},
  links: {color: Colors.primary},
  signin: {
    color: Colors.primary,
    fontSize: 16,
    lineHeight: 22,
  },
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
  hr: {
    borderBottomWidth: 2,
    borderColor: Colors.yellow,
  },
  or: {fontSize: 14, lineHeight: 16, color: Colors.white},
  modal: {
    margin: 0,
    justifyContent: 'center',
    borderRadius: 6,
    // height: 100,
  },
});
