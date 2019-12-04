import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage,
    TextInput,
    Platform,
    StatusBar,
    TouchableOpacity
} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";

class Login extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
        
        Username: '', Password: '',
        };
      }

      login() {
          console.log("login");
        const {navigate} = this.props.navigation;
        fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/Login.php', {
        method: 'post',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          username : this.state.Username,
          password : this.state.Password,
        })
        }).then((response) => response.text())
        .then((responseJson) => {
          // Showing response message coming from server after inserting records.
        //   alert(responseJson);
          if(responseJson != 0){
            navigate('Menu', {user_id: responseJson })
            AsyncStorage.multiSet([
                ["user_id", responseJson]
            ])
        }else{
            alert("username or password incorrect");
        }
        })
        .catch((error) => {
          console.error(error);
        });
        AsyncStorage.multiGet(['user_id']).then((data) => {
            let user_id = data[0][1];
            console.log("Session id is"+user_id);
          
        });
      }
      
    render() {
         AsyncStorage.multiSet([
                ["user_id", null]
            ])
        const { navigation } = this.props;
        const {navigate} = this.props.navigation;
        return (
            
            <View style={styles.container}>
            <Text style={styles.text}>Login</Text>
            <View>
                <TextInput 
                style={styles.inputbox}
                placeholder='Username'
                placeholderTextColor='#808080'
                value={this.state.Username}
                onChangeText={Username => this.setState({ Username })}
                />
            <TextInput 
                style={styles.inputbox}
                placeholder='Password'
                placeholderTextColor='#808080'
                secureTextEntry={true}
                value={this.state.Password}
                onChangeText={Password => this.setState({ Password })}
                />
                
            </View>
            <TouchableOpacity style={styles.button} onPress={this.login.bind(this)}>
                <Text style={styles.buttontext} onPress={this.login.bind(this)}> Login </Text>
            </TouchableOpacity>
            <View style={styles.signuptextcont}>
                <Text style={styles.signuptext}> Don't have an account yet?</Text>
                <Text style={styles.signuptextLink} onPress={() => navigate('Register')}>Register</Text>
            </View>
        </View>
        );
    }
}
export default Login;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFC0CB',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    inputbox: {
        width: 300,
        height: 50,
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 25,
        fontSize: 16,
        // paddingLeft: 50,
        paddingHorizontal: 60,
        margin: 10,
    },
    text: {
        textAlign: 'left',
        alignSelf: 'center',
        paddingVertical: 20,
      },
    buttontext: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center',
    },
    button: {
        width: 300,
        backgroundColor: '#ffc9de',
        borderRadius: 25,
        paddingVertical: 16
    },
    signuptextcont: {
        alignItems: 'flex-end',
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 16,
        flexDirection: 'row',
    },
    signuptext: {
        fontSize: 12,
        marginVertical:10,
        color: '#808080',
    },
    signuptextLink: {
        fontSize: 12,
        marginVertical:10,
        color: '#FFFFFF',
        fontWeight: '500',
    },
    header: {
        // backgroundColor: 'transparent',
        // paddingHorizontal: theme.sizes.padding,
        // paddingTop: theme.sizes.padding,
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      },
    
});