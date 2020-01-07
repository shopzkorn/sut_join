import React, { Component } from 'react';
import Geolocation from 'react-native-geolocation-service';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  PermissionsAndroid
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import QRCodeScanner from 'react-native-qrcode-scanner';

export default class ScanScreen extends Component {
  state = {
    user_id:'',
    id_activity:''
  }
  onSuccess = (e) => {
    console.log(e.data)
    this.setState( (prevState, props) => ({
        id_activity: e.data.split('_')[1]
    }), () => {
    console.log(this.state.id_activity),
    this.checked()
  })
  }

  checked(){
    fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/checkName.php', {
            method: 'post',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
              user_id: this.state.user_id,
              id_activity: this.state.id_activity,
              status: 2
            })
        }).then((response) => response.text())
            .then((responseJson) => {
                // console.log('res ' + responseJson.length);
               alert(responseJson);
            }).catch((error) => {
                console.error(error);
            });
  }

  componentDidMount() {
    AsyncStorage.multiGet(['user_id']).then((data) => {
      let user_id = data[0][1];
      this.setState({
        user_id: user_id.split('"')[1],
      });
    });
    // Instead of navigator.geolocation, just use Geolocation.
  }
  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess}

        topContent={
          <Text style={styles.centerText}>
            Scan for check in join
          </Text>
        }
        // bottomContent={
        //   <TouchableOpacity style={styles.buttonTouchable}>
        //     <Text style={styles.buttonText}>OK. Got it!</Text>
        //   </TouchableOpacity>
        // }
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
  },
  buttonTouchable: {
    padding: 16,
  },
});
