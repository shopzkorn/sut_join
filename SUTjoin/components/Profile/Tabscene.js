import * as React from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity,Image,SafeAreaView } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import * as theme from '../../theme';
const { width, height } = Dimensions.get('window');

import DashboardAll from './UserDashboard';
import DashboardUser from './UserDashboardUserdata';

export default class TabViewExample extends React.Component {

  _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <LinearGradient colors={['#ffd8ff', '#f0c0ff', '#c0c0ff']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}>
          <View style={{ flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.1)', }}>
            <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
              <FontAwesome name="chevron-left" color={theme.colors.black} size={theme.sizes.font * 1} />
            </TouchableOpacity>
            <View style={{ alignSelf: 'center', paddingHorizontal: width / 50 }}>
                <Text style={{ fontSize: width / 20, fontWeight: 'bold',color: '#ffffff' ,alignSelf:'center'}}>
                Dashboard
                </Text>
            </View>
          </View>
        <View style={styles.tabBar}>
          {props.navigationState.routes.map((route, i) => {
            const color = Animated.color(
              Animated.round(
                Animated.interpolate(props.position, {
                  inputRange,
                  outputRange: inputRange.map(inputIndex =>
                    inputIndex === i ? 255 : 0
                  ),
                })
              ),
              0,
              0
            );

            return (
              <TouchableOpacity
                style={styles.tabItem}
                onPress={() => this.setState({ index: i })}>
                <Animated.Text style={{ color }}>{route.title}</Animated.Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </LinearGradient>
    );
  };

  FirstRoute = () => {
    const { navigation } = this.props;
    return (
      <DashboardAll navigation={navigation} />
    );
  }

  SecondRoute = () => {
    const { navigation } = this.props;
    return (
      <DashboardUser navigation={navigation} />
    );
  }
  
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Dashboard' },
      { key: 'second', title: 'My Data' },
    ],
  };

  render() {
    const { navigation } = this.props;
    // console.log(navigation);
    return (
      <SafeAreaView style={{ flex: 1 }}>
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: this.FirstRoute,
          second: this.SecondRoute,
        })}
        renderTabBar={this._renderTabBar}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
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
    // backgroundColor: '#ffc9de',
    paddingHorizontal: theme.sizes.padding,
    paddingTop: theme.sizes.padding * 0.2,
    paddingBottom: theme.sizes.padding * 0.2,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    // paddingTop: Constants.statusBarHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
  circleButtun: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 35,
    height: 35,
    backgroundColor : '#FFFFFF50',
    opacity: 0.5,
    borderRadius: 50,
    // marginRight : 10
  },
  marginRight:{
    marginRight : 10
  },
  logo:{
    width: theme.sizes.padding*4,
    height: theme.sizes.padding*1.5,
  },
  back: {
    width: theme.sizes.base * 3,
    height: theme.sizes.base * 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 15
  },
});