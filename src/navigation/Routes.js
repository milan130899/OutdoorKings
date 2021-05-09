import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {View} from 'react-native';
import Icons from 'react-native-vector-icons/FontAwesome';
import HigherOrderComponent from '../components/HigherOrderComponent';
import SplashScreen from '../components/SpalshScreen';
import LoginScreen from '../screens/LoginScreen';
import Registration from '../screens/Registration';
import ForgotPassword from '../screens/ForgotPassword';
import ValidateToken from '../screens/ValidateToken';
import ResetCongrates from '../screens/ResetCongrates';

import HomeScreen from '../screens/HomeScreen';
import CatagoryScreen from '../screens/CatagoryScreen';
import AreaOrder from '../screens/orderStack/AreaOrder';
import PackageOrder from '../screens/orderStack/PackageOrder';
import OrderDetails from '../screens/orderStack/OrderDetails';
import OrderSuccess from '../screens/orderStack/OrderSuccess';
import AreaScreen from '../screens/AreaScreen';
import PackageScreen from '../screens/PackageScreen';
import ViewOrders from '../screens/ViewOrders';
import Feedback from '../screens/Feedback';
import ViewFeedback from '../screens/ViewFeedback';
import ProfileScreen from '../screens/ProfileScreen';
import UpdateProfile from '../screens/UpdateProfile';
import PaymentScreen from '../screens/PaymentScreen';
const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const DrawerApp = createDrawerNavigator();
const OrderStack = createStackNavigator();
const PofileStack = createStackNavigator();
const PayStack = createStackNavigator();
const Auth = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <AuthStack.Screen
        name="Login"
        component={HigherOrderComponent(LoginScreen)}
      />
      <AuthStack.Screen
        name="SignUp"
        component={HigherOrderComponent(Registration)}
      />
      <AuthStack.Screen
        name="ForgotPass"
        component={HigherOrderComponent(ForgotPassword)}
      />
      <AuthStack.Screen
        name="ValidateToken"
        component={HigherOrderComponent(ValidateToken)}
      />
      <AuthStack.Screen name="Congrats" component={ResetCongrates} />
    </AuthStack.Navigator>
  );
};

const App = () => {
  return (
    <DrawerApp.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <DrawerApp.Screen
        name="Home"
        component={HigherOrderComponent(HomeScreen)}
        options={{
          drawerIcon: ({focused}) => (
            <Icons
              name="home"
              size={17}
              color={focused ? '#7cc' : '#000'}
              style={{marginRight: 10}}
            />
          ),
        }}
      />
      <DrawerApp.Screen
        name="Catagory"
        component={OrderStacks}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icons
              name="product-hunt"
              size={17}
              color={focused ? '#7cc' : '#000'}
              style={{marginRight: 10}}
            />
          ),
        }}
      />
      <DrawerApp.Screen
        name="Area"
        component={HigherOrderComponent(AreaScreen)}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icons
              name="globe"
              size={17}
              color={focused ? '#7cc' : '#000'}
              style={{marginRight: 15}}
            />
          ),
        }}
      />
      <DrawerApp.Screen
        name="Package"
        component={HigherOrderComponent(PackageScreen)}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icons
              name="cubes"
              size={17}
              color={focused ? '#7cc' : '#000'}
              style={{marginRight: 5}}
            />
          ),
        }}
      />
      <DrawerApp.Screen
        name="Profile"
        component={UpdateProfileStacks}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icons
              name="user-md"
              size={17}
              color={focused ? '#7cc' : '#000'}
              style={{marginRight: 16}}
            />
          ),
        }}
      />
      <DrawerApp.Screen
        name="Orders"
        component={Payment}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icons
              name="shopping-cart"
              size={17}
              color={focused ? '#7cc' : '#000'}
              style={{marginRight: 12}}
            />
          ),
        }}
      />
      <DrawerApp.Screen
        name="Feedback"
        component={HigherOrderComponent(Feedback)}
        options={{
          drawerIcon: ({focused, size}) => (
            <Icons
              name="comments"
              size={17}
              color={focused ? '#7cc' : '#000'}
              style={{marginRight: 10}}
            />
          ),
        }}
      />
    </DrawerApp.Navigator>
  );
};
const OrderStacks = () => {
  return (
    <OrderStack.Navigator screenOptions={{headerShown: false}}>
      <OrderStack.Screen
        name="Catagory"
        component={HigherOrderComponent(CatagoryScreen)}
      />
      <OrderStack.Screen
        name="AreaOrder"
        component={HigherOrderComponent(AreaOrder)}
      />
      <OrderStack.Screen
        name="PackageOrder"
        component={HigherOrderComponent(PackageOrder)}
      />
      <OrderStack.Screen
        name="Order"
        component={HigherOrderComponent(OrderDetails)}
      />
      <OrderStack.Screen name="Success" component={OrderSuccess} />
    </OrderStack.Navigator>
  );
};
const UpdateProfileStacks = () => {
  return (
    <PofileStack.Navigator screenOptions={{headerShown: false}}>
      <PofileStack.Screen
        name="Profile"
        component={HigherOrderComponent(ProfileScreen)}
      />
      <PofileStack.Screen
        name="Update_profile"
        component={HigherOrderComponent(UpdateProfile)}
      />
    </PofileStack.Navigator>
  );
};
const Payment = () => {
  return (
    <PayStack.Navigator screenOptions={{headerShown: false}}>
      <PayStack.Screen
        name="Orders"
        component={HigherOrderComponent(ViewOrders)}
      />
      <PayStack.Screen
        name="Payment"
        component={HigherOrderComponent(PaymentScreen)}
      />
    </PayStack.Navigator>
  );
};
const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name="Splash"
          component={HigherOrderComponent(SplashScreen)}
        />
        <Stack.Screen name="App" component={App} />
        <Stack.Screen name="Auth" component={Auth} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
