import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Linking,
  Share,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../../../../assets/colors';
import BackIcon from '../../../../assets/icons/back.svg';
import ReferImage from '../../../../assets/images/refer.svg';
import CashCard from '../../../../assets/images/cashCard.svg';
import ShareImage from '../../../../assets/icons/share.svg';
import ShareWhatsapp from '../../../../assets/icons/shareWhatsappGreen.svg';
import Copy from '../../../../assets/icons/copy.svg';
import LinearGradient from 'react-native-linear-gradient';
import MyStatusBar from '../../../../components/MyStatusBar';
import apis from '../../../../consts/apis';
import PostApi from '../../../../hooks/PostApi';
import {useNavigation} from '@react-navigation/native';
import {useRecoilValue} from 'recoil';
import {userDataAtom} from '../../../../atoms/userDataAtom';
import Clipboard from '@react-native-clipboard/clipboard';

const windowHeight = Dimensions.get('window').height;

const Refer = () => {
  const tw = useTailwind();
  const navigation = useNavigation();
  const user = useRecoilValue(userDataAtom);

  const goBack = () => {
    navigation.goBack();
  };
  const [cash, setCash] = useState({});
  const message = `
Greetings Investor! 

The Flag of India is going to be the Face of the World for the next few decades🇮🇳 
Be a part of the journey and build your future! 🔮 
  
With Moneyfactory, Start Investing with as little as ₹100 daily into the best stocks, build wealth while you earn dividend income💵
  
Here's your exclusive invite from ${user.name} to join the revolution!!
https://play.google.com/store/apps/details?id=com.moneyfactory
Use the Code : ${user.data.referralCode} at the time of Sign Up. 
  
Make your 1st Investment of ₹100 - Earn ₹100 on every referral - Enter a chance to Win IPhone 📱
  
Happy Investing!`;

  const copyToClipboard = () => {
    Clipboard.setString(message);
  };
  const shareToWhatsApp = () => {
    Linking.openURL(`whatsapp://send?text=${message}`);
  };
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: message,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      // Alert.alert(error.message);
    }
  };

  const [loading, setLoading] = useState(false);
  const renderLoader = () => {
    if (loading) {
      return (
        <View style={[styles.containerLoader, styles.horizontal]}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      );
    }
  };
  useEffect(() => {
    fetchCash();
  }, [user.id]);
  async function fetchCash() {
    setLoading(true);

    let result = await PostApi(apis.cash, {
      user: user.id,
    });
    if (result.status === 200) {
      setCash(result.data);
      setLoading(false);
    }
  }
  return (
    <SafeAreaView style={[tw('h-full w-full'), styles.container]}>
      <View style={[tw('h-full px-5')]}>
        <MyStatusBar padding={0} />
        <View
          style={[tw('flex  flex-row items-center justify-between my-3'), {}]}>
          <View style={[tw('flex flex-row items-center flex-1')]}>
            <TouchableOpacity onPress={goBack}>
              <BackIcon />
            </TouchableOpacity>
            <Text style={[tw('font-bold ml-3'), styles.header]}>
              Refer Friends
            </Text>
          </View>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
          {cash.availableBalance === 0 ? (
            <View style={[tw('relative')]}>
              <CashCard />
              <Text style={[tw('absolute top-3 left-3'), styles.hundred]}>
                MF Cash{`\n`}Balance
              </Text>
              <Text
                style={[
                  tw('absolute font-bold top-16 left-3'),
                  {fontSize: 32, color: Colors.white},
                ]}>
                {cash.recivedBalance}
              </Text>
            </View>
          ) : (
            <LinearGradient
              start={{x: 0, y: 3.3}}
              end={{x: 1.3, y: 0}}
              colors={[Colors.primary, Colors.planCardColor1]}
              style={[tw('rounded-md h-[108px] w-full flex flex-row')]}>
              <View
                style={[
                  tw('flex py-3 flex-row items-center justify-start w-full'),
                ]}>
                <View
                  style={[
                    tw('w-1/2 flex items-center justify-center'),
                    {borderRightWidth: 1, borderRightColor: Colors.eerie},
                  ]}>
                  <Text style={[tw('text-center'), styles.hundred]}>
                    MF Cash{`\n`}Balance
                  </Text>
                  <Text
                    style={[
                      tw('font-bold '),
                      {fontSize: 32, color: Colors.white},
                    ]}>
                    {cash.availableBalance}
                  </Text>
                </View>
                <View style={[tw('w-1/2 flex items-center justify-center')]}>
                  <Text style={[tw('text-center'), styles.hundred]}>
                    Unclaimed{`\n`}MF Cash
                  </Text>
                  <Text
                    style={[
                      tw('font-bold '),
                      {fontSize: 32, color: Colors.white},
                    ]}>
                    {cash.recivedBalance}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          )}
          <View style={[tw('mt-4 w-full rounded-md py-3 '), styles.referCard]}>
            <View
              style={[
                tw('flex flex-row items-center pl-3 justify-start pb-3'),
                {borderBottomWidth: 1, borderBottomColor: Colors.basegray2},
              ]}>
              <ReferImage />
              <View style={[tw('flex'), {flex: 1}]}>
                <Text style={[tw('font-bold'), styles.subHeader]}>
                  Earn 100 For Each{'\n'}Friend You Refer
                </Text>
                <Text
                  style={[
                    tw('mr-5 flex'),
                    {...styles.card2Subtitle, flex: 0.8},
                  ]}>
                  Refer your friend to Moneyfactory and you both can get 100
                  each. It's a Win-Win!
                </Text>
              </View>
            </View>
            <View style={[tw('flex items-start px-3 justify-start pb-3')]}>
              <View>
                <Text style={[tw('font-bold my-2'), styles.subHeader]}>
                  Share Your Code
                </Text>
              </View>
              <View
                style={[
                  tw(
                    'w-[70%] relative flex items-start justify-center h-12 bg-white rounded-md',
                  ),
                ]}>
                <Text style={[tw('font-semibold ml-4'), styles.refer]}>
                  {user.data.referralCode}
                </Text>
                <View
                  style={[
                    tw('absolute top-0 right-0 h-12 w-12 rounded-md'),
                    {backgroundColor: Colors.gray},
                  ]}>
                  <TouchableOpacity
                    onPress={copyToClipboard}
                    style={[
                      tw('flex flex-row items-center justify-center mt-2'),
                    ]}>
                    <Copy />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
          <View
            style={[
              tw('flex items-center w-full justify-between flex-row my-5'),
            ]}>
            <TouchableOpacity style={{width: '48%'}} onPress={onShare}>
              <View
                style={[tw('rounded-md mt-3 relative'), styles.deployButton]}>
                <Text
                  style={[
                    tw('py-3 text-center ml-9 font-bold'),
                    styles.iconLabel,
                  ]}>
                  Other
                </Text>
                <View style={[tw('absolute top-0 left-0')]}>
                  <ShareImage />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{width: '48%', position: 'relative'}}
              onPress={() => {
                // navigation.navigate('VirtualQuantDetail');
                shareToWhatsApp('text');
              }}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1.3, y: 0}}
                colors={[Colors.primary, Colors.color1]}
                style={[tw('rounded-md mt-3')]}>
                <Text
                  style={[
                    tw('py-3 ml-9 text-center font-bold'),
                    styles.buttonText,
                  ]}>
                  WhatsApp
                </Text>
              </LinearGradient>
              <View style={[tw('absolute top-3 -left-1')]}>
                <ShareWhatsapp />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: Colors.basegray2,
              width: '100%',
              marginTop: 10,
            }}
          />
          <View style={[tw('mt-6')]}>
            <Text style={[tw('font-bold mb-3'), styles.subHeader]}>
              How It Works?
            </Text>
            <Text style={[tw('mb-5'), styles.card2Subtitle]}>
              {`\u2022`} Share the referral link with your friends.
            </Text>
            <Text style={[tw('mb-5'), styles.card2Subtitle]}>
              {`\u2022`} Your friend clicks on the link or signs up and makes
              the first investment through the code.
            </Text>
            <Text style={[tw('mb-5'), styles.card2Subtitle]}>
              {`\u2022`} You get 100 Referral Payout. There's no limit
              referrals.
            </Text>
            <Text style={[tw('mb-5'), styles.card2Subtitle]}>
              {`\u2022`} Inspire your friends to build a portfolio, one step at
              a time.
            </Text>
          </View>
          <View style={{height: 10}} />
        </ScrollView>
        {renderLoader()}
      </View>
    </SafeAreaView>
  );
};

export default Refer;

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
  container: {
    backgroundColor: Colors.eerie,
  },
  header: {color: Colors.white, fontSize: 20, lineHeight: 28},
  refer: {fontSize: 20, lineHeight: 27, color: Colors.purple},
  hundred: {fontSize: 16, lineHeight: 25, color: Colors.white},
  referCard: {backgroundColor: Colors.purple},
  subHeader: {color: Colors.white, fontSize: 18, lineHeight: 25},
  card2Subtitle: {fontSize: 14, lineHeight: 21, color: Colors.white},
  deployButton: {backgroundColor: Colors.primary3},
  iconLabel: {fontSize: 18, lineHeight: 25, color: Colors.white},
  buttonText: {color: Colors.white, fontSize: 18, lineHeight: 25},
});
