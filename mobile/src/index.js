import React from 'react';
import { YellowBox  } from 'react-native';
import Login from './pages/Login';
import Routes from './routes';

YellowBox.ignoreWarnings([
  'Unrecognized WebSocket'
]);

export default function App (){
  return (
    <Routes />
  );
  }