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
import {VIEW_PACKAGE} from '../utils/urls';
const PackageScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
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
  const Item = ({Packagename, Price, Duration}) => {
    const navigation = useNavigation();
    return (
      <Card>
        <Card.Title style={styles.itemTitle}>{Packagename}</Card.Title>

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
      </Card>
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
  itemTitle: {
    fontSize: 20,
  },

  packageDes: {
    marginBottom: 10,
    paddingHorizontal: 15,
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
export default PackageScreen;
