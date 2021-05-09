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
  Alert,
} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimentions';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Svg, {Path} from 'react-native-svg';
import FormButton from '../components/FormButton';
import Fonts from '../common/Fonts';
import Loader from '../components/Loader';
import Header from '../components/Header';
import {FEEDBACK} from '../utils/urls';
import {useSelector} from 'react-redux';
import FormInput from '../components/FormInput';

const Feedback = ({navigation}) => {
  const [feedback, setFeedBack] = useState('');

  const [loading, setLoading] = useState(false);
  const userToken = useSelector((state) => state.tokenReducer.login_token);
  const handleSubmit = () => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append('access-token-user', userToken);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({Message: feedback});

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(FEEDBACK, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status == '200') {
          setLoading(false);
          console.log(result);
          Alert.alert('Thank You!', 'Your Feedback has been submited.');
          setFeedBack('');
          navigation.navigate('Home');
        } else {
          ToastAndroid.show('Something Went Wrong', ToastAndroid.SHORT);
        }
      })
      .catch((error) => console.log('error', error));
  };
  return (
    <>
      <Loader loading={loading} />
      <View>
        <Header
          headerTitle="Feedback"
          iconType="menu"
          onPress={() => navigation.openDrawer()}
        />
      </View>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <Image
            source={require('../images/feed.png')}
            style={{
              height: windowHeight / 4,
              width: windowWidth / 2,
              marginTop: 25,
            }}
          />
          <Text style={styles.feedbackText}>Your Feedback Matters!</Text>
        </View>
        <ScrollView keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView style={{flex: 1, marginTop: 20}}>
            <View style={{alignSelf: 'center'}}>
              <FormInput
                inputVisible={true}
                labelValue={feedback}
                onChangeText={(text) => setFeedBack(text)}
                placeholderText="Enter Here"
                iconType="comments"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            <View style={styles.buttonContainer}>
              <FormButton buttonTitle="submit" onPress={handleSubmit} />
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  feedbackText: {
    fontFamily: Fonts.Backslash,
    fontSize: 30,
    marginTop: 10,
    marginBottom: 15,
    color: '#000',
  },

  buttonContainer: {
    alignSelf: 'center',
    marginTop: 25,
  },
});
export default Feedback;
