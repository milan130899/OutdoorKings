import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimentions';
import Icon from 'react-native-vector-icons/FontAwesome';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
const FormInput = ({
  labelValue,
  onChangeTextValue,
  placeholderText,
  iconType,
  dateOfBirth,
  updateDob,
  inputVisible,
  radioVisible,
  getDate,
  getGender,
  date,
  ...rest
}) => {
  //***********************Modal Date Picker**********************************************/
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [userDateOfBirth, setUserDateOfBirth] = useState('Date of Birth');
  const [updateDate, setUpdateDate] = useState(date);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleDateConfirm = (date) => {
    hideDatePicker();
    convertDate(date);
  };

  function convertDate(str) {
    var date = new Date(str),
      mnth = ('0' + (date.getMonth() + 1)).slice(-2),
      day = ('0' + date.getDate()).slice(-2);

    let finalDate = [date.getFullYear(), mnth, day].join('-');
    setUpdateDate(finalDate);
    setUserDateOfBirth(finalDate);
    getDate(finalDate);
  }
  //***********************Modal Date Picker**********************************************/
  return (
    <>
      {/* *******************Inputs************************* */}
      {inputVisible ? (
        <View style={styles.inputContainer}>
          <View style={styles.iconStyle}>
            <Icon name={iconType} size={19} color="#666" />
          </View>
          <TextInput
            value={labelValue}
            style={styles.input}
            onChangeText={onChangeTextValue}
            numberOfLines={1}
            placeholder={placeholderText}
            placeholderTextColor="#666"
            {...rest}
          />
        </View>
      ) : null}
      {/* *******************Date Picker************************* */}
      {dateOfBirth ? (
        <View style={styles.inputContainer}>
          <View style={styles.iconStyle}>
            <TouchableOpacity onPress={showDatePicker}>
              <Icon name="calendar" size={19} color="#666" />
            </TouchableOpacity>
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
            maximumDate={new Date(Date.now())}
          />

          <TouchableOpacity onPress={showDatePicker}>
            <Text style={styles.dateOfBirth}>{userDateOfBirth}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {/* *******************Date Picker************************* */}
      {updateDob ? (
        <View style={styles.inputContainer}>
          <View style={styles.iconStyle}>
            <TouchableOpacity onPress={showDatePicker}>
              <Icon name="calendar" size={19} color="#666" />
            </TouchableOpacity>
          </View>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={hideDatePicker}
            maximumDate={new Date(Date.now())}
          />

          <TouchableOpacity onPress={showDatePicker}>
            <Text style={styles.dateOfBirth}>{updateDate}</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 5,
    marginBottom: 10,
    width: '100%',
    width: windowWidth / 1.07,
    height: windowHeight / 17,
    borderColor: '#ccc',
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    //right: 8,
  },
  iconStyle: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: '#ccc',
    borderRightWidth: 1,
    width: windowWidth / 9,
  },
  dateOfBirth: {
    fontSize: 17,
    paddingLeft: 10,
    fontFamily: 'Lato-Regular',
    color: '#666',
  },
  input: {
    padding: 5,
    paddingLeft: 10,
    flex: 1,
    fontSize: 17,
    fontFamily: 'Lato-Regular',
    color: '#666',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FormInput;
