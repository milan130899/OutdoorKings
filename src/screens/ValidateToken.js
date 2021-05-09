import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  ToastAndroid,
  TextInput,
  SafeAreaView,
} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimentions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Svg, {Path} from 'react-native-svg';
import FormButton from '../components/FormButton';
import Fonts from '../common/Fonts';
import {VERIFY_TOKEN} from '../utils/urls';
import Loader from '../components/Loader';
import FormInput from '../components/FormInput';

const ValidateToken = ({navigation}) => {
  const [userPass, setUserPass] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [passError, setPassError] = useState('');
  //*************************Handling Submit**************************************************/
  const checking = async () => {
    if (!userPass) {
      setPassError('Password Required!');
      return;
    } else {
      setPassError('');
      //**********************Fetching log in***********************//
      setLoading(true);

      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        token: verificationCode,
        password: userPass,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      await fetch(VERIFY_TOKEN, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setLoading(false);
          if (result.status === '200') {
            console.log('Code Status=======>', result.message);
            ToastAndroid.show(
              'Password Updated Successfully..!',
              ToastAndroid.SHORT,
            );
            navigation.navigate('Congrats');
          } else {
            ToastAndroid.show('Code is invalid!', ToastAndroid.SHORT);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log('error', error);
        });

      //**********************Fetching log in***********************//
    }
  };
  //*************************Handling Submit**************************************************/
  return (
    <>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView style={{flex: 1}}>
          <View style={styles.inner}>
            <View style={styles.container}>
              <Image
                source={require('../images/resetPassword.png')}
                style={{height: windowHeight / 5, width: windowWidth / 3}}
              />
              <Text style={styles.resetText}>Reset Password</Text>
              <Text style={styles.resetUnderLine}>Enter your Code here to</Text>
              <Text style={styles.resetUnderLine}>Reset your password</Text>
            </View>

            <View style={styles.containerInput}>
              <FormInput
                inputVisible={true}
                labelValue={verificationCode}
                onChangeText={(code) => setVerificationCode(code)}
                placeholderText="Enter Code"
                iconType="comments"
                autoCapitalize="none"
                autoCorrect={false}
              />
              <FormInput
                inputVisible={true}
                labelValue={userPass}
                onChangeText={(password) => setUserPass(password)}
                placeholderText="Enter Password"
                iconType="key"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
              />
              {passError ? (
                <Text style={styles.errorText}>{passError}</Text>
              ) : null}
            </View>
            <View style={styles.buttonContainer}>
              <FormButton buttonTitle="Reset" onPress={() => checking()} />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    //backgroundColor: '#FFF',
    width: windowWidth / 1,
    height: windowHeight / 1,
  },

  resetText: {
    fontFamily: Fonts.Backslash,
    fontSize: 27,
    marginBottom: 15,
    color: '#000',
  },
  resetUnderLine: {
    fontFamily: Fonts.PlayfairDisplayRegular,
    fontSize: 15,
    marginHorizontal: 25,
    color: '#000',
  },
  containerInput: {
    //backgroundColor: '#FFF',
    alignItems: 'center',
    marginTop: 25,
  },

  errorText: {
    color: 'red',
    alignSelf: 'flex-end',
    marginRight: 40,
  },
  buttonContainer: {
    alignSelf: 'center',
    marginTop: 10,
  },
});
export default ValidateToken;
