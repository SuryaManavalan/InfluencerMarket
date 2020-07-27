import React, {useState} from 'react';
import { Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import LoginForm from './login/components/LoginForm'
import SignupForm from './login/components/SignupForm'
import {BottomTabs} from './bottomTab';
import {Profile} from './login/components/profile';
import {connect} from 'react-redux';
import  Influencer  from './login/components/influencer';

const AuthStack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerContent() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Drawer content</Text>
    </View>
  );
}

function LoadingScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Loading ...</Text>
    </View>
  );
}

const Main = ({loading, user}) => {
//  const {loading, user} = props.auth;

  console.log("main screen auth:" , user);

  if(loading){
    return <LoadingScreen />
  }
  return (
    user ? (
      // <Drawer.Navigator drawerContent={() => <Profile />}>
      <Drawer.Navigator drawerContent={() => <Influencer  />}>
        <Drawer.Screen name="Home" component={BottomTabs} />
      </Drawer.Navigator>
    ): (
      <AuthStack.Navigator>
        <AuthStack.Screen name="SignIn" component={LoginForm} hideNavBar
        options={{title: 'Sign In'}}/>
        <AuthStack.Screen name="SignUp" component={SignupForm} hideNavBar
        options={{title: 'Sign Up'}}/>
      </AuthStack.Navigator>

    )
  );
};


export default connect(state => ({ loading: state.auth.loading, user: state.auth.user }))(Main);