import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  ToastAndroid,
  TextInput,
} from 'react-native';
import {windowHeight, windowWidth} from '../../utils/Dimentions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Svg, {Path} from 'react-native-svg';
import FormButton from '../../components/FormButton';
import Fonts from '../../common/Fonts';
import Loader from '../../components/Loader';

const OrderSuccess = ({navigation}) => {
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFF'}}>
        <View style={styles.containerHeader}>
          <View style={{backgroundColor: '#14DCB5', height: 250}}>
            <Svg
              height="60%"
              width="100%"
              viewBox="0 0 1440 320"
              style={{position: 'absolute', top: 210}}>
              <Path
                fill="#14DCB5"
                d="M0,64L48,90.7C96,117,192,171,288,181.3C384,192,480,160,576,133.3C672,107,768,85,864,117.3C960,149,1056,235,1152,256C1248,277,1344,235,1392,213.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
              />
            </Svg>
          </View>
        </View>
        <View style={styles.container}>
          <Image
            source={require('../../images/successOrder.png')}
            style={{height: 150, width: 170, marginTop: 25}}
          />
          <Text style={styles.orderText}>Order Placed!</Text>
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.orderThanksLine}>
            Thank you for placing your order with us.
          </Text>
          <Text style={styles.orderContactLine}>
            For any questions and further information, please contact our
            customer support.
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          <FormButton
            buttonTitle="Go To Home"
            style={styles.buttonStyle}
            onPress={() => navigation.navigate('Home')}
          />
        </View>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  containerHeader: {
    position: 'absolute',
    width: windowWidth,
    backgroundColor: '#FFF',
  },
  container: {
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  orderText: {
    fontSize: 30,
    marginTop: 20,
    marginBottom: 15,
    color: '#FFF',
  },
  textContainer: {
    marginTop: 100,
    backgroundColor: '#FFF',
    alignItems: 'center',
  },
  orderThanksLine: {
    fontSize: 23,
    textAlign: 'center',
    color: '#000',
  },
  orderContactLine: {
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 23,
    marginTop: 15,
    color: '#555',
  },

  buttonContainer: {
    alignSelf: 'center',
  },
  buttonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3226BD',
    height: windowHeight / 18,
    width: windowWidth / 3,
    borderRadius: 17,
    marginTop: 40,
  },
});
export default OrderSuccess;
