import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Button,
  Image,
  StyleSheet,
  Dimensions,
  FlatList,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import {Token} from '../redux/actions';
import {windowHeight, windowWidth} from '../utils/Dimentions';
import Header from '../components/Header';
import Fonts from '../common/Fonts';

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.75);
const ITEM_HEIGHT = Math.round((ITEM_WIDTH * 3) / 5.5);
const DATA = [
  {
    image: require('../images/Banner1.jpg'),
  },
  {
    image: require('../images/Banner2.jpg'),
  },
  {
    image: require('../images/Banner3.jpg'),
  },
  {
    image: require('../images/Banner4.jpg'),
  },

  {
    image: require('../images/Banner5.jpg'),
  },
];

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const profileClick = () => {
    navigation.navigate('Profile');
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.itemContainer}>
        <Image
          source={item.image}
          style={{width: ITEM_WIDTH, height: ITEM_HEIGHT, borderRadius: 20}}
        />
      </View>
    );
  };

  return (
    <>
      <View>
        <Header
          headerTitle="Home"
          iconType="menu"
          onPress={() => navigation.openDrawer()}
          personIcon={true}
          onProfilePress={profileClick}
        />
      </View>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView>
          {/* **************************Slider Of images************************** */}
          <View>
            <Carousel
              data={DATA}
              renderItem={renderItem}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
              containerCustomStyle={styles.carouselContainer}
              inactiveSlideShift={0}
              //onSnapToItem={(index) => setIndex({index})}
              useScrollView={true}
              autoplay={true}
              autoplayDelay={1000}
              autoplayInterval={3000}
              loop={true}
            />
          </View>
          {/* **************************Slider Of images************************** */}
          {/* **************************Teams************************** */}
          <View style={styles.teamContainer}>
            <Text style={styles.teamHeader}>Our Team</Text>
            <View style={styles.teamInside}>
              <Image
                source={require('../images/avtar_1.jpeg')}
                style={styles.teamAvtar}
              />
              <Text style={styles.teamNames}>Mitul Marfatia</Text>
            </View>
            <View style={styles.teamInside}>
              <Image
                source={require('../images/avtar_2.jpg')}
                style={styles.teamAvtar}
              />
              <Text style={styles.teamNames}>Parth Gohel</Text>
            </View>
            <View style={styles.teamInside}>
              <Image
                source={require('../images/avtar_3.jpg')}
                style={styles.teamAvtar}
              />
              <Text style={styles.teamNames}>Parth Parmar</Text>
            </View>
          </View>

          {/* **************************Teams************************** */}
          {/* **************************Services************************** */}
          <View style={styles.serviceContainer}>
            <Text style={styles.serviceHeader}>Services</Text>
            <View style={styles.serviceRowContainer}>
              <View style={styles.serviceBox}>
                <View style={styles.serviceIcon}>
                  <FontAwesome name="home" size={40} color="#000" />
                </View>
                <Text style={styles.serviceFont}>
                  Music is an art form whose medium is sound and silence.
                  Generally, a song is considered the smallest standalone work
                  of music, especially when involving singing.
                </Text>
              </View>
              <View style={{...styles.serviceBox, marginLeft: 7}}>
                <View style={styles.serviceIcon}>
                  <FontAwesome name="lock" size={40} color="#000" />
                </View>
                <Text style={styles.serviceFont}>
                  Music is an art form whose medium is sound and silence.
                  Generally, a song is considered the smallest standalone work
                  of music, especially when involving singing.
                </Text>
              </View>
            </View>
            <View style={styles.serviceRowContainer}>
              <View style={styles.serviceBox}>
                <View style={styles.serviceIcon}>
                  <FontAwesome name="rocket" size={40} color="#000" />
                </View>
                <Text style={styles.serviceFont}>
                  Music is an art form whose medium is sound and silence.
                  Generally, a song is considered the smallest standalone work
                  of music, especially when involving singing.
                </Text>
              </View>
              <View style={{...styles.serviceBox, marginLeft: 7}}>
                <View style={styles.serviceIcon}>
                  <FontAwesome name="gift" size={40} color="#000" />
                </View>
                <Text style={styles.serviceFont}>
                  Music is an art form whose medium is sound and silence.
                  Generally, a song is considered the smallest standalone work
                  of music, especially when involving singing.
                </Text>
              </View>
            </View>
          </View>
          {/* **************************Services************************** */}
          <Text
            style={{
              textAlign: 'center',
              marginVertical: 20,
              fontSize: 15,
            }}>
            2021 Outdoor Kings. © All copyRights reserved
          </Text>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  carouselContainer: {
    marginVertical: 15,
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: 15,
  },
  teamContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamAvtar: {
    width: windowWidth / 1.3,
    height: windowHeight / 4.5,
    borderRadius: 20,
  },
  teamInside: {
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 15,
    },
    shadowOpacity: 50,
    shadowRadius: 19,
    elevation: 5,
    borderRadius: 20,
  },
  teamHeader: {
    fontWeight: 'bold',
    fontSize: 21,
    marginTop: 10,
  },
  teamNames: {
    fontSize: 15,
    marginVertical: 5,
  },
  serviceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  serviceHeader: {
    fontSize: 21,
    fontWeight: 'bold',
  },
  serviceRowContainer: {
    height: windowHeight / 4,
    width: windowWidth / 1.08,
    flexDirection: 'row',
    marginTop: 10,
  },
  serviceBox: {
    width: windowWidth / 2.2,
    backgroundColor: '#EEEDED',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 20,
    shadowRadius: 9,
    elevation: 5,
    borderRadius: 20,
  },
  serviceIcon: {
    alignItems: 'center',
    marginTop: 10,
  },
  serviceFont: {
    textAlign: 'center',
  },
});
export default HomeScreen;
