import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../../assets/colors';
import {useSetRecoilState} from 'recoil';
import {userAtom} from '../../atoms/userAtom';
import MyStatusBar from '../../components/MyStatusBar';
import EmailWhite from '../../assets/icons/email_white.svg';
import EmailBlack from '../../assets/icons/email_black.svg';
import PhoneWhite from '../../assets/icons/phone_white.svg';
import PhoneBlack from '../../assets/icons/phone_black.svg';
import PasswordShow from '../../assets/icons/password_show.svg';
import PasswordHide from '../../assets/icons/password_hide.svg';
import EmailVerified from '../../assets/icons/email_verified.svg';
import RememberMeFalse from '../../assets/icons/RememberMeFalse.svg';
import RememberMeTrue from '../../assets/icons/RememberMeTrue.svg';
import Whatsapp from '../../assets/icons/whatsapp.svg';
import Agreement from '../../assets/icons/agreement.svg';
import REGEX from '../../consts/regularExpression';
import Button from '../../components/Button';
import {userDataAtom} from '../../atoms/userDataAtom';
import PostApi from '../../hooks/PostApi';
import GetApi from '../../hooks/GetApi';
import apis from '../../consts/apis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const windowHeight = Dimensions.get('window').height;

const LoginScreen = () => {
  const navigation = useNavigation();
  const tw = useTailwind();
  const setUser = useSetRecoilState(userAtom);
  const setUserData = useSetRecoilState(userDataAtom);
  const [page, setPage] = useState('email');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [emailError, setEmailError] = useState('');
  const [showEmailIcon, setShowEmailIcon] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [checked, setChecked] = useState('false');
  const [loading, setLoading] = useState(false);

  const navigateToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };
  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
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
    try {
      setLoading(true);
      let response = await PostApi(apis.login, {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        let navigateDecider = await PostApi(apis.navigationDecider, {
          userId: response.data.id,
        });
        if (navigateDecider.data) {
          setUserData({
            name: response.data.name,
            id: response.data.id,
            data: response.data,
          });
          await AsyncStorage.setItem('UserData', JSON.stringify(response));
          setUser(true);
        } else {
          setUserData({
            name: response.data.name,
            id: response.data.id,
            data: response.data,
          });
          await AsyncStorage.setItem('UserData', JSON.stringify(response));
          setUser(true);
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      alert(error.response.data.message);
    }
  };

  const handlePhoneLogin = async () => {
    try {
      setLoading(true);
      let result = await GetApi(`${apis.getUserEmail}/${phone}`);
      if (result.status === 200) {
        // setFormValues({phone: phone, email: result.data.user.email});
        try {
          setLoading(true);
          let response = await PostApi(apis.login, {
            email: result.data.user.email,
            password: password,
          });
          if (response.status === 200) {
            let navigateDecider = await PostApi(apis.navigationDecider, {
              userId: response.data.id,
            });
            if (navigateDecider.data) {
              setUserData({
                name: response.data.name,
                id: response.data.id,
                data: response.data,
              });
              await AsyncStorage.setItem('UserData', JSON.stringify(response));
              setUser(true);
            } else {
              setUserData({
                name: response.data.name,
                id: response.data.id,
                data: response.data,
              });
              await AsyncStorage.setItem('UserData', JSON.stringify(response));
              setUser(true);
            }
          } else {
            setLoading(false);
            alert(response.data.message);
          }
        } catch (error) {
          setLoading(false);
          alert(error.response.data.message);
        }
      }
    } catch (error) {
      setLoading(false);
      alert('User not found');
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
      style={[tw('h-full'), styles.container]}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <SafeAreaView>
        <MyStatusBar padding={20} />
        <View style={[tw('px-5')]}>
          <Text style={[tw('font-bold '), styles.header]}>Sign In</Text>
          <Text style={[tw('mt-3 font-light'), styles.subHeader]}>
            Welcome Back to MoneyFactory
          </Text>
          <View style={[tw('flex flex-row mt-3 justify-center')]}>
            {/* cannot removed its styling bcz styling depends on a variable */}
            <TouchableOpacity
              onPress={() => {
                setPage('email');
              }}
              style={[
                tw('flex flex-row items-center justify-center p-3 w-[50%] '),
                {
                  borderBottomWidth: page === 'email' ? 2 : 0,
                  borderColor: Colors.color1,
                },
              ]}>
              {page === 'email' ? <EmailWhite /> : <EmailBlack />}
              <Text
                style={[
                  tw(`text-center ml-3`),
                  {color: page === 'email' ? Colors.white : Colors.basegray},
                ]}>
                Email
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setPage('phone');
              }}
              style={[
                tw('flex flex-row items-center justify-center p-3 w-[50%]'),
                {
                  borderBottomWidth: page === 'phone' ? 2 : 0,
                  borderColor: Colors.color1,
                },
              ]}>
              {page === 'phone' ? <PhoneWhite /> : <PhoneBlack />}
              <Text
                style={[
                  tw(`text-center ml-3`),
                  {
                    color: page === 'phone' ? Colors.white : Colors.basegray,
                  },
                ]}>
                Phone Number
              </Text>
            </TouchableOpacity>
          </View>
          {page === 'email' && (
            <View style={tw('mt-3 relative')}>
              <TextInput
                placeholder="Email Address"
                placeholderTextColor={Colors.basegray}
                style={styles.input}
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
                <EmailVerified style={tw(`absolute top-3 right-4`)} />
              )}

              {emailError && email && (
                <Text style={styles.error}>{emailError}</Text>
              )}
              <View style={tw('mt-3 relative')}>
                <TextInput
                  secureTextEntry={!showPassword}
                  placeholder="Password"
                  placeholderTextColor="gray"
                  style={styles.input}
                  onChangeText={text => {
                    setPassword(text);
                  }}
                  value={password}
                />

                <TouchableOpacity
                  onPress={() => {
                    setShowPassword(!showPassword);
                  }}
                  style={tw(`absolute top-3 right-4`)}>
                  {showPassword ? <PasswordHide /> : <PasswordShow />}
                </TouchableOpacity>
              </View>
              <View
                style={tw('flex flex-row items-center justify-between mt-3')}>
                <TouchableOpacity
                  style={[tw('flex items-center flex-row mr-2')]}
                  onPress={() => {
                    checked === 'true'
                      ? setChecked('false')
                      : setChecked('true');
                  }}>
                  {checked == 'true' ? <RememberMeTrue /> : <RememberMeFalse />}
                  <Text style={styles.rememberMe}>Remember Me</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={navigateToForgotPassword}>
                  <Text style={styles.forgotPassword}>Forgot Password</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {page === 'phone' && (
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
              <View style={tw('mt-3 relative')}>
                <TextInput
                  secureTextEntry={!showPassword}
                  placeholder="Password"
                  placeholderTextColor="gray"
                  style={styles.input}
                  onChangeText={text => {
                    setPassword(text);
                  }}
                  value={password}
                />

                <TouchableOpacity
                  onPress={() => {
                    setShowPassword(!showPassword);
                  }}
                  style={tw(`absolute top-3 right-4`)}>
                  {showPassword ? <PasswordHide /> : <PasswordShow />}
                </TouchableOpacity>
              </View>
              <View style={tw('flex flex-row items-start mt-3')}>
                <Agreement style={[tw('w-4 h-4')]} />
                <Text style={[tw('ml-3 -mt-2'), styles.agreement]}>
                  By clicking Agree & Join, you agree to the MoneyFactory
                  <Text style={styles.links}>
                    {' '}
                    User Agreement Privacy Policy{' '}
                  </Text>
                  and<Text style={styles.links}> Cookie Policy.</Text>
                </Text>
              </View>
            </View>
          )}
          <TouchableOpacity
            // disabled={emailError || !email || !password}
            onPress={() => {
              // if (checked === 'true') {
              //   setUserData({name: 'Mustafa'});
              //   setUser(true);
              //   setDeployedAtom(true);
              // } else {
              //   setUserData({name: 'Mustafa'});
              //   setUser(true);
              // }
              if (page === 'phone') {
                handlePhoneLogin();
              } else {
                handleSubmit();
              }
            }}>
            <Button title="Sign In" />
          </TouchableOpacity>
          <View style={tw('mt-3')}>
            {/* <View style={[tw('flex flex-row items-center')]}>
          <View style={[tw('w-[30%]'), styles.hr]}></View>
          <Text style={[tw('mx-8 font-semibold'), styles.or]}>
            Continue with
          </Text>
          <View style={[tw('w-[30%]'), styles.hr]}></View>
        </View> */}
            {/* <View
          style={[
            tw('flex flex-row items-center justify-between w-full pt-3'),
          ]}>
          <SignInButton Icon={googleSvg} title="Google" />
          <SignInButton Icon={facebook} title="Facebook" />
        </View> */}
            {/* <View style={tw('mt-3')}>
          <SignInButton
            Icon={linkedIn}
            title="Continue With Linkedin"
            full={true}
          />
        </View> */}
            <View
              style={[
                tw('flex flex-row items-center justify-center w-full py-3'),
              ]}>
              <Text style={styles.subHeader}>Don't have an account?</Text>
              <TouchableOpacity onPress={navigateToSignUp}>
                <Text style={[tw('font-bold pl-2'), styles.signup]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {renderLoader()}
      </SafeAreaView>
    </ScrollView>
  );
};

export default LoginScreen;

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
  rememberMe: {
    fontSize: 14,
    lineHeight: 19,
    color: Colors.basegray,
    marginLeft: 8,
  },
  forgotPassword: {fontSize: 14, lineHeight: 19, color: Colors.primary},
  agreement: {color: Colors.dullwhite, fontSize: 12, lineHeight: 22},
  links: {color: Colors.primary},
  hr: {borderBottomWidth: 2, borderColor: Colors.basegray2},
  or: {fontSize: 12, lineHeight: 16, color: Colors.dullwhite},
  signup: {
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
});
