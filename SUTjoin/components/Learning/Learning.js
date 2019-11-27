import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Platform,
    StatusBar
} from "react-native";

class Learning extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>LEARNING</Text>
            </View>
        );
    }
}
export default Learning;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});