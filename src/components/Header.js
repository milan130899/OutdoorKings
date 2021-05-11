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
import {Icon, Header} from 'react-native-elements';
import Fonts from '../common/Fonts';
import FormButton from './FormButton';

const Headers = ({
  headerTitle,
  logoutIcon,
  iconType,
  navigation,
  onlogOutPress,
  ...rest
}) => {
  const RightIcon = () => {
    return (
      <TouchableOpacity {...rest}>
        <Image
          source={require('../images/Menu.png')}
          style={styles.iconStyle}
        />
      </TouchableOpacity>
    );
  };
  const LeftIcon = () => {
    return (
      <Icon
        style={styles.passIcon}
        name={logoutIcon}
        size={26}
        onPress={onlogOutPress}
        color="#FFF"
      />
    );
  };
  return (
    // <View style={styles.container}>
    //   <View>
    //     <TouchableOpacity {...rest}>
    //       <Image
    //         source={require('../images/Menu.png')}
    //         style={styles.iconStyle}
    //       />
    //     </TouchableOpacity>
    //   </View>
    //   <View style={styles.titleContainer}>
    //     <Text style={styles.headerTitleStyle}>{headerTitle}</Text>
    //   </View>
    //   <View>
    //     <FontAwesome
    //       style={styles.passIcon}
    //       name={logoutIcon}
    //       size={33}
    //       onPress={onlogOutPress}
    //     />
    //   </View>
    // </View>
    <Header
      leftComponent={<RightIcon />}
      centerComponent={{
        text: headerTitle,
        style: {
          color: '#fff',
          fontSize: 24,
          fontFamily: Fonts.MomcakeBold,
          marginTop: 5,
        },
      }}
      rightComponent={<LeftIcon />}
    />
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
    height: windowHeight / 35,
    width: windowWidth / 15,
    marginLeft: 5,
    marginTop: 3,
  },
  container: {
    backgroundColor: '#F9F9F9',
    height: windowHeight / 14,
    width: windowWidth / 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth / 1.25,
    height: windowHeight / 17,
    //backgroundColor: '#000',
  },
});
export default Headers;
