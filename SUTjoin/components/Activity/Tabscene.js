import * as React from 'react';
import { View, StyleSheet, Dimensions ,Text} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient';

import * as theme from '../../theme';
import ListActivity from './ListActivity';
import SearchActivity from './History';
const FirstRoute = () => (
  <ListActivity/>
);
 
const SecondRoute = () => (
    <SearchActivity/>
);
 
export default class TabViewExample extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
          header: (
            <LinearGradient colors={['#ffd8ff', '#f0c0ff','#c0c0ff']}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0 }}>
              <View style={[styles.flex, styles.row, styles.header,]}>
                <View>
                  {/* <Image style={styles.avatar} source={{ uri: 'https://randomuser.me/api/portraits/women/32.jpg'}} /> */}
                  <FontAwesome name="search" size={30} onPress={() => navigation.navigate('AddActivity')} />
                </View>
                <View>
                  {/* <Text style={{ color: theme.colors.caption }}>Search for place</Text> */}
                  <Text style={{ fontSize: theme.sizes.font * 2,fontWeight: 'bold' }}>SUT JOIN</Text>
                </View>
                <View>
                  {/* <Image style={styles.avatar} source={{ uri: 'https://randomuser.me/api/portraits/women/32.jpg'}} /> */}
                  <Icon name="ios-add-circle" size={30} onPress={() => navigation.navigate('AddActivity')} />
                </View>
              </View>
            </LinearGradient>
          ),
          tabBarOnPress: (scene, jumpToIndex) => { console.log('Tab is pressed!') },
        }
      }
  state = {
    index: 0,
    routes: [
      { key: 'first', title: 'First' },
      { key: 'second', title: 'Second' },
    ],
  };
 
  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
        })}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
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
});