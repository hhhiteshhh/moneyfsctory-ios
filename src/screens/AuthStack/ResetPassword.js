import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import BackIcon from '../../assets/icons/back.svg';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../../assets/colors';
import Button from '../../components/Button';
import PasswordShow from '../../assets/icons/password_show.svg';
import PasswordHide from '../../assets/icons/password_hide.svg';
import MyStatusBar from '../../components/MyStatusBar';
import apis from '../../consts/apis';
import PutApi from '../../hooks/PutApi';

const windowHeight = Dimensions.get('window').height;

const ResetPassword = ({navigation, route}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const tw = useTailwind();
  const goBack = () => {
    navigation.goBack();
  };
  const navigateToSignIn = () => {
    navigation.navigate('SignIn');
  };
  const params = route.params;
  const changePassword = async () => {
    setLoading(true);

    if (password !== confirmPassword) {
      setLoading(false);
      alert('Confirm Password does not match with the given password');
      return;
    } else if (password.length < 6) {
      setLoading(false);
      alert('Password must be more than 6 characters');
      return;
    } else {
      const options = {
        phone: params.phone,
        password: password,
      };

      try {
        setLoading(true);
        let response = await PutApi(apis.resetPassword, options);

        if (response.status === 200) {
          setLoading(false);
          alert('password changed successfully');
          setTimeout(() => {
            navigateToSignIn();
          }, 750);
        } else {
          setLoading(false);
          alert('password not updated');
        }
      } catch (error) {
        setLoading(false);
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
          Reset Password
        </Text>
        <View style={tw('mt-6')}>
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
            }}
            value={confirmPassword}
          />
        </View>
        <TouchableOpacity
          style={tw('mt-3')}
          disabled={!password || !confirmPassword}
          onPress={() => {
            changePassword();
          }}>
          <Button title="Reset Password" />
        </TouchableOpacity>
        {renderLoader()}
      </SafeAreaView>
    </ScrollView>
  );
};

export default ResetPassword;

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
});
