import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, FlatList ,TextInput} from 'react-native';
import { NetworkInfo } from "react-native-network-info";

export default class App extends Component {

  state = {
    data: []
  }

  fetchData = async () => {
    const ipv4 ='10.0.33.150'; // @sut
     // Get IPv4 IP (priority: WiFi first, cellular second)
     NetworkInfo.getIPV4Address().then(ipv4Address => {
      this.ipv4 = ipv4Address
      console.log('http://'+this.ipv4+':1348/user');
    });
    const response = await fetch('http://192.168.1.29:1348/user');
    const users = await response.json();
    this.setState({ data: users });
  }
  componentDidMount() {
    this.fetchData();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});