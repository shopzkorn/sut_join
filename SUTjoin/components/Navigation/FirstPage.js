import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView,
  View,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import * as theme from '../../theme';
const { width, height } = Dimensions.get('window');

class FirstPage extends Component {
  constructor(props) {
    super(props);
    this.onEndReachedCalledDuringMomentum = true;
  }
  state = {
    data: [],
    refreshing: false,
    page: 1,
    loadingVisible: true,
    loading: false,
    lastItem: true
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient
          colors={['#ffd8ff', '#f0c0ff', '#c0c0ff']}
          start={{ x: 0.0, y: 0.5 }}
          end={{ x: 1.0, y: 0.5 }}
          style={{ flex: 1 }}>
        <View style={styles.container}>
        
        <Image style={{alignSelf:'center',width:200,height:200}}
          source={require('../../asset/image/logo.png')}
        />
        <Image style={{alignSelf:'center',width:300,height:100}}
          source={require('../../asset/image/logo1.png')}
        />
        </View>
        </LinearGradient>
      </SafeAreaView>

    )
  }
}

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
    // backgroundColor: '#ffc9de',
    paddingHorizontal: theme.sizes.padding,
    paddingTop: theme.sizes.padding * 0.2,
    paddingBottom: theme.sizes.padding * 0.2,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default FirstPage;