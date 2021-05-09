import * as React from 'react';
import {Button, View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimentions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fonts from '../common/Fonts';
import FormButton from './FormButton';
const Header = ({
  headerTitle,
  logoutIcon,
  iconType,
  navigation,
  onlogOutPress,
  ...rest
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Ionicons
          style={styles.iconStyle}
          name={iconType}
          size={39}
          {...rest}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.headerTitleStyle}>{headerTitle}</Text>
      </View>
      <View>
        <FontAwesome
          style={styles.passIcon}
          name={logoutIcon}
          size={33}
          onPress={onlogOutPress}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headerTitleStyle: {
    fontFamily: Fonts.MomcakeBold,
    fontSize: 35,
  },
  passIcon: {
    height: windowHeight / 22,
    width: windowWidth / 7.5,
    marginLeft: 10,
  },
  iconStyle: {
    height: windowHeight / 18,
    width: windowWidth / 7.9,
    marginLeft: 5,
  },
  container: {
    backgroundColor: '#999',
    height: windowHeight / 17,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth / 1.36,
    height: windowHeight / 17,
  },
});
export default Header;
