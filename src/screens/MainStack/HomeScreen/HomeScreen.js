import {
  SafeAreaView,
  ScrollView,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
  Share,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import Header from '../../../components/Header';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../../../assets/colors';
import MyStatusBar from '../../../components/MyStatusBar';
import {useRecoilState, useRecoilValue} from 'recoil';
import {userDataAtom} from '../../../atoms/userDataAtom';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import TestimonailCard from '../../../components/TestimonailCard';
import {testimonialsAtom} from '../../../atoms/testimonialsAtom';
import GetApi from '../../../hooks/GetApi';
import apis from '../../../consts/apis';
import {videosAtom} from '../../../atoms/videosAtom';
import VideoCard from '../../../components/VideoCard';
import ReferImage from '../../../assets/images/refer.svg';
import ShareImage from '../../../assets/icons/share.svg';
import Copy from '../../../assets/icons/copy.svg';
import Clipboard from '@react-native-clipboard/clipboard';
import Card from '../../../components/HomePlanCard';
import card1 from '../../../assets/images/card1.svg';
import card2 from '../../../assets/images/card2.svg';
import card3 from '../../../assets/images/card3.svg';
import card4 from '../../../assets/images/card4.svg';
import {useNavigation} from '@react-navigation/native';
import Explore from '../../../assets/images/exploreQuant.svg';
import HowItWorks from '../../../assets/images/howItWorks.svg';
import HowToInvest from '../../../assets/images/howToInvest.svg';
import ArrowRightYellow from '../../../assets/icons/arrowRightYellow.svg';
import Button from '../../../components/Button';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const HomeScreen = () => {
  const tw = useTailwind();
  const user = useRecoilValue(userDataAtom);
  const navigation = useNavigation();
  const referCode = user.data.referralCode;
  const [testimonials, setTestimonials] = useRecoilState(testimonialsAtom);
  const [videos, setVideos] = useRecoilState(videosAtom);
  const [loading, setLoading] = useState(true);

  const navigateToInvest100 = () => {
    navigation.navigate('Invest100');
  };
  const navigateToVirtualInvestor = () => {
    navigation.navigate('VirtualInvestor');
  };
  const navigateToGrowthPlan = () => {
    navigation.navigate('GrowthPlanDescription');
  };
  const navigateToProPlan = () => {
    navigation.navigate('ProPlanDescription');
  };
  async function fetchTestimonials() {
    setLoading(true);
    const result = await GetApi(apis.testimonials);
    if (result.status === 200) {
      setLoading(false);
      setTestimonials(result.data);
    } else {
      setLoading(false);
      alert('Server error');
    }
    setLoading(false);
  }

  const message = `
Greetings Investor! 

The Flag of India is going to be the Face of the World for the next few decades🇮🇳 
Be a part of the journey and build your future! 🔮 
  
With Moneyfactory, Start Investing with as little as ₹100 daily into the best stocks, build wealth while you earn dividend income💵
  
Here's your exclusive invite from ${user.name} to join the revolution!!
https://play.google.com/store/apps/details?id=com.moneyfactory
Use the Code : ${referCode} at the time of Sign Up. 
  
Make your 1st Investment of ₹100 - Earn ₹100 on every referral - Enter a chance to Win IPhone 📱
  
Happy Investing!`;

  const copyToClipboard = () => {
    Clipboard.setString(message);
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

  const handleOpenURL = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(
      'https://www.5paisa.com/landing/open-demat-online?utm_source=moneyfactory&utm_medium=moneyfactory&utm_campaign=moneyfactory_acq_alliance&utm_content=value',
    );

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(
        'https://www.5paisa.com/landing/open-demat-online?utm_source=moneyfactory&utm_medium=moneyfactory&utm_campaign=moneyfactory_acq_alliance&utm_content=value',
      );
    } else {
      Alert.alert(`Don't know how to open this URL`);
    }
  });
  const handleOpenURL2 = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(
      'https://calendly.com/support12/test',
    );

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL('https://calendly.com/support12/test');
    } else {
      Alert.alert(`Don't know how to open this URL`);
    }
  });

  async function fetchVideos() {
    setLoading(true);
    const result = await GetApi(apis.video);
    if (result.status === 200) {
      setLoading(false);
      setVideos(result.data[0].gettingStarted);
    } else {
      setLoading(false);
      alert('Server error');
    }
    setLoading(false);
  }
  useEffect(() => {
    if (testimonials.length > 0) {
    } else {
      fetchTestimonials();
    }
    if (videos.length > 0) {
    } else {
      fetchVideos();
    }
  }, []);
  return (
    <SafeAreaView style={[tw('h-full w-full'), styles.container]}>
      <MyStatusBar padding={20} />
      <View style={[tw('mb-3')]}>
        <Header title={`Hello ${user.name.split(' ')[0]}!`} back={false} />
      </View>
      <ScrollView
        style={[tw('h-full'), styles.container]}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={[tw('h-full px-5'), styles.container]}>
          <Text style={[tw('font-bold mt-3'), styles.subHeader]}>
            Let's start building your portfolio
          </Text>
          <View
            style={[
              tw('flex flex-row mt-3 items-center justify-between flex-wrap'),
            ]}>
            <Card
              title="Virtual Investor"
              SvgImage={card1}
              action={navigateToVirtualInvestor}
            />
            <Card
              title="Starter Plan"
              SvgImage={card2}
              action={navigateToInvest100}
            />
            <Card
              title="Growth Plan"
              SvgImage={card3}
              action={navigateToGrowthPlan}
            />
            <Card
              title={`Pro Plan`}
              SvgImage={card4}
              action={navigateToProPlan}
            />
          </View>
          <View
            style={[
              tw(
                'mt-4 w-full flex flex-row items-center justify-between p-3 rounded-md ',
              ),
              {...styles.referCard, backgroundColor: Colors.bgcolor1},
            ]}>
            <Explore />
            <View style={[tw('ml-2')]}>
              <View style={{flexGrow: 1, width: 180, flexDirection: 'column'}}>
                <Text
                  style={[
                    tw('font-bold'),
                    {...styles.refer, color: Colors.white},
                  ]}>
                  Select a Plan that suits you.
                </Text>
                <Text
                  style={[
                    tw('mt-2'),
                    {
                      ...styles.card2Subtitle,
                    },
                  ]}>
                  More than <Text style={{color: Colors.yellow}}>100+ </Text>
                  Quants to invest with
                </Text>
              </View>

              <TouchableOpacity
                style={[tw('w-36')]}
                onPress={() => {
                  navigation.navigate('Discover');
                }}>
                <Button title="Explore Quants" />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[
              tw(
                'mt-4 w-full flex flex-row items-center justify-between p-3 rounded-md ',
              ),
              {...styles.referCard, backgroundColor: Colors.bgcolor1},
            ]}>
            <View style={[tw('flex')]}>
              <View
                style={{
                  flexGrow: 1,
                  width: 180,
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                <Text
                  style={[
                    tw('font-bold'),
                    {...styles.refer, color: Colors.white},
                  ]}>
                  Need help with investing?
                </Text>
                <TouchableOpacity
                  style={[tw('mt-2 flex flex-row items-center justify-start')]}
                  onPress={() => {
                    alert('Coming soon!');
                  }}>
                  <Text
                    style={[
                      tw('mr-1'),
                      {
                        ...styles.card2Subtitle,
                        color: Colors.yellow,
                      },
                    ]}>
                    See how it works.
                  </Text>
                  <ArrowRightYellow />
                </TouchableOpacity>
              </View>
            </View>
            <View style={[tw('-ml-5'), {}]}>
              <HowItWorks />
            </View>
          </View>
          <View
            style={[
              tw(
                'mt-4 w-full flex flex-row items-center justify-between p-3 rounded-md ',
              ),
              {...styles.referCard, backgroundColor: Colors.bgcolor1},
            ]}>
            <View style={[tw('flex')]}>
              <View
                style={{
                  flexGrow: 1,
                  width: 180,
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}>
                <Text
                  style={[
                    tw('font-bold'),
                    {...styles.refer, color: Colors.white},
                  ]}>
                  How to Invest with{' '}
                  <Text style={{color: Colors.primary}}>Moneyfactory?</Text>
                </Text>
                <View>
                  <View style={[tw('flex mt-1 flex-row items-center')]}>
                    <View
                      style={[
                        tw('h-2 w-2 rounded-full'),
                        {backgroundColor: Colors.primary},
                      ]}
                    />
                    <Text style={[tw('ml-2'), {...styles.card2Subtitle}]}>
                      Pick a Subscription
                    </Text>
                  </View>
                  <View style={[tw('flex flex-row mt-2 items-start')]}>
                    <View
                      style={[
                        tw('h-2 w-2 rounded-full'),
                        {backgroundColor: Colors.primary},
                      ]}
                    />
                    <Text style={[tw('ml-2 -mt-1'), {...styles.card2Subtitle}]}>
                      Plan Link your Demat Account or Open a Free Account{' '}
                    </Text>
                  </View>
                  <View style={[tw('flex mt-1 flex-row items-center')]}>
                    <View
                      style={[
                        tw('h-2 w-2 rounded-full'),
                        {backgroundColor: Colors.primary},
                      ]}
                    />
                    <Text style={[tw('ml-2'), {...styles.card2Subtitle}]}>
                      Deploy the Quant
                    </Text>
                  </View>
                  <View style={[tw('flex mt-1 flex-row items-center')]}>
                    <View
                      style={[
                        tw('h-2 w-2 rounded-full'),
                        {backgroundColor: Colors.primary},
                      ]}
                    />
                    <Text style={[tw('ml-2'), {...styles.card2Subtitle}]}>
                      Get Notified with Investing
                    </Text>
                  </View>
                  <View style={[tw('flex mt-1 flex-row items-center')]}>
                    <View
                      style={[
                        tw('h-2 w-2 rounded-full'),
                        {backgroundColor: Colors.primary},
                      ]}
                    />
                    <Text style={[tw('ml-2'), {...styles.card2Subtitle}]}>
                      Opportunity on the go
                    </Text>
                  </View>
                  <View style={[tw('flex mt-2 flex-row items-start')]}>
                    <View
                      style={[
                        tw('h-2 w-2 rounded-full'),
                        {backgroundColor: Colors.primary},
                      ]}
                    />
                    <Text style={[tw('ml-2 -mt-1'), {...styles.card2Subtitle}]}>
                      Sit back & Relax, Build Wealth!{' '}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={[tw('-ml-5'), {}]}>
              <HowToInvest />
            </View>
          </View>

          <View style={[tw('mt-4 w-full rounded-md py-3 '), styles.referCard]}>
            <View
              style={[
                tw('flex flex-row items-center pl-3 pr-3 justify-start pb-3'),
                {borderBottomWidth: 1, borderBottomColor: Colors.basegray2},
              ]}>
              <ReferImage />
              <View style={[tw('')]}>
                <View style={{flexGrow: 1, width: 180, flexDirection: 'row'}}>
                  <Text
                    style={[
                      tw('font-bold flex flex-wrap'),
                      {
                        ...styles.subHeader,
                        display: 'flex',
                        flex: 1,
                      },
                    ]}>
                    Earn 100 For Each Friend You Refer
                  </Text>
                </View>
                <View style={{flexGrow: 1, width: 220, flexDirection: 'row'}}>
                  <Text
                    style={[
                      tw('mr-5'),
                      {
                        ...styles.card2Subtitle,
                        display: 'flex',
                        flex: 1,
                      },
                    ]}>
                    Refer your friend to Moneyfactory and you both can get 100
                    each. It's a Win-Win!
                  </Text>
                </View>
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
                  tw('flex w-full flex-row items-center justify-between'),
                ]}>
                <View
                  style={[
                    tw(
                      'w-[70%] relative flex items-start justify-center h-12 bg-white rounded-md',
                    ),
                  ]}>
                  <Text style={[tw('font-semibold ml-4'), styles.refer]}>
                    {referCode}
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
                <View style={[tw('flex flex-row items-start justify-start')]}>
                  <TouchableOpacity style={{marginRight: 10}} onPress={onShare}>
                    <ShareImage />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={[tw('mt-6 mb-3')]}>
            <Text style={[tw('font-bold'), styles.subHeader]}>
              Getting Started
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            {loading && videos.length <= 0 && (
              <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                <View
                  style={[
                    tw('rounded-md mr-3'),
                    {
                      width: windowWidth * 0.6,
                      height: 180,
                      flex: 1,
                      justifyContent: 'center',
                      position: 'relative',
                      backgroundColor: Colors.bgcolor1,
                    },
                  ]}></View>
                <View
                  style={[
                    tw('rounded-md mr-3'),
                    {
                      width: windowWidth * 0.6,
                      height: 180,
                      flex: 1,
                      justifyContent: 'center',
                      position: 'relative',
                      backgroundColor: Colors.bgcolor1,
                    },
                  ]}></View>
                <View
                  style={[
                    tw('rounded-md mr-3'),
                    {
                      width: windowWidth * 0.6,
                      height: 180,
                      flex: 1,
                      justifyContent: 'center',
                      position: 'relative',
                      backgroundColor: Colors.bgcolor1,
                    },
                  ]}></View>
              </SkeletonPlaceholder.Item>
            )}
            {videos?.map((video, index) => (
              <VideoCard data={video} key={index} />
            ))}
          </ScrollView>
          <View style={[tw('mt-6 mb-3')]}>
            <Text style={[tw('font-bold'), styles.subHeader]}>
              Testimonials
            </Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            {loading && testimonials.length <= 0 && (
              <SkeletonPlaceholder.Item flexDirection="row" alignItems="center">
                <View
                  style={[
                    tw('rounded-md mr-3'),
                    {
                      width: windowWidth * 0.6,
                      height: 180,
                      flex: 1,
                      justifyContent: 'center',
                      position: 'relative',
                      backgroundColor: Colors.bgcolor1,
                    },
                  ]}></View>
                <View
                  style={[
                    tw('rounded-md mr-3'),
                    {
                      width: windowWidth * 0.6,
                      height: 180,
                      flex: 1,
                      justifyContent: 'center',
                      position: 'relative',
                      backgroundColor: Colors.bgcolor1,
                    },
                  ]}></View>
                <View
                  style={[
                    tw('rounded-md mr-3'),
                    {
                      width: windowWidth * 0.6,
                      height: 180,
                      flex: 1,
                      justifyContent: 'center',
                      position: 'relative',
                      backgroundColor: Colors.bgcolor1,
                    },
                  ]}></View>
              </SkeletonPlaceholder.Item>
            )}
            {testimonials?.map((testimonial, index) => (
              <TestimonailCard data={testimonial} key={index} />
            ))}
          </ScrollView>

          <View
            style={[tw('mt-4 w-full rounded-md px-5 py-3 '), styles.callCard]}>
            <View style={[tw('')]}>
              <Text style={[tw('font-bold'), styles.subHeader]}>
                Need help with Investing?
              </Text>

              <TouchableOpacity
                style={[
                  tw('mt-2 w-28 px-4 py-2 rounded-md'),
                  {backgroundColor: Colors.yellow},
                ]}
                onPress={() => {
                  // ToastAndroid.show('Coming Soon!', ToastAndroid.SHORT);
                  handleOpenURL2();
                }}>
                <Text
                  style={[
                    tw('text-center font-bold'),
                    {color: Colors.eerie, fontSize: 14, lineHeight: 19},
                  ]}>
                  Book A Call
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={[tw('mt-4 w-full rounded-md px-5 py-3 '), styles.callCard]}>
            <View style={[tw('')]}>
              <Text style={[tw('font-bold'), styles.subHeader]}>
                Open your Free Demat Account
              </Text>
              <TouchableOpacity
                style={[
                  tw('mt-2 w-28 px-4 py-2 rounded-md'),
                  {backgroundColor: Colors.yellow},
                ]}
                onPress={() => {
                  // ToastAndroid.show('Coming Soon!', ToastAndroid.SHORT);
                  handleOpenURL();
                }}>
                <Text
                  style={[
                    tw('text-center font-bold'),
                    {color: Colors.eerie, fontSize: 14, lineHeight: 19},
                  ]}>
                  Open
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  containerLoader: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.eerie,
    //
    opacity: 0.5,
    height: windowHeight,
    width: windowWidth,
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
  header: {color: Colors.white, fontSize: 20, lineHeight: 28},
  subHeader: {color: Colors.white, fontSize: 18, lineHeight: 25},
  card2Subtitle: {fontSize: 14, lineHeight: 21, color: Colors.white},
  refer: {fontSize: 20, lineHeight: 27, color: Colors.purple},
  hundred: {fontSize: 16, lineHeight: 25, color: Colors.white},
  referCard: {backgroundColor: Colors.purple},
  callCard: {backgroundColor: Colors.planCardColor3},
});
