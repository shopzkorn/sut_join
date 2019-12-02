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

import { createBottomTabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'

import Activity from '../Activity/ListActivity';
import Checkin from '../Checkin/Checkin';
import Learning from '../Learning/Learning';
import Add from '../Activity/AddActivity';
import Profile from '../Profile/Profile';
import History from '../Activity/History';
import * as theme from '../../theme';

// export default Menu;

export default createBottomTabNavigator({
  Activity: {
    screen: Activity,
    navigationOptions: {
      tabBarLabel:'EXPLORE',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-rocket" color={tintColor} size={24}/>
      ),
    }
  },
  // AddActivity: {
  //   screen: Add,
  //   navigationOptions: {
  //     tabBarLabel:'ADD ACTIVITY',
  //     tabBarIcon: ({ tintColor }) => (
  //       <Icon name="ios-add-circle" color={tintColor} size={24}/>
  //     ),
  //   }
  // },
  History: {
    screen: History,
    navigationOptions: {
      tabBarLabel:'MY ACTIVITIES',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-add-circle" color={tintColor} size={24}/>
      ),
    }
  },
  Checkin: {
    screen: Checkin,
    headerMode: 'none',
    header: null,
    navigationOptions: {
      tabBarLabel:'CHECK-IN',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-checkbox-outline" color={tintColor} size={24}/>
      ),
  }
  },
  Learning: {
    screen: Learning,
    headerMode: 'none',
    header: null,
    navigationOptions: {
      tabBarLabel:'EDUCATION',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-bookmarks" color={tintColor} size={24}/>
      ),
      header: null
  }
  },
  Profile: {
    screen: Profile,
    // headerMode: 'none',
    // header: null,
    navigationOptions: {
      tabBarLabel:'PROFILE',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-person" color={tintColor} size={24}/>
      ),
      // header: null
  }
  },

},{
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
})

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center'
//     }
// });