import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Pressable,
  Modal,
  Alert,
  ToastAndroid,
  KeyboardAvoidingView,
} from 'react-native';
import {ProgressSteps, ProgressStep} from 'react-native-progress-steps';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useSelector, useDispatch} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../../components/Header';
import Fonts from '../../common/Fonts';
import OrderInput from '../../components/OrderInput';
import Loader from '../../components/Loader';
import {MAKE_ORDER} from '../../utils/urls';
import {windowHeight, windowWidth} from '../../utils/Dimentions';
const OrderDetails = ({navigation}) => {
  //Setting All Inputs
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [startDate, setStartDate] = useState('');
  const [description, setDescription] = useState();
  //Selecting Data from Reducer
  const categoryName = useSelector((state) => state.orderReducer.categoryname);
  const categoryId = useSelector((state) => state.orderReducer.category_id);
  const areaName = useSelector((state) => state.orderReducer.areaname);
  const areaId = useSelector((state) => state.orderReducer.area_id);
  const packageName = useSelector((state) => state.orderReducer.Packagename);
  const packageId = useSelector((state) => state.orderReducer.package_id);
  const userToken = useSelector((state) => state.tokenReducer.login_token);
  //***********************************************************************************/
  const [validation, setValidation] = useState(true);
  const [loading, setLoading] = useState(false);

  const defaultScrollViewProps = {
    //  keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: {
      flex: 1,
      justifyContent: 'center',
    },
  };
  const dateOfStart = (date) => {
    setStartDate(date);
  };

  const onPersonalDetail = () => {
    if (!firstName) {
      alert('First Name is Required!');
    } else if (!lastName) {
      alert('Last Name is Required!');
    } else if (!address) {
      alert('Address is Required!');
    } else {
      setValidation(false);
    }
  };
  const onOrderDetail = () => {
    setValidation(true);
    if (!filePath.uri) {
      alert('Image Is Required!');
    } else {
      setValidation(false);
    }
  };
  const onPrevStep = () => {
    console.log('called previous step');
  };

  const onSubmitSteps = () => {
    setValidation(true);
    if (!startDate) {
      alert('Start Date is Required!');
    } else if (!description) {
      alert('Your Description is Reqired!');
    } else {
      setValidation(false);
      /**********************Place Order Api*************************************************/

      setLoading(true);
      var photo = {
        uri: filePath.uri,
        type: filePath.type,
        name: filePath.fileName,
      };
      var formdata = new FormData();
      formdata.append('Image', photo);
      formdata.append('FirstName', firstName);
      formdata.append('LastName', lastName);
      formdata.append('Address', address);
      formdata.append('Discription', description);
      formdata.append('CatId', categoryId);
      formdata.append('AreaId', areaId);
      formdata.append('FindPackageId', packageId);
      formdata.append('StartDate', startDate);
      var requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow',
        headers: {
          'access-token-user': userToken,
        },
      };

      fetch(MAKE_ORDER, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          setLoading(false);
          //console.log('Order Done==>', result);
          if (result.status == '200') {
            Alert.alert(
              'Order Placed!',
              'Your Order Has Been Placed Successfully!!',
            );
            navigation.navigate('Success');
          } else {
            ToastAndroid.show('Something went Wrong !', ToastAndroid.SHORT);
            console.log('Something went Wrong !');
          }
        })
        .catch((error) => console.log('error', error));
    }
    /**********************Place Order Api*************************************************/
  };
  /*****************Image Selection**********************************/
  const [modalVisible, setModalVisible] = useState(false);
  const [imageVisible, SetImageVisible] = useState(true);
  const [filePath, setFilePath] = useState({});

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

    launchCamera(options, (response) => {
      //console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled camera picker');
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
      SetImageVisible(false);
      setModalVisible(!modalVisible); // Hiding Modal After I got Image
    });
  };

  const chooseFile = (type) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      //console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled camera picker');
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
      SetImageVisible(false);
      setModalVisible(!modalVisible); // Hiding Modal After I got Image
    });
  };
  /*****************Image Selection**********************************/
  return (
    <>
      <Loader loading={loading} />
      {/* *********Modal View************************** */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Choose Photo</Text>
            <Pressable
              style={styles.camerabutton}
              onPress={() => captureImage('photo')}>
              <Text style={styles.textStyle}>Camera</Text>
            </Pressable>
            <Pressable
              style={styles.camerabutton}
              onPress={() => chooseFile('photo')}>
              <Text style={styles.textStyle}>Gallery</Text>
            </Pressable>
            <Pressable
              style={styles.button}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* *********Modal View************************** */}
      <View>
        <Header
          headerTitle="Order"
          iconType="menu"
          onPress={() => navigation.openDrawer()}
        />
      </View>

      <View style={{flex: 1}}>
        <ProgressSteps>
          <ProgressStep
            label="Personal Details"
            onNext={onPersonalDetail}
            onPrevious={onPrevStep}
            scrollViewProps={defaultScrollViewProps}
            nextBtnTextStyle={styles.nextBtnText}
            errors={validation}>
            <ScrollView keyboardShouldPersistTaps="handled">
              <KeyboardAvoidingView>
                <View style={styles.stepperContainer}>
                  <Text style={styles.detailsText}>Personal Details</Text>

                  <OrderInput
                    labelValue={firstName}
                    onChangeTextValue={(fName) => setFirstName(fName)}
                    placeholderText="First Name"
                    iconType="user-circle"
                    autoCapitalize="none"
                    autoCorrect={false}
                    inputVisible={true}
                  />
                  <OrderInput
                    labelValue={lastName}
                    onChangeTextValue={(lName) => setLastName(lName)}
                    placeholderText="Last Name"
                    iconType="user-circle-o"
                    autoCapitalize="none"
                    autoCorrect={false}
                    inputVisible={true}
                  />
                  <OrderInput
                    labelValue={address}
                    onChangeTextValue={(add) => setAddress(add)}
                    placeholderText="Address"
                    iconType="address-book"
                    autoCapitalize="none"
                    autoCorrect={false}
                    inputVisible={true}
                  />
                </View>
              </KeyboardAvoidingView>
            </ScrollView>
          </ProgressStep>

          <ProgressStep
            label="Order Details"
            onNext={onOrderDetail}
            onPrevious={onPrevStep}
            scrollViewProps={defaultScrollViewProps}
            nextBtnTextStyle={styles.nextBtnText}
            previousBtnTextStyle={styles.nextBtnText}
            errors={validation}>
            <ScrollView keyboardShouldPersistTaps="handled">
              <KeyboardAvoidingView>
                <View style={styles.stepperContainer}>
                  <Text style={styles.detailsText}>Order Details</Text>

                  <OrderInput
                    labelValue={categoryName}
                    placeholderText="Category Name"
                    iconType="product-hunt"
                    autoCapitalize="none"
                    autoCorrect={false}
                    inputVisible={true}
                    editable={false}
                  />
                  <OrderInput
                    labelValue={areaName}
                    placeholderText="Area Name"
                    iconType="area-chart"
                    autoCapitalize="none"
                    autoCorrect={false}
                    inputVisible={true}
                    editable={false}
                  />
                  <OrderInput
                    labelValue={packageName}
                    placeholderText="Package Name"
                    iconType="inr"
                    autoCapitalize="none"
                    autoCorrect={false}
                    inputVisible={true}
                    editable={false}
                  />
                  <TouchableOpacity onPress={() => setModalVisible(true)}>
                    {imageVisible ? (
                      <Image
                        source={require('../../images/product.jpg')}
                        style={styles.productLogo}
                      />
                    ) : (
                      <Image
                        source={{uri: filePath.uri}}
                        style={styles.productLogo}
                      />
                    )}
                  </TouchableOpacity>
                </View>
              </KeyboardAvoidingView>
            </ScrollView>
          </ProgressStep>

          <ProgressStep
            label="Duration"
            onSubmit={onSubmitSteps}
            onPrevious={onPrevStep}
            scrollViewProps={defaultScrollViewProps}
            nextBtnTextStyle={styles.nextBtnText}
            previousBtnTextStyle={styles.nextBtnText}
            finishBtnText="Place Order">
            <ScrollView keyboardShouldPersistTaps="handled">
              <KeyboardAvoidingView>
                <View style={styles.stepperContainer}>
                  <Text style={styles.detailsText}>Start Date</Text>
                  <OrderInput startDate={true} getDate={dateOfStart} />
                  <OrderInput
                    inputVisible={true}
                    placeholderText="Description"
                    iconType="sort-amount-desc"
                    onChangeTextValue={(value) => setDescription(value)}
                    autoCapitalize="none"
                    autoCorrect={false}
                  />
                </View>
              </KeyboardAvoidingView>
            </ScrollView>
          </ProgressStep>
        </ProgressSteps>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  nextBtnStyles: {
    backgroundColor: '#1D9CE5',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 15,
  },
  nextBtnText: {
    color: '#1D9CE5',
    fontFamily: Fonts.MomcakeBold,
    fontSize: 22,
  },
  detailsText: {
    fontFamily: Fonts.Backslash,
    fontSize: 25,
    marginBottom: 10,
    color: '#000',
  },
  stepperContainer: {
    marginTop: 50,
    alignItems: 'center',
    //backgroundColor: '#FFF',
    justifyContent: 'center',
  },
  /*************Modal Style******************************************/
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#999',
    marginTop: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    paddingHorizontal: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 28,
    elevation: 2,
    marginVertical: 5,
    backgroundColor: '#003E66',
  },
  camerabutton: {
    borderRadius: 20,
    padding: 10,
    marginVertical: 5,
    paddingHorizontal: 25,
    elevation: 2,
    backgroundColor: '#7BB6EA',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    fontSize: 25,
    fontFamily: Fonts.romanus,
    textAlign: 'center',
  },
  /*************Modal Style******************************************/
  productLogo: {
    height: 130,
    width: 160,
    resizeMode: 'cover',
    position: 'relative',
    borderRadius: 40,
    borderColor: '#000',
    borderWidth: 1.5,
    marginTop: 15,
  },
});
export default OrderDetails;
