import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Alert,
  Button,
  ToastAndroid,
} from 'react-native';

import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {useState} from 'react';
import Fonts from '../common/Fonts';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RadioButton} from 'react-native-paper';
import {windowHeight, windowWidth} from '../utils/Dimentions';
//import {connect} from 'react-redux';
import {REGISTER} from '../utils/urls';
import Loader from '../components/Loader';

var userDetail = {email: '', password: ''};
var errorEmail = '';
var errorPassword = '';
const Registration = ({navigation}) => {
  const [email, setEmail] = useState();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();
  const [phoneNum, setPhoneNum] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const [userGender, setUserGender] = useState('Male');
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');

  /*****************************Email and password validating***************************/
  const isValidEmail = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  const setUserEmail = (text) => {
    userDetail.email = text;
    if (userDetail.email === '') {
      errorEmail = 'Email Requied!';
      props.emailErr(errorEmail);
      validEmail = false;
    } else if (!isValidEmail(userDetail.email)) {
      errorEmail = 'Invalid Email!';
      props.emailErr(errorEmail);
      validEmail = false;
    } else {
      errorEmail = '';
      props.emailErr(errorEmail);
      return (validEmail = true);
    }
  };
  const setUserPass = (text) => {
    userDetail.password = text;
    if (userDetail.password === '') {
      errorPassword = 'Password Requied!';
      props.passwordErr(errorPassword);
      validPassword = false;
    } else if (userDetail.password.length < 5) {
      errorPassword = 'Minimum 5 chars required';
      props.passwordErr(errorPassword);
      validPassword = false;
    } else {
      errorPassword = '';
      props.passwordErr(errorPassword);
      return (validPassword = true);
    }
  };
  /*****************************Email and password validating***************************/
  const checking = () => {
    if (!email) {
      setEmailError('Email Requied');

      return;
    } else if (!isValidEmail(email)) {
      setEmailError('Invalid Email');

      return;
    } else {
      setEmailError('');
    }
    if (!password) {
      setPassError('Password Requied');
    } else if (password.length < 6) {
      setPassError('minimum 5 chars required');

      return;
    } else {
      setPassError('');
      /****************Register Api**************************** */
      setLoading(true);
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        username: userName,
        email: email,
        dob: dateOfBirth,
        mobile: phoneNum,
        gender: userGender,
        password: password,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch(REGISTER, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setLoading(false);
          if (result.status === '200') {
            Alert.alert(
              'Registered SuccessFull!',
              'Your Profile Has Been Created!!',
            );
            navigation.navigate('Login');
          } else {
            ToastAndroid.show('User Is Already Exist !', ToastAndroid.SHORT);
            console.log('Please check your email id or password');
          }
        })
        .catch((error) => console.log('error', error));
      /****************Register Api**************************** */
    }
  };
  const userDob = (date) => {
    setDateOfBirth(date);
  };

  return (
    <>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}>
        <KeyboardAvoidingView style={styles.container}>
          <View style={styles.inner}>
            <Text style={styles.registrationText}>Sign Up</Text>
            <FormInput
              labelValue={userName}
              onChangeTextValue={(userName) => setUserName(userName)}
              placeholderText="User Name"
              iconType="user"
              autoCapitalize="none"
              autoCorrect={false}
              inputVisible={true}
            />
            <FormInput
              labelValue={email}
              onChangeTextValue={(userEmail) => setEmail(userEmail)}
              placeholderText="Email"
              iconType="envelope"
              autoCapitalize="none"
              autoCorrect={false}
              inputVisible={true}
            />
            {emailError ? (
              <Text style={styles.errorText}>{emailError}</Text>
            ) : null}

            <FormInput
              labelValue={password}
              onChangeTextValue={(userPassword) => setPassword(userPassword)}
              placeholderText="Password"
              iconType="lock"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={true}
              inputVisible={true}
            />
            {passError ? (
              <Text style={styles.errorText}>{passError}</Text>
            ) : null}

            <FormInput dateOfBirth={true} getDate={userDob} />
            <FormInput
              inputVisible={true}
              onChangeTextValue={(userPhone) => setPhoneNum(userPhone)}
              placeholderText="Phone Number"
              keyboardType="number-pad"
              maxLength={10}
              iconType="phone"
            />
            {/*****************Radio Button*****************************8*/}
            <View style={styles.inputContainer}>
              <View style={styles.iconStyle}>
                <Icon name="male" size={17} color="#999" />
              </View>

              <RadioButton
                value="male"
                status={userGender === 'Male' ? 'checked' : 'unchecked'}
                onPress={() => setUserGender('Male')}
                color="#38A5ED"
                uncheckedColor="#000"
              />
              <Text style={styles.radioButton}>Male</Text>
              <RadioButton
                value="female"
                status={userGender === 'Female' ? 'checked' : 'unchecked'}
                onPress={() => setUserGender('Female')}
                color="#38A5ED"
                uncheckedColor="#000"
              />
              <Text style={styles.radioButton}>Female</Text>
            </View>
            {/*****************Radio Button*****************************8*/}
            <View style={styles.formButton}>
              <FormButton buttonTitle="Sign Up" onPress={checking} />
            </View>
            <View style={styles.signInText}>
              <Text style={styles.navButtonText}>
                Already have an account?{' '}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Login');
                }}>
                <Text
                  style={{
                    ...styles.navButtonText,
                    color: '#2e64e5',
                  }}>
                  Sing in here
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
    //backgroundColor: '#FFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: windowWidth / 1,
    height: windowHeight / 1,
  },
  registrationText: {
    fontSize: 25,
    marginBottom: 30,
    color: '#051d5f',
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  navButtonText: {
    fontSize: 13,
    color: 'gray',
    marginTop: 5,
  },
  signInText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth / 1,
    marginTop: 45,
  },
  formButton: {
    alignSelf: 'center',
    marginVertical: 35,
  },
  /********************Radio Styles*********************************** */
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    width: windowWidth / 1.07,
    height: windowHeight / 16,
    borderColor: '#ccc',
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 10,
    },
    shadowOpacity: 10,
    shadowRadius: 19,
  },
  iconStyle: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth / 9,
  },
  radioButton: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'Lato-Regular',
    color: '#666',
    justifyContent: 'center',
    alignItems: 'center',
  },
  /********************Radio Styles*********************************** */
});
// const mapStateToProps = (state) => ({
//   email: state.signUpReducer.email,
//   password: state.signUpReducer.password,
// });

// const mapDispatchToProps = (dispatch) => {
//   return {
//     submit: (userDetail) => {
//       dispatch(Submit(userDetail));
//     },
//     emailErr: (errorEmail) => {
//       dispatch({type: EMAIL_ERROR, payload: errorEmail});
//     },
//     passwordErr: (errorPassword) => {
//       dispatch({type: PASSWORD_ERROR, payload: errorPassword});
//     },
//   };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
export default Registration;
