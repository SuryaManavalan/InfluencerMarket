import React, { Component } from 'react';
import color from 'color';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme, Portal, FAB } from 'react-native-paper';
import { useSafeArea } from 'react-native-safe-area-context';
import { useIsFocused, RouteProp } from '@react-navigation/native';
import {connect} from 'react-redux';

import Icon from 'react-native-vector-icons/Feather';
import CampaignCreate from './campaignMgmt/components/campaignCreate';
import CampaignList from './campaignMgmt/components/campaignList';
import CampaignSearch from './campaignMgmt/components/campaignSearch';
import {StackNavigator} from './stackNav';
import {InfluencerNav} from './influencerNav';

const Tab = createMaterialBottomTabNavigator();

//  Props = {
//   route: RouteProp<StackNavigatorParamlist, 'FeedList'>;
// };

class BottomTabs extends Component {
    // Get a name of current screen
    // const routeName = props.route.state
    //   ? props.route.state.routes[props.route.state.index].name
    //   : 'CampaignList';

    render() {
      const routeName = 'CampaignList';
    // const theme = useTheme();
    // const safeArea = useSafeArea();
    // const isFocused = useIsFocused();

    let icon = 'feather';

    switch (routeName) {
      case 'Messages':
        icon = 'email-plus-outline';
        break;
      default:
        icon = 'feather';
        break;
    }

    // const tabBarColor = theme.dark
    //   ? (overlay(6, theme.colors.surface) )
    //   : theme.colors.surface;

      console.log("BOTTTTTTOM TAB STATE******", this.props.usertype);
//      console.log("BOTTTTTTOM TAB USER ******", user);

if(this.props.usertype === "influencer")
{
  return (
    
    <React.Fragment>
      <Tab.Navigator
        initialRouteName="CampaignList"
        backBehavior="initialRoute"
        shifting={true}
        sceneAnimationEnabled={false}
      >
        <Tab.Screen
          name="CampaignList"
          component={InfluencerNav}
          options={{
            tabBarIcon: 'home-account',
//              tabBarColor,
          }}
        />
        <Tab.Screen
          name="CampaignCreate"
          component={CampaignCreate}
          options={{
            tabBarIcon: 'bell-outline',
//              tabBarColor,
          }}
        />
        <Tab.Screen
          name="CampaignSearch"
          component={CampaignSearch}
          options={{
            tabBarIcon: 'message-text-outline',
//              tabBarColor,
          }}
        />
      </Tab.Navigator>
      <Portal>
        <FAB
//            visible={isFocused}
          icon={icon}
          // style={{
          //   position: 'absolute',
          //   bottom: safeArea.bottom + 65,
          //   right: 16,
          // }}
          color="white"
          // theme={{
          //   colors: {
          //     accent: theme.colors.primary,
          //   },
          // }}
          onPress={() => {}}
        />
      </Portal>
    </React.Fragment>
  );

}
else {
  return (
    
    <React.Fragment>
      <Tab.Navigator
        initialRouteName="CampaignList"
        backBehavior="initialRoute"
        shifting={true}
        sceneAnimationEnabled={false}
      >
        <Tab.Screen
          name="CampaignList"
          component={StackNavigator}
          options={{
            tabBarIcon: 'home-account',
//              tabBarColor,
          }}
        />
        <Tab.Screen
          name="CampaignCreate"
          component={CampaignCreate}
          options={{
            tabBarIcon: 'bell-outline',
//              tabBarColor,
          }}
        />
        <Tab.Screen
          name="CampaignSearch"
          component={CampaignSearch}
          options={{
            tabBarIcon: 'message-text-outline',
//              tabBarColor,
          }}
        />
      </Tab.Navigator>
      <Portal>
        <FAB
//            visible={isFocused}
          icon={icon}
          // style={{
          //   position: 'absolute',
          //   bottom: safeArea.bottom + 65,
          //   right: 16,
          // }}
          color="white"
          // theme={{
          //   colors: {
          //     accent: theme.colors.primary,
          //   },
          // }}
          onPress={() => {}}
        />
      </Portal>
    </React.Fragment>
  );

}
  }
};

const mapStateToProps = (state) => {
  console.log("mapStateToProps BOTTOM Tab s:", state);
  console.log("mapStateToProps BOTTOM Tab:", state.auth.usertype);
//    console.log ("created camp:", state.campaignForm.createCamp)
  const  {usertype} = state.auth;

  return{ usertype};

}

export default connect(mapStateToProps, null) (BottomTabs);
