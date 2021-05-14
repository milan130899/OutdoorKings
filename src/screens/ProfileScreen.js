import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Button,
  ToastAndroid,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistor} from '../redux/reducer';
import {Profile_Action} from '../redux/actions';
import Header from '../components/Header';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import Fonts from '../common/Fonts';
import Loader from '../components/Loader';
import {windowHeight, windowWidth} from '../utils/Dimentions';
import {VIEW_PROFILE} from '../utils/urls';

const ProfileScreen = ({navigation}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.prfile.userData);

  const [loading, setLoading] = useState(false);
  const userToken = useSelector((state) => state.tokenReducer.login_token);
  useEffect(() => {
    setLoading(true);
    var myHeaders = new Headers();
    myHeaders.append('access-token-user', userToken);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(VIEW_PROFILE, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status == '200') {
          dispatch(Profile_Action(result.data));
        } else {
          ToastAndroid.show('Something Went Wrong!!', ToastAndroid.SHORT);
        }
      })
      .catch((error) => console.log('error', error))
      .finally(() => setLoading(false));
  }, [isFocused]);

  /*********Date Formate**************** */
  const final = new Date(userData.dob);
  const date =
    final.getFullYear() + '-' + (final.getMonth() + 1) + '-' + final.getDate();
  /************Phone number to String******************************** */
  var num = userData.mobile;
  var mobileNum = JSON.stringify(num);

  //*******************************Get Image*********************************************************/
  const [filePath, setFilePath] = useState({});
  const [imageVisible, SetImageVisible] = useState(true);
  const [imageUri, setImageUri] = useState();

  const captureImage = async (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30,
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }

        setFilePath(response);
        const uri = response.uri;
        //console.log('We got uri', uri);
        setImageUri(uri);
        SetImageVisible(false);
      });
    }
  };

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }

      setFilePath(response);
      const uri = response.uri;
      //console.log('We got uri', uri);
      setImageUri(uri);
      SetImageVisible(false);
    });
  };
  //*******************************Get Image*********************************************************/
  const EditClick = () => {
    navigation.navigate('Update_profile', {
      username: userData.username,
      email: userData.email,
      mobile: mobileNum,
      dateOfBirth: date,
      id: userData._id,
    });
  };
  const logout = () => {
    AsyncStorage.clear();
    persistor.purge();
    navigation.navigate('Auth');
  };
  return (
    <>
      <Loader loading={loading} />
      <View>
        <Header
          headerTitle="Profile"
          iconType="menu"
          onPress={() => navigation.openDrawer()}
          editIcon={true}
          onEditPress={EditClick}
        />
      </View>
      {/****************************Profile******************************************************/}

      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={true}>
          <KeyboardAvoidingView style={styles.container}>
            <View style={styles.inner}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                <TouchableOpacity>
                  {/* onPress={() => setModalVisible(true)}> */}

                  <Image
                    source={require('../images/mal1.jpg')}
                    style={styles.profileLogo}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    justifyContent: 'center',
                    marginHorizontal: 20,
                  }}>
                  <Text style={styles.text}>{userData.username}</Text>
                </View>
              </View>
              <View style={styles.fieldContainer}>
                {/* <View style={styles.fieldInside}>
                  <FormInput
                    labelValue={userData.username}
                    editable={false}
                    placeholderText="User Name"
                    iconType="user"
                    autoCapitalize="none"
                    autoCorrect={false}
                    inputVisible={true}
                  />
                </View> */}

                <View style={styles.fieldInside}>
                  <FormInput
                    labelValue={userData.email}
                    editable={false}
                    placeholderText="User Email"
                    iconType="envelope"
                    autoCapitalize="none"
                    autoCorrect={false}
                    inputVisible={true}
                  />
                </View>

                <View style={styles.fieldInside}>
                  <FormInput
                    labelValue={mobileNum}
                    inputVisible={true}
                    editable={false}
                    placeholderText="Phone Number"
                    keyboardType="number-pad"
                    maxLength={10}
                    iconType="phone"
                  />
                </View>
                <View style={styles.fieldInside}>
                  <FormInput
                    labelValue={date}
                    inputVisible={true}
                    iconType="calendar"
                    editable={false}
                  />
                </View>

                <View style={styles.formButton}>
                  <FormButton buttonTitle="Log Out" onPress={logout} />
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
  profileLogo: {
    height: windowHeight / 7,
    width: windowWidth / 3.5,
    borderRadius: 100,
    borderColor: '#000',
    borderWidth: 1,
  },
  inner: {
    //backgroundColor: '#FFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 28,
    marginVertical: 15,
    color: '#051d5f',
    fontWeight: '800',
  },
  fieldContainer: {
    marginVertical: 30,
    width: windowWidth / 1.09,
    height: windowHeight / 2,
  },
  fieldInside: {
    alignItems: 'center',
    marginLeft: 10,
  },
  formButton: {
    alignItems: 'center',
    marginTop: 8,
  },
});

export default ProfileScreen;
