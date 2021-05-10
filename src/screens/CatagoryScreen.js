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
import {Card} from 'react-native-elements';
import {useSelector, useDispatch} from 'react-redux';
import {Category} from '../redux/actions';
import Fonts from '../common/Fonts';
import Loader from '../components/Loader';
import Header from '../components/Header';
import {windowHeight, windowWidth} from '../utils/Dimentions';
import {VIEW_CATEGORY, IMAGE_RESOURCE} from '../utils/urls';
import FormButton from '../components/FormButton';
const CatagoryScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    fetch(VIEW_CATEGORY)
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
  const Item = ({categoryname, description, image, hordingsize, id}) => {
    const navigation = useNavigation();
    const handleSubmit = () => {
      dispatch(Category({categoryname, id}));
      navigation.navigate('AreaOrder');
    };
    return (
      <Card>
        <Card.Title style={styles.itemTitle}>{categoryname}</Card.Title>

        <View>
          <Image
            style={styles.itemImage}
            source={{uri: `${IMAGE_RESOURCE}${image}`}}
          />

          <Text style={styles.itemDescription}>{description}</Text>
          <Text style={styles.itemDescription}>{hordingsize}</Text>

          <View style={styles.buttonContainer}>
            <FormButton buttonTitle="BOOK" onPress={handleSubmit} />
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
          headerTitle="Category"
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
              categoryname={item.categoryname}
              description={item.description}
              image={item.image}
              hordingsize={item.hordingsize}
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
  itemTitle: {
    fontFamily: Fonts.ChickenPie,
    fontSize: 20,
  },
  itemImage: {
    height: windowHeight / 5.5,
    width: windowWidth / 2,
    marginBottom: 10,
    alignSelf: 'center',
  },
  itemDescription: {
    marginBottom: 5,
    paddingHorizontal: 1,
    fontFamily: Fonts.PlayfairDisplayRegular,
    fontSize: 13.5,
  },
  buttonContainer: {
    alignItems: 'center',
  },
});
export default CatagoryScreen;
