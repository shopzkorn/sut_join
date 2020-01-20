import React, { Component } from 'react';
import Geolocation from 'react-native-geolocation-service';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  PermissionsAndroid
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import LinearGradient from 'react-native-linear-gradient';

export default class ScanScreen extends Component {
  state = {
    lat: '',
    lng: '',
    macAddress: '',
    user_id:'',
    subject:'',
    date:''
  }
  onSuccess = (e) => {
    // Linking
    //   .openURL(e.data)
    //   .catch(err => console.error('An error occured', err));
    console.log(e.data)
    this.setState( (prevState, props) => ({
      subject: e.data.split('_')[0],
      date: e.data.split('_')[1],
    }), () => {
    console.log(this.state.subject+this.state.date),
    this.checked()
  })
  }
  permisions = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location")
      } else {
        console.log("Location permission denied")
      }
    } catch (err) {
      console.warn(err)
    }

    const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    if (granted) {
      console.log("You can use the ACCESS_FINE_LOCATION")
    }
    else {
      console.log("ACCESS_FINE_LOCATION permission denied")
    }

    Geolocation.getCurrentPosition(
      (position) => {
        this.setState(
          {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
        )
        console.log(position);
        console.log(position.coords.latitude);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
    DeviceInfo.getMacAddress().then(mac => {
      // "E5:12:D8:E5:69:97"
      this.setState({
        macAddress : mac
      })
      console.log(mac);
    });
  }

  checked(){
    fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/checkName.php', {
            method: 'post',
            headers: new Headers({
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
              lat: this.state.lat,
              lng: this.state.lng,
              macAddress: this.state.macAddress,
              user_id: this.state.user_id,
              subject: this.state.subject,
              date: this.state.date,
              status: 1
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
    this.permisions();
  }
  render() {
    return (
      <LinearGradient
      colors={['#ffd8ff', '#f0c0ff', '#c0c0ff']}
      start={{ x: 0.0, y: 0.5 }}
      end={{ x: 1.0, y: 0.5 }}
      style={{ flex: 1 }} >
      <ScrollView>
          
      </ScrollView>
  </LinearGradient>
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
