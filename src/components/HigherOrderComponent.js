import React, {Component} from 'react';
import {ImageBackground, Platform} from 'react-native';

export default (WrappedComponent) => {
  class NewComponent extends Component {
    render() {
      const isAndroid = Platform.OS === 'android';
      return (
        <ImageBackground
          source={require('../images/finalbg.jpg')}
          style={{width: '100%', height: '100%'}}>
          <WrappedComponent {...this.props} isAndroid={isAndroid} />
        </ImageBackground>
      );
    }
  }

  return NewComponent;
};
