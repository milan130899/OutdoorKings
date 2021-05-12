import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimentions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Svg, {Path} from 'react-native-svg';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import Fonts from '../common/Fonts';
import Loader from '../components/Loader';
import {FORGOT_PASS} from '../utils/urls';
const ForgotPassword = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loading, setLoading] = useState(false);

  //*************************Handling Submit**************************************************/
  const checking = async () => {
    if (!userEmail) {
      setEmailError('Email Required!');
      return;
    } else {
      setEmailError('');
      //**********************Fetching log in***********************//
      setLoading(true);

      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        email: userEmail,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      await fetch(FORGOT_PASS, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setLoading(false);
          if (result.status == '200') {
            console.log('Status=======>', result.message);
            ToastAndroid.show('Mail Sent Successfully!', ToastAndroid.SHORT);
            navigation.navigate('ValidateToken');
          } else {
            ToastAndroid.show('Enter valid email!', ToastAndroid.SHORT);
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
                source={require('../images/forgot-password.png')}
                style={{height: windowHeight / 4, width: windowWidth / 2.5}}
              />
              <Text style={styles.forgotText}>Forgot Password?</Text>
              <Text style={styles.forgotUnderLine}>
                We just need your registered Email id
              </Text>
              <Text style={{...styles.forgotUnderLine, marginBottom: 30}}>
                to send you password reset OTP
              </Text>
            </View>

            <View style={styles.containerEmail}>
              <FormInput
                inputVisible={true}
                labelValue={userEmail}
                onChangeText={(email) => setUserEmail(email)}
                placeholderText="Registered Email id"
                iconType="envelope"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {emailError ? (
                <Text style={styles.errorText}>{emailError}</Text>
              ) : null}
            </View>
            <View style={styles.buttonContainer}>
              <FormButton buttonTitle="Submit" onPress={() => checking()} />
            </View>
            <View style={styles.goBackContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <Text style={styles.goBackText}>
                  {'<<Go Back To Login Page'}
                </Text>
              </TouchableOpacity>
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
  forgotText: {
    fontSize: 27,
    marginBottom: 15,
    color: '#000',
    fontWeight: 'bold',
  },
  forgotUnderLine: {
    fontSize: 15,
    marginHorizontal: 25,
    color: '#000',
  },
  containerEmail: {
    marginTop: 25,
    //backgroundColor: '#FFF',
    alignItems: 'center',
  },

  errorText: {
    color: 'red',
    alignSelf: 'flex-end',
    marginRight: 40,
  },
  buttonContainer: {
    alignSelf: 'center',
    marginVertical: 20,
  },

  goBackContainer: {
    alignSelf: 'center',
    margin: 18,
  },
  goBackText: {
    fontSize: 17,
    marginHorizontal: 15,
    color: '#2e64e5',
  },
});
export default ForgotPassword;
