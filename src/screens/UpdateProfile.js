import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  ToastAndroid,
} from 'react-native';

import {useSelector} from 'react-redux';
import Header from '../components/Header';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import Fonts from '../common/Fonts';
import Loader from '../components/Loader';
import {UPDATE_PROFILE} from '../utils/urls';
import {windowHeight, windowWidth} from '../utils/Dimentions';

const UpdateProfile = ({route, navigation}) => {
  const {username, mobile, dateOfBirth, id} = route.params;
  const [userName, setUserName] = useState(username);
  const [phoneNum, setPhoneNum] = useState(mobile);
  const [userdateOfBirth, setDateOfBirth] = useState(dateOfBirth);
  const [loading, setLoading] = useState(false);
  const [usrError, setUsrError] = useState('');
  const [phnError, setPhnError] = useState('');

  const userDob = (date) => {
    setDateOfBirth(date);
  };
  const userToken = useSelector((state) => state.tokenReducer.login_token);

  /************************Update User*************************************/

  const handleUpdate = () => {
    if (!userName) {
      setUsrError('User Name Required!');
    } else {
      setUsrError('');
    }

    if (!phoneNum) {
      setPhnError('Phone Number Required!');
    } else {
      setPhnError('');
      var myHeaders = new Headers();
      myHeaders.append('access-token-user', userToken);

      setLoading(true);
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        username: userName,
        mobile: phoneNum,
        dob: userdateOfBirth,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch(`${UPDATE_PROFILE}${id}`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setLoading(false);
          if (result.status == '200') {
            ToastAndroid.show(
              'Your Profile has been updated!',
              ToastAndroid.SHORT,
            );
            navigation.goBack();
          } else {
            ToastAndroid.show('Something Went Wrong!', ToastAndroid.SHORT);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.log('error', error);
        });
    }
  };

  /************************Update User*************************************/

  return (
    <>
      <Loader loading={loading} />
      <View>
        <Header
          headerTitle="Update"
          iconType="arrow-back"
          onPress={() => navigation.goBack()}
        />
      </View>
      {/****************************Profile******************************************************/}

      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={true}>
          <KeyboardAvoidingView style={styles.container}>
            <View style={styles.inner}>
              {/* <TouchableOpacity>
                 onPress={() => setModalVisible(true)}>

                <Image
                  source={require('../images/one.jpg')}
                  style={styles.profileLogo}
                />
              </TouchableOpacity>*/}
              <Text style={styles.text}>Update Profile</Text>
              <View style={styles.fieldContainer}>
                <View style={styles.fieldInside}>
                  <FormInput
                    labelValue={userName}
                    onChangeTextValue={(text) => setUserName(text)}
                    placeholderText="User Name"
                    iconType="user"
                    autoCapitalize="none"
                    autoCorrect={false}
                    inputVisible={true}
                  />
                  {usrError ? (
                    <Text style={styles.errorText}>{usrError}</Text>
                  ) : null}
                </View>

                <View style={styles.fieldInside}>
                  <FormInput
                    labelValue={phoneNum}
                    onChangeTextValue={(num) => setPhoneNum(num)}
                    inputVisible={true}
                    placeholderText="Phone Number"
                    keyboardType="number-pad"
                    maxLength={10}
                    iconType="phone"
                  />
                  {phnError ? (
                    <Text style={styles.errorText}>{phnError}</Text>
                  ) : null}
                </View>
                <View style={styles.fieldInside}>
                  <FormInput
                    updateDob={true}
                    getDate={userDob}
                    date={dateOfBirth}
                  />
                </View>
                <View style={styles.formButton}>
                  <FormButton buttonTitle="Submit" onPress={handleUpdate} />
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
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
  },
  text: {
    marginTop: 70,
    fontWeight: '800',
    fontSize: 28,
    marginVertical: 15,
    color: '#051d5f',
  },
  fieldContainer: {
    marginTop: 50,
    width: windowWidth / 1.09,
    height: windowHeight / 2,
  },
  fieldInside: {
    alignItems: 'center',
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    alignSelf: 'flex-end',
    marginRight: 10,
  },
  formButton: {
    alignItems: 'center',
    marginTop: 8,
  },
});

export default UpdateProfile;
