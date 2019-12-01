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
// import Icon from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/Ionicons'

import Activity from '../Activity/ListActivity';
import Checkin from '../Checkin/Checkin';
import Learning from '../Learning/Learning';
import Add from '../Activity/AddActivity';
import Profile from '../Profile/Profile';
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
      header: (
        <View >
          <View>
            <Text style={{ color: theme.colors.rrcaption }}>Search for place</Text>
            <Text style={{ fontSize: theme.sizes.font * 2 }}>Destination</Text>
          </View>
        </View>
      )
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
    headerMode: 'none',
    header: null,
    navigationOptions: {
      tabBarLabel:'CHECK IN',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-checkbox-outline" color={tintColor} size={24}/>
      ),
      header: () => null,
  }
  },
  Learning: {
    screen: Learning,
    headerMode: 'none',
    header: null,
    navigationOptions: {
      tabBarLabel:'LEARNING',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-bookmarks" color={tintColor} size={24}/>
      ),
      header: null
  }
  },
  Profile: {
    screen: Profile,
    headerMode: 'none',
    header: null,
    navigationOptions: {
      tabBarLabel:'PROFILE',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-person" color={tintColor} size={24}/>
      ),
      header: null
  }
  },
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});