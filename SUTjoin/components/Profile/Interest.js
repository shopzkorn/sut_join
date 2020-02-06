import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
    AsyncStorage,
    ScrollView,
    Dimensions
} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SwitchToggle from "react-native-switch-toggle";
import { StackActions, NavigationActions } from 'react-navigation';
import LinearGradient from 'react-native-linear-gradient';
import Spinner from 'react-native-loading-spinner-overlay';
import * as theme from '../../theme';
const { width, height } = Dimensions.get('window');

class MyInterest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      switchOn1: false,
      switchOn2: false,
      switchOn3: false,
      switchOn4: false,
      switchOn5: false,
      switchOn6: false,
      switchOn7: false,
      switchOn8: false,

      data1: 0,
      data2: 0,
      data3: 0,
      data4: 0,
      data5: 0,
      data6: 0,
      data7: 0,
      data8: 0,

      user_id:'',
      loadingVisible: false,

    };
  }
    
  componentDidMount() {
   this.login()
  }
  login=()=> {
    const { navigation } = this.props;
    const username = navigation.getParam('username');
    const password = navigation.getParam('password');
    console.log("login");
  fetch('https://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/Login.php', {
  method: 'post',
  headers: new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }),
  body: JSON.stringify({
    username : username,
    password : password,
  })
  }).then((response) => response.json())
  .then((responseJson) => {
    // Showing response message coming from server after inserting records.
    console.log(responseJson);
    if(responseJson.length != 0){
        let user_id = '"' + responseJson[0].user_id + '"';
         AsyncStorage.multiSet([
          ["username", responseJson[0].Username],
          ["password", responseJson[0].Password],
          ["user_id", user_id],
          ["user_status", responseJson[0].volunteer_status],
      ])
      this.setState({
        user_id: user_id,
      });
    console.log(this.state.user_id);
     
      // AsyncStorage.setItem('user_data', responseJson[0])

      // AsyncStorage.setItem('user_id', user_id)
      // AsyncStorage.setItem('user_status', responseJson[0].volunteer_status)
  }else{
      alert("username or password incorrect");
  }
  })
  .catch((error) => {
    console.error(error);
  });
  // AsyncStorage.multiGet(['user_id']).then((data) => {
  //     let user_id = data;
  //     console.log("Session id is"+user_id);
    
  // });
}
  

  OnSave = () => {
    this.setState({ loadingVisible : true})

    fetch('https://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/Myinterest_pro.php', {
      // fetch('https://localhost:8080/Web_SUTJoin/include/Register.php', {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        Learning: this.state.data1,
        Volunteer: this.state.data2,
        Recreation: this.state.data3,
        Hangout: this.state.data4,
        Travel: this.state.data5,
        Hobby: this.state.data6,
        Meet: this.state.data7,
        Eatanddrink: this.state.data8,

        user_id: this.state.user_id,
      })
    }).then((response) => response.text())
      .then((responseJson) => {
        this.setState({ loadingVisible : false})

        // Showing response message coming from server after inserting records.
        let { navigation } = this.props;
        let resetAction = StackActions.reset({
            key: undefined,
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Menu' })],
        });
        navigation.dispatch(resetAction);
      }).catch((error) => {
        console.error(error);
      });
      }

    render() {
        const {navigate} = this.props.navigation;
        const { navigation } = this.props;
        // console.log(user_idreg);

        return (
          <LinearGradient
                colors={['#ffd8ff', '#f0c0ff', '#c0c0ff']}
                start={{ x: 0.0, y: 0.5 }}
                end={{ x: 1.0, y: 0.5 }}
                style={{ flex: 1 }}>
          <View style={{ height: theme.sizes.base * 3,flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.1)', }}>
            <View style={{ alignSelf: 'center', paddingHorizontal: width / 50 }}>
                <Text style={{ fontSize: width / 20, fontWeight: 'bold',color: '#ffffff' ,alignSelf:'center'}}>
                    My interests
                </Text>
            </View>
          </View>
          <ScrollView
          showsVerticalScrollIndicator={true}
        >
          <View style={styles.container}>
            
            {/* <View style={{alignItems: 'flex-start',justifyContent: 'flex-start'}}> */}
            {/* <SwitchToggle switchOn={this.state.switchOn1} onPress={this.onPress1} /> */}
            <View style={{flexDirection:'row'}}>
            <View style={styles.view_flex_start}>
                {/* <Text>Studying</Text> */}
                <SwitchToggle
                    containerStyle={{
                        marginTop: 5,
                        width: 108,
                        height: 20,
                        borderRadius: 25,
                        backgroundColor: "#ccc",
                        padding: 5
                    }}
                    circleStyle={{
                        width: 40,
                        height: 27,
                        borderRadius: 19,
                        backgroundColor: "white" // rgb(102,134,205)
                    }}
                    switchOn={this.state.switchOn1}
                    //onPress={this.onPress1}
                    circleColorOff="white"
                    circleColorOn="lightpink"
                    duration={500}
                    />
                    <TouchableOpacity style={styles.button} onPress={this.onPress1}>
                      <Text style={styles.buttontext} onPress={this.onPress1}> Learning </Text>
                    </TouchableOpacity>
            </View>
            <View style={styles.view_flex_end}>
                {/* <Text>Volunteer</Text> */}
                <SwitchToggle
                    containerStyle={{
                        marginTop: 5,
                        width: 108,
                        height: 15,
                        borderRadius: 25,
                        backgroundColor: "#ccc",
                        padding: 5
                    }}
                    circleStyle={{
                        width: 40,
                        height: 27,
                        borderRadius: 19,
                        backgroundColor: "white" // rgb(102,134,205)
                    }}
                    switchOn={this.state.switchOn2}
                    //onPress={this.onPress2}
                    circleColorOff="white"
                    circleColorOn="lightpink"
                    duration={500}
                    />
                    <TouchableOpacity style={styles.button} onPress={this.onPress2}>
                      <Text style={styles.buttontext} onPress={this.onPress2}> Volunteer </Text>
                    </TouchableOpacity>
            </View>
            </View>

            <View style={{flexDirection:'row'}}>
            <View style={styles.view_flex_start}>
                {/* <Text>Recreation</Text> */}
                <SwitchToggle
                    containerStyle={{
                        marginTop: 5,
                        width: 108,
                        height: 15,
                        borderRadius: 25,
                        backgroundColor: "#ccc",
                        padding: 5
                    }}
                    circleStyle={{
                        width: 40,
                        height: 27,
                        borderRadius: 19,
                        backgroundColor: "white" // rgb(102,134,205)
                    }}
                    switchOn={this.state.switchOn3}
                    //onPress={this.onPress3}
                    circleColorOff="white"
                    circleColorOn="lightpink"
                    duration={500}
                    />
                    <TouchableOpacity style={styles.button} onPress={this.onPress3}>
                      <Text style={styles.buttontext} onPress={this.onPress3}> Recreation </Text>
                    </TouchableOpacity>
            </View>
            <View style={styles.view_flex_end}>
                {/* <Text>Hangout</Text> */}
                <SwitchToggle
                    containerStyle={{
                        marginTop: 5,
                        width: 108,
                        height: 15,
                        borderRadius: 25,
                        backgroundColor: "#ccc",
                        padding: 5
                    }}
                    circleStyle={{
                        width: 40,
                        height: 27,
                        borderRadius: 19,
                        backgroundColor: "white" // rgb(102,134,205)
                    }}
                    switchOn={this.state.switchOn4}
                    //onPress={this.onPress4}
                    circleColorOff="white"
                    circleColorOn="lightpink"
                    duration={500}
                    />
                    <TouchableOpacity style={styles.button} onPress={this.onPress4}>
                      <Text style={styles.buttontext} onPress={this.onPress4}> Hangout </Text>
                    </TouchableOpacity>
            </View>
            </View>
                
            <View style={{flexDirection:'row'}}>
            <View style={styles.view_flex_start}>
                {/* <Text>Travel</Text> */}
                <SwitchToggle
                    containerStyle={{
                        marginTop: 5,
                        width: 108,
                        height: 15,
                        borderRadius: 25,
                        backgroundColor: "#ccc",
                        padding: 5
                    }}
                    circleStyle={{
                        width: 40,
                        height: 27,
                        borderRadius: 19,
                        backgroundColor: "white" // rgb(102,134,205)
                    }}
                    switchOn={this.state.switchOn5}
                    //onPress={this.onPress5}
                    circleColorOff="white"
                    circleColorOn="lightpink"
                    duration={500}
                    />
                    <TouchableOpacity style={styles.button} onPress={this.onPress5}>
                      <Text style={styles.buttontext} onPress={this.onPress5}> Travel </Text>
                    </TouchableOpacity>
            </View>
            <View style={styles.view_flex_end}>
                {/* <Text>Hobby</Text> */}
                <SwitchToggle
                    containerStyle={{
                        marginTop: 5,
                        width: 108,
                        height: 15,
                        borderRadius: 25,
                        backgroundColor: "#ccc",
                        padding: 5
                    }}
                    circleStyle={{
                        width: 40,
                        height: 27,
                        borderRadius: 19,
                        backgroundColor: "white" // rgb(102,134,205)
                    }}
                    switchOn={this.state.switchOn6}
                    //onPress={this.onPress6}
                    circleColorOff="white"
                    circleColorOn="lightpink"
                    duration={500}
                    />
                    <TouchableOpacity style={styles.button} onPress={this.onPress6}>
                      <Text style={styles.buttontext} onPress={this.onPress6}> Hobby </Text>
                    </TouchableOpacity>
            </View>
            </View>

            <View style={{flexDirection:'row'}}>
            <View style={styles.view_flex_start}>
                    {/* <Text>Meet</Text> */}
                    <SwitchToggle
                    containerStyle={{
                        marginTop: 5,
                        width: 108,
                        height: 15,
                        borderRadius: 25,
                        backgroundColor: "#ccc",
                        padding: 5
                    }}
                    circleStyle={{
                        width: 40,
                        height: 27,
                        borderRadius: 19,
                        backgroundColor: "white" // rgb(102,134,205)
                    }}
                    switchOn={this.state.switchOn7}
                    //onPress={this.onPress7}
                    circleColorOff="white"
                    circleColorOn="lightpink"
                    duration={500}
                    />
                    <TouchableOpacity style={styles.button} onPress={this.onPress7}>
                      <Text style={styles.buttontext} onPress={this.onPress7}> Meet </Text>
                    </TouchableOpacity>
            </View>
            <View style={styles.view_flex_end}> 
                    {/* <Text>Eat & Drink</Text> */}
                    <SwitchToggle
                    containerStyle={{
                        marginTop: 5,
                        width: 108,
                        height: 15,
                        borderRadius: 25,
                        backgroundColor: "#ccc",
                        padding: 5
                    }}
                    circleStyle={{
                        width: 40,
                        height: 27,
                        borderRadius: 19,
                        backgroundColor: "white" // rgb(102,134,205)
                    }}
                    switchOn={this.state.switchOn8}
                    //onPress={this.onPress8}
                    circleColorOff="white"
                    circleColorOn="lightpink"
                    duration={500}
                    />
                    <TouchableOpacity style={styles.button} onPress={this.onPress8}>
                      <Text style={styles.buttontext} onPress={this.onPress8}> Eat & Drink </Text>
                    </TouchableOpacity>
            </View>
            </View>
            <View>
                <TouchableOpacity style={[
                styles.buttonStyleFollow,
                styles.centerEverything]} onPress={this.OnSave}>
                      <Text style={{
                  color:"#fe53bb",
                  fontSize: 24,
                  fontWeight: 'bold'
                }} onPress={this.OnSave}> Done </Text>
                </TouchableOpacity>
            </View>
            
          </View>
          <View >
            <Spinner visible={this.state.loadingVisible} textContent="Loading..." textStyle={{ color: '#FFF' }} />
          </View>
          </ScrollView>
          </LinearGradient>
        );
    }
    onPress1 = () => {
        this.setState({ switchOn1: !this.state.switchOn1 });
        if(this.state.data1 == 0){
          this.setState({ data1: 1 })
        } else if (this.state.data1 != 0){
          this.setState({ data1: 0 })
        }
      };
    onPress2 = () => {
        this.setState({ switchOn2: !this.state.switchOn2 });
        if(this.state.data2 == 0){
          this.setState({ data2: 2 })
        } else if (this.state.data2 != 0){
          this.setState({ data2: 0 })
        }
      };
    onPress3 = () => {
        this.setState({ switchOn3: !this.state.switchOn3 });
        if(this.state.data3 == 0){
          this.setState({ data3: 3 })
        } else if (this.state.data3 != 0){
          this.setState({ data3: 0 })
        }
      };
    onPress4 = () => {
        this.setState({ switchOn4: !this.state.switchOn4 });
        if(this.state.data4 == 0){
          this.setState({ data4: 4 })
        } else if (this.state.data4 != 0){
          this.setState({ data4: 0 })
        }
      };
    onPress5 = () => {
        this.setState({ switchOn5: !this.state.switchOn5 });
        if(this.state.data5 == 0){
          this.setState({ data5: 5 })
        } else if (this.state.data5 != 0){
          this.setState({ data5: 0 })
        }
      };
    onPress6 = () => {
        this.setState({ switchOn6: !this.state.switchOn6 });
        if(this.state.data6 == 0){
          this.setState({ data6: 6 })
        } else if (this.state.data6 != 0){
          this.setState({ data6: 0 })
        }
      };
    onPress7 = () => {
        this.setState({ switchOn7: !this.state.switchOn7 });
        if(this.state.data7 == 0){
          this.setState({ data7: 7 })
        } else if (this.state.data7 != 0){
          this.setState({ data7: 0 })
        }
      };
    onPress8 = () => {
        this.setState({ switchOn8: !this.state.switchOn8 });
        if(this.state.data8 == 0){
          this.setState({ data8: 8 })
        } else if (this.state.data8 != 0){
          this.setState({ data8: 0 })
        }
      };
      
}

