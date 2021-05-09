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
import {Card, ListItem, Button, Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Fonts from '../common/Fonts';
import Loader from '../components/Loader';
import Header from '../components/Header';
const ViewFeedback = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const userToken = AsyncStorage.getItem('user_token');

  //   useEffect(() => {
  //     setLoading(true);
  //     var myHeaders = new Headers();
  //     myHeaders.append('access-token-user', userToken);

  //     var requestOptions = {
  //       method: 'GET',
  //       headers: myHeaders,
  //       redirect: 'follow',
  //     };

  //     fetch('http://192.168.1.39:3030/R1/Orders/view-orders', requestOptions)
  //       .then((response) => response.json())
  //       .then((result) => {
  //         if (result.status == '200') {
  //           setData(result.data);
  //           console.log('setted Data=====>', data);
  //         } else {
  //           ToastAndroid.show('Something Went Wrong!', ToastAndroid.SHORT);
  //         }
  //       })
  //       .catch((error) => console.log('error', error))
  //       .finally(() => setLoading(false));
  //   }, []);

  const DATA = [
    {
      categoryName:
        'A billboard is a large outdoor advertising structure, typically found in high-traffic areas such as alongside busy roads. Billboards present large advertisements to passing pedestrians and drivers.',
    },
    {
      categoryName:
        'Transit media is a form of out-of-home advertising that displays advertisements in or on the outside of vehicles. such as on the side of or above the seats of a bus or tram.',
    },
    {
      categoryName:
        'They are also called as pole banners as they are placed on the street lights. The interesting feature of the lamp post banners is that the same ad or banner can put on a number of street lights in a sequence.',
    },
  ];

  const Item = ({message, counter}) => {
    return (
      <Card>
        <Card.Title style={styles.itemTitle}>{counter}</Card.Title>
        <Card.Divider style={styles.divider} />

        <View>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 0.3, justifyContent: 'center'}}>
              <Text style={styles.itemDescription}>Message{'  '}:</Text>
            </View>
            <View style={{flex: 0.7}}>
              <Text style={styles.itemDesc}>{message}</Text>
            </View>
          </View>
        </View>
      </Card>
    );
  };
  return (
    <>
      <Loader loading={loading} />
      <View>
        <Header
          headerTitle="Feedbacks"
          iconType="menu"
          onPress={() => navigation.openDrawer()}
        />
      </View>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({index, item}) => (
            <Item message={item.categoryName} counter={index + 1} />
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
    fontFamily: Fonts.ChickenPie,
    fontSize: 20,
  },
  divider: {
    borderColor: '#000',
    borderWidth: 0.5,
  },
  itemImage: {
    height: 200,
    width: 310,
    marginBottom: 15,
    marginLeft: 10,
  },
  itemDescription: {
    marginBottom: 12,
    //paddingHorizontal: 15,
    // textAlign: 'center',
    marginLeft: 13,
    fontFamily: Fonts.PlayfairDisplayRegular,
    fontSize: 16,
  },
  itemDesc: {
    marginBottom: 12,
    //paddingHorizontal: 15,
    // textAlign: 'center',

    fontFamily: Fonts.PlayfairDisplayRegular,
    fontSize: 16,
  },
});
export default ViewFeedback;
