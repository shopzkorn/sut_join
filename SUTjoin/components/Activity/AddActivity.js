import React, { Component } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  View,
  AsyncStorage,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  Picker
} from 'react-native';

import DateTimePicker from "react-native-modal-datetime-picker";
import moment from 'moment'
import LinearGradient from 'react-native-linear-gradient';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import * as theme from '../../theme';
const { width, height } = Dimensions.get('window');

const options = {
  title: 'Select a photo',
  chooseFromLibraryButtonTitle: 'Choose from gallery',
  quality: 1

};

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 1,
      latitude: '',
      longitude: '',
      Title: '',
      description: '',
      Tag: '',
      Location: '',
      start: '',
      End: '',
      Gender: '1',
      Amount: '',
      agemin: '',
      agemax: '',
      sliderOneChanging: false,
      sliderOneValue: [1],
      multiSliderValue: [0, 60],
      nonCollidingMultiSliderValue: [0, 100],
      isDateTimePickerVisible: false,
      chosendate: '',
      datetimes: '',
      imageSource: null,
      imageName: null,
      imagePath: null,
      id_host: '',
      address:'',
      Volunteer: 0,
    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <View style={[styles.row, styles.header]}>
          <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
            <FontAwesome name="chevron-left" color={theme.colors.black} size={theme.sizes.font * 1} />
          </TouchableOpacity>
          <Text style={styles.highlight}>
            Create new event
          </Text>
        </View>

      ),
    }
  }




  returnData = (SetLocation, lat, lng, address) => {
    // var lats = lat.toFixed(6);
    this.setState({ Location: SetLocation, latitude: lat, longitude: lng, address: address });
    console.log(this.state.latitude);
  }

  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };

  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };

  handleDatePicked = (datetime) => {
    console.log("A date has been picked: ", datetime);
    this.setState({
      isDateTimePickerVisible: true,
      chosendate: moment(datetime).format('MMMM, Do YYYY HH:mm'),
      datetimes: datetime
    });
    console.log("A date has been picked: ", this.state.datetimes);
    this.hideDateTimePicker();
  };


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

  multiSliderValuesChange = values => {
    this.setState({
      multiSliderValue: values,
    });
  };

  nonCollidingMultiSliderValuesChange = values => {
    this.setState({
      nonCollidingMultiSliderValue: values,
    });
  };

  componentWillMount() {
    AsyncStorage.multiGet(['user_id']).then((data) => {
      let user_id = data[0][1];
      this.setState({
        id_host: user_id,
      });
    });

  }

  selectPhoto() {
    ImagePicker.showImagePicker(options, (response) => {
      // console.log('Response = ', response);
      // const uriPart = response.uri.split('.');
      // const fileExtension = uriPart[uriPart.length - 1];
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
    });
    console.log(this.state.imageName);
  }
  _getOptionList() {
    return this.refs['OPTIONLIST'];
  }
  register = (event) => {


    console.log(this.state.type);

    RNFetchBlob.fetch('POST', 'http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/uploadPhoto.php', {
      Authorization: "Bearer access-token",
      otherHeader: "foo",
      'Content-Type': 'multipart/form-data',
    }, [
      // custom content type
      { name: 'image', filename: this.state.imageName, data: this.state.imagePath },
    ]).then((resp) => {
      console.log(resp);
    }).catch((err) => {
      console.log(err);
    })

    fetch('http://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/AddActivity.php', {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        id_host: this.state.id_host,
        title: this.state.Title,
        description: this.state.description,
        tag: this.state.Tag,
        location: this.state.Location,
        datetimes: this.state.datetimes,
        number_people: this.state.sliderOneValue[0],
        minage: this.state.multiSliderValue[0],
        maxage: this.state.multiSliderValue[1],
        gender: this.state.Gender,
        image: this.state.imageName,
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        address: this.state.address,
        type: this.state.type
      })
    }).then((response) => response.text())
      .then((responseJson) => {

        // Showing response message coming from server after inserting records.
        alert(responseJson);

      }).catch((error) => {
        console.error(error);
      });
    event.preventDefault();
  }

  volunteerCheck = () => {
    if(this.state.type == 2){
      return (
      <View>
      <Text style={styles.text}>Volunteer</Text>
            <TextInput
              placeholder='Volunteer'
              value={this.state.Volunteer}
              onChangeText={Volunteer => this.setState({ Volunteer })}
              style={styles.input}
              multiline={true}
              numberOfLines={5}
              underlineColorAndroid="transparent"
              keyboardType={'email-address'}
            />
            </View>
      )
    }
  }

  render() {
    const { navigation } = this.props;
    return (
      <LinearGradient
        colors={['#ffd8ff', '#f0c0ff', '#c0c0ff']}
        start={{ x: 0.0, y: 0.5 }}
        end={{ x: 1.0, y: 0.5 }}
        style={{ flex: 1 }}>
        <ScrollView style={styles.scrollView}>
          <View style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>



            <Text style={styles.text}>Title event</Text>
            <TextInput
              placeholder='Title'
              value={this.state.Title}
              onChangeText={Title => this.setState({ Title })}
              style={styles.textbox}
              underlineColorAndroid="transparent"
              keyboardType={'email-address'}
            />
            <Text style={styles.text}>Description event</Text>
            <TextInput
              placeholder='Description'
              value={this.state.description}
              onChangeText={description => this.setState({ description })}
              style={styles.input}
              multiline={true}
              numberOfLines={5}
              underlineColorAndroid="transparent"
              keyboardType={'email-address'}
            />
            <Text style={styles.text}>Event type</Text>
            {/* <TextInput
              placeholder='Type'
              value={this.state.Tag}
              onChangeText={Tag => this.setState({ Tag })}
              style={styles.textbox}
              underlineColorAndroid="transparent"
              keyboardType={'email-address'}
            /> */}
            <Picker
              style={{ height: 50, width: '80%' }}
              selectedValue={this.state.type}
              onValueChange={this.volunteerCheck(),(itemValue, itemIndex) => this.setState({ type: itemValue }) }
            >
              <Picker.Item label="Learning" value="1" />
              <Picker.Item label="Volunteer" value="2" />
              <Picker.Item label="Recreation" value="3" />
              <Picker.Item label="Hangout" value="4" />
              <Picker.Item label="Travel" value="5" />
              <Picker.Item label="Hobby" value="6" />
              <Picker.Item label="Meet" value="7" />
              <Picker.Item label="Eat & Drink" value="8" />
            </Picker>

            {this.volunteerCheck()}

            <Text style={styles.text}>Location event</Text>
            <Text style={{ color: '#ffffff', fontSize: 16, justifyContent: 'center', }}> {this.state.Location} </Text>
            <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => navigation.navigate('SelectMap', { returnData: this.returnData.bind(this) })}>
              <View>
                <Text style={{ color: '#ffffff', fontSize: 16, justifyContent: 'center', }}> Choose location </Text>
              </View>
            </TouchableOpacity>
            <Text style={styles.text}>Date: {this.state.chosendate}</Text>
            <TouchableOpacity style={styles.button} title="Choose date" onPress={this.showDateTimePicker} >
              <View>
                <Text style={{ color: '#ffffff', fontSize: 16 }}> Choose date </Text>
              </View>
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this.handleDatePicked}
                onCancel={this.hideDateTimePicker}
                mode={'datetime'}
                is24Hour={false}
              />
            </TouchableOpacity>

            <Text style={styles.text}>Gender</Text>
            <Picker
              style={{ height: 50, width: '80%' }}
              selectedValue={this.state.Gender}
              onValueChange={(itemValue, itemIndex) => this.setState({ Gender: itemValue })}
            >
              <Picker.Item label="Male" value="1" />
              <Picker.Item label="Female" value="2" />
              <Picker.Item label="Male & Female" value="3" />
            </Picker>
            <View style={styles.sliderOne}>
              <Text style={styles.text}>Number of people: </Text>
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
              sliderLength={280}
              onValuesChangeStart={this.sliderOneValuesChangeStart}
              onValuesChange={this.sliderOneValuesChange}
              onValuesChangeFinish={this.sliderOneValuesChangeFinish}
              min={1}
              max={30}
            />
            <View style={styles.sliderOne}>
              <Text style={styles.text}>Age range: </Text>
              <Text style={styles.text}>{this.state.multiSliderValue[0]} </Text>
              <Text style={styles.text}> - </Text>
              <Text style={styles.text}>{this.state.multiSliderValue[1]}</Text>
            </View>
            <MultiSlider
              values={[
                this.state.multiSliderValue[0],
                this.state.multiSliderValue[1],
              ]}
              sliderLength={280}
              onValuesChange={this.multiSliderValuesChange}
              min={0}
              max={60}
              step={1}
              allowOverlap
              snapped
            />
            <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={this.selectPhoto.bind(this)}>
              <View>
                <Text style={{ color: '#ffffff', fontSize: 16 }}> Add photo </Text>
              </View>
            </TouchableOpacity>
            {this.renderPhoto()}
            <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={this.register.bind(this)}>
              <View>
                <Text style={{ color: '#ffffff', fontSize: 16 }}> Create </Text>
              </View>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  description: {
    padding: 15,
    lineHeight: 25,
  },
  title: {
    marginTop: 30,
  },
  input: {
    fontFamily: 'SukhumvitSet-Text',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    fontSize: 18,
    color: '#444444',
    width: '70%',
    paddingLeft: 20,
    // marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    paddingLeft: 50,
  },
  textbox: {
    fontFamily: 'SukhumvitSet-Text',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    fontSize: 18,
    color: '#444444',
    width: '70%',
    height: 50,
    paddingLeft: 20,
    // marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
    paddingLeft: 50,
  },
  scrollView: {
    // backgroundColor: Colors.lighter,
  },
  highlight: {
    fontSize: 20,
    fontWeight: '700',
    // alignItems: 'flex-end',
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
  sliderOne: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  text: {
    textAlign: 'left',
    alignSelf: 'center',
    paddingVertical: 20,
  },
  image: {
    width: 400,
    height: 100,
    marginTop: 20
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
  row: {
    flexDirection: 'row'
  },
  header: {
    backgroundColor: '#ffffff',
    paddingHorizontal: theme.sizes.padding,
    paddingTop: theme.sizes.padding * .25,
    // justifyContent: 'space-around',
    alignItems: 'center',
    // position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  back: {
    width: theme.sizes.base * 3,
    height: theme.sizes.base * 3,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
