import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import Up from '../assets/icons/up.svg';
import Down from '../assets/icons/down.svg';
import More from '../assets/icons/more_vert.svg';
import Deploy from '../assets/icons/deployed.svg';
import Capital from '../assets/icons/capital.svg';
import Mode from '../assets/icons/mode.svg';
import Folder from '../assets/icons/folder.svg';
import Play from '../assets/icons/play.svg';
import Pause from '../assets/icons/pause.svg';
import ExitAll from '../assets/icons/exitAll.svg';
import Exit from '../assets/icons/exit.svg';
import LinearGradient from 'react-native-linear-gradient';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../assets/colors';
import Modal from 'react-native-modal';
import Close from '../assets/icons/close.svg';
import ViewDetails from '../assets/icons/view.svg';
import {SvgUri} from 'react-native-svg';
import {MONEY_FACTORY_IMAGE} from '../consts/apis';
import 'intl';
import 'intl/locale-data/jsonp/en';
import BrokerLogo from '../assets/icons/Logo.svg';
import AngleBroking from '../assets/icons/_angleBroking.svg';
import Fyres from '../assets/icons/_fyres.svg';
import Paisa from '../assets/icons/paisa.svg';
import NoImage from '../assets/icons/image2vector.svg';
import {useNavigation} from '@react-navigation/native';
const MyQuantCard = ({data}) => {
  const tw = useTailwind();
  const navigation = useNavigation();
  const [detailsModal, setDetailsModal] = useState(false);
  const navigateToMyQuantDetails = () => {
    setDetailsModal(false);
    setTimeout(() => {
      navigation.navigate('MyQuantDetails', {data: data});
    }, 170);
  };
  var formatter = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  });
  let LogoTemp = ['', Paisa, AngleBroking, Fyres, '', '', BrokerLogo];
  let BrokerName = [
    '',
    '5 Paisa',
    'AngelONE',
    'Fyers',
    '',
    '',
    'MF Virtual Cash',
  ];
  let Logo = LogoTemp[data?.quant?.broker]
    ? LogoTemp[data?.quant?.broker]
    : NoImage;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const onError = e => {
    setLoading(false);
  };
  const onLoad = () => {
    setLoading(false);
  };
  return (
    <View style={[tw('rounded-md p-3 mx-5 my-2 relative'), styles.container]}>
      <View style={[tw('absolute bottom-5 right-5')]}>
        {open ? (
          <TouchableOpacity
            onPress={() => {
              setOpen(false);
            }}>
            <Up />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setOpen(true);
            }}>
            <Down />
          </TouchableOpacity>
        )}
      </View>
      <View style={[tw('flex flex-row items-center justify-between'), {}]}>
        <View style={[tw('flex flex-row items-center justify-center'), {}]}>
          <View
            style={[
              tw('relative rounded-full justify-center items-center flex'),
              styles.headerLogo,
            ]}>
            <View style={[tw('h-16 w-16 items-center justify-center')]}>
              <SvgUri
                width="100%"
                height="100%"
                uri={`${MONEY_FACTORY_IMAGE}/${data?.quant?.quant?.imgUrl}`}
                onError={onError}
                onLoad={onLoad}
              />
              {loading && (
                <ActivityIndicator size="large" color={Colors.primary} />
              )}
            </View>
            <View
              style={[
                tw('absolute bottom-0 right-2 rounded-full w-3 h-3'),
                styles.activeButton,
              ]}
            />
          </View>

          <Text style={[tw('ml-3 font-bold'), styles.header]}>
            {data?.quant?.quant?.name}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            setDetailsModal(true);
          }}>
          <More />
        </TouchableOpacity>
      </View>
      <View style={styles.hr} />
      {data ? (
        <View style={[tw('flex items-start justify-start')]}>
          <View style={[tw('mt-3 flex flex-row justify-between w-[90%]')]}>
            <View style={tw('flex items-start justify-start')}>
              <View style={[tw(''), {}]}>
                <View
                  style={[tw('flex flex-row items-center justify-start'), {}]}>
                  <View style={[tw('rounded-md'), styles.icon]}>
                    <Deploy />
                  </View>
                  <Text style={[tw('ml-2'), styles.iconText]}>Deployed on</Text>
                </View>
                <Text style={[tw('pl-9 font-semibold'), styles.iconSubText]}>
                  {data?.quant?.createdDate}
                </Text>
              </View>
              <View style={[tw(''), {}]}>
                <View
                  style={[tw('flex flex-row items-center justify-start'), {}]}>
                  <View style={[tw('rounded-md'), styles.icon]}>
                    <Mode />
                  </View>
                  <Text style={[tw('ml-2'), styles.iconText]}>Mode</Text>
                </View>
                <Text style={[tw('pl-9 font-semibold'), styles.iconSubText]}>
                  {data?.quant?.mode}
                </Text>
              </View>
            </View>
            <View style={tw('flex items-start justify-start')}>
              <View style={[tw(''), {}]}>
                <View
                  style={[tw('flex flex-row items-center justify-start'), {}]}>
                  <View style={[tw('rounded-md'), styles.icon]}>
                    <Capital />
                  </View>
                  <Text style={[tw('ml-2'), styles.iconText]}>Capital</Text>
                </View>
                <Text style={[tw('pl-9 font-semibold'), styles.iconSubText]}>
                  {formatter.format(
                    data?.quant?.quantity * data?.quant?.quant?.price,
                  )}
                </Text>
              </View>
              <View style={[tw(''), {}]}>
                <View
                  style={[tw('flex flex-row items-center justify-start'), {}]}>
                  <Logo />
                  <Text style={[tw('ml-2'), styles.iconSubText]}>
                    {BrokerName[data?.quant?.broker]
                      ? BrokerName[data?.quant?.broker]
                      : 'broker'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          {open && (
            <View>
              <Text
                style={[
                  tw('font-bold mt-5'),
                  {fontSize: 18, lineHeight: 24, color: Colors.white},
                ]}>
                Stocks
              </Text>
              {data?.stocksignals?.map(stock => (
                <View style={[tw('flex items-start justify-start py-1')]}>
                  <Text
                    style={[
                      tw('font-semibold'),
                      {fontSize: 16, lineHeight: 22, color: Colors.white},
                    ]}>
                    {stock?.symbol}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ) : (
        <View style={[tw('flex flex-row items-start py-3 w-[90%]')]}>
          <Folder />
          <View style={[tw('pl-5 pr-8')]}>
            <Text styles={styles.noDetailsDescriptionHeader}>
              Sorry No Data Found!
            </Text>
            <Text style={styles.noDetailsDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          </View>
        </View>
      )}
      <Modal
        isVisible={detailsModal}
        style={styles.modal}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        animationInTiming={500}
        animationOutTiming={500}
        onBackdropPress={() => {
          setDetailsModal(false);
        }}>
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1.5, y: 0}}
          style={{borderRadius: 6, height: 280}}
          colors={[Colors.card1, Colors.card2]}>
          <View style={[tw('flex flex-row justify-between py-3 px-5')]}>
            <View style={[tw('flex flex-row justify-center items-center'), {}]}>
              <View style={[tw('h-24 w-24 items-center justify-center')]}>
                <SvgUri
                  width="100%"
                  height="100%"
                  uri={`${MONEY_FACTORY_IMAGE}/${data?.quant?.quant?.imgUrl}`}
                  onError={onError}
                  onLoad={onLoad}
                />
                {loading && (
                  <ActivityIndicator size="large" color={Colors.primary} />
                )}
              </View>

              <View style={(tw(''), {marginLeft: 20})}>
                <Text style={[tw('font-bold'), styles.iconSubText]}>
                  {data?.quant?.quant?.name}
                </Text>
                <Text style={[tw('font-bold'), styles.modalSubText]}>
                  {data?.quant?.quant?.status}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {
                setDetailsModal(false);
              }}>
              <Close />
            </TouchableOpacity>
          </View>
          {/* <View
            style={[
              tw('flex flex-row items-center px-5 justify-between px-5 py-3'),
            ]}>
            <View style={tw('flex items-center')}>
              <Play />
              <Text style={styles.iconText2}>Start</Text>
            </View>
            <View style={tw('flex items-center')}>
              <Pause />
              <Text style={styles.iconText2}>Pause</Text>
            </View>
            <View style={tw('flex items-center')}>
              <ExitAll />
              <Text style={styles.iconText2}>Exit All</Text>
            </View>
            <View style={tw('flex items-center')}>
              <Exit />
              <Text style={styles.iconText2}>Exit Selected</Text>
            </View>
          </View> */}
          <View style={styles.hr} />
          <TouchableOpacity
            onPress={navigateToMyQuantDetails}
            style={[
              tw('py-3 flex flex-row items-center px-5 justify-between'),
            ]}>
            <Text style={[tw('font-bold'), styles.iconSubText]}>
              View More Details
            </Text>
            <ViewDetails />
          </TouchableOpacity>
          <View style={{height: 20}} />
        </LinearGradient>
      </Modal>
    </View>
  );
};

export default MyQuantCard;

const styles = StyleSheet.create({
  container: {backgroundColor: Colors.black2},
  activeButton: {backgroundColor: Colors.primary},
  headerLogo: {backgroundColor: Colors.basegray2, width: 60, height: 60},
  header: {fontSize: 18, lineHeight: 25, color: Colors.white},
  hr: {height: 1, backgroundColor: Colors.basegray2, marginTop: 10},
  icon: {backgroundColor: Colors.lightBlack, padding: 6},
  iconText: {color: Colors.basegray, fontSize: 14, lineHeight: 19},
  iconSubText: {color: Colors.white, fontSize: 16, lineHeight: 21},
  noDetailsDescription: {
    fontSize: 14,
    lineHeight: 19,
    color: Colors.dullwhite,
    marginTop: 9,
  },
  noDetailsDescriptionHeader: {
    fontSize: 18,
    lineHeight: 24,
    color: Colors.white,
  },
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
    borderRadius: 6,
  },
  iconText2: {color: Colors.text2, marginTop: 5},
  modalSubText: {color: Colors.primary, fontSize: 20, lineHeight: 27},
});
