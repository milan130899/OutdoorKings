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
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import {useDispatch} from 'react-redux';
import {Area} from '../../redux/actions';
import Fonts from '../../common/Fonts';
import Loader from '../../components/Loader';
import Header from '../../components/Header';
import {VIEW_AREA} from '../../utils/urls';
import FormButton from '../../components/FormButton';
const AreaOrder = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    fetch(VIEW_AREA)
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
  const Item = ({areaname, pincode, id}) => {
    const navigation = useNavigation();
    const handleSubmit = () => {
      dispatch(Area({areaname, id}));
      navigation.navigate('PackageOrder');
    };
    return (
      <Card>
        <Card.Title style={styles.areaTitle}>{areaname}</Card.Title>

        <View>
          <Text style={styles.areaPin}>
            Pincode:{' '}
            <Text style={{...styles.areaPin, fontWeight: '200'}}>
              {pincode}
            </Text>
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <FormButton buttonTitle="BOOK" onPress={handleSubmit} />
        </View>
      </Card>
    );
  };
  return (
    <>
      <Loader loading={loading} />
      <View>
        <Header
          headerTitle="Area"
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
              areaname={item.areaname}
              pincode={item.pincode}
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
  areaTitle: {
    fontFamily: Fonts.ChickenPie,
    fontSize: 20,
  },
  divider: {
    borderColor: '#000',
    borderWidth: 0.5,
  },
  areaPin: {
    marginBottom: 10,
    paddingHorizontal: 10,
    fontFamily: Fonts.PlayfairDisplayRegular,
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonContainer: {
    alignItems: 'center',
  },
});
export default AreaOrder;
