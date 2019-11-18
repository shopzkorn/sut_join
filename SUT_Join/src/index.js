import React, { Component } from 'react';
import { Platform, StyleSheet, View, Text } from 'react-native';
import firebase from 'firebase';
import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
  } from 'react-native/Libraries/NewAppScreen';
export default class App extends Component {
    componentDidMount() {
        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyBrabdxmLofbkHd_udyXIpgiIoZrFnjBhs",
            authDomain: "sut-join.firebaseapp.com",
            databaseURL: "https://sut-join.firebaseio.com",
            projectId: "sut-join",
            storageBucket: "sut-join.appspot.com",
            messagingSenderId: "535754743778"
        };
        // Initialize Firebase
        //firebase.initializeApp(firebaseConfig);
        !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
        //firebase.analytics();
        console.log(firebase);
    }
    render() {
        return (
            <View style={styles.highlight}>
                <Text style={styles.highlight}>

                </Text>
                <Text style={styles.highlight}>
                    To get started, edit App.js
            </Text>
                <Text style={styles.highlight}>
                   
                </Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    scrollView: {
      backgroundColor: Colors.lighter,
    },
    engine: {
      position: 'absolute',
      right: 0,
    },
    body: {
      backgroundColor: Colors.white,
    },
    sectionContainer: {
      marginTop: 32,
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: '600',
      color: Colors.black,
    },
    sectionDescription: {
      marginTop: 8,
      fontSize: 18,
      fontWeight: '400',
      color: Colors.dark,
    },
    highlight: {
      fontWeight: '700',
    },
    footer: {
      color: Colors.dark,
      fontSize: 12,
      fontWeight: '600',
      padding: 4,
      paddingRight: 12,
      textAlign: 'right',
    },
  });