import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Image,
  TextInput,
  Platform,
  StatusBar,
  AsyncStorage,
} from "react-native";
import * as theme from '../../theme';


import Login from '../Profile/Login';

class Profile extends React.Component {

  state = {
    user_id:'',
    user_detail:[],
    user_name:'',
    user_surname:'',
    user_profile:'',
    user_volunteer:'',

  }

  componentWillMount() {
    AsyncStorage.multiGet(['user_id']).then((data) => {
      let user_id = data[0][1];
      this.setState({
        user_id: user_id,
      });
      console.log("ID >>"+user_id);
      this.GetUser();
  });
  }

  GetUser() {
    const { navigate } = this.props.navigation;
    fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/getProfile.php', {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        user_id: this.state.user_id.split('"')[1],
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        // Showing response message coming from server after inserting records.
        // alert(responseJson);

        responseJson.map(user => 
          this.setState({
            user_name: user.name,
          })
        );
        console.log(this.state.user_name);

        responseJson.map(user => 
          this.setState({
            user_surname: user.surname,
          })
        );
        console.log(this.state.user_surname);

        responseJson.map(user => 
          this.setState({
            user_profile: user.profile,
          })
        );
        console.log(this.state.user_profile);

        responseJson.map(user => 
          this.setState({
            user_volunteer: user.volunteer,
          })
        );
        console.log(this.state.user_volunteer);

      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;
    const user_idreg = navigation.getParam('user_id');
    // this.state.user_detail.map( (user,index) =>
    let photoUser = 'http://it2.sut.ac.th/project62_g4/Web_SUTJoin/image/' + this.state.user_profile;
    console.log(photoUser)
    // );
    return (



      <View>
        {/* <Text style={styles.text}>PROFILE</Text> */}

        {/* <View style={{ justifyContent: 'center' }}>
          <View style={{ flex: 1 }}>
            <Image source={{ uri: photoUser }} style={styles.avatar} />
          </View>
          <View style={[styles.column, { flex: 2, paddingHorizontal: theme.sizes.padding / 2 }]}>
            <Text style={{ color: theme.colors.black, fontWeight: 'bold' }}>{this.state.user_name} {this.state.user_surname}</Text>
          </View>
        </View> */}
        <View style={styles.shadow}>
          <View style={{marginTop:100,justifyContent: 'center',alignItems: 'center',}}> 
            <Image source={{ uri: photoUser }} style={styles.avatar} />
          </View>
          <View style={{marginTop:150,justifyContent: 'center',alignItems: 'center',}}>
            <Text style={{ color: theme.colors.black,fontSize:30, fontWeight: 'bold' }}>{this.state.user_name} {this.state.user_surname}</Text>
          </View>
          <View style={{marginTop:20,justifyContent: 'center',alignItems: 'center',}}>
            <Text style={{ color: theme.colors.black,fontSize:20, fontWeight: 'bold' }}>Volunteer Point: {this.state.user_volunteer}</Text>
          </View>
        </View>

        {/* <View style={{marginTop:220}}> */}
        {/* <Button
          title="Login"
          onPress={() => navigate('Login')}
        />

        <Button
          title="Register"
          onPress={() => navigate('Register')}
        /> */}

        <Button
          title="Create Activities"
          onPress={() => navigate('AddActivity')}
        />

        <Button
          title="My Interests"
          onPress={() => navigate('MyInterest')}
        />
        {/* </View> */}
      </View>
    );
  }
}

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row'
  },
  avatar: {
    position: 'absolute',
    top: -theme.sizes.margin,
    // right: theme.sizes.margin,
    width: theme.sizes.padding * 4,
    height: theme.sizes.padding * 4,
    borderRadius: theme.sizes.padding,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,

    // borderRadius: 4,
    // borderWidth:2,
    // borderColor: '#ffc9de',
    // marginTop:5,
    // width:300,
    // height:300,
    // backgroundColor:'white',
    // alignItems: 'center'
  },
});