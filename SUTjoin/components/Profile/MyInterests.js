import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    TouchableOpacity,
} from "react-native";

import SwitchToggle from "react-native-switch-toggle";

class MyInterest extends React.Component {
    login() {
        const {navigate} = this.props.navigation;
        fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/getProfile.php', {
        method: 'post',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          user_id : this.state.User_idreg,
        })
        }).then((response) => response.text())
        .then((responseJson) => {
          // Showing response message coming from server after inserting records.
          alert(responseJson);
        })
        .catch((error) => {
          console.error(error);
        });
      }

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
        };
      }
    
      // getButtonText() {
      //   return this.state.switchOn4 ? "Hour" : "Day";
      // }
    
      // getRightText() {
      //   return this.state.switchOn4 ? "" : "Hour";
      // }
    
      // getLeftText() {
      //   return this.state.switchOn4 ? "Day" : "";
      // }
      

    render() {
        const {navigate} = this.props.navigation;
        const { navigation } = this.props;
        const user_idreg = navigation.getParam('user_id');
        console.log(user_idreg);

        
        
        return (
          
          <View style={styles.container}>
            <Text style={{fontSize:30,marginBottom:70}}>My Interest</Text>
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
                    onPress={this.onPress1}
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
                    onPress={this.onPress2}
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
                    onPress={this.onPress3}
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
                    onPress={this.onPress4}
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
                    onPress={this.onPress5}
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
                    onPress={this.onPress6}
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
                    onPress={this.onPress7}
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
                    onPress={this.onPress8}
                    circleColorOff="white"
                    circleColorOn="lightpink"
                    duration={500}
                    />
                    <TouchableOpacity style={styles.button} onPress={this.onPress8}>
                      <Text style={styles.buttontext} onPress={this.onPress8}> Eat & Drink </Text>
                    </TouchableOpacity>
            </View>
            </View>
            
          </View>
        );
    }
    onPress1 = () => {
        this.setState({ switchOn1: !this.state.switchOn1 });
      };
    onPress2 = () => {
        this.setState({ switchOn2: !this.state.switchOn2 });
      };
    onPress3 = () => {
        this.setState({ switchOn3: !this.state.switchOn3 });
      };
    onPress4 = () => {
        this.setState({ switchOn4: !this.state.switchOn4 });
      };
    onPress5 = () => {
        this.setState({ switchOn5: !this.state.switchOn5 });
      };
    onPress6 = () => {
        this.setState({ switchOn6: !this.state.switchOn6 });
      };
    onPress7 = () => {
        this.setState({ switchOn7: !this.state.switchOn7 });
      };
    onPress8 = () => {
        this.setState({ switchOn8: !this.state.switchOn8 });
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
  button: {
      // width: 110,
      backgroundColor: '#ffc9de',
      borderRadius: 25,
      paddingVertical: 20,
      marginTop:20,
      marginBottom:10,
      width:108
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
    marginTop:5,
    width:130,
    height:130,
    backgroundColor:'white',
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
    marginTop:5,
    width:130,
    height:130,
    backgroundColor:'white',
    alignItems: 'center'
  },

});