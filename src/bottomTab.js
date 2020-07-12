import React from 'react';
import color from 'color';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { useTheme, Portal, FAB } from 'react-native-paper';
import { useSafeArea } from 'react-native-safe-area-context';
import { useIsFocused, RouteProp } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';
import CampaignCreate from './campaignMgmt/components/campaignCreate';
import CampaignList from './campaignMgmt/components/campaignList';
import CampaignSearch from './campaignMgmt/components/campaignSearch';

const Tab = createMaterialBottomTabNavigator();

//  Props = {
//   route: RouteProp<StackNavigatorParamlist, 'FeedList'>;
// };

export const BottomTabs = props => {
    // Get a name of current screen
    const routeName = props.route.state
      ? props.route.state.routes[props.route.state.index].name
      : 'CampaignList';

  const theme = useTheme();
  const safeArea = useSafeArea();
  const isFocused = useIsFocused();

  let icon = 'feather';

  switch (routeName) {
    case 'Messages':
      icon = 'email-plus-outline';
      break;
    default:
      icon = 'feather';
      break;
  }

  const tabBarColor = theme.dark
    ? (overlay(6, theme.colors.surface) )
    : theme.colors.surface;

  return (
    <React.Fragment>
      <Tab.Navigator
        initialRouteName="CampaignList"
        backBehavior="initialRoute"
        shifting={true}
        activeColor={theme.colors.primary}
        inactiveColor={color(theme.colors.text)
          .alpha(0.6)
          .rgb()
          .string()}
        sceneAnimationEnabled={false}
      >
        <Tab.Screen
          name="CampaignList"
          component={CampaignList}
          options={{
            tabBarIcon: 'home-account',
            tabBarColor,
          }}
        />
        <Tab.Screen
          name="CampaignCreate"
          component={CampaignCreate}
          options={{
            tabBarIcon: 'bell-outline',
            tabBarColor,
          }}
        />
        <Tab.Screen
          name="CampaignSearch"
          component={CampaignSearch}
          options={{
            tabBarIcon: 'message-text-outline',
            tabBarColor,
          }}
        />
      </Tab.Navigator>
      <Portal>
        <FAB
          visible={isFocused}
          icon={icon}
          style={{
            position: 'absolute',
            bottom: safeArea.bottom + 65,
            right: 16,
          }}
          color="white"
          theme={{
            colors: {
              accent: theme.colors.primary,
            },
          }}
          onPress={() => {}}
        />
      </Portal>
    </React.Fragment>
  );
};