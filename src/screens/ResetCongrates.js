import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Fonts from '../common/Fonts';
const ResetCongrates = ({navigation}) => {
  return (
    <>
      <View style={styles.container}>
        <Image
          source={require('../images/congrates.jpeg')}
          style={{marginTop: 110}}
        />
        <Text style={styles.textStyle}>
          Your password has been changed successfully!!{' '}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Go to Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#FFF',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: Fonts.Playfair,
    fontSize: 25,
    marginHorizontal: 53,
  },
  buttonContainer: {
    marginTop: 80,
    backgroundColor: 'blue',
    paddingHorizontal: 23,
    paddingVertical: 12,
    borderRadius: 15,
  },
  buttonText: {
    color: '#fff',
    fontFamily: Fonts.Backslash,
    fontSize: 17,
  },
});
export default ResetCongrates;
