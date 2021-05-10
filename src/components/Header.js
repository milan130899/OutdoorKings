import * as React from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimentions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Icon} from 'react-native-elements';
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
        <TouchableOpacity {...rest}>
          <Image
            source={require('../images/Menu.png')}
            style={styles.iconStyle}
          />
        </TouchableOpacity>
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
    fontSize: 28,
  },
  passIcon: {
    height: windowHeight / 22,
    width: windowWidth / 7.5,
    marginLeft: 5,
  },
  iconStyle: {
    height: windowHeight / 25,
    width: windowWidth / 13,
    marginLeft: 8,
  },
  container: {
    backgroundColor: '#F9F9F9',
    height: windowHeight / 14,
    width: windowWidth / 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomColor: '#999',
    borderBottomWidth: 1.4,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth / 1.25,
    height: windowHeight / 17,
    //backgroundColor: '#000',
  },
});
export default Header;
