import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useTailwind} from 'tailwind-rn';
import Performance from '../../../../assets/icons/performance.svg';
import {Colors} from '../../../../assets/colors';
import PlanCard from '../../../../components/PlanCard';
import Button from '../../../../components/Button';
import RazorpayCheckout from 'react-native-razorpay';
import PostApi from '../../../../hooks/PostApi';
import apis from '../../../../consts/apis';
import MyStatusBar from '../../../../components/MyStatusBar';
import {useRecoilValue} from 'recoil';
import {userDataAtom} from '../../../../atoms/userDataAtom';
import Header from '../../../../components/Header';

const windowHeight = Dimensions.get('window').height;
const SubscribedPlan = () => {
  const tw = useTailwind();
  const user = useRecoilValue(userDataAtom);

  const pricingMonthly = [
    {
      id: 1,
      title: 'Starter',
      price: 99,
      exchange: 'Equity',
      color: 'rgba(206, 253, 30, 1)',
    },
    {
      id: 2,
      title: 'Growth',
      price: 499,
      exchange: 'NSE/FNO',
      color: 'rgba(0, 211, 127, 1)',
    },
    {
      id: 3,
      title: 'Pro',
      price: 1999,
      exchange: 'NSE/FNO/MCX',
      color: 'rgba(252, 176, 23, 1)',
    },
  ];

  const pricingQuaterly = [
    {
      id: 4,
      title: 'Starter',
      price: 299,
      exchange: 'Equity',
      color: 'rgba(206, 253, 30, 1)',
    },
    {
      id: 5,
      title: 'Growth',
      price: 1499,
      exchange: 'NSE/FNO',
      color: 'rgba(0, 211, 127, 1)',
    },
    {
      id: 6,
      title: 'Pro',
      price: 5999,
      exchange: 'NSE/FNO/MCX',
      color: 'rgba(252, 176, 23, 1)',
    },
  ];

  const pricingAnnual = [
    {
      id: 7,
      title: 'Starter',
      price: 1199,
      exchange: 'Equity',
      color: 'rgba(206, 253, 30, 1)',
    },
    {
      id: 8,
      title: 'Growth',
      price: 5999,
      exchange: 'NSE/FNO',
      color: 'rgba(0, 211, 127, 1)',
    },
    {
      id: 9,
      title: 'Pro',
      price: 23999,
      exchange: 'NSE/FNO/MCX',
      color: 'rgba(252, 176, 23, 1)',
    },
  ];

  const [type, setType] = useState('Monthly');
  const [pricing, setpricing] = useState(pricingMonthly);
  const [id, setId] = useState('');
  const [planSelected, setPlanSelected] = useState({});
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
    if (type === 'Monthly') {
      setpricing(pricingMonthly);
    } else if (type === 'Quarterly') {
      setpricing(pricingQuaterly);
    } else if (type === 'Annual') {
      setpricing(pricingAnnual);
    }
  }, [type]);

  function onChangeValue(event) {
    setType(event);
  }

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let response = await PostApi(apis.subscription, {
        id: planSelected.id,
        title: planSelected.title,
        price: planSelected.price,
      });
      if (response.status === 200) {
        const options = {
          key: 'rzp_live_kHx3Xx5ltm6u9I', //'rzp_live_kHx3Xx5ltm6u9I',
          subscription_id: response.razorpay_subscription_id,
          currency: 'INR',
          name: 'MoneyFactory AI',
          description:
            'MoneyFactory Subscription for: Rs' +
            planSelected.price * 1.18 +
            ' - ' +
            planSelected.title,
          image:
            'data:image/png;base64,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',
          amount: planSelected.price * 100 * 1.18,

          prefill: {
            name: user.data.name,
            email: user.data.email,
            contact: user.data.phone_number,
          },
          notes: {
            address: 'MoneyFactory AI Corporate Office',
          },
          theme: {
            color: '#23636A',
          },
        };
        RazorpayCheckout.open(options)
          .then(async response => {
            // handle success
            alert(`Success: ${response.razorpay_payment_id}`);
            const dataForDb = {
              date: Date.now(),
              amount: planSelected.price * 1.18,
              external_payment_id: response.razorpay_payment_id,
              email: user.data.email,
              currency: 'INR',
              status: 'SUCCESS',
              trans_details: {
                key: 'rzp_live_kHx3Xx5ltm6u9I',
                amount: planSelected.price,
                currency: 'INR',
                name: 'MoneyFactory AI',
                description:
                  'MoneyFactory Subscription for: Rs' + planSelected.price,
                image: '',
                prefill: {
                  name: user.data.name,
                  email: user.data.email,
                  contact: user.data.phone_number,
                },
                notes: {address: 'MoneyFactory AI Corporate Office'},
                theme: {color: '#23636A'},
              },
            };
            try {
              const result = await PostApi(apis.createPayment, dataForDb);
              if (result.status === 200) {
                // alert(`Success`);
                setLoading(false);
                alert('Payment Successful');
              } else {
                setLoading(false);
                alert('Network Error');
              }
            } catch (error) {
              setLoading(false);
              alert('Network Error');
            }
          })
          .catch(error => {
            // handle failure
            setLoading(false);
            if (error.code === 0) {
              alert(`Transaction cancelled`);
            } else {
              alert(`Error: ${error.code} | ${error.description}`);
            }
          });
      } else {
        setLoading(false);
        alert('Network Error');
      }
    } catch (error) {
      setLoading(false);
      alert('Network Error');
    }
  };

  return (
    <SafeAreaView style={[tw('h-full w-full'), styles.container]}>
      <View style={[tw('h-full'), styles.container]}>
        <MyStatusBar padding={20} />
        <View style={[tw('mb-3'), {}]}>
          <Header title={`Subscription Plans`} back={true} />
        </View>

        <View
          style={[tw('flex flex-row items-center justify-between mt-6 px-5')]}>
          <TouchableOpacity
            style={[
              tw('w-1/3'),
              {
                borderBottomWidth: 2,
                borderBottomColor:
                  type === 'Monthly' ? Colors.color1 : Colors.basegray2,
              },
            ]}
            onPress={() => {
              onChangeValue('Monthly');
              setId('');
            }}>
            <Text
              style={[
                tw('text-center mb-3'),
                {
                  fontSize: 14,
                  lineHeight: 19,
                  color: type === 'Monthly' ? Colors.white : Colors.basegray,
                },
              ]}>
              Monthly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              tw('w-1/3'),
              {
                borderBottomWidth: 2,
                borderBottomColor:
                  type === 'Quarterly' ? Colors.color1 : Colors.basegray2,
              },
            ]}
            onPress={() => {
              onChangeValue('Quarterly');
              setId('');
            }}>
            <Text
              style={[
                tw('text-center mb-3'),
                {
                  fontSize: 14,
                  lineHeight: 19,
                  color: type === 'Quarterly' ? Colors.white : Colors.basegray,
                },
              ]}>
              Quarterly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              tw('w-1/3'),
              {
                borderBottomWidth: 2,
                borderBottomColor:
                  type === 'Annual' ? Colors.color1 : Colors.basegray2,
              },
            ]}
            onPress={() => {
              onChangeValue('Annual');
              setId('');
            }}>
            <Text
              style={[
                tw('text-center mb-3'),
                {
                  fontSize: 14,
                  lineHeight: 19,
                  color: type === 'Annual' ? Colors.white : Colors.basegray,
                },
              ]}>
              Annual
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={[tw('px-5')]}>
          <TouchableOpacity
            onPress={() => {
              setId(pricing[0].id);
              setPlanSelected(pricing[0]);
            }}>
            <PlanCard
              id={pricing[0].id}
              type={type}
              title={pricing[0].title}
              price={pricing[0].price}
              color={pricing[0].color}
              exchange={pricing[0].exchange}
              index={id}
              description={['Real-time Buy Signals', 'DIY Portfolio Builder']}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setId(pricing[1].id);
              setPlanSelected(pricing[1]);
            }}>
            <PlanCard
              id={pricing[1].id}
              type={type}
              title={pricing[1].title}
              price={pricing[1].price}
              color={pricing[1].color}
              exchange={pricing[1].exchange}
              index={id}
              description={[
                'Real-time Buy/Sell Signals',
                'Curated Quants',
                'Integrated Wealth Builder',
              ]}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setId(pricing[2].id);
              setPlanSelected(pricing[2]);
            }}>
            <PlanCard
              id={pricing[2].id}
              type={type}
              title={pricing[2].title}
              price={pricing[2].price}
              color={pricing[2].color}
              exchange={pricing[2].exchange}
              index={id}
              description={[
                'Real-time F&O Signals',
                'Flagship Quants',
                'Integrated Income Builder',
              ]}
            />
          </TouchableOpacity>
          {/* <Text style={[tw('font-bold my-3'), styles.subheader]}>
            Performance Fees
          </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            <View
              style={[
                tw('pl-3 pr-10 py-5 mr-3 w-28 rounded-md'),
                {backgroundColor: Colors.black},
              ]}>
              <Performance />
              <Text style={{fontSize: 14, lineHeight: 19, color: Colors.white}}>
                2.5 lacs
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 19,
                  color: Colors.white,
                  marginTop: 6,
                }}>
                Nill
              </Text>
            </View>
            <View
              style={[
                tw('pl-3 pr-10 py-5 mr-3 w-28 rounded-md'),
                {backgroundColor: Colors.black},
              ]}>
              <Performance />
              <Text style={{fontSize: 14, lineHeight: 19, color: Colors.white}}>
                2.5 lacs - 5 lacs
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 19,
                  color: Colors.white,
                  marginTop: 6,
                }}>
                5%
              </Text>
            </View>
            <View
              style={[
                tw('pl-3 pr-10 py-5 mr-3 w-28 rounded-md'),
                {backgroundColor: Colors.black},
              ]}>
              <Performance />
              <Text style={{fontSize: 14, lineHeight: 19, color: Colors.white}}>
                5 lacs & Above
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  lineHeight: 19,
                  color: Colors.white,
                  marginTop: 6,
                }}>
                10%
              </Text>
            </View>
          </ScrollView> */}
          <TouchableOpacity
            disabled={!id}
            onPress={() => {
              handleSubmit();
            }}
            style={[tw('mt-4')]}>
            <Button title="Subscribe Now" />
          </TouchableOpacity>
        </ScrollView>
      </View>
      {renderLoader()}
    </SafeAreaView>
  );
};

export default SubscribedPlan;

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
  header: {color: Colors.white, fontSize: 20, lineHeight: 28},
  subheader: {color: Colors.white, fontSize: 18, lineHeight: 24},
});
