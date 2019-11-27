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

class Menu extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Hello Menu</Text>
            </View>
        );
    }
}
// export default Menu;

export default createBottomTabNavigator({
  Activity: {
    screen: Activity,
    navigationOptions: {
      tabBarLabel:'ACTIVITY',
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-rocket" color={tintColor} size={24}/>
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
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});