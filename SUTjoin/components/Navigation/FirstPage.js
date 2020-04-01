import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
  Dimensions,
  StatusBar,
  View,
  ActivityIndicator,
  AsyncStorage
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
import * as theme from '../../theme';
const { width, height } = Dimensions.get('window');

class FirstPage extends Component {
  state = {
    Username: '',
    Password: ''
  }
  componentDidMount() {
    setTimeout(() => {
      AsyncStorage.getItem('user_id').then(async (user) => { return await JSON.parse(user) }).then((user_data) => {
        console.log(user_data)
        if (user_data == null) {
          this.props.navigation.navigate('Auth');
        } else {
          AsyncStorage.multiGet(['username', 'password']).then((data) => {
            console.log(data[0][1]);
            this.setState((prevState, props) => ({
              Username: data[0][1],
              Password: data[1][1]
            }), () => {
              fetch('https://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/Login.php', {
                method: 'post',
                headers: new Headers({
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                }),
                body: JSON.stringify({
                  username: this.state.Username,
                  password: this.state.Password,
                })
              }).then((response) => response.json())
                .then((responseJson) => {
                  console.log(responseJson)
                  if (responseJson == false) {
                    this.props.navigation.navigate('Auth');
                  } else if (responseJson.length == 0) {
                    this.props.navigation.navigate('Auth');
                  } else {
                    AsyncStorage.multiGet(['status']).then((data) => {
                      var status = data[0][1];
                      console.log(status)
                      if (status == 1) {
                        this.props.navigation.navigate('App')
                      } else if (status == 6) {
                        this.props.navigation.navigate('Coach')
                      }
                    });

                  }
                });
            })
          })
        }

      });

    }, 1000)
  }

  render() {
    return (

      <LinearGradient
        colors={['#ffd8ff', '#f0c0ff', '#c0c0ff']}
        start={{ x: 0.0, y: 0.5 }}
        end={{ x: 1.0, y: 0.5 }}
        style={{ flex: 1 }}>
        <View style={styles.container}>
          <StatusBar hidden={true} />
          <Image style={{ alignSelf: 'center', width: 200, height: 200 }}
            source={require('../../asset/image/logo.png')}
          />
          <ActivityIndicator style={{ marginBottom: 8, }} size="large" color="#25aae1" />

          {/* <Image style={{alignSelf:'center',width:300,height:100}}
          source={require('../../asset/image/logo1.png')}
        /> */}
        </View>
      </LinearGradient>


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