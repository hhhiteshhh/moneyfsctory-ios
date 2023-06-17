import {SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../../components/Header';
import {useTailwind} from 'tailwind-rn';
import {Colors} from '../../../assets/colors';
import MyStatusBar from '../../../components/MyStatusBar';

const HomeScreen = () => {
  const tw = useTailwind();
  return (
    <ScrollView
      style={[tw('h-full'), styles.container]}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <SafeAreaView style={[tw('h-full'), styles.container]}>
        <MyStatusBar padding={20} />
        <Header />
      </SafeAreaView>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.eerie,
  },
});
