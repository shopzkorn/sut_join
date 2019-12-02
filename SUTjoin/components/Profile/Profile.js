import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
} from "react-native";


import Login from '../Profile/Login';

class Profile extends React.Component {

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

    render() {
        const {navigate} = this.props.navigation;
        const { navigation } = this.props;
        const user_idreg = navigation.getParam('user_id');
        console.log(user_idreg);
        
        

        return (
            
            <View style={styles.container}>
                <Text style={styles.text}>PROFILE</Text>
                
                <Button
                title="Login"
                onPress={() => navigate('Login')}
                />

                <Button
                title="Register"
                onPress={() => navigate('Register')}
                />

                <Button
                title="Create Activities"
                onPress={() => navigate('AddActivity')}
                />
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
    }
});