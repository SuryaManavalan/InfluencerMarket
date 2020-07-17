import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {  Appbar, Avatar, useTheme } from 'react-native-paper';
//import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Feather';
import CampaignEdit from './campaignMgmt/components/campaignEdit';
import CampaignList from './campaignMgmt/components/campaignList';

//import { StackNavigatorParamlist } from './types';

const Stack = createStackNavigator();

const Header = ({ scene, previous, navigation }) => {
  const { options } = scene.descriptor;
  const theme = useTheme();

  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  return (
    <Appbar.Header theme={{ colors: { primary: theme.colors.surface } }}>
      {previous ? (
        <Appbar.BackAction
          onPress={()=>{
            // navigation.navigate('Home', {
            //   screen: 'CampaignList'})}
            // }
              navigation.pop(1) }}
            color={theme.colors.primary}
        />
      ) : (
        <TouchableOpacity
          onPress={() => {
            navigation.openDrawer();
          }}
        >
          <Avatar.Image
            size={40}
            source={{
              uri:
                'https://pbs.twimg.com/profile_images/952545910990495744/b59hSXUd_400x400.jpg',
            }}
          />
        </TouchableOpacity>
      )}
      <Appbar.Content
        title={
          previous ? title :  <Icon name="twitter"  size={30} color="blue" style={{ marginLeft: 15 }} />
        //   <MaterialCommunityIcons name="twitter" size={40} />
        }
      />
    </Appbar.Header>
  );
};

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="CampaignList"
      headerMode="screen"
      screenOptions={{
        header: ({ scene, previous, navigation }) => (
          <Header scene={scene} previous={previous} navigation={navigation} />
        ),
      }}
    >
      <Stack.Screen
        name="CampaignList"
        component={CampaignList}
        options={{ headerTitle: 'Campaign List' }}
      />
      <Stack.Screen
        name="CampaignEdit"
        component={CampaignEdit}
        options={{ headerTitle: 'Campaign Edit' }}
      />
    </Stack.Navigator>
  );
};