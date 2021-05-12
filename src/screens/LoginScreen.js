import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  StyleSheet,
  ScrollView,
  ImageBackground,
  KeyboardAvoidingView,
  Alert,
  ToastAndroid,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {Token, User_Details} from '../redux/actions';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from 'jwt-decode';
import {windowHeight, windowWidth} from '../utils/Dimentions';
import {LOG_IN} from '../utils/urls';
import Fonts from '../common/Fonts';
import Loader from '../components/Loader';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const dispatch = useDispatch();
  const isValidEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const checking = async () => {
    if (!email) {
      setEmailError('Email Required');

      return;
    } else if (!isValidEmail(email)) {
      setEmailError('Invalid Email');

      return;
    } else {
      setEmailError('');
    }
    if (!password) {
      setPassError('Password Required');
    } else {
      setPassError('');
      //**********************Fetching log in***********************//
      setLoading(true);

      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        email: email,
        password: password,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      await fetch(LOG_IN, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setLoading(false);
          if (result.status == '200') {
            const token = result.DATA;
            var decoded = jwt_decode(token);
            dispatch(Token(result.DATA)); //dispathicng token
            dispatch(User_Details(decoded.id)); //dispathicng details of user

            AsyncStorage.setItem('user_details', JSON.stringify(decoded.id));
            navigation.navigate('App');
          } else {
            ToastAndroid.show(
              'Email or Password is Incorrect!',
              ToastAndroid.SHORT,
            );
            console.log('Please check your email id or password');
          }
        })
        .catch((error) => {
          setLoading(false);
          ToastAndroid.show('Network Request Failed', ToastAndroid.SHORT);
          console.log('error', error);
        });

      //**********************Fetching log in***********************//
    }
  };
  return (
    <>
      <Loader loading={loading} />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}>
        <KeyboardAvoidingView style={styles.container}>
          <View style={styles.inner}>
            <Image
              source={require('../images/applogo.png')}
              style={styles.logo}
            />
            <Text style={styles.proceedText}>Sign In</Text>

            <FormInput
              inputVisible={true}
              labelValue={email}
              onChangeText={(userEmail) => setEmail(userEmail)}
              placeholderText="Email"
              iconType="user"
              autoCapitalize="none"
              autoCorrect={false}
            />
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}
            <FormInput
              inputVisible={true}
              labelValue={password}
              onChangeText={(userPassword) => setPassword(userPassword)}
              placeholderText="Password"
              iconType="lock"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
            />
            {passError ? (
              <Text style={styles.errorText}>{passError}</Text>
            ) : null}
            <View style={styles.forgotLine}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('ForgotPass');
                }}>
                <Text
                  style={{
                    ...styles.navButtonText,
                    color: 'gray',
                  }}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.formButton}>
              <FormButton buttonTitle="Submit" onPress={() => checking()} />
            </View>
            <View style={styles.accountLine}>
              <Text style={styles.navButtonText}>Don't have an account? </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SignUp');
                }}>
                <Text
                  style={{
                    ...styles.navButtonText,
                    color: '#2e64e5',
                  }}>
                  Create here
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
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    //backgroundColor: '#FFF',
    padding: 20,
    width: windowWidth / 1,
    height: windowHeight / 1,
  },
  logo: {
    height: windowHeight / 5,
    width: windowWidth / 1.5,
    marginTop: 20,
    alignSelf: 'center',
    resizeMode: 'cover',
    position: 'relative',
  },
  proceedText: {
    fontSize: 25,
    marginTop: 45,
    marginBottom: 15,
    color: '#051d5f',
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  forgotLine: {
    alignSelf: 'flex-end',
  },
  formButton: {
    alignSelf: 'center',
    marginVertical: 50,
  },
  accountLine: {
    flexDirection: 'row',
    marginTop: 70,
  },
  navButtonText: {
    fontSize: 13,
    color: 'gray',
  },
});
export default LoginScreen;
