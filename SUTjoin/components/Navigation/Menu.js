import React, { Component } from "react";
import {
    View,
    Text,
    Image,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar
} from "react-native";

import { createBottomTabNavigator,createAppContainer,createStackNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'

import Activity from '../Activity/ListActivity';
import Checkin from '../Checkin/Checkin';
import Learning from '../Learning/Learning';
import Add from '../Activity/AddActivity';
import Profile from '../Profile/Profile';
import History from '../Activity/HistoryActivity';
import * as theme from '../../theme';

// export default Menu;
const styles = StyleSheet.create({
  flex: {
    flex: 0,
  },
  column: {
    flexDirection: 'column'
  },
  row: {
    flexDirection: 'row'
  },
  header: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.sizes.padding,
    paddingTop: theme.sizes.padding * 1.33,
    paddingBottom: theme.sizes.padding * 0.66,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avatar: {
    width: theme.sizes.padding,
    height: theme.sizes.padding,
    borderRadius: theme.sizes.padding / 2,
  },
});

//Route
const NaActivity = createStackNavigator(
  {
    Activity: {
      screen: Activity,
      navigationOptions: {
        header: (
          <View style={[styles.flex, styles.row, styles.header,]}>
            <View>
              <Text style={{ color: theme.colors.caption }}>Search for place</Text>
              <Text style={{ fontSize: theme.sizes.font * 2 }}>Destination</Text>
            </View>
            <View>
              <Image style={styles.avatar} source={{ uri: 'https://randomuser.me/api/portraits/women/32.jpg'}} />
            </View>
          </View>
        ),
      },
    },
  }
);

const NaHistory = createStackNavigator(
  {
    History: {
      screen: History,
      navigationOptions: {
        header: null
      }
    },
  }
);

const NaCheckin = createStackNavigator(
  {
    Checkin: {
      screen: Checkin,
      navigationOptions: {
        header: null
      }
    },
  }
);
const NaLearning = createStackNavigator(
  {
    Learning: {
      screen: Learning,
      navigationOptions: {
        header: null
      }
    },
  }
);
const NaProfile = createStackNavigator(
  {
    Profile: {
      screen: Profile,
      navigationOptions: {
        header: null
      }
    },
  }
);

//Create Tabbar
const TabStack = createBottomTabNavigator({
     Activitys: {
        screen: NaActivity,
        navigationOptions: {
          tabBarLabel:'EXPLORE',
          tabBarIcon: ({ tintColor }) => (
            <Icon name="ios-rocket" color={tintColor} size={24}/>
        ),
      },
    },
    History: {
      screen: NaHistory,
      navigationOptions: {
        tabBarLabel:'MY ACTIVITIES',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-add-circle" color={tintColor} size={24}/>
        ),
      }
    },
    Checkin: {
      screen: NaCheckin,
      navigationOptions: {
        tabBarLabel:'CHECK-IN',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-checkbox-outline" color={tintColor} size={24}/>
        ),
      }
    },
    Learning: {
      screen: NaLearning,
      navigationOptions: {
        tabBarLabel:'EDUCATION',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-bookmarks" color={tintColor} size={24}/>
        ),
      }
    },
    Profile: {
      screen: NaProfile,
      navigationOptions: {
        tabBarLabel:'PROFILE',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="ios-person" color={tintColor} size={24}/>
        ),
      }
    },
},
{
    tabBarOptions: {
      activeTintColor: 'lightpink',
      // inactiveTintColor: 'Grey',
      style: {
        backgroundColor: 'white',
        borderTopWidth:0,
        shadowOffset:{width:5,height:3},
        shadowColor:'black',
        shadowOpacity: 0.5,
        elevation: 5
      }
    }
});
export default createAppContainer(TabStack);