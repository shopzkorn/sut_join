import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar
} from "react-native";

import { createBottomTabNavigator } from 'react-navigation'
// import Icon from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/Ionicons'

import Activity from '../Activity/Activity';
import Checkin from '../Checkin/Checkin';
import Learning from '../Learning/Learning';
import Profile from '../Profile/Profile';
import List from '../Activity/ListActivity';
import Add from '../Activity/AddActivity';



export default createBottomTabNavigator({
  Activity: {
    screen: List,
    navigationOptions: {
      tabBarLabel:'ACTIVITY',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-rocket" color={tintColor} size={24}/>
      ),
    }
  },
  AddActivity: {
    screen: Add,
    navigationOptions: {
      tabBarLabel:'ADD ACTIVITY',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-add-circle" color={tintColor} size={24}/>
      ),
    }
  },
  Checkin: {
    screen: Checkin,
    navigationOptions: {
      tabBarLabel:'CHECK IN',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-checkbox-outline" color={tintColor} size={24}/>
      ),
  }
  },
  Learning: {
    screen: Learning,
    navigationOptions: {
      tabBarLabel:'LEARNING',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-bookmarks" color={tintColor} size={24}/>
      ),
  }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel:'PROFILE',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-person" color={tintColor} size={24}/>
      ),
  }
  },

},{
  tabBarOptions: {
    activeTintColor: 'red',
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});