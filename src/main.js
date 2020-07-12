import React from 'react';
import { Text, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {StackNavigator} from './stackNav';
import {Profile} from './login/components/profile';

const Drawer = createDrawerNavigator();

function DrawerContent() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Drawer content</Text>
    </View>
  );
}

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
    </View>
  );
}

const Main = () => {
  return (
    <Drawer.Navigator drawerContent={() => <Profile />}>
      <Drawer.Screen name="Home" component={StackNavigator} />
    </Drawer.Navigator>
  );
};

export default Main;