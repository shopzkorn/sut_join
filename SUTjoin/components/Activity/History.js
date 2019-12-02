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

class History extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>HISTORY ACTIVITIES</Text>
            </View>
        );
    }
}
export default History;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});