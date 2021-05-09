import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from 'react-native';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {Order_Details} from '../redux/actions';
import {Card} from 'react-native-elements';
import {VIEW_ORDER, IMAGE_RESOURCE} from '../utils/urls';
import Fonts from '../common/Fonts';
import Loader from '../components/Loader';
import Header from '../components/Header';
import {windowHeight, windowWidth} from '../utils/Dimentions';
import FormButton from '../components/FormButton';

/**************Set Timeout*************************/
const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
/**************Set Timeout*************************/

const ViewOrders = ({navigation}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const userToken = useSelector((state) => state.tokenReducer.login_token);
  const data = useSelector((state) => state.viewOrder.orderData);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchUser();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  useEffect(() => {
    fetchUser();
  }, [isFocused]);

  const fetchUser = async () => {
    setLoading(true);
    var requestOptions = {
      method: 'GET',
      headers: {'access-token-user': userToken},
      redirect: 'follow',
    };

    await fetch(VIEW_ORDER, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.status == '200') {
          //console.log(JSON.stringify(result));
          dispatch(Order_Details(result.data));
        }
        if (result.status == '400') {
          ToastAndroid.show('No order Placed!', ToastAndroid.SHORT);
        }
      })
      .catch((error) => console.log('error', error))
      .finally(() => setLoading(false));
  };

  const Item = ({
    categoryname,
    area,
    packages,
    price,
    startDate,
    status,
    image,
    counter,
    id,
  }) => {
    const navigation = useNavigation();

    const final = new Date(startDate);
    const date =
      final.getDate() +
      '-' +
      (final.getMonth() + 1) +
      '-' +
      final.getFullYear();

    return (
      <Card>
        <Card.Title style={styles.itemTitle}>{counter}</Card.Title>

        <View>
          <Image
            style={styles.itemImage}
            source={{uri: `${IMAGE_RESOURCE}${image}`}}
          />

          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 0.4}}>
              <Text style={styles.itemDescription}>Catagory</Text>
              <Text style={styles.itemDescription}>Area</Text>
              <Text style={styles.itemDescription}>Package</Text>
              <Text style={styles.itemDescription}>Price</Text>
              <Text style={styles.itemDescription}>Start Date</Text>
              <Text style={styles.itemDescription}>Status</Text>
            </View>
            <View style={{flex: 0.6}}>
              <Text style={styles.itemDesc}>
                :{'     '}
                {categoryname}
              </Text>
              <Text style={styles.itemDesc}>
                :{'     '}
                {area}
              </Text>
              <Text style={styles.itemDesc}>
                :{'     '}
                {packages}
              </Text>
              <Text style={styles.itemDesc}>
                :{'     '}
                {price}
              </Text>
              <Text style={styles.itemDesc}>
                :{'     '}
                {date}
              </Text>
              <Text style={styles.itemDesc}>
                :{'     '}
                {status}
              </Text>
            </View>
          </View>
          {status == 'accept' ? (
            <>
              <View style={styles.buttonContainer}>
                {/* <TouchableOpacity
                  style={styles.buttonStyle}
                  onPress={() => navigation.navigate('Payment', {price, id})}>
                  <Text style={styles.buttonText}>PAYMENT</Text>
                </TouchableOpacity> */}
                <FormButton
                  buttonTitle="Payment"
                  onPress={() => navigation.navigate('Payment', {price, id})}
                />
              </View>
            </>
          ) : status == 'Paid' ? (
            <>
              <View style={styles.buttonContainer}>
                <FormButton
                  buttonTitle="Paid"
                  style={{...styles.buttonStyle}}
                />
              </View>
            </>
          ) : null}
        </View>
      </Card>
    );
  };
  return (
    <>
      <Loader loading={loading} />
      <View>
        <Header
          headerTitle="Orders"
          iconType="menu"
          onPress={() => navigation.openDrawer()}
        />
      </View>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({index, item}) => (
            <Item
              categoryname={item.Category.categoryname}
              area={item.Area.areaname}
              packages={item.Package.Packagename}
              price={item.Package.Price}
              startDate={item.StartDate}
              status={item.OrderStatus}
              image={item.Image}
              id={item._id}
              counter={index + 1}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemTitle: {
    fontFamily: Fonts.ChickenPie,
    fontSize: 20,
  },
  divider: {
    borderColor: '#000',
    borderWidth: 0.5,
  },
  itemImage: {
    height: windowHeight / 5.5,
    width: windowWidth / 2,
    marginBottom: 10,
    alignSelf: 'center',
  },
  itemDescription: {
    marginBottom: 12,
    marginLeft: 13,
    fontFamily: Fonts.PlayfairDisplayRegular,
    fontSize: 13.5,
    fontWeight: 'bold',
  },
  itemDesc: {
    marginBottom: 12,
    fontSize: 13.5,
    marginLeft: 10,
  },

  buttonContainer: {
    alignItems: 'center',
  },
  buttonStyle: {
    backgroundColor: 'green',
    marginTop: 5,
    width: windowWidth / 4.5,
    height: windowHeight / 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  buttonText: {
    color: '#FFF',
    fontFamily: Fonts.Backslash,
    fontSize: 15,
  },
});
export default ViewOrders;
