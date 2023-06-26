import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../../assets/colors';
import {useTailwind} from 'tailwind-rn';
import Modal from 'react-native-modal';
import Slider from '@ptomasroos/react-native-multi-slider';
import Button from '../../../components/Button';
import Deploy from '../../../assets/images/deployModalImage.svg';
import RadioUnselected from '../../../assets/icons/radiounselected.svg';
import RadioSelected from '../../../assets/icons/radioselected.svg';
import LinearGradient from 'react-native-linear-gradient';
import MyStatusBar from '../../../components/MyStatusBar';
import {useNavigation} from '@react-navigation/native';
import Header from '../../../components/Header';
import CustomMarker from '../../../components/CustomMarker';

const windowWidth = Dimensions.get('window').width;

const DeployVirtualQuant = () => {
  const tw = useTailwind();
  const navigation = useNavigation();
  const [broker, setBroker] = useState('5Paisa');
  const [mode, setMode] = useState('simulated');
  const [multiplier, setMultiplier] = useState([1]);
  const [showSubscribeModal, setSubscribeModal] = useState(false);
  const sliderOneValuesChange = values => setMultiplier(values);

  return (
    <SafeAreaView style={[tw('h-full w-full '), styles.container]}>
      <View style={[tw('h-full '), styles.container]}>
        <MyStatusBar padding={20} />
        <View style={[tw('mb-3')]}>
          <Header title={`Deploy Quants`} back={true} />
        </View>
        <View style={styles.hr}></View>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={[tw('px-5')]}>
          <Text style={[tw('mt-5 font-semibold'), styles.data]}>Broker</Text>
          <TouchableOpacity
            style={[tw('flex items-center flex-row -ml-2 mt-3')]}
            onPress={() => {
              setBroker('5Paisa');
            }}>
            {broker === '5Paisa' ? (
              <TouchableOpacity
                onPress={() => {
                  setBroker('5Paisa');
                }}>
                <RadioSelected />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setBroker('5Paisa');
                }}>
                <RadioUnselected />
              </TouchableOpacity>
            )}
            <Text
              style={[
                {
                  marginLeft: 6,
                  fontSize: 14,
                  lineHeight: 19,
                  color: broker === '5Paisa' ? Colors.white : Colors.basegray,
                },
              ]}>
              5Paisa
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[tw('flex items-center flex-row -ml-2 mt-3')]}
            onPress={() => {
              setBroker('Zerodha');
            }}>
            {broker === 'Zerodha' ? (
              <TouchableOpacity
                onPress={() => {
                  setBroker('Zerodha');
                }}>
                <RadioSelected />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setBroker('Zerodha');
                }}>
                <RadioUnselected />
              </TouchableOpacity>
            )}
            <Text
              style={[
                {
                  marginLeft: 6,
                  fontSize: 14,
                  lineHeight: 19,
                  color: broker === 'Zerodha' ? Colors.white : Colors.basegray,
                },
              ]}>
              Zerodha
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[tw('flex items-center flex-row -ml-2 mt-3')]}
            onPress={() => {
              setBroker('Upstox');
            }}>
            {broker === 'Upstox' ? (
              <TouchableOpacity
                onPress={() => {
                  setBroker('Upstox');
                }}>
                <RadioSelected />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setBroker('Upstox');
                }}>
                <RadioUnselected />
              </TouchableOpacity>
            )}

            <Text
              style={[
                {
                  marginLeft: 6,
                  fontSize: 14,
                  lineHeight: 19,
                  color: broker === 'Upstox' ? Colors.white : Colors.basegray,
                },
              ]}>
              Upstox
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[tw('flex items-center flex-row -ml-2 mt-3')]}
            onPress={() => {
              setBroker('Motilal Oswal');
            }}>
            {broker === 'Motilal Oswal' ? (
              <TouchableOpacity
                onPress={() => {
                  setBroker('Motilal Oswal');
                }}>
                <RadioSelected />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setBroker('Motilal Oswal');
                }}>
                <RadioUnselected />
              </TouchableOpacity>
            )}
            <Text
              style={[
                {
                  marginLeft: 6,
                  fontSize: 14,
                  lineHeight: 19,
                  color:
                    broker === 'Motilal Oswal' ? Colors.white : Colors.basegray,
                },
              ]}>
              Motilal Oswal
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[tw('flex items-center flex-row -ml-2 mt-3')]}
            onPress={() => {
              setBroker('Flyers');
            }}>
            {broker === 'Flyers' ? (
              <TouchableOpacity
                onPress={() => {
                  setBroker('Flyers');
                }}>
                <RadioSelected />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setBroker('Flyers');
                }}>
                <RadioUnselected />
              </TouchableOpacity>
            )}
            <Text
              style={[
                {
                  marginLeft: 6,
                  fontSize: 14,
                  lineHeight: 19,
                  color: broker === 'Flyers' ? Colors.white : Colors.basegray,
                },
              ]}>
              Flyers
            </Text>
          </TouchableOpacity>
          <View style={tw('mt-5')}>
            <View style={tw('flex items-center justify-between flex-row')}>
              <Text style={[tw('font-semibold'), styles.data]}>Multiplier</Text>
              <Text style={styles.iconLabel}>{multiplier[0]}x</Text>
            </View>

            <Slider
              min={1}
              max={10}
              values={multiplier}
              sliderLength={windowWidth - 80}
              onValuesChange={sliderOneValuesChange}
              customMarker={CustomMarker}
              selectedStyle={{
                backgroundColor: Colors.yellow,
              }}
              unselectedStyle={{
                backgroundColor: Colors.yellow,
                opacity: 0.3,
              }}
            />
            <View style={tw('flex items-center justify-between flex-row')}>
              <Text style={styles.name}>1x</Text>
              <Text style={styles.name}>10x</Text>
            </View>
          </View>
          <Text style={[tw('mt-5 font-semibold'), styles.data]}>
            Select Mode
          </Text>
          <TouchableOpacity
            style={[tw('flex items-center flex-row -ml-2 mt-3')]}
            onPress={() => {
              setMode('simulated');
            }}>
            {mode === 'simulated' ? (
              <TouchableOpacity
                onPress={() => {
                  setMode('simulated');
                }}>
                <RadioSelected />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setMode('simulated');
                }}>
                <RadioUnselected />
              </TouchableOpacity>
            )}
            <Text
              style={[
                {
                  marginLeft: 6,
                  fontSize: 14,
                  lineHeight: 19,
                  color: mode === 'simulated' ? Colors.white : Colors.basegray,
                },
              ]}>
              Simulated
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{marginTop: 10}}
            onPress={() => {
              setSubscribeModal(true);
            }}>
            <Button title="Deploy" />
          </TouchableOpacity>
          <View style={{height: 100}} />
        </ScrollView>
        <Modal
          isVisible={showSubscribeModal}
          style={styles.modal}
          animationIn={'slideInUp'}
          animationOut={'slideOutDown'}
          animationInTiming={500}
          animationOutTiming={500}
          onBackdropPress={() => {
            setSubscribeModal(false);
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1.5, y: 0}}
            style={{borderRadius: 6}}
            colors={[Colors.card1, Colors.card2]}>
            <View style={tw('flex items-center justify-center my-8 ')}>
              <Deploy />
              <Text
                style={[
                  tw('text-center mt-3 font-semibold'),
                  styles.modalHeader,
                ]}>
                Deploy Your Quants
              </Text>
              <Text
                style={[
                  tw('text-center w-[75%] mt-2 '),
                  styles.modalSubHeader,
                ]}>
                AI-powered investment strategies to maximise your profits and
                help you find the right opportunities up to 10 cr.
              </Text>
              <TouchableOpacity
                style={tw('w-[75%] mt-8')}
                onPress={() => {
                  setSubscribeModal(false);
                  navigation.navigate('Congratulations');
                }}>
                <Button title="Continue" />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default DeployVirtualQuant;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.eerie,
  },
  header: {color: Colors.white, fontSize: 20, lineHeight: 28},
  hr: {height: 1, backgroundColor: Colors.basegray, marginTop: 15},
  data: {fontSize: 18, lineHeight: 24, color: Colors.white},
  name: {fontSize: 14, lineHeight: 19, color: Colors.white},
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
    borderRadius: 6,
  },
  modalHeader: {fontSize: 20, lineHeight: 28, color: Colors.white},
  modalSubHeader: {fontSize: 14, lineHeight: 24, color: Colors.white},
  iconLabel: {fontSize: 16, lineHeight: 18, color: Colors.white},
});
