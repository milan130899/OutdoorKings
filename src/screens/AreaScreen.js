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
import Fonts from '../common/Fonts';
import Loader from '../components/Loader';
import Header from '../components/Header';
import {VIEW_AREA} from '../utils/urls';
const AreaScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
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
  const Item = ({areaname, pincode}) => {
    const navigation = useNavigation();
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
            <Item areaname={item.areaname} pincode={item.pincode} />
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
    fontSize: 20,
  },

  areaPin: {
    marginBottom: 10,
    paddingHorizontal: 10,
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
export default AreaScreen;
