import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar,
} from "react-native";

class Checkin extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>CHECKIN</Text>
            </View>
        );
    }
}
export default Checkin;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});