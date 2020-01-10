import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    Platform,
    StatusBar,
} from "react-native";

class Checkin extends Component {

    render() {
        const { navigation } = this.props;
        return (
            <View style={[styles.container]}>
            <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => navigation.navigate('ScanQrcode')}>
              <View>
                <Text style={{ color: '#ffffff', fontSize: 16 }}> check the student name </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => navigation.navigate('CheckinActivity')}>
              <View>
                <Text style={{ color: '#ffffff', fontSize: 16 }}> check in join </Text>
              </View>
            </TouchableOpacity>
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
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffc9de', //#B7BBBB//#DADFDF//#A0C8CB//#83CCD0//#279591
        borderRadius: 10,
        width: '45%',
        height: 50,
        margin: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
      },
});