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
  ImageBackground,
  BackHandler,
  SafeAreaView,
  FlatList,
  Alert
} from 'react-native';
import Dialog, { DialogFooter, DialogButton, DialogTitle, DialogContent } from 'react-native-popup-dialog';
import DateTimePicker from "react-native-modal-datetime-picker";
import Spinner from 'react-native-loading-spinner-overlay';
import moment from 'moment'
import LinearGradient from 'react-native-linear-gradient';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Foundation from 'react-native-vector-icons/Foundation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import * as theme from '../../theme';
const { width, height } = Dimensions.get('window');

const options = {
  title: 'Select a photo',
  chooseFromLibraryButtonTitle: 'Choose from gallery',
  quality: 1, maxWidth: 1280, maxHeight: 1280

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
      tag: '',
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
      imageName: '',
      imagePath: '',
      id_host: '',
      address: '',
      Volunteer: 0,
      visibleType: false,
      visibleGender: false,
      radio_type: [
        { label: 'Learning', value: 0 },
        { label: 'Volunteer', value: 1 },
        { label: 'Recreation', value: 2 },
        { label: 'Hangout', value: 3 },
        { label: 'Travel', value: 4 },
        { label: 'Hobby', value: 5 },
        { label: 'Meet', value: 6 },
        { label: 'Eat & Drink', value: 7 },
      ],
      radio_type2: [
        { label: 'Learning', value: 0 },
        { label: 'Recreation', value: 2 },
        { label: 'Hangout', value: 3 },
        { label: 'Travel', value: 4 },
        { label: 'Hobby', value: 5 },
        { label: 'Meet', value: 6 },
        { label: 'Eat & Drink', value: 7 },
      ],
      radio_Gender: [
        { label: 'Male', value: 0 },
        { label: 'Female', value: 1 },
        { label: 'Male & Female', value: 2 },
      ],
      Texttype: 'Learning',
      Textgender: 'Male',
      valueType: 0,
      valueGender: 0,
      dataTag: [],
      itemsCount: 5,
      visibleTag: false,
      dataSource:  [],
      user_status: 0,
      loadingVisible : false
    };
  }
  static navigationOptions = ({ navigation }) => {
    return {
      header: (
        <LinearGradient
          colors={['#ffd8ff', '#f0c0ff', '#c0c0ff']}
          start={{ x: 0.0, y: 0.5 }}
          end={{ x: 1.0, y: 0.5 }}
        >
          <View style={{ flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.1)', }}>
            <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()}>
              <FontAwesome name="chevron-left" color={theme.colors.black} size={theme.sizes.font * 1} />
            </TouchableOpacity>
            <View style={{ alignSelf: 'center', paddingHorizontal: width / 8 }}>
              <Text style={{ fontSize: width / 20, fontWeight: 'bold', color: '#ffffff' }}>
                Create new event
          </Text>
            </View>
          </View>
        </LinearGradient>
      ),
    }
  }

  FilterType = (value) => {
    console.log(value);
    if (value == 0) {
      this.setState({
        Texttype: 'Learning'
      })
    }
    else if (value == 1) {
      this.setState({
        Texttype: 'Volunteer'
      })
    }
    else if (value == 2) {
      this.setState({
        Texttype: 'Recreation'
      })
    }
    else if (value == 3) {
      this.setState({
        Texttype: 'Hangout'
      })
    }
    else if (value == 4) {
      this.setState({
        Texttype: 'Travel'
      })
    }
    else if (value == 5) {
      this.setState({
        Texttype: 'Hobby'
      })
    }
    else if (value == 6) {
      this.setState({
        Texttype: 'Meet'
      })
    }
    else if (value == 7) {
      this.setState({
        Texttype: 'Eat & Drink'
      })
    }
    this.setState((prevState, props) => ({
      valueType: value,
      visibleType: false,
      type: value + 1,
    }), () => {

      //this.fetchData()
    })

  }
  FilterType2 = (value) => {
    console.log(value);
    if (value == 0) {
      this.setState({
        Texttype: 'Learning',
        valueType: value,
        visibleType: false,
        type: value + 1,
      })
    }
    else if (value == 2) {
      this.setState({
        Texttype: 'Recreation',
        valueType: value - 1,
        visibleType: false,
        type: value + 1,
      })
    }
    else if (value == 3) {
      this.setState({
        Texttype: 'Hangout',
        valueType: value - 1,
        visibleType: false,
        type: value + 1,
      })
    }
    else if (value == 4) {
      this.setState({
        Texttype: 'Travel',
        valueType: value - 1,
        visibleType: false,
        type: value + 1,
      })
    }
    else if (value == 5) {
      this.setState({
        Texttype: 'Hobby',
        valueType: value - 1,
        visibleType: false,
        type: value + 1,
      })
    }
    else if (value == 6) {
      this.setState({
        Texttype: 'Meet',
        valueType: value - 1,
        visibleType: false,
        type: value + 1,
      })
    }
    else if (value == 7) {
      this.setState({
        Texttype: 'Eat & Drink',
        valueType: value - 1,
        visibleType: false,
        type: value + 1,
      })
    }
   

  }

  FilterGender = (value) => {
    console.log(value);
    if (value == 0) {
      this.setState({
        Textgender: 'Male'
      })
    }
    else if (value == 1) {
      this.setState({
        Textgender: 'Female'
      })
    }
    else if (value == 2) {
      this.setState({
        Textgender: 'Male & Female'
      })
    }

    this.setState((prevState, props) => ({
      valueGender: value,
      visibleGender: false,
      Gender: value + 1,
    }), () => {

      //this.fetchData()
    })

  }
  componentWillUnmount() {
    this.backHandler.remove()
  }
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    AsyncStorage.multiGet(['user_status']).then((data) => {
      let user_status = data[0][1];
      this.setState((prevState, props) => ({
        user_status: user_status
      }), () => {
        console.log(this.state.user_status);
      })
    });
    this.loadData();
  }
  handleBackPress = () => {
    if (this.state.visibleGender) {
      this.setState({
        visibleGender: false
      })
    }
    else if (this.state.visibleType) {
      this.setState({
        visibleType: false
      })
    }
    else {
      this.props.navigation.goBack(); // works best when the goBack is async
    }
    return true;
  }
  renderRadioType = () =>{
    if(this.state.user_status == 0){
     return( <RadioForm
                buttonColor={'#ffc9de'}
                radio_props={this.state.radio_type2}
                initial={this.state.valueType}
                onPress={(value) => { this.FilterType2(value) }}
              />)
    }else{
      return( <RadioForm
        buttonColor={'#ffc9de'}
        radio_props={this.state.radio_type}
        initial={this.state.valueType}
        onPress={(value) => { this.FilterType(value) }}
      />)
    }
  }
  DialogFilter() {
    return (
      <View>

        <Dialog
          visible={this.state.visibleType}
          dialogStyle={{ bottom: 0 }}
          containerStyle={{ height: '100%', justifyContent: 'flex-end' }}
          onTouchOutside={() => {
            this.setState({ visibleType: false });
          }}
          dialogTitle={<DialogTitle title="Event type" />}
          width='100%'
        >
          <DialogContent>
            <View>
              {this.renderRadioType()}
            </View>
          </DialogContent>
        </Dialog>

        <Dialog
          visible={this.state.visibleGender}
          dialogStyle={{ bottom: 0 }}
          containerStyle={{ height: '100%', justifyContent: 'flex-end' }}
          onTouchOutside={() => {
            this.setState({ visibleGender: false });
          }}
          dialogTitle={<DialogTitle title="Gender" />}
          width='100%'
        >
          <DialogContent>
            <View>
              <RadioForm
                buttonColor={'#ffc9de'}
                radio_props={this.state.radio_Gender}
                initial={this.state.valueGender}
                onPress={(value) => { this.FilterGender(value) }}
              />
            </View>
          </DialogContent>
        </Dialog>
      </View>
    )
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
  loadData() {
    fetch('https://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/Trends.php', {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        status: 2,
      })
    }).then((response) => response.json())
      .then((responseJson) => {
        console.log('res ' + responseJson.length);
        this.setState({
          dataTag: responseJson,
          dataSource: responseJson
        });
      }).catch((error) => {
        console.error(error);
      });
  }
  renderPhoto() {
    if (this.state.imageSource != null) {
      return (
        <ImageBackground style={[styles.flex, styles.destination, styles.shadow]} source={this.state.imageSource} >
          <TouchableOpacity style={{ justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 20, marginTop: -10 }} onPress={() => this.setState({ imageSource: null })}>
            <Ionicons name="md-close-circle" color={theme.colors.black} size={width / 15} />
          </TouchableOpacity>
        </ImageBackground>
      );
    }
    else {
      return null;
    }
  }

  selectPhoto() {
    ImagePicker.showImagePicker(options, (response) => {
      // const uriPart = response.uri.split('.');
      // const fileExtension = uriPart[uriPart.length - 1];
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log('Response = ', response);

        // ImageResizer.createResizedImage(response.uri, 1000, 1000, 'JPG', 80) 
        // .then(resizedImageUri => {
        const source = { uri: response.uri }
        this.setState({
          imageSource: source,
          imageName: response.fileName,
          imagePath: response.data
        });
        // }).catch(error => console.log('error resize image'+error))

        //const source = { uri: response.uri };

      }
    });
    console.log(this.state.imageName);
  }
  _getOptionList() {
    return this.refs['OPTIONLIST'];
  }
  create = () => {
    this.setState({ loadingVisible : true})
    fetch('https://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/AddActivity.php', {
      method: 'post',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({
        id_host: this.state.id_host,
        title: this.state.Title,
        description: this.state.description,
        tag: this.state.tag,
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
        type: this.state.type,
        volunteer: this.state.Volunteer
      })
    }).then((response) => response.text())
      .then((responseJson) => {
        this.setState({loadingVisible : false})
        // Showing response message coming from server after inserting records.
        Alert.alert(
          'Sucess',
          responseJson,
          [
            {text: 'OK', onPress: () => this.props.navigation.goBack()},
          ],
          {cancelable: false},
        );
      }).catch((error) => {
        console.error(error);
      });
  }
  register = (event) => {
    console.log(this.state.type);
    RNFetchBlob.fetch('POST', 'https://it2.sut.ac.th/project62_g4/Web_SUTJoin/include/uploadPhoto.php', {
      Authorization: "Bearer access-token",
      otherHeader: "foo",
      'Content-Type': 'multipart/form-data',
    }, [
      // custom content type
      { name: 'image', filename: this.state.imageName, data: this.state.imagePath },
    ]).then((resp) => {
      console.log(resp.text())
      if (resp.text() == '"Success"') {
        this.create();
      } else if (resp.text() == '"Fail"') {
        alert('Upload failed');
      } else {
        alert(resp.text());
      }

    }).catch((err) => {
      console.log(err);
    })


  }

  volunteerCheck = () => {
    if (this.state.type == 2) {
      return (
        <View >
          <TextInput
            placeholder='Volunteer hour'
            value={this.state.Volunteer}
            onChangeText={Volunteer => this.setState({ Volunteer })}
            style={styles.button}
            multiline={true}
            underlineColorAndroid="transparent"
            keyboardType={'number-pad'}
          />
        </View>
      )
    }
  }
  renderTag = () => {
    if (this.state.visibleTag) {
      return (
        <FlatList
          Vertical
          pagingEnabled
          scrollEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          style={[styles.shadow, { overflow: 'visible' }]}
          data={this.state.dataSource.slice(0, this.state.itemsCount)}
          keyExtractor={(item, index) => `${item.id}`}
          renderItem={({ item, index }) => this.renderDestination(item, index)}
        />
      );
    }
  }
  renderDestination = item => {

    return (
      <TouchableOpacity activeOpacity={0.7} style={{
        backgroundColor: 'rgba(255,255,255,0.2)',
        width: width / 1.2,
        paddingLeft: 10,
        paddingVertical: 5,
        marginBottom: 1
      }}
        onPress={() => this.setState({
          tag: item.activity_tag
        })}>
        <View style={{ flexDirection: 'row', marginLeft: 10 }}>
          <Text style={{ color: '#ffffff', fontSize: width / 25, justifyContent: 'center', }}>{item.activity_tag}  </Text>
        </View>
      </TouchableOpacity>
    )
  }
  onChangeText(e) {
    // console.log(this.state.dataSource)
    this.setState({
      tag: e,
      dataSource: this.state.dataTag.filter((item) =>
        item.activity_tag.toLowerCase().includes(e.toLowerCase())),
    });
  }
  render() {
    const { navigation } = this.props;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <LinearGradient
          colors={['#ffd8ff', '#f0c0ff', '#c0c0ff']}
          start={{ x: 0.0, y: 0.5 }}
          end={{ x: 1.0, y: 0.5 }}
          style={{ flex: 1 }}>

          <ScrollView 
          style={{ backgroundColor: 'rgba(0,0,0,0.1)', }}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ paddingBottom: theme.sizes.padding, flexGrow: 1, justifyContent: 'space-between', }}
                >
            <View style={{ paddingHorizontal: width / 12 }}>
              <Text style={{ color: '#ffffff', fontSize: width / 25, marginVertical: 15 }}>Event title</Text>
              <TextInput
                placeholder='Title'
                value={this.state.Title}
                onChangeText={Title => this.setState({ Title })}
                style={styles.input}
                underlineColorAndroid="transparent"
                keyboardType={'email-address'}
              />
            </View>
            <View style={{ paddingHorizontal: width / 12 }}>
              <Text style={{ color: '#ffffff', fontSize: width / 25, marginVertical: 15 }}>Event description</Text>
              <TextInput
                placeholder='Description'
                value={this.state.description}
                onChangeText={description => this.setState({ description })}
                style={styles.inputdes}
                placeholderStyle={{ justifyContent: 'flex-start' }}
                multiline={true}
                numberOfLines={4}
                underlineColorAndroid="transparent"
                keyboardType={'email-address'}
              />
            </View>
            <View style={{ paddingHorizontal: width / 12 }}>
              <Text style={{ color: '#ffffff', fontSize: width / 25, marginVertical: 15 }}>Event tag</Text>
              <TextInput
                placeholder='Tag'
                value={this.state.tag}
                onChangeText={(tag) => this.onChangeText(tag)}
                style={styles.input}
                placeholderStyle={{ justifyContent: 'flex-start' }}
                multiline={true}
                onFocus={() => this.setState({ visibleTag: true })}
                // onEndEditing={() => this.setState({ visibleTag: false })}
                underlineColorAndroid="transparent"
                keyboardType={'email-address'}
              />
              {this.renderTag()}
            </View>
            <View style={{ borderBottomColor: 'rgba(255,255,255,0.2)', borderBottomWidth: 3, marginVertical: 20 }} />

            <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => this.setState({ visibleType: true })}>
              <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                <Ionicons name="md-pricetags" color={theme.colors.black} size={theme.sizes.font * 1.5} />
                <Text style={{ color: '#ffffff', fontSize: width / 25, justifyContent: 'center', marginLeft: 10 }}>Event type </Text>
              </View>
              <Text style={{ color: '#ffffff', fontSize: width / 25, justifyContent: 'center', }}> {this.state.Texttype} </Text>
              <View style={{ marginRight: 20 }}>
                <Ionicons name="ios-arrow-forward" color={theme.colors.black} size={theme.sizes.font * 1.5} />
              </View>
            </TouchableOpacity>
            {this.volunteerCheck()}
            <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => navigation.navigate('SelectMap', { returnData: this.returnData.bind(this) })}>
              <View style={{ flexDirection: 'row', marginLeft: 18 }}>
                <MaterialCommunityIcons name="map-marker-outline" color={theme.colors.black} size={theme.sizes.font * 1.5} />
                <Text style={{ color: '#ffffff', fontSize: width / 25, justifyContent: 'center', marginLeft: 10 }}>Choose location </Text>
              </View>
              <Text style={{ color: '#ffffff', fontSize: width / 25, justifyContent: 'center', }}> {this.state.Location} </Text>
              <View style={{ marginRight: 20 }}>
                <Ionicons name="ios-arrow-forward" color={theme.colors.black} size={theme.sizes.font * 1.5} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} title="Choose date" onPress={this.showDateTimePicker} >
              <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                <Ionicons name="md-calendar" color={theme.colors.black} size={theme.sizes.font * 1.5} />
                <Text style={{ color: '#ffffff', fontSize: width / 25, marginLeft: 10 }}> Date & Time </Text>
              </View>
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this.handleDatePicked}
                onCancel={this.hideDateTimePicker}
                mode={'datetime'}
                minimumDate	={new Date()}
                is24Hour={false}
              />
              <Text style={{ color: '#ffffff', fontSize: width / 25, justifyContent: 'center', }}>{this.state.chosendate}</Text>
              <View style={{ marginRight: 20 }}>
                <Ionicons name="ios-arrow-forward" color={theme.colors.black} size={theme.sizes.font * 1.5} />
              </View>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={this.selectPhoto.bind(this)}>
              <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                <MaterialCommunityIcons name="image" color={theme.colors.black} size={theme.sizes.font * 1.5} />
                <Text style={{ color: '#ffffff', fontSize: width / 25, justifyContent: 'center', marginLeft: 10 }}>Add cover event</Text>
              </View>
              <View style={{ marginRight: 20 }}>
                <Ionicons name="ios-arrow-forward" color={theme.colors.black} size={theme.sizes.font * 1.5} />
              </View>
            </TouchableOpacity>
            {this.renderPhoto()}
            <View style={{ borderBottomColor: 'rgba(255,255,255,0.2)', borderBottomWidth: 3, marginVertical: 20 }} />
            <View style={{ paddingHorizontal: width / 12 }}>
              <Text style={{ color: '#ffffff', fontSize: width / 25, marginBottom: 15 }}>Looking for</Text>
            </View>
            <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => this.setState({ visibleGender: true })}>
              <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                <Foundation name="male-female" color={theme.colors.black} size={theme.sizes.font * 1.5} />
                <Text style={{ color: '#ffffff', fontSize: width / 25, justifyContent: 'center', marginLeft: 10 }}>Gender</Text>
              </View>
              <Text style={{ color: '#ffffff', fontSize: width / 25, justifyContent: 'center', }}> {this.state.Textgender} </Text>
              <View style={{ marginRight: 20 }}>
                <Ionicons name="ios-arrow-forward" color={theme.colors.black} size={theme.sizes.font * 1.5} />
              </View>
            </TouchableOpacity>

            <View style={{ backgroundColor: 'rgba(255,255,255,0.2)', width: width, }}>

              <View style={styles.sliderOne}>
                <Text style={{ color: '#ffffff', fontSize: width / 25, }}>Number of people: </Text>
                <Text
                  style={{ color: '#ffffff', fontSize: width / 25, }}>
                  {this.state.sliderOneValue}
                </Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <MultiSlider
                  values={this.state.sliderOneValue}
                  sliderLength={280}
                  onValuesChangeStart={this.sliderOneValuesChangeStart}
                  onValuesChange={this.sliderOneValuesChange}
                  onValuesChangeFinish={this.sliderOneValuesChangeFinish}
                  min={1}
                  max={30}
                />
              </View>
              <View style={styles.sliderOne}>
                <Text style={{ color: '#ffffff', fontSize: width / 25, }}>Age range: </Text>
                <Text style={{ color: '#ffffff', fontSize: width / 25, }}>{this.state.multiSliderValue[0]} - {this.state.multiSliderValue[1]}</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
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
              </View>
            </View>

            {this.DialogFilter()}
            <View style={{ alignItems: 'center', marginTop: 10 }}>
              <TouchableOpacity activeOpacity={0.7} style={{
                borderWidth: 6,
                borderColor: '#fe53bb',
                alignItems: 'center',
                justifyContent: 'center',
                width: width / 2.5,
                height: width / 2.5,
                backgroundColor: 'transparent',
                borderRadius: width / 2.5 / 2,
                marginBottom: -100,
              }} onPress={this.register.bind(this)}>
                <View style={{
                  borderWidth: 2,
                  borderColor: '#fe53bb',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: width / 2.8,
                  height: width / 2.8,
                  backgroundColor: 'transparent',
                  borderRadius: width / 2.8 / 2,
                }}>
                  <Text style={{ color: '#fe53bb', fontSize: width / 10, marginBottom: 40 }}> Create </Text>
                </View>

              </TouchableOpacity>
            </View>
            <Spinner visible={this.state.loadingVisible} textContent="Loading..." textStyle={{ color: '#FFF' }} />
          </ScrollView>
        </LinearGradient>
      </SafeAreaView>
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
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    width: width / 1.2,
    paddingLeft: 10,
    color:'white',
    height: height / 15
    
  },
  inputdes: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 10,
    width: width / 1.2,
    paddingLeft: 10,
    color:'white',
    height: height / 7
    
  },
  textbox: {

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
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: width,
    height: height / 16,

  },
  sliderOne: {
    flexDirection: 'row',
    paddingHorizontal: width / 12,
    justifyContent: 'space-between',

  },
  text: {
    textAlign: 'left',
    paddingVertical: 20,
  },
  image: {
    width: 400,
    height: 100,
    marginTop: 20
  },
  destination: {
    width: width,
    height: width * 0.6,
    paddingVertical: theme.sizes.padding * 0.66,
    marginTop: 10,
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
    marginLeft: 15
  },
});
