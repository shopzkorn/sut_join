
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { createAppContainer } from 'react-navigation';
import Navigation from './components/Navigation/Navigation';

import { createBottomTabNavigator } from 'react-navigation'
import Icon from 'react-native-vector-icons/Ionicons'

import Activity from './components/Activity/Activity';
import Checkin from './components/Checkin/Checkin';
import Learning from './components/Learning/Learning';
import Profile from './components/Profile/Profile';

class Application extends React.Component {
  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.text}>Hello Menu </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
  }

});
console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
console.disableYellowBox = true;

// export default createBottomTabNavigator({
  // Activity: {
  //   screen: Activity,
  //   navigationOptions: {
  //     tabBarLabel:'ACTIVITY',
  //     tabBarIcon: ({ tintColor }) => (
  //       <Icon name="ios-rocket" color={tintColor} size={24}/>
  //     ),
  //   }
  // },
  // Checkin: {
  //   screen: Checkin,
  //   navigationOptions: {
  //     tabBarLabel:'CHECK IN',
  //     tabBarIcon: ({ tintColor }) => (
  //       <Icon name="ios-bookmarks" color={tintColor} size={24}/>
  //     ),
  // }
  // },
  // Profile: {
  //   screen: Profile,
  //   navigationOptions: {
  //     tabBarLabel:'PROFILE',
  //     tabBarIcon: ({ tintColor }) => (
  //       <Icon name="ios-person" color={tintColor} size={24}/>
  //     ),
  // }
  // },
  // Learning: {
  //   screen: Learning,
  //   navigationOptions: {
  //     tabBarLabel:'LEARNING',
  //     tabBarIcon: ({ tintColor }) => (
  //       <Icon name="ios-settings" color={tintColor} size={24}/>
  //     ),
  // }
  // },
// })



// export default Application;
export default createAppContainer(Navigation);
