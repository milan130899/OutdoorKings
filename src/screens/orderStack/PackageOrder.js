import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Card, PricingCard} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {Package} from '../../redux/actions';
import Fonts from '../../common/Fonts';
import Loader from '../../components/Loader';
import Header from '../../components/Header';
import {VIEW_PACKAGE} from '../../utils/urls';
import FormButton from '../../components/FormButton';
const PackageOrder = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    fetch(VIEW_PACKAGE)
      .then((response) => response.json())
      .then((result) => {
        if (result.status == '200') {
          setData(result.data);
        } else {
          ToastAndroid.show('Something Went Wrong!', ToastAndroid.SHORT);
        }
      })
      .catch((error) => console.error('Error===>', error))
      .finally(() => setLoading(false));
  }, []);
  const Item = ({Packagename, Price, Duration, id}) => {
    const navigation = useNavigation();
    const handleSubmit = () => {
      dispatch(Package({Packagename, id}));
      navigation.navigate('Order');
    };
    return (
      <Card>
        <Card.Title style={styles.packageTitle}>{Packagename}</Card.Title>

        <View>
          <Text style={styles.packageDes}>
            Price:{' '}
            <Text style={{...styles.packageDes, fontWeight: '200'}}>
              {Price}
            </Text>
          </Text>

          <Text style={styles.packageDes}>
            Duration:{' '}
            <Text style={{...styles.packageDes, fontWeight: '200'}}>
              {Duration}
            </Text>
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <FormButton buttonTitle="BOOK" onPress={handleSubmit} />
        </View>
      </Card>
      // <PricingCard
      //   color="#4f9deb"
      //   title={Packagename}
      //   price={'₹ ' + Price}
      //   info={[`Duration : ${Duration}`]}
      //   button={{title: 'BOOK', icon: 'flight-takeoff'}}
      //   onButtonPress={() => handleSubmit()}
      // />
    );
  };
  return (
    <>
      <Loader loading={loading} />
      <View>
        <Header
          headerTitle="Package"
          iconType="menu"
          onPress={() => navigation.openDrawer()}
        />
      </View>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => (
            <Item
              Packagename={item.Packagename}
              Price={item.Price}
              Duration={item.Duration}
              id={item._id}
            />
          )}
        />
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  packageTitle: {
    fontSize: 20,
  },
  divider: {
    borderColor: '#000',
    borderWidth: 0.5,
  },
  packageDes: {
    marginBottom: 10,
    paddingHorizontal: 15,
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center',
  },
});
export default PackageOrder;
