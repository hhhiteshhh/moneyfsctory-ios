import React from 'react';
import {TailwindProvider} from 'tailwind-rn';
import Navigation from './src/screens';
import utilities from './tailwind.json';
import {RecoilRoot} from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <TailwindProvider utilities={utilities}>
        <Navigation />
      </TailwindProvider>
    </RecoilRoot>
  );
}

export default App;
