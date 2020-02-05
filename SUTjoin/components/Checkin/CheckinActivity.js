import React, { Component } from 'react';
import Geolocation from 'react-native-geolocation-service';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
  SafeAreaView,
  TextInput,
  Dimensions,
  BackHandler
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { RNCamera as Camera } from 'react-native-camera';
import { withNavigationFocus } from "react-navigation";
import LinearGradient from 'react-native-linear-gradient';
import BarcodeMask from 'react-native-barcode-mask';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const { width, height } = Dimensions.get('window');

class ScanScreen extends Component {
  state = {
    lat: '',
    lng: '',
    macAddress: '',
    user_id: '',
    id_activity: '',
    subject: '',
    date: '',
    isCameraVisible: false,
    keyword: '',
    room_lat: '',
    room_lng: '',
    check : 0
  }
  onSuccessButton = () => {
    if(this.state.keyword !=''){
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    if (month < 10) {
      month = '0' + month;
    }
    this.setState((prevState, props) => ({
      id_activity: this.state.keyword.split('-')[0],
      date: date + '/' + month + '/' + year
    }), () => {
      console.log(this.state.id_activity + this.state.date),
        this.checked(2)
    })
  }else{
    alert('กรุณาใส่code check in');
  }
  }
  onSuccessScan = (e) => {
    if(this.state.check == 0){
    console.log(e.data.split('_').length)
    if (e.data.split('_').length == 3) {
      this.setState((prevState, props) => ({
        id_activity: e.data.split('_')[1],
        date: e.data.split('_')[2],
      }), () => {
        console.log(this.state.id_activity),
          this.checked(2)
          this.setState({check : 1})
      })
    } else if (e.data.split('_').length == 4) {
      this.setState((prevState, props) => ({
        subject: e.data.split('_')[0],
        date: e.data.split('_')[1],
        room_lat: e.data.split('_')[2],
        room_lng: e.data.split('_')[3],
      }), () => {
        console.log(this.state.subject + this.state.date),
          this.checked(1)
          this.setState({check : 1})
      })
    } else {
      alert("Can't scan this qrcode");
    }
  }
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
        macAddress: mac
      })
      console.log(mac);
    });
  }

  checked = (num) => {
    if (num == 2) {
      fetch('https://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/checkName.php', {
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
          id_activity: this.state.id_activity,
          date: this.state.date,
          status: 2
        })
      }).then((response) => response.text())
        .then((responseJson) => {
          // console.log('res ' + responseJson.length);
          alert(responseJson);
        }).catch((error) => {
          console.error(error);
        });
    } else {
      var Hours = new Date().getHours(); //Current Date
      var Minutes = new Date().getMinutes(); //Current Date
      var Time = Hours+":"+Minutes
      fetch('https://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/checkName.php', {
        method: 'post',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          lat: this.state.lat,
          lng: this.state.lng,
          room_lat: this.state.room_lat,
          room_lng: this.state.room_lng,
          macAddress: this.state.macAddress,
          user_id: this.state.user_id,
          subject: this.state.subject,
          date: this.state.date,
          time:Time,
          status: 1
        })
      }).then((response) => response.text())
        .then((responseJson) => {
          // console.log('res ' + responseJson.length);
          this.setState({ isCameraVisible: false })
          alert(responseJson);
        }).catch((error) => {
          console.error(error);
        });
    }
  }
  renderCamera() {
    const isFocused = this.props.navigation.isFocused();
    console.log(isFocused)
    if (!isFocused) {
      return null;
    } else if (isFocused) {
      if (this.state.isCameraVisible) {
        return (
          <Camera
            style={styles.preview}
            // torchMode={this.state.torchOn ? Camera.Constants.TorchMode.on : Camera.Constants.TorchMode.off}
            onBarCodeRead={this.onSuccessScan}
            ref={cam => this.camera = cam}
            // aspect={Camera.Constants.Aspect.fill}
            captureAudio={false}
          >
            <BarcodeMask edgeColor={'#62B1F6'} showAnimatedLine={true} />
          </Camera>
        )
      }
    }
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
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient colors={['#ffd8ff', '#f0c0ff', '#c0c0ff']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
          >

          <View style={{ flexDirection: 'row', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.1)', }}>
            <View style={{ justifyContent: 'flex-start' }}>
              <View style={{ paddingVertical: height / 200, flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Text style={{ fontSize: width / 20, fontWeight: 'bold', color: '#ffffff', alignSelf: 'center' }}>
                  Check in
                </Text>
              </View>
            </View>
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <View style={[{ height: 48, backgroundColor: 'rgba(255,255,255,0.5)', flexDirection: 'row', }]}>
              <TextInput style={[styles.text_font, { flex: 1, paddingLeft: 18, }]}
                placeholder="Insert check in code"
                placeholderTextColor="#000000"
                underlineColorAndroid="transparent"
                onChangeText={(keyword) => { this.setState({ keyword }) }}
                value={this.state.keyword}
              />
              <TouchableOpacity style={{ width: 50, height: 60, }} onPress={() => {
                if (!this.state.isCameraVisible) {
                  this.setState({ isCameraVisible: true , check:0 })
                } else {
                  this.setState({ isCameraVisible: false })
                }
              }}>
                <Icon name="qrcode" size={28} style={{ color: '#000000', marginTop: 10, }} />
              </TouchableOpacity>
              <TouchableOpacity style={{ width: 50, height: 60, }} onPress={() => { this.onSuccessButton() }}>
                <Icon name="check" size={28} style={{ color: '#000000', marginTop: 10, }} />
              </TouchableOpacity>
            </View>
          </View>
          {this.renderCamera()}
        </LinearGradient>
      </SafeAreaView>
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
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  buttonStyleFollow: {
    paddingHorizontal: 30,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2.5,
    borderColor: '#fe53bb',
  },
});

export default withNavigationFocus(ScanScreen);