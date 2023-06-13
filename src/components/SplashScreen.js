import {Image} from 'react-native';
import React from 'react';
import {useTailwind} from 'tailwind-rn';
import SplashScreenImage from '../assets/images/Splash.jpg';
export default function SplashScreen() {
  const tw = useTailwind();

  return (
    <Image
      style={[tw('h-full w-full rounded-xl absolute top-0')]}
      source={SplashScreenImage}
      resizeMode={'cover'}
    />
  );
}