export default MyInterest;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttontext: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  buttontextDone: {
    fontSize: 25,
    fontWeight: '500',
    color: '#ffc9de',
    textAlign: 'center',
},
  button: {
    // width: 110,
    backgroundColor:'#ffc9de',
    borderRadius: 25,
    paddingVertical: 20,
    marginTop: 20,
    marginBottom: 10,
    width: 108
  },
  buttonDone: {
    // width: 110,
    backgroundColor: '#FFFFFF',
    borderColor: '#ffc9de',
    borderWidth:5,
    borderRadius: 25,
    paddingVertical: 20,
    marginTop:20,
    marginBottom:10,
    width:300
},
  view_flex_start: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,

    justifyContent: 'flex-end',
    // marginLeft: 30,

    borderRadius: 4,
    // borderWidth:2,
    // borderColor: '#ffc9de',
    marginTop: 5,
    width: 130,
    height: 130,
    backgroundColor: 'white',
    alignItems: 'center'
  },

  view_flex_end: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,

    justifyContent: 'flex-end',
    marginLeft: 30,

    borderRadius: 4,
    // borderWidth:2,
    // borderColor: '#ffc9de',
    marginTop: 5,
    width: 130,
    height: 130,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  centerEverything: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonStylenoFollow: {
    paddingHorizontal: 30,
    backgroundColor: '#ffa8c0',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2.5,
    borderColor: '#ffa8c0',
  },
  buttonStyleFollow: {
    paddingHorizontal: 30,
    paddingVertical:10,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2.5,
    borderColor: '#fe53bb',
    marginVertical:10
  },
  back: {
    width: theme.sizes.base * 3,
    height: theme.sizes.base * 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 15
  },
});