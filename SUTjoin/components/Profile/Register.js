import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
  Dimensions,
  Picker,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import * as theme from '../../theme';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
const { width, height } = Dimensions.get('window');
const options = {
  title: 'Select a photo',
  chooseFromLibraryButtonTitle	: 'Choose from gallery',
  quality:1

};
class Register extends Component {

  
  constructor(props) {
    super(props);
    this.state = {
      Name: '', Surname: '', Username: '', Password: '', Email: '', Phone: '', Gender: '1', Status: '1',
      sliderOneChanging: false,
      sliderOneValue: [1],
      imageSource: null,
      imageName:null,
      imagePath:null
    };
  }

  selectPhoto() {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        this.setState({
          imageSource: source,
          imageName: response.fileName,
          imagePath: response.data
        });
      }
      console.log(response.fileName);
    });

  }

  register() {

    RNFetchBlob.fetch('POST', 'http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/uploadPhoto.php', {
      Authorization : "Bearer access-token",
      otherHeader : "foo",
      'Content-Type' : 'multipart/form-data',
    }, [
      // custom content type
      { name : 'image', filename : this.state.imageName, data: this.state.imagePath},
    ]).then((resp) => {
      console.log(resp);
    }).catch((err) => {
      console.log(err);
    })

    const { navigate } = this.props.navigation;
    fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/Register.php', {
      // fetch('http://localhost:8080/Web_SUTJoin/include/Register.php', {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        name: this.state.Name,
        surname: this.state.Surname,
        username: this.state.Username,
        password: this.state.Password,
        email: this.state.Email,
        phone: this.state.Phone,
        gender: this.state.Gender,
        status: this.state.Status,
        age: this.state.sliderOneValue[0],
        profile:this.state.imageName
      })
    }).then((response) => response.text())
      .then((responseJson) => {
        // Showing response message coming from server after inserting records.
        alert(responseJson);
        navigate('Login')
      }).catch((error) => {
        console.error(error);
      });

  }

  sliderOneValuesChangeStart = () => {
    this.setState({
      sliderOneChanging: true,
    });
  };
  sliderOneValuesChange = values => {
    let newValues = [0];
    newValues[0] = values[0];
    this.setState({
      sliderOneValue: newValues,
    });
  };

  sliderOneValuesChangeFinish = () => {
    this.setState({
      sliderOneChanging: false,
    });
  };

  render() {
    return (
      <LinearGradient
        start={{ x: 0.0, y: 0.25 }}
        end={{ x: 0.5, y: 1.0 }}
        locations={[0, 0.5, 0.6]}
        colors={['white', 'pink']} >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: theme.sizes.padding }}
        >
          <View style={styles.container}>
            <Text style={styles.text}>Register</Text>

            <View>
              <TextInput
                style={styles.inputbox}
                placeholder='Name'
                placeholderTextColor='#808080'
                value={this.state.Name}
                onChangeText={Name => this.setState({ Name })}
              />
              <TextInput
                style={styles.inputbox}
                placeholder='Surname'
                placeholderTextColor='#808080'
                value={this.state.Surname}
                onChangeText={Surname => this.setState({ Surname })}
              />
              <TextInput
                style={styles.inputbox}
                placeholder='Username'
                placeholderTextColor='#808080'
                value={this.state.Username}
                onChangeText={Username => this.setState({ Username })}
              />
              <TextInput
                style={styles.inputbox}
                placeholder='Password'
                placeholderTextColor='#808080'
                secureTextEntry={true}
                value={this.state.Password}
                onChangeText={Password => this.setState({ Password })}
              />
              <TextInput
                style={styles.inputbox}
                placeholder='Email'
                placeholderTextColor='#808080'
                value={this.state.Email}
                onChangeText={Email => this.setState({ Email })}
              />
              <TextInput
                style={styles.inputbox}
                placeholder='Phone'
                placeholderTextColor='#808080'
                value={this.state.Phone}
                onChangeText={Phone => this.setState({ Phone })}
              />
              <View style={{ flexDirection: 'row', }}>
                <Text>Gender</Text>
                <Picker
                  style={{ height: 250, width: 100, alignContent: 'center', }}
                  selectedValue={this.state.Gender}
                  onValueChange={(itemValue, itemIndex) => this.setState({ Gender: itemValue })}
                >
                  <Picker.Item label="Male" value="1" />
                  <Picker.Item label="Female" value="2" />
                </Picker>
                <Text>Status</Text>
                <Picker
                  style={{ height: 250, width: 140, alignContent: 'center', }}
                  selectedValue={this.state.Status}
                  onValueChange={(itemValue, itemIndex) => this.setState({ Status: itemValue })}
                >
                  <Picker.Item label="Student" value="1" />
                  <Picker.Item label="Teacher" value="2" />
                  <Picker.Item label="Personel" value="3" />
                  <Picker.Item label="General Public" value="4" />
                </Picker>
              </View>
              <View style={styles.sliderOne}>
                <Text>Age </Text>
                <Text
                  style={[
                    styles.text,
                  ]}
                >
                  {this.state.sliderOneValue}
                </Text>
              </View>
              <MultiSlider
                values={this.state.sliderOneValue}
                sliderLength={300}
                onValuesChangeStart={this.sliderOneValuesChangeStart}
                onValuesChange={this.sliderOneValuesChange}
                onValuesChangeFinish={this.sliderOneValuesChangeFinish}
                min={1}
                max={100}
              />

              {/* <TextInput 
                    style={styles.inputbox}
                    placeholder='Student ID'
                    placeholderTextColor='#808080'
                    />

                <TextInput 
                    style={styles.inputbox}
                    placeholder='GPAX'
                    placeholderTextColor='#808080'
                    /> */}
            </View>
            <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={this.selectPhoto.bind(this)}>
              <View>
                <Text style={styles.buttontext}> Add photo </Text>
              </View>
            </TouchableOpacity>
            <Image style={[styles.flex, styles.destination, styles.shadow]} source={this.state.imageSource}/>
            <TouchableOpacity style={styles.button} onPress={this.register.bind(this)}>
              <Text style={styles.buttontext}> Register </Text>
            </TouchableOpacity>
            <View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
}
export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  inputbox: {
    width: 300,
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 25,
    fontSize: 16,
    // paddingLeft: 50,
    paddingHorizontal: 60,
    margin: 10,
  },
  textTitle: {
    fontSize: 40,
  },
  text: {
    fontSize: 16,
  },
  buttontext: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
    textAlign: 'center',
  },
  button: {
    width: 300,
    backgroundColor: '#ffc9de',
    borderRadius: 25,
    paddingVertical: 16
  },
  signuptext: {
    fontSize: 40,
  },
  sliderOne: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  destination: {
    width: width - (theme.sizes.padding * 2),
    height: width * 0.6,
    marginHorizontal: theme.sizes.margin,
    paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.padding * 0.66,
    borderRadius: theme.sizes.radius,
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  flex: {
    flex: 0,
  },
});