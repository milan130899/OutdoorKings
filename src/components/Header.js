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
  personIcon,
  iconType,
  navigation,
  onProfilePress,
  editIcon,
  onEditPress,
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
      <TouchableOpacity onPress={onProfilePress}>
        <Image
          source={require('../images/mal1.jpg')}
          style={styles.rightIcon}
        />
      </TouchableOpacity>
    );
  };
  const EditIcon = () => {
    return (
      <Icon
        style={styles.passIcon}
        name="edit"
        size={26}
        onPress={onEditPress}
        color="#FFF"
      />
    );
  };
  return (
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
      rightComponent={
        personIcon ? <LeftIcon /> : editIcon ? <EditIcon /> : null
      }
    />
  );
};
const styles = StyleSheet.create({
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
  rightIcon: {
    height: windowHeight / 30,
    width: windowWidth / 15,
    marginTop: 3,
    borderRadius: 50,
  },
});
export default Headers;
