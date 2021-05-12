import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Button,
  ScrollView,
  Text,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import stripe from 'tipsi-stripe';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import OrderInput from '../components/OrderInput';
import FormButton from '../components/FormButton';
import Fonts from '../common/Fonts';
import {windowHeight, windowWidth} from '../utils/Dimentions';
import {PAYMENT} from '../utils/urls';
const PaymentScreen = ({route}) => {
  const {price, id} = route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');

  const userToken = useSelector((state) => state.tokenReducer.login_token);
  const data = useSelector((state) => state.userDetails.data);

  const mobile = JSON.stringify(data.mobile);
  stripe.setOptions({
    publishableKey:
      'pk_test_51IT4CmCkkh6XYNoNqkYEwYKTBngd1f4LJY8v9gzTKZHvtBadx9ne7dyPQtV4n3mqwHlNG5g221fBFBZIadqHOu7y00Y0cSXM3L',
  });
  const handleCardPayPress = async () => {
    // const options = {}
    try {
      setLoading(true);
      const token = await stripe.paymentRequestWithCardForm();
      console.log('Token from Card ', token);
      setToken(token);
      setLoading(false);
    } catch (error) {
      console.log('handleCardPayPress Error ', error);
      setLoading(false);
    }
  };
  const handlePayment = () => {
    var myHeaders = new Headers();
    myHeaders.append('access-token-user', userToken);
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      email: data.email,
      OrderId: id,
      amount: price,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(PAYMENT, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status == 200) {
          alert('Payment Successfull!!');
          console.log(result);
          navigation.goBack();
        } else {
          alert('Something Wrong!');
        }
      })
      .catch((error) => console.log('error', error));
  };
  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}>
        <KeyboardAvoidingView style={styles.container}>
          <View style={styles.inner}>
            <Text style={styles.headerText}>Payment</Text>
            <OrderInput
              labelValue={data.email}
              editable={false}
              iconType="envelope"
              inputVisible={true}
            />
            <OrderInput
              labelValue={mobile}
              editable={false}
              iconType="phone"
              inputVisible={true}
            />
            <OrderInput
              labelValue={price}
              editable={false}
              iconType="inr"
              inputVisible={true}
            />
            <OrderInput
              labelValue={firstName}
              onChangeTextValue={(fname) => setFirstName(fname)}
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
            <View style={{marginVertical: 10}}>
              <Button
                title="Enter Card Details Here"
                onPress={handleCardPayPress}
              />
            </View>
            <FormButton buttonTitle="Submit" onPress={handlePayment} />
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
    backgroundColor: '#FFF',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: windowWidth / 1,
    height: windowHeight / 1,
  },
  headerText: {
    fontSize: 25,
    marginBottom: 15,
    color: '#051d5f',
  },
});
export default PaymentScreen;
