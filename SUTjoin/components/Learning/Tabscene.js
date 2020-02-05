import * as React from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity,Image ,SafeAreaView} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';
import * as theme from '../../theme';
import Subject from './manage_subject';
import Learning from './Learning';
import CheckSignin from './CheckSignin';
const { width, height } = Dimensions.get('window');

export default class TabViewExample extends React.Component {

  _renderTabBar = props => {
    const inputRange = props.navigationState.routes.map((x, i) => i);

    return (
      <LinearGradient colors={['#ffd8ff', '#f0c0ff', '#c0c0ff']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}>
           <View style={{ flexDirection: 'row',justifyContent:'center',backgroundColor: 'rgba(0,0,0,0.1)',}}>
            <View style={{ justifyContent:'flex-start'}}>
                <View style={{paddingVertical: height /200 ,flexDirection:'row',justifyContent:'flex-end'}}>
                        <Text style={{ fontSize: width / 20, fontWeight: 'bold',color: '#ffffff' ,alignSelf:'center'}}>
                        Learning
                        </Text>
                </View>
            </View>
        </View>
        <View style={styles.tabBar}>
          {props.navigationState.routes.map((route, i) => {
            return (
              <TouchableOpacity
                style={
                  this.state.index == i ? styles.tabItem : styles.tabItem1
                }
                onPress={() => this.setState({ index: i })}>
                <Animated.Text style={{ color:'white',fontWeight:'bold' }}>{route.title}</Animated.Text>
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
      <Learning navigation={navigation} />
    );
  }
  SecondRoute = () => {
    const { navigation } = this.props;
    return (
      <Subject navigation={navigation} />
    );
  }
  ThirdRoute = () => {
    const { navigation } = this.props;
    return (
      <CheckSignin navigation={navigation} />
    );
  }
  
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'Dashboard' },
      { key: 'second', title: 'Subject' },
      { key: 'third', title: 'Check signs' },
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
          third: this.ThirdRoute,
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
    borderColor:'rgba(52, 52, 52, 0.3)',
    borderRadius:25,
    borderWidth:4,
    backgroundColor: 'rgba(52, 52, 52, 0.3)'
    // paddingTop: Constants.statusBarHeight,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#c0c0ff',
     borderRadius:25,

  },
  tabItem1: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
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