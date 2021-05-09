import React, {useEffect, useState} from 'react';
import {View, Image, ImageBackground} from 'react-native';
import {SkypeIndicator, UIActivityIndicator} from 'react-native-indicators';
import AsyncStorage from '@react-native-async-storage/async-storage';

var logo = require('../images/applogo.png');

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      AsyncStorage.getItem('user_details').then((value) => {
        if (value) {
          console.log('User Found!!');
        } else {
          console.log('User Not Found!!');
        }
        navigation.navigate(value === null ? 'Auth' : 'App');
      });
    }, 3000);
  }, []);

  return (
    <>
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flex: 0.5,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}>
          <Image source={logo} style={{height: 150, width: 250}} />
        </View>
        <View
          style={{
            flex: 0.5,
            justifyContent: 'flex-start',
          }}>
          <SkypeIndicator color="#000000" />
        </View>
      </View>
    </>
  );
};
export default SplashScreen;
